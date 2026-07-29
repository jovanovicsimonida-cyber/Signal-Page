import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const config = { runtime: "edge" };

let ratelimit: Ratelimit | null = null;
function getRatelimit(): Ratelimit | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "signal:rl",
    });
  }
  return ratelimit;
}

const tierEnum = z.enum(["g", "y", "r"]).nullable().optional();

const schema = z.object({
  firstName: z.string().min(1).max(100),
  email: z.string().email().max(254),
  reds: z.number().int().min(0).max(9).optional(),
  yellows: z.number().int().min(0).max(9).optional(),
  gate1Tier: tierEnum,
  gate2Tier: tierEnum,
  gate3Tier: tierEnum,
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

  const { firstName, email, reds, yellows, gate1Tier, gate2Tier, gate3Tier } = parsed.data;

  const payload: Record<string, unknown> = {
    email,
    fields: {
      name: firstName,
      ...(reds !== undefined && { leak_reds: reds }),
      ...(yellows !== undefined && { leak_yellows: yellows }),
      ...(gate1Tier != null && { gate_1_tier: gate1Tier }),
      ...(gate2Tier != null && { gate_2_tier: gate2Tier }),
      ...(gate3Tier != null && { gate_3_tier: gate3Tier }),
    },
  };

  const groupId = process.env.MAILERLITE_LEAK_FINDER_GROUP_ID;
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
    return new Response("Failed to subscribe", { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
