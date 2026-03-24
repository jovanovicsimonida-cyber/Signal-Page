import { motion } from "framer-motion";
import { Check, UserCheck } from "lucide-react";

const readinessChecks = [
  "You keep asking yourself \"why aren't more trials converting?\", and you don't have a clear answer",
  "Your team has tried everything - new emails, adjusted timing, rewritten CTAs. The numbers barely moved.",
  "You know the data's there, somewhere, but you don't have time to dig through it and build a system from scratch",
  "You're tired of watching your team patch the same problem every quarter and still not knowing what's actually broken",
  "You want to hand someone the problem and get back a system, not a slide deck",
];

export function Fit() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Here's how to know if you're ready
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground font-sans leading-relaxed">
            <div className="space-y-1">
              <p>Users sign up.</p>
              <p>Some convert.</p>
              <p>Most don't.</p>
              <p><span className="text-foreground font-medium">You're not sure why.</span></p>
            </div>

            <p>
              You've got emails going out (Day 1, Day 3, Day 7), but you can't point to what's actually working.
            </p>

            <div className="space-y-1">
              <p>Your team keeps rewriting onboarding hoping something sticks.</p>
              <p>It never really does.</p>
            </div>

            <div className="space-y-1">
              <p>Product says activation means one thing.</p>
              <p>Growth says another.</p>
              <p><span className="text-foreground font-medium">No one's measuring the same thing.</span></p>
            </div>

            <p>
              You've got data, but it's not telling you where users drop off - or how to catch them when they do.
            </p>

            <p>
              Users stall before they see value, and you don't have a system that catches them.
            </p>

            <p className="text-2xl font-bold text-primary font-serif">
              The leak stays open.
            </p>
          </div>
        </motion.div>

        {/* Dark readiness card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <UserCheck className="w-48 h-48 text-white" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              You're a fit if
            </h3>


            <div className="space-y-4">
              {readinessChecks.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-accent-foreground" />
                  </div>
                  <span className="text-white/80 font-sans font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
