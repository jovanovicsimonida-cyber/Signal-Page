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
            <p>
              You're running a SaaS or product-led company with a trial.
              Users sign up. Some convert. Most don't. You're not totally sure why.
            </p>

            <p>
              Maybe you're post–Series A, trying to make revenue feel less random.
              You've got a Day 1 / Day 3 / Day 7 drip running.
              You don't know what's actually moving the needle.
            </p>

            <p>
              Or maybe you're further along, post–Series E, plenty of tools, plenty of data, but the flows feel stitched together.
              Product, Growth, and Lifecycle have different definitions of "activation."
              You're improving things, but it's slow and noisy.
            </p>

            <p>
              Either way, same problem: <span className="text-foreground font-medium">users stall before they see value, and you don't have a system that catches them.</span>
            </p>

            <p>If that sounds familiar, keep reading.</p>
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
