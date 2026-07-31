import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Check,
  PlayCircle,
  ListChecks,
  Image as ImageIcon,
  PenLine,
  ListOrdered,
  Plus,
} from "lucide-react";
import { usePostHog } from "@posthog/react";
import { Footer } from "@/components/Footer";
import { useBreakdownClaim, type BreakdownClaimData } from "@/hooks/use-breakdown-claim";

// Testimonials come from the offer proposal PDF, quoted with permission. Each
// is placed next to the section it proves. Company names appear only as quote
// attribution: the page makes no separate client claim, because not every one
// of these was a paid engagement.
const quotes = {
  echoChamber: {
    quote: "The feedback was actionable, matched what we have been discussing internally, and was clear. If you only sit in your own echo chamber, you will miss a lot of opportunities and fixes.",
    name: "Jay Desai", title: "Growth Lead", company: "Navattic",
  },
  natalie: {
    quote: "This kind of outside review can be so useful for SaaS teams with trial-to-paid onboarding. You're so in the weeds of your own product, it's helpful to have a 3rd party opinion come in and look at it.",
    name: "Natalie Marcotullio", title: "Head of Growth & Operations", company: "Navattic",
  },
  usedIt: {
    quote: "We used parts of Simonida's recommendations to shape out a post-trial follow-up.",
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
  supademo: {
    quote: "This breakdown was super detailed, and it's given our team a lot to think about. Our ongoing goal now is activation, and the biggest focus is converting the people already coming through, so I definitely appreciate how detailed everything was.",
    name: "Ryan Carruthers", title: "Growth", company: "Supademo",
  },
} as const;

type Quote = (typeof quotes)[keyof typeof quotes];

function Testimonial({ q }: { q: Quote }) {
  return (
    <figure className="bg-white border border-border border-l-2 border-l-accent rounded-2xl p-6">
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

// Each review area carries the reason it matters, so the list reads as value
// rather than as a checklist of things I happen to look at.
const reviewAreas = [
  { area: "Signup and account creation", why: "The first place motivated users quietly give up." },
  { area: "First-run experience", why: "What users see before they have any reason to trust you." },
  { area: "Time to first meaningful value", why: "The single strongest predictor of whether a trial converts." },
  { area: "Setup friction", why: "Every required step is a place to postpone, and postponed trials expire." },
  { area: "Empty states and product guidance", why: "Where users decide the product is either obvious or too much work." },
  { area: "Onboarding emails", why: "Your only way to reach users who left and have not come back." },
  { area: "Activation nudges", why: "The difference between a user who pokes around and one who commits." },
  { area: "Upgrade prompts", why: "Asked too early they annoy, too late they never get seen." },
  { area: "Trial expiration and recovery messaging", why: "The last chance to convert someone who already wanted it." },
] as const;

const deliverableIcons = [PlayCircle, ListChecks, ImageIcon, PenLine, ListOrdered] as const;

const deliverables = [
  {
    item: "A recorded walkthrough of the complete trial journey",
    why: "You watch a real first-time user meet your product, so the problems stop being abstract.",
  },
  {
    item: "A written, prioritized list of conversion and activation friction",
    why: "Your team knows what to pick up on Monday without rewatching anything.",
  },
  {
    item: "Screenshots and examples from the experience",
    why: "Every finding is tied to a specific screen, so nobody has to argue about what happened.",
  },
  {
    item: "Copy, UX, and lifecycle recommendations",
    why: "Concrete changes you can hand to a designer, a writer, or a lifecycle owner as-is.",
  },
  {
    item: "Clear next steps ranked by likely impact and effort",
    why: "You start with the fix that returns the most for the least work.",
  },
] as const;

// Short recap next to the form. Deliberately terser than `deliverables`, since
// by this point the reader has already seen the full version twice.
const recap = [
  "A recorded walkthrough of your full trial journey",
  "A written, prioritized list of what is costing you upgrades",
  "The screen or email behind every finding",
  "Clear next steps ranked by impact and effort",
] as const;

// Rendered on the page and emitted as FAQPage structured data from this same
// array, so the two can never drift apart.
const faqs = [
  {
    q: "How long does it take?",
    a: "As long as your trial runs. If your trial is fourteen days, the breakdown takes fourteen days, because the email that arrives on day nine decides as much as the first screen someone sees. Waiting for the whole journey to play out is the point. Anything faster is a skim.",
  },
  {
    q: "What do you need from me?",
    a: "Your trial link or a way to create a test account, your pricing page and current trial offer, any onboarding emails you specifically want looked at, and a short note on your ideal customer and the conversion goal you care about most. None of that is needed to get in touch. It comes after fit is confirmed, so the first step stays to two fields.",
  },
  {
    q: "Will my breakdown end up in your newsletter?",
    a: "No. The public breakdowns are a separate thing, run on products signed up for as an ordinary user. What turns up in a private breakdown stays between us.",
  },
  {
    q: "What if our trial is not fully self-serve?",
    a: "The breakdown works from whatever a real prospect actually goes through. If that includes a demo gate or a sales-assisted step, that step gets reviewed too. If there is no self-serve path at all, mention it when you get in touch and you will hear honestly whether this is worth your money.",
  },
  {
    q: "What happens after I put my details in?",
    a: "Your product and your trial get a proper look within a day or two, and you hear back either way. If it is a fit, an invoice follows and a start date gets set. If it is not, you hear that instead.",
  },
  {
    q: "What if we already know what is wrong?",
    a: "Then you find out whether you are right, and what is sitting next to it. Most teams have a theory about one or two steps. The breakdown covers the whole journey, including every email, which is usually where the surprise is.",
  },
] as const;

const claimSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  goal: z.string().optional(),
});

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-background text-foreground placeholder:text-muted-foreground/50 transition-all font-sans input-accent";

export default function Breakdown() {
  const posthog = usePostHog();
  const mutation = useBreakdownClaim();

  useEffect(() => {
    window.scrollTo(0, 0);
    posthog.capture("breakdown_page_viewed");
  }, [posthog]);

  const form = useForm<BreakdownClaimData>({
    resolver: zodResolver(claimSchema),
    defaultValues: { name: "", email: "", goal: "" },
  });

  const onSubmit = (data: BreakdownClaimData) => {
    posthog.capture("breakdown_claim_submitted");
    mutation.mutate(data, { onSuccess: () => form.reset() });
  };

  const scrollToClaim = (location: string) => {
    posthog.capture("breakdown_claim_cta_clicked", { location });
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
        <meta property="og:description" content="Convert more of the trial users you already have. A private review of your signup-to-upgrade journey, showing where users hesitate, stall, or leave before reaching value." />
        <meta property="og:url" content="https://signallifecycle.com/breakdown" />
        <meta property="og:image" content="https://signallifecycle.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Private Trial-to-Paid Breakdown - Signal" />
        <meta name="twitter:description" content="A private review of your signup-to-upgrade journey. $1,500, credited toward the full Signal Audit if you move forward within 14 days." />
        <meta name="twitter:image" content="https://signallifecycle.com/og-image.png" />
        {/* Service and FAQPage share one @graph block: both describe the same
            page, and it avoids repeating @context across two script tags. */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "Private Trial-to-Paid Breakdown",
                serviceType: "SaaS trial-to-paid onboarding diagnostic",
                provider: {
                  "@type": "Organization",
                  name: "Signal Lifecycle",
                  url: "https://signallifecycle.com",
                },
                description:
                  "A private, outside-in review of a SaaS signup-to-upgrade journey from the perspective of a real first-time trial user, delivered as a recorded walkthrough with prioritized written findings.",
                offers: {
                  "@type": "Offer",
                  price: "1500",
                  priceCurrency: "USD",
                  url: "https://signallifecycle.com/breakdown",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: { "@type": "Answer", text: a },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Minimal header. The logo is the only way back to the site: a labelled
          exit link sat next to the form at every scroll position and competed
          with the one action this page exists to get. */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="text-2xl font-bold font-display text-primary tracking-tight">
            signal.
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero. Headline leads with the outcome; the mechanism moved to the
            subhead, where it supports the promise instead of being the promise. */}
        <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-5 sm:gap-6"
            >
              <span className="inline-block self-start px-3 py-1 bg-black/5 rounded-full text-xs font-bold tracking-wider uppercase text-primary/80 font-sans">
                Private Trial-to-Paid Breakdown
              </span>
              <h1 className="text-[2rem] leading-[1.15] sm:text-5xl lg:text-6xl font-bold sm:leading-[1.1] text-primary">
                Convert more of the trial users you already have
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-sans">
                You find out exactly where your trial loses people on the way to paid, from someone walking it start to finish as a first-time user who has never seen your product.
              </p>

              <figure className="border-l-2 border-l-accent pl-4">
                <blockquote className="text-foreground/90 font-sans leading-relaxed">
                  &ldquo;{quotes.natalie.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-sm text-muted-foreground font-sans">
                  {quotes.natalie.name}, {quotes.natalie.title}, {quotes.natalie.company}
                </figcaption>
              </figure>

              <div className="pt-2">
                <button
                  onClick={() => scrollToClaim("hero")}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-accent text-accent-foreground px-6 py-3.5 rounded-sm text-sm font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5 font-sans"
                >
                  See where your trial users stall
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The problem. Sits in the pain longer than it used to, and describes
            how the problem actually shows up week to week before naming a fix. */}
        <section className="py-12 sm:py-16 bg-secondary border-y border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
              Your team knows the product too well to experience onboarding like a first-time user.
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground font-sans leading-relaxed">
              <p>
                Your signups are fine, the traffic looks healthy, but activation has been flat for two quarters.
              </p>
              <p>
                You have some theories on why + a backlog of onboarding tickets nobody has prioritized.
              </p>
              <p>What you don't have is an answer.</p>
              <div className="space-y-1">
                <p>You know what every button means.</p>
                <p>You know which step matters.</p>
                <p>You know what users should do next.</p>
                <p className="text-foreground font-medium">A new trial user does not.</p>
              </div>
              <p>
                Your trial keeps leaking in the same places, and the people best positioned to notice are the people least able to see it - this is not a skill problem.
              </p>
              <p>
                You cannot un-know your own product. Every time you open it you bring context a first-time user will never have.
              </p>
              <ul className="space-y-3">
                {[
                  "Users sign up, look around, and never come back, and no one can say which screen lost them.",
                  "Onboarding emails go out on a schedule nobody has revisited since launch. The upgrade prompt gets blamed, changed, and blamed again.",
                  "Everyone has an opinion about what to fix first, and none of them are based on watching it happen.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-3" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground font-medium">
                What you need is someone with an outside perspective to go through the whole thing and write down exactly what happened.
              </p>
            </div>
            <div className="mt-10">
              <Testimonial q={quotes.echoChamber} />
            </div>
          </div>
        </section>

        {/* Every step gets checked. Each area now carries the reason it matters,
            so the list argues for itself instead of listing my process. */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Every step that stands between signup and paid</h2>
            <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
              Everything a trial user sees, receives, and is asked to do on the way from signup to upgrade, and why each one decides whether they stay.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {reviewAreas.map(({ area, why }) => (
                <div key={area} className="flex items-start gap-3 border-b border-border pb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2.5" />
                  <div>
                    <span className="block text-foreground font-sans font-medium">{area}</span>
                    <span className="block text-muted-foreground font-sans text-sm leading-relaxed mt-1">{why}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What they get */}
        <section className="py-12 sm:py-16 bg-secondary border-y border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">What you get</h2>
            <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
              A recorded walkthrough of the journey, backed by a written findings document your team can act on.
            </p>
            <div className="space-y-4">
              {deliverables.map(({ item, why }, i) => {
                const Icon = deliverableIcons[i] ?? Check;
                return (
                  <div key={item} className="flex items-start gap-3 sm:gap-4 bg-white border border-border rounded-xl p-5">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-secondary-foreground font-sans font-medium leading-relaxed">{item}</span>
                      <span className="block text-muted-foreground font-sans text-sm leading-relaxed mt-1.5">{why}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10">
              <Testimonial q={quotes.usedIt} />
            </div>
          </div>
        </section>

        {/* Credibility: answers "how can you do what you say" before the price
            is ever mentioned. The memo excerpt lives here now, because showing
            the real deliverable is proof, not a description of what they get. */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Why you can trust what comes back</h2>
            <p className="text-muted-foreground font-sans mb-5 leading-relaxed">
              You are not paying for an hour of clicking around.
            </p>
            <p className="text-muted-foreground font-sans mb-5 leading-relaxed">
              Your trial gets a walk-through at the speed it actually runs, if your trial is fourteen days, your breakdown takes fourteen days. Every onboarding step and email get the same attention.
            </p>
            <p className="text-muted-foreground font-sans mb-5 leading-relaxed">
              What's costing you upgrades gets named instead of guessed at, every finding reaches you with the screen it happened on and the change worth making, written the way your team already works.
            </p>
            <p className="text-muted-foreground font-sans mb-10 leading-relaxed">
              You also get someone who does nothing else. Trial-to-paid conversion for PLG SaaS is my whole job, I even run a newsletter about it.
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              <Testimonial q={quotes.supademo} />
              <Testimonial q={quotes.insightful} />
            </div>

            {/* Anonymized excerpt: real memo format, all client details removed. */}
            <div className="mt-10">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground font-sans mb-4">
                A real page from a breakdown
              </p>
              <div className="rounded-2xl border border-border overflow-hidden bg-white">
                <div className="border-b border-border bg-secondary px-5 sm:px-6 py-3 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="font-display text-primary font-semibold text-sm">Extended Diagnostic Memo, excerpt</span>
                </div>
                <div className="p-5 sm:p-6 md:p-8 font-sans">
                  <h4 className="font-bold text-primary">Behavior-triggered nudge, day 1</h4>
                  <p className="text-muted-foreground text-sm mt-1 mb-5">
                    Trigger: signed up, but has not completed the first key action.
                  </p>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Works.</span> This is the strongest email in the sequence. It is behavior-triggered, it reflects the user's real state, and it offers a guided path to the next step. Most SaaS companies never get this far.
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Does not work.</span> It is sent from a generic team address. This is the first email that says "we noticed you," so it is the moment to introduce a human. The "we" should have a name.
                    </p>
                    <div>
                      <p className="font-semibold text-foreground mb-2">What I would change</p>
                      <ul className="space-y-2">
                        {[
                          "Switch the sender to a named person on your team. Same copy, new from-name.",
                          "Add one line introducing their role, so later emails read as one continuing relationship.",
                          "Include a one-click “reply with what is blocking you” prompt, so the email doubles as a feedback loop.",
                        ].map((line) => (
                          <li key={line} className="flex items-start gap-2.5 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground font-sans text-xs mt-3">
                A representative excerpt in the real format. Client names and identifying details are removed.
              </p>
            </div>
          </div>
        </section>

        {/* Investment. Value first, then price at a size that does not shout,
            then the credit, then the upgrade path framed as more rather than
            as a list of what the buyer is not getting. */}
        <section id="investment" className="py-12 sm:py-16 scroll-mt-16 bg-secondary border-y border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Find what's costing you upgrades</h2>

            <div className="rounded-2xl border-2 border-accent bg-white p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground font-sans mb-5">
                Everything included
              </p>
              <ul className="space-y-3">
                {deliverables.map(({ item }) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-sans leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-6 border-t border-border flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary font-sans">$1,500</span>
                <span className="text-muted-foreground font-sans text-sm">for the complete breakdown</span>
              </div>

              <p className="mt-4 text-sm text-foreground font-sans border-l-2 border-l-accent pl-4 py-1 leading-relaxed">
                If you move into the full Signal Audit within 14 days, the whole $1,500 comes off the price of the Audit.
              </p>

              <div className="mt-6">
                <button
                  onClick={() => scrollToClaim("investment")}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-accent text-accent-foreground px-6 py-3.5 rounded-sm text-sm font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5 font-sans"
                >
                  Get your breakdown
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-white border border-border p-6 sm:p-7">
              <h3 className="font-bold text-primary font-sans mb-3">If you want to go further</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">
                The breakdown works from your customer-facing trial, which is what a real user sees. If you want me inside the numbers as well, the full Signal Audit adds:
              </p>
              <ul className="space-y-2.5">
                {[
                  "Product analytics, so findings are backed by what users actually did",
                  "Customer interviews with people who churned and people who converted",
                  "Your internal conversion data, segmented properly",
                  "Event architecture review, so you can trust what you are measuring",
                  "Team workshops to get the fixes shipped, not just documented",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                    <span className="text-muted-foreground font-sans text-sm leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
              <p className="text-foreground font-sans text-sm leading-relaxed mt-4">
                And if you go that route within 14 days, the $1,500 you spent here comes off the price. So the worst case is you get the breakdown. The best case is you get all of it and pay nothing extra for the start.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA / claim. The trial link and product details used to be
            required here; they are homework, and they are now asked for after
            I confirm fit rather than before anyone has committed to anything. */}
        <section id="claim" className="py-14 sm:py-20 scroll-mt-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-[5fr,7fr] gap-10 lg:gap-14 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Here is what you walk away with</h2>
                <ul className="space-y-3 mb-8">
                  {recap.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-sans leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                  Not every product is a fit for this. Put your name and work email in, and your product and your trial get a proper look before anything else happens. If there is real money to find in your trial, you will hear what I noticed. If there is not, you will hear that instead.
                </p>
                <p className="text-muted-foreground font-sans leading-relaxed mb-8">
                  Nothing to prepare, nothing to pay, no call to book. Two fields.
                </p>
                <Testimonial q={quotes.validation} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 sm:p-7 md:p-9 rounded-2xl shadow-xl shadow-black/5 border border-border border-l-2 border-l-accent"
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
                    <label htmlFor="goal" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">
                      What do you want to improve? <span className="normal-case tracking-normal font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <textarea {...form.register("goal")} id="goal" rows={3} className={`${inputClass} resize-none`} placeholder="Anything you already suspect is going wrong" />
                    {form.formState.errors.goal && <p className="text-sm text-destructive font-medium">{form.formState.errors.goal.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-base sm:text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "I want to convert more trial users"
                    )}
                  </button>
                  <p className="text-muted-foreground font-sans text-xs text-center leading-relaxed">
                    No payment now. You hear whether it is a fit before anything else happens.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ. Last thing on the page: the form stays the end of the sales
            argument, and these are the questions someone goes looking for
            rather than ones that need answering to get them there. Native
            details/summary rather than a JS accordion, so every answer is in
            the DOM for crawlers even before hydration. */}
        <section className="py-12 sm:py-16 bg-secondary border-t border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">Before you ask</h2>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group py-5">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="font-semibold text-foreground font-sans leading-relaxed">{q}</span>
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 mt-1 text-primary transition-transform duration-200 group-open:rotate-45"
                    >
                      <Plus className="w-5 h-5" />
                    </span>
                  </summary>
                  <p className="mt-3 pr-9 text-muted-foreground font-sans leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
