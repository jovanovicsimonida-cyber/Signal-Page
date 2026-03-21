import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Target, Search, Network, Heart, Zap, BarChart3 } from "lucide-react";

const steps = [
  { label: "Segment", icon: Target },
  { label: "Interpret", icon: Search },
  { label: "Generate", icon: Network },
  { label: "Nurture", icon: Heart },
  { label: "Automate", icon: Zap },
  { label: "Learn", icon: BarChart3 },
] as const;

export function Hero() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold tracking-wider uppercase text-primary/80 font-sans">
                Lifecycle Email Strategy
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-wide text-balance text-primary">Your trial-to-paid flow finally converts.</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">Users hit their AHA moments. Upgrades follow. The guesswork stops.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-black/10 border border-black/5 bg-secondary p-8 md:p-10">
              <div className="flex flex-col gap-1">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === activeStep;
                  const isPast = index < activeStep;

                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      {index > 0 && (
                        <div className="flex items-center pl-5 py-0.5">
                          <motion.div
                            className="w-px h-4"
                            animate={{ backgroundColor: isPast || isActive ? 'hsl(var(--accent))' : 'hsl(var(--border))' }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      )}
                      <motion.div
                        animate={{
                          backgroundColor: isActive
                            ? 'hsl(var(--primary))'
                            : 'hsl(var(--background))',
                          borderColor: isActive
                            ? 'hsl(var(--primary))'
                            : isPast
                              ? 'hsl(var(--accent))'
                              : 'hsl(var(--border))',
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                      >
                        <motion.div
                          animate={{
                            backgroundColor: isActive ? 'hsl(0 0% 100% / 0.1)' : isPast ? 'hsl(var(--accent) / 0.15)' : 'hsl(var(--primary) / 0.05)',
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                        >
                          <motion.div
                            animate={{ color: isActive ? 'hsl(var(--primary-foreground))' : isPast ? 'hsl(var(--accent))' : 'hsl(var(--primary))' }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="w-4 h-4" />
                          </motion.div>
                        </motion.div>
                        <motion.span
                          animate={{ color: isActive ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))' }}
                          transition={{ duration: 0.3 }}
                          className="text-sm font-semibold font-sans tracking-wide uppercase"
                        >
                          {step.label}
                        </motion.span>
                        {index < steps.length - 1 && (
                          <motion.svg
                            animate={{ color: isActive ? 'hsl(var(--primary-foreground) / 0.4)' : isPast ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))' }}
                            transition={{ duration: 0.3 }}
                            className="w-3 h-3 ml-auto"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M6 2 L6 10 M3 7 L6 10 L9 7" />
                          </motion.svg>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="absolute -inset-4 bg-black/5 z-[-1] rounded-xl transform rotate-2"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
