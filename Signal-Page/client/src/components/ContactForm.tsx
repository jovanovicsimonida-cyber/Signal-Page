import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateContact, type ContactFormData } from "@/hooks/use-contact";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  conversionRate: z.string().min(1, "Please provide a rough estimate"),
  espTool: z.string().min(1, "Please tell us what tool you use"),
});

export function ContactForm() {
  const mutation = useCreateContact();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      conversionRate: "",
      espTool: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#EBEAE8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Interested in the Audit? Tell me a bit about your trial.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-black/5 border border-border"
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">
                Name
              </label>
              <input
                {...form.register("name")}
                id="name"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                placeholder="Jane Doe"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive font-medium">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">
                Email
              </label>
              <input
                {...form.register("email")}
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                placeholder="jane@company.com"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive font-medium">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="conversionRate" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">
                What's your current trial-to-paid conversion rate?
              </label>
              <input
                {...form.register("conversionRate")}
                id="conversionRate"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                placeholder="Rough estimate is fine"
              />
              {form.formState.errors.conversionRate && (
                <p className="text-sm text-destructive font-medium">{form.formState.errors.conversionRate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="espTool" className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider">
                What ESP or automation tool are you using?
              </label>
              <input
                {...form.register("espTool")}
                id="espTool"
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                placeholder="e.g. Customer.io, HubSpot, Klaviyo"
              />
              {form.formState.errors.espTool && (
                <p className="text-sm text-destructive font-medium">{form.formState.errors.espTool.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Let's talk
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
