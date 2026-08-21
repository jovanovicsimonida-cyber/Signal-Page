import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { notifySubmission } from "./_notify";

export const config = { runtime: "edge" };

let ratelimit: Ratelimit | null = null;
function getRatelimit(): Ratelimit | null {
  if (!hasRedis()) return null;
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "signal:rl:breakdown",
    });
  }
  return ratelimit;
}

function hasRedis(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

// One person submitted three times in forty minutes, which is well under the
// per-IP rate limit but still fired a Telegram notification each time. The
// rate limit is sized for bot floods; this is the separate "same person, same
// email, again" case, so it needs its own check keyed on the email itself.
const CLAIM_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days
const claimKey = (email: string) => `signal:claimed:breakdown:${email.trim().toLowerCase()}`;

let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (!hasRedis()) return null;
  if (!redis) redis = Redis.fromEnv();
  return redis;
}

// Trial link and product URL are no longer collected up front. They are asked
// for once fit is confirmed, so the form stays at two required fields.
//
// `website` is a honeypot. It is hidden from real users, so anything that
// arrives with it filled in is automated. Bots get a 200 rather than an error,
// because a clear rejection tells them what to change on the next attempt.
const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  goal: z.string().max(1000).optional(),
  website: z.string().max(200).optional(),
});

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const rl = getRatelimit();
    if (rl) {
      const ip = (req.headers as Headers).get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
      const { success } = await rl.limit(ip);
      if (!success) return new Response("Too Many Requests", { status: 429, headers: { "Retry-After": "3600" } });
    }
  } catch (err) {
    // Rate limiter unavailable (e.g. Upstash unreachable). Fail open so the
    // form still works rather than hard-crashing the function.
    console.error("Ratelimit unavailable, allowing request:", err);
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return new Response("Server misconfiguration", { status: 500 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return new Response("Invalid input", { status: 400 });
  }

  const { name, email, goal, website } = parsed.data;

  // Honeypot tripped. Look like a success so the bot does not retune and retry,
  // but do not write to MailerLite and do not send a notification.
  if (website && website.trim() !== "") {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Already claimed recently. Tell the visitor plainly rather than silently
  // accepting, so a real person knows their first request landed.
  const store = getRedis();
  if (store) {
    try {
      const seen = await store.get(claimKey(email));
      if (seen) {
        return new Response(
          JSON.stringify({
            ok: false,
            code: "already_claimed",
            message:
              "You have already requested a breakdown with this email. I have it and I will be in touch, no need to send it again.",
          }),
          { status: 409, headers: { "Content-Type": "application/json" } },
        );
      }
    } catch (err) {
      // Redis unreachable. Fail open: a duplicate notification is a smaller
      // problem than a real request being turned away.
      console.error("Duplicate check unavailable, allowing request:", err);
    }
  }

  const payload: Record<string, unknown> = {
    email,
    fields: {
      name,
      ...(goal ? { goal } : {}),
    },
  };

  const groupId = process.env.MAILERLITE_BREAKDOWN_GROUP_ID;
  if (groupId) {
    payload.groups = [groupId];
  }

  const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!mlRes.ok) {
    console.error("MailerLite error:", mlRes.status);
    return new Response("Failed to submit", { status: 502 });
  }

  // Record the claim only after MailerLite accepted it, so a failed submission
  // does not lock the visitor out of retrying.
  if (store) {
    try {
      await store.set(claimKey(email), Date.now(), { ex: CLAIM_TTL_SECONDS });
    } catch (err) {
      console.error("Could not record breakdown claim:", err);
    }
  }

  await notifySubmission("Breakdown request", [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Wants to improve", value: goal },
  ]);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
