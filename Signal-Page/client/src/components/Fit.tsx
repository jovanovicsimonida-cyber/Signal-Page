import { motion } from "framer-motion";
import { Check, UserCheck } from "lucide-react";

const readinessChecks = [
  "Your ESP can trigger emails based on in-app events (not just time delays)",
  "You can name 3–5 actions that tend to predict whether someone pays",
  "You can connect a product user to an email address",
  "You can pull trial starts, trial ends, and conversions by week",
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
            If your trials leak, this is for you
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
              You've got data, but it's not telling you where users drop off — or how to catch them when they do.
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
          className="bg-primary p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <UserCheck className="w-48 h-48 text-white" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Still here? Here's how to know if you're ready.
            </h3>
            <p className="text-white/60 font-sans mb-8">You're probably a fit if:</p>

            <div className="space-y-4 mb-8">
              {readinessChecks.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white/80 font-sans font-medium">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-white/60 font-sans">
              If you're not sure on one or two of these, we can figure that out on a call.
              Fill out the form, and we'll get in contact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
