import logo from "@assets/Signal_logo_(1)_1767386612521.png";
import { motion } from "framer-motion";

export function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-balance text-primary">Your trial-to-paid flow finally does what it was supposed to do.</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">Users reach value. Upgrades happen. Your team stops guessing why some convert and most don't.</p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-sm font-semibold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                I want to fix my trial leak
              </button>
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-sm text-muted-foreground/60 font-sans italic"
        >
          That's what it should look like, but in reality...
        </motion.p>
      </div>
    </section>
  );
}
