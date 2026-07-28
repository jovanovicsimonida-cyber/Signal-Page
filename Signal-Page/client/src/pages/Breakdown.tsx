import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Check,
  Search,
  Mail,
  Layers,
  AlertTriangle,
  TrendingUp,
  LifeBuoy,
  MousePointerClick,
} from "lucide-react";
import { usePostHog } from "@posthog/react";
import { Footer } from "@/components/Footer";
import { useBreakdownClaim, type BreakdownClaimData } from "@/hooks/use-breakdown-claim";

const reviewAreas = [
  { icon: MousePointerClick, area: "Signup flow", look: "Whether the user understands what to do next and why it matters" },
  { icon: Layers, area: "First-run onboarding", look: "Whether the product guides the user toward a meaningful first win" },
  { icon: Mail, area: "Email sequence", look: "Whether emails match the user state, timing, and intent" },
  { icon: TrendingUp, area: "Trial or freemium positioning", look: "Whether the user understands what they get now, what paid unlocks, and why the upgrade matters" },
  { icon: AlertTriangle, area: "Stall points", look: "Where users may stop before completing the next important action" },
  { icon: ArrowRight, area: "Upgrade path", look: "Whether the product creates enough belief before asking for payment" },
  { icon: LifeBuoy, area: "Recovery moments", look: "Where a nudge, shortcut, or human check-in could bring the user back" },
] as const;

const deliverables = [
  "A detailed written breakdown of the trial-to-paid journey",
  "Screenshots and examples from the actual user experience",
  "Diagnosis of the signup flow, onboarding path, email sequence, and upgrade path",
  "Notes on likely stall points and missed recovery moments",
  "Practical recommendations ranked by what I would fix first",
  "A clear distinction between what I observed from the outside and what your internal data should validate",
] as const;

const testimonials = [
  { quote: "I loved the specific email-by-email breakdown, not just the messaging, but who the target audience should be, what it did well, and where it can be improved.", name: "Natalie Marcotullio", title: "Head of Growth & Operations", company: "Navattic" },
  { quote: "The feedback was actionable, matched what we have been discussing internally, and was clear. If you only sit in your own echo chamber, you will miss a lot of opportunities and fixes.", name: "Jay Desai", title: "Growth Lead", company: "Navattic" },
  { quote: "We actually used parts of your recommendations to shape out a post-trial follow-up.", name: "Emily Dickson", title: "CMO", company: "Crystal Knows" },
  { quote: "Loved the analysis you conducted on the Zendesk trial experience. It was very insightful.", name: "Paddy O'Grady", title: "Marketing", company: "Zendesk" },
  { quote: "Simonida's analysis gave me the validation I needed to get started working on the email layer properly.", name: "Viktorijan Mucunski", title: "Client Operations", company: "HeyReach" },
] as const;

