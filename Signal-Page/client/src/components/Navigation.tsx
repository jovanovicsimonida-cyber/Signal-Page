import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import logo from "@assets/Signal_logo_(1)_1767386181696.png";

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (location !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src={logo}
                alt="Signal Strategy Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('framework')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors font-sans"
            >
              Framework
            </button>
            <button
              onClick={() => scrollToSection('audit')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors font-sans"
            >
              Start Here
            </button>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors font-sans"
            >
              About
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-black/5 px-4 pb-6 pt-2 space-y-4">
          <button
            onClick={() => scrollToSection('framework')}
            className="block w-full text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors font-sans py-2"
          >
            Framework
          </button>
          <button
            onClick={() => scrollToSection('audit')}
            className="block w-full text-left text-sm font-medium text-foreground/80 hover:text-foreground transition-colors font-sans py-2"
          >
            Start Here
          </button>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors font-sans py-2"
          >
            About
          </Link>
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full bg-primary text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold"
          >
            Get in Touch
          </button>
        </div>
      )}
    </nav>
  );
}
