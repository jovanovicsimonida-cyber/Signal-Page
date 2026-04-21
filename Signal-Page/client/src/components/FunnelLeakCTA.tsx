import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePostHog } from "@posthog/react";

export function FunnelLeakCTA() {
  const posthog = usePostHog();

  return (
    <section className="py-10 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-accent border border-accent px-8 py-6"
        >
          <div className="flex items-center gap-5">
            <div className="hidden sm:block w-1 self-stretch rounded-full bg-accent-foreground flex-shrink-0" />
            <p className="text-lg font-medium text-accent-foreground font-sans text-center sm:text-left">
              Think your trial funnel is leaking?
            </p>
          </div>
          <a
            href="/leak-finder/"
            onClick={() => posthog.capture("leak_finder_cta_clicked")}
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-accent-foreground border border-accent-foreground rounded-lg px-4 py-2 hover:bg-white/30 transition-colors font-sans"
          >
            Find out in 10 minutes
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
