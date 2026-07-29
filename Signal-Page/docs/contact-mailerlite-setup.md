# Contact form: MailerLite setup

The homepage contact form ("Tell me about your trial") posts to `/api/contact`,
which creates a MailerLite subscriber, stores the details in custom fields, and
adds the subscriber to one group. That group is both your tag and the trigger
for the confirmation email.

This mirrors the breakdown form setup in `breakdown-mailerlite-setup.md`.

## 1. The custom fields already exist

The contact form uses `name`, `conversion_rate`, and `esp_tool`. These were
created when the form first went live, so there is nothing to add here. If a
submission ever arrives with those blank, recreate the fields with those exact
keys under Subscribers -> Fields.

## 2. Create (or confirm) the group

Subscribers -> Groups. Create a group named **Audit Requests** if you do not
already have one for this form.

Copy its ID from the URL and set it in Vercel as `MAILERLITE_CONTACT_GROUP_ID`,
then redeploy. Every contact submission then lands in this group, which is what
the automation triggers on. Without it, subscribers are still created but stay
ungrouped, and the automation below will not fire.

## 3. Build the confirmation automation

Automations -> Create automation.

- **Trigger:** When subscriber joins a group -> **Audit Requests**
- **Action:** Send email (copy below)

Turn it on. New contact submissions now receive it automatically.

### Confirmation email copy

Subject:

```
Thanks for reaching out
```

Body (uses the MailerLite merge tag `{$name}`):

```
Hi {$name},

Thanks for reaching out about your trial-to-paid flow. I have your details.

Here is what happens next:

1. I take a look at what you shared, your current conversion rate and the tools
   you are using.
2. If it looks promising, I get back to you within 48 hours to set up a short
   call.
3. On that call we figure out whether the Audit is the right move for your team.

If you want to add anything in the meantime, just reply to this email.

Talk soon,
Simonida
Signal Lifecycle
signallifecycle.com
```

Send yourself a test through the automation preview and confirm `{$name}`
resolves before turning it on.
