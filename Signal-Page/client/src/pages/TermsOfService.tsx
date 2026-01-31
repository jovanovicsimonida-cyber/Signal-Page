import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service — Signal Lifecycle Email Strategy</title>
        <meta name="description" content="Terms of Service for Signal Lifecycle Email Strategy. Review the terms governing your use of signallifecycle.com." />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold font-serif mb-8">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground/80 font-sans">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the Signal Strategy website (signallifecycle.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Services</h2>
            <p>Signal Strategy provides lifecycle email marketing strategy consulting services for SaaS and product-led companies. Our website serves as an informational and contact platform for prospective clients.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Use of Website</h2>
            <p>You agree to use this website only for lawful purposes and in a manner that does not:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Submit false or misleading information through any forms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
            <p>All content on this website — including text, graphics, logos, images, and the SIGNAL Framework methodology — is the property of Signal Strategy and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without prior written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Contact Form Submissions</h2>
            <p>When you submit information through our contact form, you agree that:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>The information you provide is accurate and truthful</li>
              <li>We may use your contact information to respond to your inquiry</li>
              <li>Your submission does not create a client-consultant relationship</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Disclaimer of Warranties</h2>
            <p>This website and its content are provided "as is" without warranties of any kind, either express or implied. Signal Strategy does not guarantee that the website will be uninterrupted, error-free, or free of harmful components.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Signal Strategy shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the website or services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. These links are provided for convenience only, and we do not endorse or assume responsibility for the content or practices of any linked sites.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Modifications</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website after changes are posted constitutes acceptance of the modified terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Signal Strategy operates, without regard to conflict of law principles.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us through the contact form on our website or email us at your registered business email address.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
