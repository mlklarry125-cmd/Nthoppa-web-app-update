"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-9 w-9 object-cover" />
              <span className="font-display font-black text-white text-lg">Nthoppa</span>
            </div>
            <p className="font-body text-white/40 text-sm">
              Empowering the unbanked with financial education, marketplace access, and rewards that transform lives.
            </p>
          </div>
          
          <div>
            <div className="font-body font-semibold text-white/60 text-xs uppercase tracking-widest mb-4">Quick Links</div>
            <a href="/#offerings" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
              Offerings
            </a>
            <a href="/#partners" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
              Partners
            </a>
            <a href="/#banking" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
              Banking
            </a>
            <a href="/#credit" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
              Credit
            </a>
            <a href="/#sme-pipeline" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
              SME Pipeline
            </a>
            <a href="/#incubator" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
              Incubator
            </a>
          </div>
          
          <div>
            <div className="font-body font-semibold text-white/60 text-xs uppercase tracking-widest mb-4">Legal</div>
            <Link
              href="/terms"
              className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/disclaimer"
              className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors"
            >
              Disclaimer
            </Link>
          </div>
          
          <div>
            <div className="font-body font-semibold text-white/60 text-xs uppercase tracking-widest mb-4">Contact</div>
            <div className="font-body text-white/40 text-sm mb-2">info@nthoppa.com</div>
            <div className="font-body text-white/40 text-sm mb-2">+267 7123 4567</div>
            <div className="font-body text-white/40 text-sm">Gaborone, Botswana</div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center">
          <div className="font-body text-white/20 text-xs">© 2026 Nthoppa. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}