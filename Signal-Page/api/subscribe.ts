export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return new Response("Server misconfiguration", { status: 500 });
  }

  let body: { firstName?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { firstName, email } = body;
  if (!email || !firstName) {
    return new Response("Missing required fields", { status: 400 });
  }

  const payload: Record<string, unknown> = {
    email,
    fields: { name: firstName },
  };

  const groupId = process.env.MAILERLITE_GROUP_ID;
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
    const text = await mlRes.text();
    console.error("MailerLite error:", mlRes.status, text);
    return new Response("Failed to subscribe", { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
