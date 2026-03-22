import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function FunnelLeakCTA() {
  return (
    <section className="py-10 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-secondary border border-border px-8 py-6"
        >
          <div className="flex items-center gap-5">
            <div className="hidden sm:block w-1 self-stretch rounded-full bg-accent flex-shrink-0" />
            <p className="text-lg font-medium text-foreground font-sans text-center sm:text-left">
              Think your trial funnel is leaking?
            </p>
          </div>
          <Link
            href="/leak-finder"
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-foreground border border-accent rounded-lg px-4 py-2 hover:bg-accent/10 transition-colors font-sans"
          >
            Find out in 10 minutes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
