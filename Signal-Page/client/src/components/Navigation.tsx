import { Link } from "wouter";
import logo from "@assets/Signal_logo_(1)_1767386181696.png";

export function Navigation() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
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
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors font-sans"
            >
              The Framework
            </button>
            <button 
              onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors font-sans"
            >
              Services
            </button>
            <button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-0.5"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile menu button could go here */}
          <div className="md:hidden">
             <button
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-sm text-xs font-semibold"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
