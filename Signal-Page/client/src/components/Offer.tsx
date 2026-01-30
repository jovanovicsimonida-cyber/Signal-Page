import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "One core Trial-to-Paid sequence strategy",
  "3–5 Reverb micro-cycles for engagement",
  "Trigger map + timing rules definition",
  "Comprehensive measurement plan",
  "Copy templates and implementation guides",
];

export function Offer() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="offer" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.2C93.5,8.8,82.2,21.9,71.4,33.1C60.6,44.3,50.3,53.6,39.1,61.9C27.9,70.2,15.8,77.5,2.9,72.5C-10,67.5,-23.7,50.2,-36.4,36.5C-49.1,22.8,-60.8,12.7,-64.8,-0.1C-68.8,-12.9,-65.1,-28.4,-55.8,-40.8C-46.5,-53.2,-31.6,-62.5,-17.1,-65.4C-2.6,-68.3,11.5,-64.8,30.5,-83.6" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Trial-to-Paid Flow Build + Reverb
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed font-sans font-light">Turn more trials into paying customers with a behavior-based email system I design and write for you.

            Designed for SaaS and product-led companies that are done guessing. 
            You get a full trial-to-paid engine: strategy, flows, and copy that respond to what your users actually do.</p>
            
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Perfect For</h3>
              <ul className="space-y-4">
                {[
                  "Lift trial-to-paid conversion without adding aggressive sales pressure",
                  "Replace generic “Day 1 / Day 3 / Day 7” drips with behavior-driven nudges",
                  "Build a system once and keep improving it, instead of rewriting launches every quarter"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background text-foreground p-8 md:p-10 rounded-2xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">What's Included</h3>
            <ul className="space-y-4 mb-8">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-sans font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={scrollToContact}
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-sm text-muted-foreground mt-4 font-sans">
              Limited spots available for Q2
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
