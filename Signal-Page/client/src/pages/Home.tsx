import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Framework } from "@/components/Framework";
import { Offer } from "@/components/Offer";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <Framework />
        <Offer />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
