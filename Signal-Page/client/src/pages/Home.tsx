import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Framework } from "@/components/Framework";
import { Offer } from "@/components/Offer";
import { AfterAudit } from "@/components/AfterAudit";
import { Fit } from "@/components/Fit";
import { FunnelLeakCTA } from "@/components/FunnelLeakCTA";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Signal - Lifecycle Email Strategy for SaaS Trial-to-Paid</title>
        <meta name="description" content="Signal helps SaaS companies turn trial signups into paying customers through lifecycle email strategy built on real user behavior - not guesswork. Built on the SIGNAL framework and Jobs to Be Done." />
        <link rel="canonical" href="https://signallifecycle.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Signal - Lifecycle Email Strategy for SaaS Trial-to-Paid" />
        <meta property="og:description" content="Your trial-to-paid flow finally does what it was supposed to do. Users reach value. Upgrades happen. Your team stops guessing why some convert and most don't." />
        <meta property="og:url" content="https://signallifecycle.com" />
        <meta property="og:image" content="https://signallifecycle.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Signal - Lifecycle Email Strategy for SaaS Trial-to-Paid" />
        <meta name="twitter:description" content="Your trial-to-paid flow finally does what it was supposed to do. Users reach value. Upgrades happen. Your team stops guessing." />
        <meta name="twitter:image" content="https://signallifecycle.com/og-image.png" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is lifecycle email strategy for SaaS?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lifecycle email strategy is a system of behavior-triggered emails that respond to what users actually do inside your product, not just what day they signed up. Instead of blasting the same sequence to everyone, each user gets messages based on where they are in their journey: onboarding, activation, stalling, or ready to upgrade."
                }
              },
              {
                "@type": "Question",
                "name": "Why aren't my trial users converting to paid?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most common reason is treating all trial users the same. A user who connected their data and hit a key milestone needs different messaging than one who logged in once and went quiet. Without behavior-based segmentation, you're sending the wrong message to the wrong person at the wrong time, and most trials expire silently."
                }
              },
              {
                "@type": "Question",
                "name": "What is the SIGNAL framework?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SIGNAL is a six-stage methodology for building lifecycle email systems: Segment users into real cohorts, Interpret their behavior to find friction, Generate flow logic before writing a word, Nurture with copy that sounds human, Automate triggers and suppression rules, and Learn from retention data to keep improving."
                }
              },
              {
                "@type": "Question",
                "name": "What does The Leak Audit include?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Leak Audit is a 60–90 minute working session where we map your user journey, identify where trial-to-paid conversions leak, and deliver a documented strategy. You walk away with a JTBD + Aha moment map, prioritized stall points, and a clear picture of what to fix first."
                }
              }
            ]
          }
        `}</script>
      </Helmet>
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <Problem />
        <Solution />
        <Framework />
        <Offer />
        <AfterAudit />
        <Fit />
        <FunnelLeakCTA />
        <div className="max-w-2xl mx-auto px-6 lg:px-8 py-16 text-left space-y-4">
          <p className="text-muted-foreground font-sans text-lg leading-relaxed">
            Fill out the form below.
          </p>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed">
            If it looks promising, I'll reach out within 48 hours to set up a short call. That's where we figure out if this is the right move for your team.
          </p>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed">
            The Audit is a working session that requires your conversion data, product analytics, and time from your team.
          </p>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed">
            It's not something you walk into blind, and it's not something I take on without being confident I can help.
          </p>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
