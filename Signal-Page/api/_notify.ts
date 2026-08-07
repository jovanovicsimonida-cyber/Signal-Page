// Telegram notification for form submissions.
//
// Every form on the site wrote to MailerLite and nothing else, which made a
// submission invisible until someone opened the dashboard and clicked into an
// individual subscriber. A breakdown request sat unnoticed for a week. This
// pushes the whole submission to Telegram the moment it lands, so the message
// itself is the record and there is nothing to go and look up.
//
// Vercel does not route files in /api whose name starts with an underscore, so
// this stays a shared module rather than becoming an endpoint.
//
// This must never break a submission. A missing token, a Telegram outage, or a
// hanging request all resolve quietly and the visitor still gets a success
// response. Notification is strictly best effort; MailerLite remains the
// system of record.

const TELEGRAM_TIMEOUT_MS = 3000;

// Telegram's HTML parse mode only requires these three to be escaped.
const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export type NotifyField = { label: string; value?: string | number | null };

export async function notifySubmission(title: string, fields: NotifyField[]): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const body = fields
    .filter((f) => f.value != null && String(f.value).trim() !== "")
    .map((f) => `<b>${escapeHtml(f.label)}:</b> ${escapeHtml(String(f.value))}`)
    .join("\n");

  const text = `🔔 <b>${escapeHtml(title)}</b>\n\n${body}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });
    if (!res.ok) {
      // Log the status only. The response body can echo the bot token back.
      console.error("Telegram notification rejected:", res.status);
    }
  } catch (err) {
    console.error("Telegram notification failed:", err);
  }
}
