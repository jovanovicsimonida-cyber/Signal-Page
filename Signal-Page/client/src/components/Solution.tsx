import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const scenarios = [
  {
    trigger: "A user completes step one but stalls on step two",
    result: "They get a specific nudge.",
  },
  {
    trigger: "They hit their Aha moment",
    result: "The sales pressure stops.",
  },
  {
    trigger: "They go dark",
    result: "A recovery loop kicks in automatically.",
  },
];

export function Solution() {
  return (
    <section className="py-24 bg-[#EBEAE8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What your trial looks like when it actually converts
          </h2>

          <div className="space-y-4">
            {scenarios.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border"
              >
                <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground font-sans">
                  <span className="text-muted-foreground">{s.trigger}</span>
                  <span className="mx-2">→</span>
                  <span className="font-semibold">{s.result}</span>
                </p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4 text-lg text-muted-foreground font-sans leading-relaxed">
            <p>
              No more blasting the same sequence to everyone.{" "}
              No more guessing why trials don't convert.{" "}
              No more rewriting onboarding every quarter hoping something sticks.
            </p>
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border">
              <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-foreground font-sans">
                Instead → a system that knows where each user is, what they need next, and when to step in.
              </p>
            </div>
            <p className="text-2xl font-bold text-primary font-serif">
              That's what SIGNAL builds.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
