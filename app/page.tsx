"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Landmark,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Partners } from "@/components/landing/Partners";
import { CreditScoring } from "@/components/landing/CreditScoring";
import { Offerings } from "@/components/landing/Offerings";

const marketplaceProducts = [
  {
    icon: ShieldCheck,
    title: "Insurance",
    description: "Motor, home, life, and funeral coverage from trusted providers.",
  },
  {
    icon: TrendingUp,
    title: "Investments",
    description: "Accessible investment opportunities designed for long-term growth.",
  },
  {
    icon: Smartphone,
    title: "Airtime & Data",
    description: "Instant purchases for major Botswana mobile networks.",
  },
  {
    icon: Landmark,
    title: "Banking Products",
    description: "Entry-level accounts and savings products from partner banks.",
  },
];

const smmeStages = [
  {
    icon: Store,
    title: "Informal Traders",
    description: "Identify and onboard micro-entrepreneurs at the base of the economy.",
  },
  {
    icon: GraduationCap,
    title: "Skills Qualification",
    description: "Track financial discipline and readiness for formal products.",
  },
  {
    icon: Landmark,
    title: "Business Banking Ready",
    description: "Bridge qualified traders into SME accounts and working-capital solutions.",
  },
];

const pipelineProgress = [
  { stage: "Informal Traders Identified", value: 12480, percentage: 100 },
  { stage: "Skills & Readiness Qualified", value: 5240, percentage: 42 },
  { stage: "Business Banking Ready", value: 863, percentage: 7 },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] pt-20">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#FF6B35]/18 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#FF6B35]/10 blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FF6B35]/25 bg-[#FF6B35]/8 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" aria-hidden="true" />
                <span className="font-body text-sm font-semibold text-[#FF6B35]">
                  Botswana&apos;s fintech ecosystem
                </span>
              </div>

              <h1 className="mb-6 font-display text-6xl font-black leading-[0.92] tracking-tighter text-white lg:text-8xl">
                Financial
                <br />
                <span className="text-[#FF6B35]">Freedom</span>
                <br />
                for Everyone
              </h1>

              <p className="mb-10 max-w-md font-body text-lg leading-relaxed text-white/60">
                Financial education, inclusive products, and practical tools designed to help people and businesses move forward.
              </p>

              <div className="mb-12 flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(255,107,53,0.28)] transition hover:bg-[#e55a2b]"
                >
                  Get started
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {[
                  { value: "24,891", label: "Total Users" },
                  { value: "8,342", label: "Active Agents" },
                  { value: "712", label: "Average Credit Score" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-2xl font-black text-white">{stat.value}</div>
                    <div className="mt-0.5 text-xs text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex h-[560px] items-end justify-center gap-5">
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="h-72 w-72 rounded-full bg-[#FF6B35]/20 blur-[80px]" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 mt-16 w-[175px]"
              >
                <div className="overflow-hidden rounded-[2.8rem] border-[3px] border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
                  <img src="/app-screen-home.jpg" alt="Nthoppa mobile dashboard" className="block h-auto w-full" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="relative z-10 mb-16 w-[175px]"
              >
                <div className="overflow-hidden rounded-[2.8rem] border-[3px] border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
                  <img src="/app-screen-coins.jpg" alt="Nthoppa rewards screen" className="block h-auto w-full" />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />
        </section>

        <Offerings />

        <div id="partners">
          <Partners />
        </div>

        <section id="banking" className="relative overflow-hidden bg-[#0a0a0a] py-28">
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <ShoppingBag className="h-4 w-4 text-[#FF6B35]" strokeWidth={1.8} aria-hidden="true" />
                <span className="text-sm font-semibold text-[#FF6B35]">Fintech Marketplace</span>
              </div>
              <h2 className="mb-6 font-display text-5xl font-black leading-tight text-white lg:text-6xl">
                Access Financial
                <br />
                Products <span className="text-[#FF6B35]">You Need</span>
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/50">
                A focused marketplace connecting users to essential financial services without visual clutter.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {marketplaceProducts.map((product, index) => {
                const Icon = product.icon;
                return (
                  <motion.article
                    key={product.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#FF6B35]/35 hover:bg-white/[0.055]"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition group-hover:border-[#FF6B35]/25 group-hover:text-[#FF6B35]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">{product.title}</h3>
                    <p className="text-sm leading-relaxed text-white/50">{product.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="credit" className="relative">
          <CreditScoring />
        </section>

        <section id="sme-pipeline" className="relative overflow-hidden bg-[#0a0a0a] py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <TrendingUp className="h-4 w-4 text-[#FF6B35]" strokeWidth={1.8} aria-hidden="true" />
                <span className="text-sm font-semibold text-[#FF6B35]">SME Pipeline Development</span>
              </div>
              <h2 className="mb-6 font-display text-5xl font-black leading-tight text-white lg:text-6xl">
                From Informal Trader
                <br />
                to <span className="text-[#FF6B35]">Business Banking</span>
              </h2>
            </div>

            <div className="grid items-start gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {smmeStages.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-5">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF6B35]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-base font-bold text-white">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-white/45">{item.description}</p>
                      </div>
                    </article>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-8"
              >
                <div className="mb-6 text-xs uppercase tracking-[0.18em] text-white/40">SMME Pipeline Progress</div>
                {pipelineProgress.map((item, index) => (
                  <div key={item.stage} className="mb-6 last:mb-0">
                    <div className="mb-2 flex justify-between gap-4">
                      <span className="text-sm text-white/70">{item.stage}</span>
                      <span className="text-sm font-bold text-white">{item.value.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: index * 0.12 }}
                        className="h-full rounded-full bg-[#FF6B35]"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="incubator" className="bg-white py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-10 w-auto" />
                  <span className="text-2xl font-bold text-[#FF6B35]">Accelerate</span>
                </div>

                <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
                  Incubator Program for Entrepreneurs
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  A focused 12-week program providing funding, mentorship, and practical resources to Botswana&apos;s promising small businesses.
                </p>

                <div className="mb-8 space-y-4">
                  {[
                    "Up to P50,000 in seed funding",
                    "One-on-one mentorship with industry experts",
                    "Access to partners and investors",
                    "Premium access to Nthoppa business tools",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#FF6B35]" strokeWidth={1.8} aria-hidden="true" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B35] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#e55a2b]"
                >
                  Apply now
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-800 bg-[#0a0a0a] p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]"
              >
                <div className="mb-6 flex flex-wrap items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF6B35]">
                    <Users className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Graduates</p>
                    <p className="text-3xl font-bold">127+</p>
                  </div>
                  <div className="h-12 w-px bg-white/10" />
                  <div>
                    <p className="text-sm text-white/40">Businesses Funded</p>
                    <p className="text-3xl font-bold">89</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="mb-4 leading-relaxed text-white/70">
                    “The Nthoppa Accelerate program helped move my catering business from a home operation into a commercial space.”
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B35] text-sm font-bold">KM</div>
                    <div>
                      <p className="font-semibold">Kefilwe M.</p>
                      <p className="text-xs text-white/40">K&apos;s Kitchen, Gaborone</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#FF6B35] py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/85">
              Access practical tools for banking, insurance, education, savings, and business growth.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-[#FF6B35] transition hover:bg-gray-100"
            >
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#050505] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 grid grid-cols-2 gap-12 lg:grid-cols-4">
            <div className="col-span-2 lg:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-9 w-9 object-cover" />
                <span className="font-display text-lg font-black text-white">Nthoppa</span>
              </div>
              <p className="text-sm leading-relaxed text-white/40">
                Financial education, marketplace access, and digital tools built for inclusive growth.
              </p>
            </div>

            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">Quick Links</div>
              {[
                ["Offerings", "/#offerings"],
                ["Partners", "/#partners"],
                ["Banking", "/#banking"],
                ["Credit", "/#credit"],
                ["SME Pipeline", "/#sme-pipeline"],
                ["Incubator", "/#incubator"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="mb-3 block text-sm text-white/40 transition-colors hover:text-[#FF6B35]">
                  {label}
                </a>
              ))}
            </div>

            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">Legal</div>
              {[
                ["Terms & Conditions", "/terms"],
                ["Privacy Policy", "/privacy-policy"],
                ["Cookie Policy", "/cookie-policy"],
                ["Disclaimer", "/disclaimer"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="mb-3 block text-sm text-white/40 transition-colors hover:text-[#FF6B35]">
                  {label}
                </a>
              ))}
            </div>

            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/60">Contact</div>
              <div className="mb-2 text-sm text-white/40">info@nthoppa.com</div>
              <div className="mb-2 text-sm text-white/40">+267 75 736 600</div>
              <div className="text-sm text-white/40">Gaborone, Botswana</div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-xs text-white/20">
            © 2026 Nthoppa. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
