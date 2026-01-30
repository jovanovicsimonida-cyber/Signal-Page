import { motion } from "framer-motion";
import { Target, Search, Network, Heart, Zap, BarChart3, RefreshCw } from "lucide-react";

const steps = [
  {
    letter: "S",
    title: "Segment",
    subtitle: "Turn a messy user base into clear, actionable cohorts",
    description: "I break them into real journeys you can act on: trial, onboarding, activated, dormant, churned. Identify where your users are in their journey.",
    icon: Target,
  },
  {
    letter: "I",
    title: "Interpret",
    subtitle: "See what your users’ behavior is actually telling you",
    description: "Instead of guessing why people drop off, we dig into product usage, engagement, and CRM data to spot friction points where good users stall.",
    icon: Search,
  },
  {
    letter: "G",
    title: "Generate",
    subtitle: "Design flows that nudge users to the next meaningful action",
    description: "Before a single email is written, we map the flow logic: triggers, entry/exit, and the exact path from “just signed up” to “paid and getting value.”",
    icon: Network,
  },
  {
    letter: "N",
    title: "Nurture",
    subtitle: "Build relationships, not just send sequences",
    description: "A tone that sounds like you, not a template. A cadence that feels helpful, not pushy. Content that adds value, educates, and builds trust over time.",
    icon: Heart,
  },
  {
    letter: "A",
    title: "Automate",
    subtitle: "Let the right messages fire at the right moment",
    description: "Behind the scenes, we handle rules, triggers, data sync, and deliverability hygiene so you’re not babysitting automations.",
    icon: Zap,
  },
  {
    letter: "L",
    title: "Learn",
    subtitle: "Keep lifting retention instead of guessing in the dark",
    description: "Track activation, retention, and expansion for each cohort. Test new hypotheses and feed what works back into your segmentation and copy.",
    icon: BarChart3,
  },
];

export function Framework() {
  return (
    <section id="framework" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            The SIGNAL Framework
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">Stop guessing what to send next and build a lifecycle that systematically increases activation, retention, and LTV.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.letter}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-background rounded-xl border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-white rounded-lg border border-black/5 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-5xl font-bold text-black/5 group-hover:text-primary/10 transition-colors duration-300 font-display">
                  {step.letter}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-sm font-semibold text-primary/80 mb-3 font-sans">
                {step.subtitle}
              </p>
              <p className="text-muted-foreground leading-relaxed font-sans text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reverb Section */}
        <div className="mt-16 relative">
          <div className="flex justify-center mb-8">
            <div className="w-px h-12 bg-gradient-to-b from-primary/30 to-transparent"></div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-primary/60 font-sans">
              SIGNAL builds the path. REVERB keeps users on it when they drift.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <RefreshCw className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-display">
                    REVERB Micro-Loops
                  </h3>
                  <p className="text-white/70 font-sans font-medium">
                    Recover stalls before the trial dies.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Trigger</span>
                    <p className="text-white font-medium">The stall signal (no key action, skipped step, repeated failure, low engagement).</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Nudge</span>
                    <p className="text-white font-medium">The next step in plain language.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Shortcut</span>
                    <p className="text-white font-medium">Template, example, quick-start, or “do this in 2 minutes” path.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Escalation</span>
                    <p className="text-white font-medium">Reply-to get help, concierge assist, or book a quick call, only when needed.</p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 flex flex-col justify-center">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Result</span>
                    <p className="text-lg font-bold text-white leading-tight">
                      Fewer silent trials, faster time-to-value, more upgrades without discounts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
