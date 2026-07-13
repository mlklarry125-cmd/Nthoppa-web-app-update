"use client";

import { useState } from "react";
import { Menu, Orbit, Sparkles, X } from "lucide-react";

interface NavbarProps {
  scrolled: boolean;
}

const navLinks = [
  { label: "Money", href: "#offerings", realm: "Money Realm" },
  { label: "Alliances", href: "#partners", realm: "Alliance Realm" },
  { label: "Marketplace", href: "#banking", realm: "Marketplace Realm" },
  { label: "Credit", href: "#credit", realm: "Credit Realm" },
  { label: "Growth", href: "#sme-pipeline", realm: "Growth Realm" },
  { label: "Founders", href: "#incubator", realm: "Founder Realm" },
];

export function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#FF6B35]/20 bg-[#050505]/88 shadow-[0_14px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          : "bg-gradient-to-b from-black/75 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <a href="/" data-realm-name="Nthoppa Home Galaxy" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#FF6B35]/35 bg-black shadow-[0_0_25px_rgba(255,107,53,0.15)] transition duration-300 group-hover:rotate-6 group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(255,107,53,0.38)]">
            <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-10 w-10 object-cover" />
          </div>
          <div>
            <span className="block font-display text-xl font-black tracking-tight text-white">Nthoppa</span>
            <span className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.22em] text-[#FF8750]">
              <Orbit className="h-2.5 w-2.5" aria-hidden="true" />
              Financial Galaxy
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-realm-name={link.realm}
              className="group relative py-2 text-sm font-semibold text-white/55 transition-colors duration-200 hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-[#FF6B35] shadow-[0_0_10px_rgba(255,107,53,0.9)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40 lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B35] shadow-[0_0_10px_rgba(255,107,53,1)]" />
            Galaxy mode
          </div>

          <a
            href="/login"
            data-realm-name="Your Nthoppa World"
            className="hidden items-center gap-2 rounded-xl border border-[#FF6B35]/35 bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(255,107,53,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#f35e29] hover:shadow-[0_0_38px_rgba(255,107,53,0.58)] sm:inline-flex"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Enter Nthoppa
          </a>

          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5 text-white xl:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#060606]/96 px-6 py-5 backdrop-blur-2xl xl:hidden">
          <div className="grid gap-2 sm:grid-cols-2">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                data-realm-name={link.realm}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-white/65 transition hover:border-[#FF6B35]/35 hover:bg-[#FF6B35]/10 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                <span className="text-[9px] font-black tracking-[0.12em] text-[#FF8750]">0{index + 1}</span>
              </a>
            ))}
            <a
              href="/login"
              data-realm-name="Your Nthoppa World"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3 text-center text-sm font-bold text-white sm:col-span-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Enter Nthoppa
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
