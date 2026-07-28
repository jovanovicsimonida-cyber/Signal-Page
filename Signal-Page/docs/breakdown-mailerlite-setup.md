# Breakdown page: MailerLite setup

The `/breakdown` claim form posts to `/api/breakdown-claim`, which creates a
MailerLite subscriber, stores the intake details in custom fields, and adds
the subscriber to one group. That group is both your tag and the trigger for
the confirmation email.

Do these steps in your MailerLite dashboard before you share the link. Until
they are done, claims still arrive, but the extra detail is dropped and no
confirmation email goes out.

## 1. Create the custom fields

Subscribers -> Fields -> Create field. Add three text fields with these exact
keys, or MailerLite will discard the values:

| Field name | Key |
|---|---|
| Website | `website` |
| Trial access | `trial_access` |
| Goal | `goal` |

The `name` and `email` fields already exist by default.

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

Subject:

```
Your breakdown request is in
```

Body (uses the MailerLite merge tag `{$name}`; confirm it matches your Name
field before sending a test):

```
Hi {$name},

Thanks for requesting a Private Trial-to-Paid Breakdown. Your details are in,
and I have what I need to get started.

Here is what happens next:

1. I review fit. I check that your trial or freemium motion is a match for this
   kind of outside-in review. This usually takes a day or two.
2. If it is a good fit, I send a Payoneer invoice.
3. Once the invoice is settled, I begin the review over a window of up to 14
   days, using the trial access and context you already shared.
4. You receive your recorded walkthrough and written findings after the review
   window closes.

If there is a specific onboarding email or upgrade prompt you want me to look
at, reply to this email and let me know.

Talk soon,
Simonida
Signal Lifecycle
signallifecycle.com
```

Send yourself a test through the automation preview and check that `{$name}`
resolves and the steps read cleanly before it goes live.
