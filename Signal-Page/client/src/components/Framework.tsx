import { motion } from "framer-motion";
import { Target, Search, Network, Heart, Zap, BarChart3, RefreshCw } from "lucide-react";

const steps = [
  {
    letter: "S",
    title: "Segment",
    subtitle: "Your users aren't one group. Stop emailing them like they are.",
    description: "Someone who finished onboarding and someone who never logged in again need completely different messages. Segmentation means knowing who's where, and building cohorts you can actually do something with.",
    icon: Target,
  },
  {
    letter: "I",
    title: "Interpret",
    subtitle: "What are users telling you with their behavior?",
    description: "Which actions lead to upgrades? Where do good users get stuck? Why do some people fly through onboarding while others stall on step two? This stage turns raw event data into something you can use.",
    icon: Search,
  },
  {
    letter: "G",
    title: "Generate",
    subtitle: "Design the flow before you write the words.",
    description: "What triggers the first email? What stops it from sending if they already upgraded? What happens if they stall on day four? Most teams skip this step, then wonder why their sequences feel duct-taped together.",
    icon: Network,
  },
  {
    letter: "N",
    title: "Nurture",
    subtitle: "Write like a human who wants them to succeed.",
    description: "Your emails finally sound like they came from a person who actually uses the product, and wants the reader to get something out of it too.",
    icon: Heart,
  },
  {
    letter: "A",
    title: "Automate",
    subtitle: "Set the rules so the system runs itself.",
    description: "Triggers, suppressions, cooldowns, \"stop if paid\" logic — handled. You shouldn't have to check whether emails are firing correctly. They just do.",
    icon: Zap,
  },
  {
    letter: "L",
    title: "Learn",
    subtitle: "Measure what matters and keep improving.",
    description: "Which cohorts convert best? Which Reverb nudges actually bring users back? What's worth testing next? This is where the system stops being static and starts compounding.",
    icon: BarChart3,
  },
];

export function Framework() {
  return (
    <section id="framework" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Six stages from signup to paid
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">SIGNAL is the method behind the system.</p>
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
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">The save that fires before the trial dies</h3>
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
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-display">
                    REVERB Micro-Loops
                  </h3>
                  <p className="text-white/70 font-sans font-medium">
                    A set of micro-loops that fire when a user stalls, before the trial dies.
                  </p>
                </div>
              </div>

              <p className="text-white/60 font-sans text-sm mb-8">How it works:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Trigger</span>
                    <p className="text-white font-medium">A stall signal fires: no key action taken, skipped step, repeated failure, drop in engagement.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Nudge</span>
                    <p className="text-white font-medium">The user gets the next step in plain language. No fluff.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Shortcut</span>
                    <p className="text-white font-medium">A template, example, quick-start guide, or "do this in 2 minutes" path reduces friction.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Escalation</span>
                    <p className="text-white font-medium">If they're still stuck: reply-to support, concierge assist, or a quick call. Only when needed.</p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 flex flex-col justify-center">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 font-sans">Result</span>
                    <p className="text-lg font-bold text-white leading-tight">
                      Fewer silent trials. Faster time-to-value. More upgrades without discounts.
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
