"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  scrolled: boolean;
}

const navLinks = [
  { label: "Offerings", href: "#offerings" },
  { label: "Partners", href: "#partners" },
  { label: "Banking", href: "#banking" },
  { label: "Credit", href: "#credit-scoring" },
  { label: "SME Pipeline", href: "#sme-pipeline" },
  { label: "Incubator", href: "#incubator" },
];

export function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add smooth scrolling behavior globally
  if (typeof document !== 'undefined' && !document.documentElement.style.scrollBehavior) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,107,53,0.3)]' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-black border border-[#FF6B35]/30 flex-shrink-0">
            <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-9 w-9 object-cover" />
          </div>
          <span className="font-display font-black text-xl text-white tracking-tight">Nthoppa</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-white/60 hover:text-[#FF6B35] font-body font-medium text-sm transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="/login" className="bg-[#FF6B35] text-white font-body font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#e55a2b] transition-all shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:shadow-[0_0_30px_rgba(255,107,53,0.6)]">
            Get Started →
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-white/10 py-4 px-6">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a 
                key={link.label} 
                href={link.href}
                className="text-white/60 hover:text-[#FF6B35] font-body text-sm transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="/login" className="bg-[#FF6B35] text-white font-body font-bold text-sm px-5 py-2.5 rounded-xl text-center">Get Started →</a>
          </div>
        </div>
      )}
    </nav>
  );
}