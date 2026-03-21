import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-black/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold font-display text-primary/80 tracking-tight">signal.</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground font-sans">
            <a
              href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=simonida-jovanovic-29778244"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-sm font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300"
            >
              Follow on LinkedIn
            </a>
            <Link href="/privacy" className="cursor-pointer hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="cursor-pointer hover:text-foreground transition-colors">Terms of Service</Link>
            <span>&copy; {new Date().getFullYear()} Signal Strategy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
