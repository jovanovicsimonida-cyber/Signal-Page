import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Check, PlayCircle } from "lucide-react";
import { usePostHog } from "@posthog/react";
import { Footer } from "@/components/Footer";
import { useBreakdownClaim, type BreakdownClaimData } from "@/hooks/use-breakdown-claim";

// A recorded reaction from the Supademo team to their onboarding breakdown.
const SUPADEMO_RESPONSE_URL = "https://app.supademo.com/video/cmqi2gimi1zuvqmz3na32vjj1";

// Testimonials come from the offer proposal PDF. Each is placed next to the
// section it proves. Add the Supademo quote here once its text is confirmed.
const quotes = {
  echoChamber: {
    quote: "The feedback was actionable, matched what we have been discussing internally, and was clear. If you only sit in your own echo chamber, you will miss a lot of opportunities and fixes.",
    name: "Jay Desai", title: "Growth Lead", company: "Navattic",
  },
  emailByEmail: {
    quote: "I loved the specific email-by-email breakdown, not just the messaging, but who the target audience should be, what it did well, and where it can be improved.",
    name: "Natalie Marcotullio", title: "Head of Growth & Operations", company: "Navattic",
  },
  usedIt: {
    quote: "We actually used parts of your recommendations to shape out a post-trial follow-up.",
    name: "Emily Dickson", title: "CMO", company: "Crystal Knows",
  },
  insightful: {
    quote: "Loved the analysis you conducted on the Zendesk trial experience. It was very insightful.",
    name: "Paddy O'Grady", title: "Marketing", company: "Zendesk",
  },
  validation: {
    quote: "Simonida's analysis gave me the validation I needed to get started working on the email layer properly.",
    name: "Viktorijan Mucunski", title: "Client Operations", company: "HeyReach",
  },
} as const;

type Quote = (typeof quotes)[keyof typeof quotes];

function Testimonial({ q }: { q: Quote }) {
  return (
    <figure className="bg-secondary border border-border border-l-2 border-l-accent rounded-2xl p-6">
      <blockquote className="text-secondary-foreground font-sans leading-relaxed">
        &ldquo;{q.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 pt-3 border-t border-border">
        <span className="block font-semibold text-foreground font-sans text-sm">{q.name}</span>
        <span className="block text-muted-foreground font-sans text-sm">{q.title}, {q.company}</span>
      </figcaption>
    </figure>
  );
}

const reviewAreas = [
  "Signup and account creation",
  "First-run experience",
  "Time to first meaningful value",
  "Setup friction",
  "Empty states and product guidance",
  "Onboarding emails",
  "Activation nudges",
  "Upgrade prompts",
  "Trial expiration and recovery messaging",
] as const;

const deliverables = [
  "A recorded walkthrough of the complete trial journey",
  "A written, prioritized list of conversion and activation friction",
  "Screenshots and examples from the experience",
  "Copy, UX, and lifecycle recommendations",
  "Clear next steps ranked by likely impact and effort",
] as const;

const breakdownIncludes = [
  "Based on the experience of a real first-time trial user",
  "No analytics access required",
  "No team workshop",
  "Signup, onboarding, activation path, lifecycle emails, and upgrade prompts",
  "Recorded walkthrough plus written prioritized findings",
  "Delivered privately",
] as const;

const auditIncludes = [
  "Based on the customer experience and your internal data",
  "Product and conversion data reviewed",
  "Existing lifecycle sequences reviewed",
  "JTBD and Aha-event mapping",
  "Team working session",
  "Trigger, segment, and flow specifications",
  "Prioritized implementation plan",
] as const;

const whatINeed = [
  "Your trial link or a clear way to create a test account",
  "Your website, pricing page, and current trial or freemium offer",
  "Any onboarding emails you specifically want reviewed",
  "A short note on your ideal customer and the conversion goal you care about most",
] as const;

const claimSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  website: z.string().min(1, "Your product URL helps me start"),
  trialAccess: z.string().min(1, "Tell me how to reach your trial"),
  goal: z.string().min(1, "One line on the conversion goal you care about most"),
});

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-background text-foreground placeholder:text-muted-foreground/50 transition-all font-sans input-accent";