const whatINeed = [
  "Trial access or a clear way to create a test account",
  "Your website, pricing page, and current trial or freemium offer",
  "Any onboarding emails you specifically want reviewed, if they are not triggered during the review window",
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
          content="A paid outside-in diagnostic of your SaaS trial experience, onboarding emails, and upgrade path. I map where your trial-to-paid journey loses users and what I would fix first. Investment: $1,500."
        />
        <link rel="canonical" href="https://signallifecycle.com/breakdown" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Private Trial-to-Paid Breakdown - Signal" />
        <meta property="og:description" content="An outside-in review of your SaaS trial experience, onboarding emails, and upgrade path. See where the journey loses users before they reach enough value to convert." />
        <meta property="og:url" content="https://signallifecycle.com/breakdown" />
        <meta property="og:image" content="https://signallifecycle.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Private Trial-to-Paid Breakdown - Signal" />
        <meta name="twitter:description" content="An outside-in diagnostic of your SaaS trial-to-paid journey. Investment: $1,500, credited toward the full SIGNAL Audit if you move forward within 14 days." />
        <meta name="twitter:image" content="https://signallifecycle.com/og-image.png" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Private Trial-to-Paid Breakdown",
            "serviceType": "SaaS trial-to-paid diagnostic",
            "provider": { "@type": "Organization", "name": "Signal Lifecycle", "url": "https://signallifecycle.com" },
            "description": "An outside-in review of a SaaS trial experience, onboarding emails, and upgrade path, delivered as a written diagnostic. Review window up to 14 days.",
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
                Paid Diagnostic Offer
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-wide text-primary">
                Private Trial-to-Paid Breakdown
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-sans">
                An outside-in review of your SaaS trial experience, onboarding emails, and upgrade path.
              </p>

              <div className="flex flex-wrap gap-3 font-sans">
                {["Built for B2B SaaS teams", "Review window up to 14 days", "$1,500"].map((b) => (
                  <span key={b} className="text-sm font-semibold text-secondary-foreground bg-secondary border border-border rounded-full px-4 py-1.5">
                    {b}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={scrollToClaim}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm text-sm font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5 font-sans"
                >
                  Claim your spot
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            <div className="mt-14 space-y-5 text-lg text-muted-foreground font-sans leading-relaxed">
              <p>
                <span className="text-foreground font-medium">Most trial-to-paid problems do not start at the final upgrade email.</span>{" "}
                They start earlier, when a user signs up, looks around, misses the first meaningful win, and never builds enough reason to pay.
              </p>
              <p>
                The Private Trial-to-Paid Breakdown shows what that journey looks like from the user side. I go through your signup flow, onboarding path, trial emails, upgrade prompts, and visible recovery moments over a review window of up to 14 days. Then I map where the experience creates momentum, where users may stall, and what I would fix first.
              </p>
              <p className="text-base border-l-2 border-l-accent pl-4 py-1">
                This is a paid diagnostic asset built to stand on its own, so no call is included.
              </p>
            </div>
          </div>
        </section>

        {/* What I Review */}
        <section className="py-16 bg-white border-y border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">What I review</h2>
            <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
              I review what a trial user sees, receives, and is asked to do during the first 7 to 14 days of the journey.
            </p>
            <div className="divide-y divide-border">
              {reviewAreas.map(({ icon: Icon, area, look }) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-4 py-5"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground font-sans">{area}</h3>
                    <p className="text-muted-foreground font-sans text-sm mt-1 leading-relaxed">{look}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">What you get</h2>
            <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
              A detailed written teardown of your trial-to-paid journey your team can discuss internally.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {deliverables.map((d) => (
                <div key={d} className="flex items-start gap-3 bg-secondary border border-border rounded-xl p-5">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-secondary-foreground font-sans text-sm leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review window + best fit */}
        <section className="py-16 bg-white border-y border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border p-7">
              <h3 className="font-bold text-primary text-lg mb-3 font-sans">Review window</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                The review window is up to 14 days, because most SaaS trials run between 7 and 14 days. If your trial is shorter, I review the full trial period. If your lifecycle sequence extends beyond 14 days, I review what appears during the agreed window and flag anything outside scope.
              </p>
            </div>
            <div className="rounded-2xl border border-border p-7">
              <h3 className="font-bold text-primary text-lg mb-3 font-sans">Best fit</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                This is a good fit if you have a free trial or freemium motion and want a sharper view of what happens between signup and paid conversion. It is especially useful when trial starts and paid conversions are visible, but the middle of the journey feels less clear.
              </p>
            </div>
          </div>
        </section>

        {/* What this is not */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What this is not</h2>
            <p className="text-muted-foreground font-sans leading-relaxed">
              This is not a full SIGNAL Audit. It does not include internal analytics review, customer interviews, team workshops, full JTBD mapping, complete trigger specs, copywriting for the full lifecycle sequence, or implementation inside your tools.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed mt-4">
              This is an outside-in diagnostic. I show you what the journey looks like from the user side, where the experience may lose momentum, and what I would fix first. Your internal data should always be used to validate or challenge the diagnosis.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white border-y border-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Proof from previous breakdowns</h2>
              <p className="text-muted-foreground font-sans leading-relaxed">
                These breakdowns have helped SaaS teams spot lifecycle gaps they were too close to see internally, from email timing and sender logic to plan positioning, stall recovery, and post-trial follow-up.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {testimonials.map((t) => (
                <motion.figure
                  key={t.name + t.quote.slice(0, 12)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col bg-secondary border border-border rounded-2xl p-6"
                >
                  <blockquote className="text-secondary-foreground font-sans leading-relaxed flex-grow">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-border">
                    <span className="block font-semibold text-foreground font-sans text-sm">{t.name}</span>
                    <span className="block text-muted-foreground font-sans text-sm">{t.title}, {t.company}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
            <p className="text-muted-foreground/70 font-sans text-xs mt-6">
              Testimonials have been lightly edited for clarity where needed.
            </p>
          </div>
        </section>

        {/* Claim / intake */}
        <section id="claim" className="py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl bg-accent/15 border border-accent px-6 py-5 mb-10 flex items-start gap-3">
              <Search className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-foreground font-sans text-sm leading-relaxed">
                <span className="font-semibold">Investment: $1,500.</span> If you move into the full SIGNAL Audit within 14 days of receiving the breakdown, the $1,500 is credited toward the Audit.
              </p>
            </div>

            <div className="grid lg:grid-cols-[5fr,7fr] gap-10 lg:gap-14 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Claim your spot</h2>
                <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                  Send the details below. I review fit, then send a short intake form and invoice. Once I have trial access and basic context, I begin the review, and you receive the finished breakdown after the review window closes.
                </p>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground font-sans mb-4">What I need from you</h3>
                <ul className="space-y-3">
                  {whatINeed.map((n) => (
                    <li key={n} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground font-sans text-sm leading-relaxed">{n}</span>
                    </li>
                  ))}
                </ul>
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
                      "Claim my spot"
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
