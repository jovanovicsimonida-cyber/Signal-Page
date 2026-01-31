import { Link } from "wouter";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[#EBEAE8] text-foreground flex flex-col">
      <Navigation />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 inline-block font-sans">
            &larr; Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
              {/* Photo card */}
              <div className="md:col-span-2 flex justify-center">
                <div className="relative">
                  <div className="w-64 h-80 rounded-2xl bg-primary/10 overflow-hidden shadow-2xl shadow-black/10 border border-black/5">
                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                      <span className="text-6xl font-bold text-primary/20">SJ</span>
                    </div>
                  </div>
                  <div className="absolute -inset-3 bg-primary/5 z-[-1] rounded-2xl transform rotate-2"></div>
                </div>
              </div>

              {/* Bio text */}
              <div className="md:col-span-3 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    About Me
                  </h1>
                  <p className="text-primary/60 font-sans font-medium">
                    Simonida Jovanovic
                  </p>
                </div>

                <div className="space-y-4 text-lg text-muted-foreground font-sans leading-relaxed">
                  <p>
                    I help SaaS companies turn trial signups into paying customers through lifecycle email strategy that's built on real user behavior — not guesswork.
                  </p>
                  <p>
                    With years of experience in product-led growth and email strategy, I've seen what works and what doesn't when it comes to onboarding, activation, and conversion flows.
                  </p>
                  <p>
                    I created the SIGNAL framework because most trial email sequences are built backwards — starting with the message instead of the behavior. SIGNAL starts with what your users actually do, and builds a system around it.
                  </p>
                </div>

                <a
                  href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=simonida-jovanovic-29778244"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-sm font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
