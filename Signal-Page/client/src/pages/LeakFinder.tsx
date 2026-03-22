import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Play, ArrowRight, AlertCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const CALENDLY_URL = "https://calendly.com/simonida-signallifecycle/15min";

const leakSigns = [
  {
    headline: "Trials go quiet after Day 1",
    detail:
      "Users sign up, maybe poke around, then disappear. You're not sure if they ever came back.",
  },
  {
    headline: "You can't name your activation moment",
    detail:
      "No one on the team agrees on what 'activated' means — so nothing is being optimised for it.",
  },
  {
    headline: "Rewriting onboarding hasn't moved the needle",
    detail:
      "New email sequences, tweaked copy, adjusted timing. Conversion still sits in the same place.",
  },
];

const callCovers = [
  "Where your trial users are dropping off",
  "What's blocking them from reaching your activation moment",
  "Which one change would have the most immediate impact",
];

export default function LeakFinder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Trial Funnel Leak Check — Signal</title>
        <meta
          name="description"
          content="Find out where your SaaS trial funnel is losing users — and what to fix first. Book a free 10-minute diagnostic call."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navigation />

      <main className="flex-grow pt-32 pb-24">
        {/* ── Hero ──────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-muted-foreground font-sans mb-4">
              Free 10-Minute Diagnostic
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Is your trial funnel leaking?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-sans leading-relaxed max-w-2xl mx-auto mb-10">
              Most SaaS trials lose the majority of signups before users ever
              reach value. In 10 minutes, we'll find where yours is leaking —
              and what to fix first.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-sans"
            >
              Book your free leak check
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* ── Signs ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
              Three signs your funnel has a leak
            </h2>
            <div className="space-y-4">
              {leakSigns.map((sign, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 rounded-xl bg-secondary border border-border"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground font-sans mb-1">
                      {sign.headline}
                    </p>
                    <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                      {sign.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Video placeholder ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              See how it works
            </h2>
            <div className="w-full aspect-video bg-secondary border border-border rounded-2xl flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Play className="w-6 h-6 text-primary-foreground ml-1" />
              </div>
              <p className="text-sm text-muted-foreground font-sans">
                Walkthrough video coming soon
              </p>
            </div>
          </motion.div>

          {/* ── What the call covers ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="bg-primary rounded-2xl px-8 py-10 md:px-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                What we cover in 10 minutes
              </h2>
              <p className="text-white/60 font-sans mb-8">
                No pitch. No prep needed on your end.
              </p>
              <div className="space-y-4">
                {callCovers.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-accent">
                        {idx + 1}
                      </span>
                    </div>
                    <span className="text-white/80 font-sans font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Bottom CTA ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-muted-foreground font-sans mb-6">
              Takes 10 minutes. You'll leave knowing exactly where the leak is.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-sans"
            >
              Book your free leak check
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
