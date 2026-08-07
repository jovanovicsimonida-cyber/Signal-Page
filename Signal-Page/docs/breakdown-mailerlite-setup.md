# Breakdown page: MailerLite setup

The `/breakdown` claim form posts to `/api/breakdown-claim`, which creates a
MailerLite subscriber, stores the intake details in custom fields, and adds
the subscriber to one group. That group is both your tag and the trigger for
the confirmation email.

Do these steps in your MailerLite dashboard before you share the link. Until
they are done, claims still arrive, but the extra detail is dropped and no
confirmation email goes out.

## 1. Create the custom fields

Subscribers -> Fields -> Create field. Add one text field with this exact key,
or MailerLite will discard the value:

| Field name | Key |
|---|---|
| Goal | `goal` |

The `name` and `email` fields already exist by default.

The form asks for name, work email, and one optional question ("What do you
want to improve?"), which lands in `goal`. It no longer collects a product
website or trial access. Those were cut to reduce friction on a cold-traffic
form, and are collected by reply once fit is confirmed. Submissions made
before 31 July 2026 may still carry `website` and `trial_access` values from
the old five-field form.

## 2. Create the group

Subscribers -> Groups -> Create group. Name it **Breakdown Requests**.

Open the group and copy its ID from the URL (the number after `/groups/`).
Set that value in Vercel as the environment variable
`MAILERLITE_BREAKDOWN_GROUP_ID`, then redeploy. Every form submission now lands
in this group, which is how you tell breakdown leads apart from newsletter and
contact subscribers.

### Optional pipeline groups

For a lightweight tagging pipeline, create these and move a subscriber along by
hand as the deal progresses:

- Breakdown - Fit confirmed
- Breakdown - Invoiced
- Breakdown - Paid
- Breakdown - Delivered

Only **Breakdown Requests** is required. The rest are yours to use or skip.

## 3. Build the confirmation automation

Automations -> Create automation.

- **Trigger:** When subscriber joins a group -> **Breakdown Requests**
- **Action:** Send email (copy below)

Turn the automation on. New submissions now receive it automatically.

### Confirmation email copy

**This is a record of what is live in MailerLite, as of 7 August 2026.** The
email itself lives in the MailerLite automation, not in this repo, so editing
this file changes nothing on its own. If you change the email there, change it
here too. The two drifting apart is what caused the earlier version to thank
people for trial access they had never been asked for.

Subject:

```
Your breakdown request is in
```

Body (uses the MailerLite merge tag `{$name}`; the numbered steps are rendered
by MailerLite as a styled list, so the plain text below is the wording only):

```
Hi {$name},

Thanks for requesting a Private Trial-to-Paid Breakdown! Your details are in,
and I have what I need to take a first look.

Here's what happens next:

1. I'll check that your trial or freemium motion is a match for this kind of
   outside-in review - this usually takes a day or two.
2. If it is a good fit, I'll send you an email and a Payoneer invoice.
3. Once the invoice is settled and I have trial access, I'll begin the review
   over a window of up to 14 days.
4. You'll receive your recorded walkthrough and written findings so you can
   start converting more of your trial users.

If there is a specific onboarding step, email, or upgrade prompt you want me to
look at, just reply to this email and let me know. I read every reply
personally :)

Talk soon,
Simonida
```

Send yourself a test through the automation preview and check that `{$name}`
resolves and the steps read cleanly before it goes live.

### Open improvements to this email

Not applied, noted so they are not lost:

- **It never asks for the trial link.** Step 3 mentions needing trial access
  but nothing prompts them to send it, so collecting it still depends on a
  separate email later. A line after step 4 would do it: "To save a step, reply
  now with your trial link, or how to create a test account. I'll need it
  before I start."
- **It does not say what happens if it is not a fit.** Step 2 opens with "if it
  is a good fit" and the other branch is left hanging, though the sales page
  promises they hear either way. "Either way, I'll let you know" closes step 1.
- **Timing wording differs from the page.** This email says "a window of up to
  14 days"; the page says the review runs as long as the trial runs. Those
  agree for a 14-day trial and diverge for a 30-day one.

MailerLite appends your physical address and an unsubscribe link automatically
(set the address under your account compliance settings). The line above is a
courtesy, not a legal requirement, since this fires right after someone submits
the form.
