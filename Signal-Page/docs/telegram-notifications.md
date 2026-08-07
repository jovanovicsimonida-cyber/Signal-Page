# Instant Telegram notifications for form submissions

Every form on the site writes to MailerLite. Until now that was all it did, so
a submission was invisible until someone opened the MailerLite dashboard and
clicked into an individual subscriber. A breakdown request sat unnoticed for a
week.

All four form endpoints now push the full submission to Telegram the moment it
lands. The message contains every field, so it is the record: there is nothing
to go and look up.

| Form | Message title | Fields sent |
|---|---|---|
| `/breakdown` | Breakdown request | Name, email, what they want to improve |
| Contact (Audit) | Audit enquiry | Name, email, conversion rate, ESP / tool |
| Leak Finder | Leak Finder result claimed | Name, email, reds, yellows |
| Reverb template (`/resources/reverb`) | Reverb template download | Name, email |

There is no newsletter form on the site. The newsletter lives on LinkedIn and
the footer link sends people straight there, so there is nothing to notify on.

Notification is best effort. MailerLite stays the system of record. If the
token is missing, Telegram is down, or the request hangs for more than three
seconds, the visitor still gets a success response and the subscriber is still
created. A submission is never lost because a notification failed.

## Setup

You need two values, then one environment variable each in Vercel.

### 1. Bot token

In Telegram, message [@BotFather](https://t.me/BotFather):

- Send `/newbot`
- Give it a name and a username ending in `bot`
- BotFather replies with a token like `8123456789:AAH...`

If you would rather reuse an existing bot, send `/mybots` to BotFather, pick
the bot, then **API Token**.

### 2. Chat ID

Open a chat with your new bot and send it any message (the bot cannot message
you first). Then visit this URL in a browser, with your token pasted in:

```
https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
```

Look for `"chat":{"id":123456789`. That number is your chat ID.

To send notifications to a group instead, add the bot to the group, post a
message there, and read the `id` from the same URL. Group IDs are negative.

### 3. Add both to Vercel

Project -> Settings -> Environment Variables:

| Variable | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | The token from BotFather |
| `TELEGRAM_CHAT_ID` | The chat ID from `getUpdates` |

Redeploy. Until both are set, the notification code returns immediately and
nothing else changes, so it is safe to deploy before configuring them.

### 4. Test it

Submit the form on the live site yourself. The message should arrive within a
second or two. If nothing arrives, check the function logs in Vercel: a
rejected send logs `Telegram notification rejected: <status>`. A `401` means a
bad token, a `400` usually means a wrong chat ID.

## Note on what gets sent

These messages contain the name and email of whoever submitted, sent to your
own private chat over Telegram's API. That is the point of the feature, but it
is worth knowing that lead details leave MailerLite and reach a second service.
