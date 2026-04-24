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
            If you're ready to skip ahead - fill out the form below.
          </p>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed">
            I'll take a look and get back to you within 48 hours to let you know if it's a fit.
          </p>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed">
            If it is, we'll get on a call before anything else.
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