export default function Breakdown() {
  const posthog = usePostHog();
  const mutation = useBreakdownClaim();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<BreakdownClaimData>({
    resolver: zodResolver(claimSchema),
    defaultValues: { name: "", email: "", website: "", trialAccess: "", goal: "" },
  });

  const onSubmit = (data: BreakdownClaimData) => {
    posthog.capture("breakdown_claim_submitted");
    mutation.mutate(data, { onSuccess: () => form.reset() });
  };

  const scrollToClaim = () => {
    posthog.capture("breakdown_claim_cta_clicked");
    document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Private Trial-to-Paid Breakdown - Signal</title>
        <meta
          name="description"
          content="A private, outside-in review of your SaaS signup-to-upgrade journey from the eyes of a real first-time trial user. Recorded walkthrough plus prioritized written findings. Investment: $1,500."
        />
        <link rel="canonical" href="https://signallifecycle.com/breakdown" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Private Trial-to-Paid Breakdown - Signal" />
        <meta property="og:description" content="See your onboarding through the eyes of a real trial user. A private review of your signup-to-upgrade journey, showing where users hesitate, stall, or leave before reaching value." />
        <meta property="og:url" content="https://signallifecycle.com/breakdown" />
        <meta property="og:image" content="https://signallifecycle.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Private Trial-to-Paid Breakdown - Signal" />
        <meta name="twitter:description" content="A private review of your signup-to-upgrade journey. $1,500, credited toward the full Signal Audit if you move forward within 14 days." />
        <meta name="twitter:image" content="https://signallifecycle.com/og-image.png" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Private Trial-to-Paid Breakdown",
            "serviceType": "SaaS trial-to-paid onboarding diagnostic",
            "provider": { "@type": "Organization", "name": "Signal Lifecycle", "url": "https://signallifecycle.com" },
            "description": "A private, outside-in review of a SaaS signup-to-upgrade journey from the perspective of a real first-time trial user, delivered as a recorded walkthrough with prioritized written findings.",
            "offers": { "@type": "Offer", "price": "1500", "priceCurrency": "USD", "url": "https://signallifecycle.com/breakdown" }
          }
        `}</script>
      </Helmet>

      {/* Minimal header: logo + back to site only */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold font-display text-primary tracking-tight">signal.</span>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to signallifecycle.com
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <span className="inline-block self-start px-3 py-1 bg-black/5 rounded-full text-xs font-bold tracking-wider uppercase text-primary/80 font-sans">
                Private Trial-to-Paid Breakdown
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-wide text-primary">
                See your onboarding through the eyes of a real trial user
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-sans">
                A private review of your signup-to-upgrade journey, showing where users may hesitate, stall, or leave before reaching value.
              </p>

              <div className="flex flex-wrap items-center gap-3 font-sans">
                <span className="text-sm font-semibold text-secondary-foreground bg-secondary border border-border rounded-full px-4 py-1.5">
                  $1,500
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  A limited number of breakdowns each month
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={scrollToClaim}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm text-sm font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5 font-sans"
                >
                  Request a private breakdown
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The problem */}
        <section className="py-16 bg-white border-y border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
              Your team knows the product too well to experience onboarding like a first-time user.
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground font-sans leading-relaxed">
              <div className="space-y-1">
                <p>You know what every button means.</p>
                <p>You know which step matters.</p>
                <p>You know what users should do next.</p>
                <p className="text-foreground font-medium">A new trial user does not.</p>
              </div>
              <p>
                I sign up without an internal playbook and document the points where the journey becomes unclear, demanding, or disconnected from the value you promised.
              </p>
            </div>
            <div className="mt-10">
              <Testimonial q={quotes.echoChamber} />
            </div>
          </div>
        </section>

        {/* What I review */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">What I review</h2>
            <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
              Everything a trial user sees, receives, and is asked to do on the way from signup to upgrade.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {reviewAreas.map((area) => (
                <div key={area} className="flex items-start gap-3 border-b border-border pb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2.5" />
                  <span className="text-foreground font-sans">{area}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Testimonial q={quotes.emailByEmail} />
            </div>
          </div>
        </section>

        {/* What they receive */}
        <section className="py-16 bg-white border-y border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">What you receive</h2>
            <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
              A recorded walkthrough of the journey, backed by a written findings document your team can act on.
            </p>
            <div className="space-y-4">
              {deliverables.map((d, i) => (
                <div key={d} className="flex items-start gap-3 bg-secondary border border-border rounded-xl p-5">
                  {i === 0 ? (
                    <PlayCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  ) : (
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-secondary-foreground font-sans leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Testimonial q={quotes.usedIt} />
            </div>
            {/* TODO: drop 1-2 anonymized deliverable screenshots here once provided. */}
          </div>
        </section>

        {/* The boundary: breakdown vs full audit */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Where the breakdown ends and the Audit begins</h2>
            <p className="text-muted-foreground font-sans mb-10 leading-relaxed max-w-2xl">
              The breakdown reads your customer-facing trial experience. The full Signal Audit adds your internal data and your team.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-accent bg-white p-7">
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="font-bold text-primary text-lg font-sans">Private breakdown</h3>
                  <span className="font-bold text-primary font-sans">$1,500</span>
                </div>
                <ul className="space-y-3">
                  {breakdownIncludes.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground font-sans text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-secondary p-7">
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="font-bold text-primary text-lg font-sans">Full Signal Audit</h3>
                  <span className="font-bold text-primary font-sans">$5,000</span>
                </div>
                <ul className="space-y-3">
                  {auditIncludes.map((a) => (
                    <li key={a} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground font-sans text-sm leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-secondary border border-border p-7">
              <h3 className="font-bold text-primary font-sans mb-3">What this breakdown does not include</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                This review uses the customer-facing trial experience. It does not include product analytics, customer interviews, internal conversion data, event architecture, or team workshops. Companies that need those receive the full Signal Audit.
              </p>
            </div>

            <p className="mt-6 text-sm text-foreground font-sans border-l-2 border-l-accent pl-4 py-1">
              If you move into the full Signal Audit within 14 days of receiving the breakdown, the $1,500 is credited toward the Audit.
            </p>
          </div>
        </section>

        {/* Focus + remaining proof */}
        <section className="py-16 bg-white border-y border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Focused on PLG trial-to-paid conversion</h2>
            <p className="text-muted-foreground font-sans mb-10 leading-relaxed max-w-2xl">
              These breakdowns have helped SaaS teams spot lifecycle gaps they were too close to see internally, from email timing and sender logic to plan positioning, stall recovery, and post-trial follow-up.
            </p>

            <a
              href={SUPADEMO_RESPONSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("breakdown_supademo_response_clicked")}
              className="group flex items-center gap-5 bg-white border-2 border-accent rounded-2xl p-6 hover:-translate-y-0.5 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <PlayCircle className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-grow">
                <span className="block font-bold text-primary font-sans">
                  Watch the Supademo team respond to their breakdown
                </span>
                <span className="block text-muted-foreground font-sans text-sm mt-1">
                  A recorded reaction from a real SaaS team to one of these onboarding teardowns.
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="mt-5">
              <Testimonial q={quotes.insightful} />
            </div>
            <p className="text-muted-foreground/70 font-sans text-xs mt-6">
              Testimonials have been lightly edited for clarity where needed.
            </p>
            {/* TODO: add a link to the LinkedIn onboarding newsletter once the exact URL is provided. */}
          </div>
        </section>

        {/* Final CTA / claim */}
        <section id="claim" className="py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-[5fr,7fr] gap-10 lg:gap-14 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Request a private breakdown</h2>
                <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                  I take on a limited number of breakdowns each month. Submit your trial link and a few details about your product. I will confirm whether the breakdown is a good fit before you book, then send a short intake form and invoice.
                </p>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground font-sans mb-4">What I need from you</h3>
                <ul className="space-y-3 mb-8">
                  {whatINeed.map((n) => (
                    <li key={n} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground font-sans text-sm leading-relaxed">{n}</span>
                    </li>
                  ))}
                </ul>
                <Testimonial q={quotes.validation} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-7 md:p-9 rounded-2xl shadow-xl shadow-black/5 border border-border border-l-2 border-l-accent"
              >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">Name</label>
                    <input {...form.register("name")} id="name" className={inputClass} placeholder="Jane Doe" />
                    {form.formState.errors.name && <p className="text-sm text-destructive font-medium">{form.formState.errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">Work email</label>
                    <input {...form.register("email")} id="email" type="email" className={inputClass} placeholder="jane@company.com" />
                    {form.formState.errors.email && <p className="text-sm text-destructive font-medium">{form.formState.errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">Product website</label>
                    <input {...form.register("website")} id="website" className={inputClass} placeholder="https://yourproduct.com" />
                    {form.formState.errors.website && <p className="text-sm text-destructive font-medium">{form.formState.errors.website.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="trialAccess" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">How I can access your trial</label>
                    <input {...form.register("trialAccess")} id="trialAccess" className={inputClass} placeholder="Signup link, or how to create a test account" />
                    {form.formState.errors.trialAccess && <p className="text-sm text-destructive font-medium">{form.formState.errors.trialAccess.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goal" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">Ideal customer and conversion goal</label>
                    <textarea {...form.register("goal")} id="goal" rows={3} className={`${inputClass} resize-none`} placeholder="Who your ideal customer is, and the conversion goal you care about most" />
                    {form.formState.errors.goal && <p className="text-sm text-destructive font-medium">{form.formState.errors.goal.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Request my breakdown"
                    )}
                  </button>
                  <p className="text-muted-foreground/70 font-sans text-xs text-center">
                    No payment now. I confirm fit first, then send an invoice.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
