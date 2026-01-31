import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Framework } from "@/components/Framework";
import { Offer } from "@/components/Offer";
import { AfterAudit } from "@/components/AfterAudit";
import { Fit } from "@/components/Fit";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <Problem />
        <Solution />
        <Framework />
        <Offer />
        <AfterAudit />
        <Fit />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
