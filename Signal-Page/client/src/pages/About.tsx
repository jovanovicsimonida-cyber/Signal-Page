import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import profilePhoto from "@assets/website-image.png";

export default function About() {
  const goToAudit = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen bg-[#EBEAE8] text-foreground flex flex-col">
      <Navigation />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 inline-block font-sans">
            &larr; Back to Home
          </Link>

          {/* Philosophy / approach section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="space-y-6 text-lg text-muted-foreground font-sans leading-relaxed">
              <p>
                I've tested a lot of great tools with trial experiences that made upgrading harder than it needed to be.
              </p>
              <p>
                Sometimes I upgraded anyway, because the product solved a job I cared about enough to push through the friction.
              </p>
              <p>
                Other times, I didn't. Not because the tool was bad, but because I never reached the moment where the value felt obvious.
              </p>
              <p>Some things are always true:</p>
              <p>
                No trial flow can rescue a product that doesn't deliver real value.
              </p>
              <p>
                Some users will convert no matter what, because they showed up with a job to get done.
              </p>
              <p>
                Your users are always switching from something.
              </p>
              <p>
                Sometimes it's a direct competitor. Sometimes it's spreadsheets, patchwork processes, or a half-broken internal workflow they've tolerated for too long. Either way, "trying your tool" only turns into "using your tool" when they believe the switch is worth it.
              </p>
              <p>
                That switch has a cost. Time. Effort. Risk. Fear of messing something up. Fear of picking the wrong tool and having to switch again.
              </p>
              <p>
                So a trial-to-paid sequence can't just educate. It has to reduce switching friction.
              </p>
              <p>It has to help users do three things quickly:</p>
              <ul className="space-y-2 pl-1">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5">1.</span>
                  <span>See the job your tool helps them complete</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5">2.</span>
                  <span>Get a win that feels like progress fast</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5">3.</span>
                  <span>Trust that moving over is worth the time and effort</span>
                </li>
              </ul>
              <p>
                That's where Jobs to Be Done comes in.
              </p>
              <p>
                When you understand what job your product is actually hired for, you can design a trial experience that helps users complete that job faster, easier, and with less confusion. You stop guessing what to say and when to say it, because the path becomes clear.
              </p>
              <p>
                And once the path is clear, your lifecycle messaging gets simpler.
              </p>
              <p>
                That's also why you can't skip the audit. Before we touch a single email, we need to understand what your product is actually being hired to do. What job users show up trying to complete, what "done" looks like to them, and what they need to see and do inside the trial to feel confident paying.
              </p>
            </div>
          </motion.div>

          {/* What You Should Know About Me — card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl border border-border shadow-xl shadow-black/5 mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">What You Should Know About Me</h2>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Photo inside the card */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={profilePhoto}
                  alt="Simonida Jovanovic"
                  className="w-48 h-60 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Bio text */}
              <div className="space-y-4 text-muted-foreground font-sans leading-relaxed">
                <p>
                  I'm a strong believer in the saying: <em>"A jack of all trades is a master of none, but oftentimes better than a master of one."</em>
                </p>
                <p>
                  Because I studied fine art, then spent the next 15 years in digital marketing, doing everything from design, creating digital assets, landing pages, content, copy, even video scripting, with all the unglamorous parts like iteration, testing, and crying a lot.
                </p>
                <p>
                  Also worked in cold outreach, where the feedback loop is brutal and immediate, which meant even more crying.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground font-sans leading-relaxed">
              <p>
                Today I focus on trial-to-paid because it's the highest-leverage part of the customer journey, and I love to nerd out about people's behaviour + less crying.
              </p>
              <p>
                That also means I'm selective with clients because this only works when there's real value to unlock. If we're not a match, I'll tell you right away.
              </p>
              <p>
                Also, I live with a cat who believes all keyboards belong to her.
              </p>
              <p className="font-mono text-sm text-muted-foreground/60">
                ;si[ awr[\v ir p
              </p>
              <p className="text-muted-foreground/80 italic">
                She thinks you should
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={goToAudit}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-sm font-semibold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 group"
            >
              Start With the Leak Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
