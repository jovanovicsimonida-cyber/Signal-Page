import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import profilePhoto from "@assets/website-image.png";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen bg-[#EBEAE8] text-foreground flex flex-col">
      <Navigation />
      <main className="flex-grow pt-32 pb-24">
        {/* Philosophy text — narrower container */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 inline-block font-sans">
            &larr; Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              The Job That Comes First
            </h1>
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
              <div className="border-l-4 border-primary/30 pl-6 py-4 space-y-3 bg-white/50 rounded-r-lg">
                <p className="font-medium text-foreground">Some things are always true:</p>
                <p>No trial flow can rescue a product that doesn't deliver real value.</p>
                <p>Some users will convert no matter what, because they showed up with a job to get done.</p>
                <p>Your users are always switching from something.</p>
              </div>
              <p>Sometimes it's a direct competitor.</p>
              <p>Sometimes it's spreadsheets, patchwork processes, or a half-broken internal workflow they've tolerated for too long.</p>
              <p>Either way, "trying your tool" only turns into "using your tool" when they believe the switch is worth it.</p>
              <p className="font-semibold text-foreground">
                That switch has a cost.
              </p>
              <p>Time.</p>
              <p>Effort.</p>
              <p>Risk.</p>
              <p>Fear of messing something up.</p>
              <p>Fear of picking the wrong tool and having to switch again.</p>
              <p>
                So a trial-to-paid sequence can't just educate. It has to reduce switching friction.
              </p>
              <div className="border-l-4 border-primary/30 pl-6 py-4 space-y-3 bg-white/50 rounded-r-lg">
                <p className="font-medium text-foreground">It has to help users do three things quickly:</p>
                <p><span className="text-primary font-bold">1.</span> See the job your tool helps them complete</p>
                <p><span className="text-primary font-bold">2.</span> Get a win that feels like progress fast</p>
                <p><span className="text-primary font-bold">3.</span> Trust that moving over is worth the time and effort</p>
              </div>
              <p>
                That's where Jobs to Be Done comes in.
              </p>
              <p>
                When you understand what job your product is actually hired for, you can design a trial experience that helps users complete that job faster, easier, and with less confusion. You stop guessing what to say and when to say it, because the path becomes clear.
              </p>
              <p>
                And once the path is clear, your lifecycle messaging gets simpler.
              </p>
              <p className="text-xl font-semibold text-foreground">
                That's also why you can't skip the audit.
              </p>
              <p>
                Before we touch a single email, we need to understand what your product is actually being hired to do. What job users show up trying to complete, what "done" looks like to them, and what they need to see and do inside the trial to feel confident paying.
              </p>
            </div>
          </motion.div>
        </div>

        {/* What You Should Know About Me — dark card, full width */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary p-8 md:p-12 rounded-2xl shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">What You Should Know About Me</h2>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Photo inside the card */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={profilePhoto}
                  alt="Simonida Jovanovic"
                  className="w-48 h-60 object-cover rounded-lg"
                />
              </div>

              {/* Bio text */}
              <div className="space-y-4 text-white/80 font-sans leading-relaxed">
                <p>
                  I'm a strong believer in the saying: <em className="text-white">"A jack of all trades is a master of none, but oftentimes better than a master of one."</em>
                </p>
                <p>
                  Because I studied fine art, then spent the next 15 years in digital marketing, doing everything from design, creating digital assets, landing pages, content, copy, even video scripting, with all the unglamorous parts like iteration, testing, and crying a lot.
                </p>
                <p>
                  Also worked in cold outreach, where the feedback loop is brutal and immediate, which meant even more crying.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-white/80 font-sans leading-relaxed">
              <p>
                Today I focus on trial-to-paid because it's the highest-leverage part of the customer journey, and I love to nerd out about people's behaviour + less crying.
              </p>
              <p>
                That also means I'm selective with clients because this only works when there's real value to unlock. If we're not a match, I'll tell you right away.
              </p>
              <p>
                Also, I live with a cat who believes all keyboards belong to her.
              </p>
              <p className="font-mono text-sm text-white/40">
                ;si[ awr[\v ir p
              </p>
              <p className="text-white/60 italic">
                She thinks you should
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={goToContact}
                className="px-8 py-4 bg-white text-primary rounded-sm font-semibold text-lg hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 group lowercase"
              >
                start with the leak audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
