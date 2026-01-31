import { motion } from "framer-motion";
import { Check, ArrowRight, ClipboardCheck, Users, MapPin, AlertTriangle } from "lucide-react";

const deliverables = [
  "A documented JTBD + Aha map",
  "Stall points identified and prioritized",
  "A clear picture of what to build next",
];

const sessionCovers = [
  { icon: Users, text: "The core jobs your users hire your product for" },
  { icon: MapPin, text: "The Aha moment for each job (in plain language and measurable events)" },
  { icon: ArrowRight, text: "The value path from signup to paid" },
  { icon: AlertTriangle, text: "Where users stall and why" },
];

export function Offer() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="audit" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <ClipboardCheck className="w-96 h-96 text-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-white/70 font-sans text-lg mb-4">Now you're thinking <span className="text-white italic">that's exactly what I need…</span></p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Not so fast. First, we need to do an Audit.
          </h2>
          <p className="text-lg text-white/80 leading-relaxed font-sans mb-4">
            Yeah, I know it's a weird way to sell a service. But here's the thing.
          </p>
          <p className="text-lg text-white/80 leading-relaxed font-sans mb-4">
            Without understanding your product, your users, and what "value" actually looks like for them, any system is just a guess. And a guess with triggers attached is still a guess.
          </p>
          <p className="text-lg text-white/80 leading-relaxed font-sans">
            The Audit means you get someone who shows up to the build knowing exactly what's broken. And you're not paying for something based on assumptions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side — description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">One session. Full clarity.</h3>
            <p className="text-white/70 font-sans mb-8">A 60–90 minute working session with your team — Product, Sales, and CS in the room.</p>

            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 font-sans mb-4">Together, we define:</h4>
            <div className="space-y-4 mb-8">
              {sessionCovers.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-white/80 font-sans">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-white/60 font-sans text-sm">
              You can take the deliverables and implement yourself. Or continue to the Build phase where SIGNAL + Reverb kick in.
            </p>
            <p className="text-white/60 font-sans text-sm mt-2">
              Timeline: Workshop + deliverable in 1–2 weeks
            </p>
            <p className="text-white/60 font-sans text-sm mt-2">
              One-time investment: $5,000
            </p>
          </motion.div>

          {/* Right side — white card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background text-foreground p-8 md:p-10 rounded-2xl shadow-2xl"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold">What You Walk Away With</h3>
            </div>

            <ul className="space-y-4 mb-8">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-sans font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground font-sans mb-6">
              You'll know exactly what's broken, why it's breaking, and what to fix first.
            </p>

            <button
              onClick={scrollToContact}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              Show me what's broken
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
