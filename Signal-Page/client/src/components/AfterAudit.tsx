import { motion } from "framer-motion";
import { Check, PenTool, Rocket } from "lucide-react";

const buildFeatures = [
  "Full SIGNAL + Reverb system designed",
  "Triggers, tags, segments, suppression logic",
  "All the email copy",
  "Reverb micro-cycles",
  "Measurement plan",
  "Everything documented — ready for your team to implement",
  "Ongoing support for A/B testing, iteration, and campaign strategy",
];

const buildImplementFeatures = [
  "Everything in Build, plus:",
  "System wired directly into your tools",
  "Tags created, segments built, triggers configured",
  "Emails loaded and live",
  "A running system, not just a spec",
  "Ongoing support for testing, optimization, and backend management",
];

export function AfterAudit() {
  return (
    <section className="py-24 bg-[#EBEAE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">After the Audit</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Once you know what's broken, you decide what happens next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Build card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white p-8 md:p-10 rounded-2xl border border-border shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-background rounded-lg border border-black/5 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <PenTool className="w-6 h-6" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">Build</h3>
            <p className="text-muted-foreground font-sans mb-6">
              You get the full system designed. Your team implements it.
            </p>

            <ul className="space-y-3">
              {buildFeatures.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Build + Implement card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-white p-8 md:p-10 rounded-2xl border border-border shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-background rounded-lg border border-black/5 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Rocket className="w-6 h-6" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">Build + Implement</h3>
            <p className="text-muted-foreground font-sans mb-6">
              Same as Build — but the system gets wired directly into your tools. You end up with a live, running system.
            </p>

            <ul className="space-y-3">
              {buildImplementFeatures.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground font-sans mt-8"
        >
          Pricing depends on your product, trial complexity, and tooling. We scope it after the Audit.
        </motion.p>
      </div>
    </section>
  );
}
