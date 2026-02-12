import { motion } from "framer-motion";
import { Target, Search, Network, Heart, Zap, BarChart3, RefreshCw } from "lucide-react";

const steps = [
  {
    title: "Segment",
    subtitle: "Your users signed up for different reasons. Group them that way.",
    description: "Users who hired your tool for different jobs aren't going to respond to the same email. Segment by what they hired your tool to do, not just by plan tier or signup date.",
    icon: Target,
  },
  {
    title: "Interpret",
    subtitle: "Figure out which behaviors predict upgrades - and where users stall.",
    description: "Some actions correlate with conversion. Others are noise. This stage is about connecting in-product behavior to outcomes so you know who's likely to upgrade, who's stuck, and what's worth nudging.",
    icon: Search,
  },
  {
    title: "Generate",
    subtitle: "Map out states, triggers, and suppression rules before you write a single email.",
    description: "Define the user's current state, what moves them to the next one, and what should stop a message from being sent. Get the logic right first; the copy comes after.",
    icon: Network,
  },
  {
    title: "Nurture",
    subtitle: "Write like someone who actually wants them to succeed.",
    description: "Every message has a reason to exist and a clear next step, written like it came from someone who uses the product, not someone trying to hit a send quota.",
    icon: Heart,
  },
  {
    title: "Automate",
    subtitle: "Set the rules so the system runs itself across every channel.",
    description: "With the right triggers, suppressions, cooldowns, and exit logic, your messages land where and when they need to. You shouldn't be manually checking whether sequences are firing. They just work.",
    icon: Zap,
  },
  {
    title: "Learn",
    subtitle: "Measure which cohorts convert and which nudges actually pull users back.",
    description: "Track which segments upgrade, which messages do the work, and where there's room to test. This is where the system stops being static and starts compounding.",
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
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-background rounded-xl border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-white rounded-lg border border-black/5 flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <step.icon className="w-6 h-6" />
                </div>
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
