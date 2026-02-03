import { motion } from "framer-motion";

export function Problem() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-6 text-lg text-muted-foreground font-sans leading-relaxed">
            <div className="space-y-1">
              <p>Users sign up.</p>
              <p>Some convert.</p>
              <p>Most don't.</p>
              <p><span className="text-foreground font-medium">You're not sure why.</span></p>
            </div>

            <p>
              You've got emails going out (Day 1, Day 3, Day 7), but you can't point to what's actually working.
            </p>

            <div className="space-y-1">
              <p>Your team keeps rewriting onboarding hoping something sticks.</p>
              <p>It never really does.</p>
            </div>

            <div className="space-y-1">
              <p>Product says activation means one thing.</p>
              <p>Growth says another.</p>
              <p><span className="text-foreground font-medium">No one's measuring the same thing.</span></p>
            </div>

            <p>
              You've got data, but it's not telling you where users drop off — or how to catch them when they do.
            </p>

            <p>
              Users stall before they see value, and you don't have a system that catches them.
            </p>

            <p className="text-2xl font-bold text-primary font-serif">
              The leak stays open.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
