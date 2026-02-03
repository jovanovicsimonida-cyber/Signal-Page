import logo from "@assets/Signal_logo_(1)_1767386612521.png";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#EBEAE8]">
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
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">Users hit their Aha moment. Upgrades follow. The guesswork stops.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-black/10 border border-black/5 bg-white p-12 flex items-center justify-center">
              <img
                src={logo}
                alt="Signal Lifecycle Email Logo"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>
            <div className="absolute -inset-4 bg-black/5 z-[-1] rounded-xl transform rotate-2"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
