import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Download, CheckCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// ──────────────────────────────────────────────
// Configure these for your lead magnet
// ──────────────────────────────────────────────
const RESOURCE_TITLE = "The Reverb Stall-Recovery Workflow";
const RESOURCE_DESCRIPTION =
  "A micro-loop template that shows you how to define the stall signal, send a single next-step nudge, offer a friction-reducer, and escalate to a human only if the user stays stuck.";
const DOWNLOAD_URL = "/lead-magnet/reverb-stall-recovery-workflow-signal.pdf";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvbwvgv";
// ──────────────────────────────────────────────

const leadFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

export default function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { firstName: "", email: "" },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.firstName, email: data.email }),
      });
    } catch {
      // Even if the email capture fails, let them download
    }
    setIsSubmitting(false);
    setSubmitted(true);
    // Trigger download immediately
    downloadRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#EBEAE8] text-foreground flex flex-col">
      <Helmet>
        <title>{RESOURCE_TITLE} - Signal</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content={RESOURCE_DESCRIPTION}
        />
      </Helmet>
      <Navigation />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-muted-foreground font-sans mb-4">
              Free Resource
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              {RESOURCE_TITLE}
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed max-w-xl mx-auto">
              {RESOURCE_DESCRIPTION}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-black/5 border border-border"
          >
            {!submitted ? (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <p className="text-sm text-muted-foreground font-sans text-center mb-2">
                  Enter your details below and the download starts immediately.
                </p>

                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider"
                  >
                    First Name
                  </label>
                  <input
                    {...form.register("firstName")}
                    id="firstName"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                    placeholder="Jane"
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-destructive font-medium">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground font-sans uppercase tracking-wider"
                  >
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
                    <p className="text-sm text-destructive font-medium">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Get the Template
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground/70 font-sans text-center mt-4">
                  I may send you an occasional email with useful resources - no spam, ever. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <CheckCircle className="w-14 h-14 text-primary mx-auto" />
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-primary">
                    Your download is starting
                  </h2>
                  <p className="text-muted-foreground font-sans">
                    If it doesn't begin automatically,{" "}
                    <a
                      href={DOWNLOAD_URL}
                      download
                      className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                    >
                      click here to download
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Hidden download trigger */}
          <a
            ref={downloadRef}
            href={DOWNLOAD_URL}
            download
            className="hidden"
            aria-hidden="true"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
