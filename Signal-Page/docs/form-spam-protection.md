# Form spam protection

Four layers protect the forms. Three of them do nothing unless Upstash is
configured, so check that first.

## 1. Upstash Redis (required for layers 2 and 3)

Both the rate limit and the duplicate check are stored in Upstash. If the env
vars are missing, `getRatelimit()` and `getRedis()` return `null` and every
request is allowed through. This fails silently by design, so a Redis outage
never takes the forms down, but it also means a missing env var looks exactly
like working code.

Project -> Settings -> Environment Variables, confirm both exist in
Production:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Both come from the Upstash console, under your Redis database -> REST API.

To confirm it is actually live, submit the breakdown form twice with the same
email. The second attempt should return 409 and show "Already got it". If the
second attempt succeeds, Upstash is not connected.

## 2. Rate limit, per IP

5 submissions per hour, sliding window, on all four endpoints
(`breakdown-claim`, `contact`, `subscribe`, `subscribe-leak-finder`). Sized to
stop bot floods. It will not stop a person submitting three or four times, which
is what layer 3 is for.

Note that `subscribe` and `subscribe-leak-finder` share the prefix `signal:rl`,
so they draw on the same bucket.

## 3. Duplicate check, per email (breakdown form only)

An email that has already requested a breakdown is remembered for 30 days under
`signal:claimed:breakdown:<email>`. A repeat request returns 409 with a message
written for the visitor, and no Telegram notification is sent.

The key is written only after MailerLite accepts the submission, so a failed
request does not lock someone out of retrying.

To clear a specific person so they can submit again, delete their key in the
Upstash console. The email is lowercased and trimmed.

## 4. Honeypot (breakdown form only)

A `website` field, positioned off-screen rather than `display: none` because
some bots skip hidden inputs. Real users never see it and never tab into it.

If it arrives filled in, the endpoint returns 200 without writing to MailerLite
or notifying. The success response is deliberate. A clear rejection would tell
the bot what to change.

## What is not here

No captcha. Turnstile is the next step if automated submissions become a real
problem, but it adds a dependency and some friction, so it is not worth adding
for occasional repeat submissions from real people.
