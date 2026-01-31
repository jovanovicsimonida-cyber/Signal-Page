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
          <p className="text-lg text-muted-foreground font-sans italic">
            That's what it should look like, but in reality...
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            The signups are there. The upgrades aren't.
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground font-sans leading-relaxed">
            <p>
              You've built something good.{" "}
              People sign up.{" "}
              They poke around.{" "}
              Some of them even start getting value.
            </p>

            <p>
              And then... nothing.{" "}
              Trial expires.{" "}
              No upgrade.{" "}
              <span className="text-foreground font-medium">Gone.</span>
            </p>

            <p>
              You're left staring at the dashboard wondering what went wrong.
            </p>

            <p>
              Here's what's probably happening — <span className="text-foreground font-medium">you're treating everyone the same.</span>
            </p>

            <p>
              The user who connected their Stripe and imported real data gets the same Day 3 email as the one who logged in once and never came back.
            </p>

            <p>
              One of them is ready to buy.{" "}
              The other forgot you exist.{" "}
              And you're talking to both of them the same way.
            </p>

            <p className="text-2xl font-bold text-primary font-serif">
              That's the leak.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
