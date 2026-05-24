"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Star, 
  CheckCircle,
  Building2,
  Heart,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Partners } from "@/components/landing/Partners";
import { CreditScoring } from "@/components/landing/CreditScoring";
import { Offerings } from "@/components/landing/Offerings";

// NthoppaSure Products Data
const nthoppaSureProducts = [
  {
    id: "funeral",
    name: "Funeral Cover",
    icon: Heart,
    description: "Dignified funeral cover for you and your loved ones with tiered options",
    tiers: [
      { name: "Individual", price: 45, cover: "P15,000" },
      { name: "Family", price: 85, cover: "P30,000" },
      { name: "Extended Family", price: 120, cover: "P50,000" },
    ],
    popular: true,
  },
  {
    id: "personal-all-risk",
    name: "Personal All-Risk Insurance",
    icon: Shield,
    description: "Comprehensive cover for personal belongings, electronics, and valuables",
    tiers: [
      { name: "Basic", price: 65, cover: "P10,000" },
      { name: "Standard", price: 110, cover: "P25,000" },
      { name: "Premium", price: 180, cover: "P50,000" },
    ],
    popular: false,
  },
  {
    id: "group-life",
    name: "Group Life Cover",
    icon: Users,
    description: "Employer-sponsored group life insurance for your workforce",
    tiers: [
      { name: "Per Employee", price: 35, cover: "P25,000" },
      { name: "Executive", price: 95, cover: "P75,000" },
    ],
    popular: false,
  },
];

// Mock Reviews Data
const reviews = [
  {
    id: 1,
    name: "Tshepo Molefe",
    role: "Small Business Owner, Gaborone",
    rating: 5,
    text: "Nthoppa transformed how I save for my business. The Motshelo feature helped me save P15,000 in just 6 months!",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Keitumetse Nkosi",
    role: "Teacher, Francistown",
    rating: 5,
    text: "The financial literacy courses changed my life. I finally understand budgeting and investing.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Modisa Radipabe",
    role: "Informal Trader, Maun",
    rating: 5,
    text: "NthoppaSure funeral cover gave my family peace of mind. The claim process was smooth and fast.",
    date: "3 months ago",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen bg-[#0a0a0a] flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF6B35]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-24">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
                <span className="text-[#FF6B35] font-body text-sm font-semibold">Botswana's #1 Fintech Platform</span>
              </div>
              <h1 className="font-display text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                Financial<br />
                <span className="text-[#FF6B35]">Freedom</span><br />
                for Everyone
              </h1>
              <p className="font-body text-white/60 text-lg leading-relaxed mb-10 max-w-md">
                Empowering the unbanked through financial education, inclusive banking products, and rewards that transform lives.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/login">
                  <button className="inline-flex items-center gap-3 bg-[#FF6B35] text-white font-body font-bold px-7 py-4 rounded-2xl hover:bg-[#e55a2b] transition-all shadow-[0_8px_32px_rgba(255,107,53,0.4)] text-sm">
                    Get Started →
                  </button>
                </Link>
              </div>
              <div className="flex items-center gap-8">
                {[
                  { value: '24,891', label: 'Total Users' },
                  { value: '8,342', label: 'Active Agents' },
                  { value: '712', label: 'Avg Credit Score' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="font-display text-2xl font-black text-white">{stat.value}</div>
                    <div className="font-body text-white/40 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-end justify-center gap-5 h-[560px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 bg-[#FF6B35]/25 rounded-full blur-[80px]" />
              </div>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[175px] mt-16 z-10"
              >
                <div className="rounded-[2.8rem] overflow-hidden border-[3px] border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
                  <img src="/app-screen-home.jpg" alt="Nthoppa App" className="w-full h-auto block" />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="relative w-[175px] mb-16 z-10"
              >
                <div className="rounded-[2.8rem] overflow-hidden border-[3px] border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
                  <img src="/app-screen-coins.jpg" alt="Nthoppa Rewards" className="w-full h-auto block" />
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
        </section>

        {/* Offerings Section */}
        <div id="offerings">
          <Offerings />
        </div>

        {/* Partners Section */}
        <div id="partners">
          <Partners />
        </div>

        {/* Banking Section */}
        <section id="banking" className="bg-[#0a0a0a] py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-4">
                <ShoppingBag className="w-4 h-4 text-[#FF6B35]" />
                <span className="font-body text-[#FF6B35] font-semibold text-sm">Fintech Marketplace</span>
              </div>
              <h2 className="font-display text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Access Financial<br />Products <span className="text-[#FF6B35]">You Need</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🛡️', title: 'Insurance', description: 'Motor, home, life, and funeral coverage from trusted providers' },
                { icon: '📈', title: 'Investments', description: 'Low-cost investment opportunities starting from P500 minimum' },
                { icon: '📱', title: 'Airtime & Data', description: 'Instant purchases for all major Botswana networks' },
                { icon: '🏦', title: 'Banking Products', description: 'Entry-level accounts and savings products from partner banks' },
              ].map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#FF6B35]/40 transition-all"
                >
                  <div className="text-5xl mb-4">{product.icon}</div>
                  <h3 className="font-bold text-white text-xl mb-2">{product.title}</h3>
                  <p className="text-white/50 text-sm">{product.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Credit Scoring Section */}
        <section id="credit" className="relative">
          <CreditScoring />
        </section>

        {/* SME Pipeline Section */}
        <section id="sme-pipeline" className="bg-[#0a0a0a] py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-4">
                <TrendingUp className="w-4 h-4 text-[#FF6B35]" />
                <span className="font-body text-[#FF6B35] font-semibold text-sm">SME Pipeline Development</span>
              </div>
              <h2 className="font-display text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                From Informal Trader<br />to <span className="text-[#FF6B35]">Business Banking</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  { icon: '🏪', title: 'Informal Traders', desc: 'Identify and onboard micro-entrepreneurs at the base of the pyramid' },
                  { icon: '📈', title: 'Skills Qualification', desc: 'Track financial discipline scores that signal readiness for formal products' },
                  { icon: '🏦', title: 'Business Banking Ready', desc: 'Bridge informal traders into SME accounts and working capital solutions' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-white text-base mb-1">{item.title}</div>
                      <div className="text-white/40 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >
                <div className="font-body text-white/40 text-xs uppercase tracking-widest mb-6">SMME Pipeline Progress</div>
                {[
                  { stage: 'Informal Traders Identified', value: 12480, pct: 100 },
                  { stage: 'Skills & Readiness Qualified', value: 5240, pct: 42 },
                  { stage: 'Business Banking Ready', value: 863, pct: 7 },
                ].map((item, i) => (
                  <div key={i} className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-white/70 text-sm">{item.stage}</span>
                      <span className="text-white font-bold text-sm">{item.value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: `${item.pct}%` }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 1, delay: i * 0.15 }}
                        className="h-full bg-[#FF6B35] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Incubator Section */}
        <section id="incubator" className="bg-white py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-10 w-auto" />
                  <span className="text-2xl font-bold text-[#FF6B35]">Accelerate</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Incubator Program for Entrepreneurs
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Nthoppa Accelerate is a 12-week intensive program that provides funding, mentorship, 
                  and resources to Botswana's most promising small businesses.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Up to P50,000 in seed funding",
                    "One-on-one mentorship with industry experts",
                    "Access to our network of partners and investors",
                    "Free premium access to all Nthoppa tools",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#FF6B35]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/login">
                  <button className="bg-[#FF6B35] hover:bg-[#e55a2b] text-white rounded-full px-8 py-3 text-lg font-semibold transition-all">
                    Apply Now →
                  </button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#FF6B35]/20 flex items-center justify-center">
                      <Users className="h-8 w-8 text-[#FF6B35]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Graduates</p>
                      <p className="text-3xl font-bold">127+</p>
                    </div>
                    <div className="w-px h-12 bg-white/20 mx-4"></div>
                    <div>
                      <p className="text-sm text-gray-400">Businesses Funded</p>
                      <p className="text-3xl font-bold">89</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/20 pt-6">
                    <p className="text-gray-300 italic mb-4">
                      "The Nthoppa Accelerate program took my catering business from my kitchen to a 
                      commercial space. Now I employ 5 people and serve 200+ customers monthly!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center">
                        <span className="text-sm font-bold">KM</span>
                      </div>
                      <div>
                        <p className="font-semibold">Kefilwe M.</p>
                        <p className="text-xs text-gray-400">K's Kitchen, Gaborone</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#FF6B35] to-[#FF8F5e] text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join over 50,000 Batswana who trust Nthoppa for their banking, insurance, and investment needs.
            </p>
            <Link href="/login">
              <button className="bg-white text-[#FF6B35] hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold transition-all">
                Get Started Free →
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-9 w-9 object-cover" />
                <span className="font-display font-black text-white text-lg">Nthoppa</span>
              </div>
              <p className="font-body text-white/40 text-sm">Empowering the unbanked with financial education, marketplace access, and rewards that transform lives.</p>
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
              <a href="/terms" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
                Terms & Conditions
              </a>
              <a href="/privacy-policy" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
                Privacy Policy
              </a>
              <a href="/cookie-policy" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
                Cookie Policy
              </a>
              <a href="/disclaimer" className="block font-body text-white/40 hover:text-[#FF6B35] text-sm mb-3 transition-colors">
                Disclaimer
              </a>
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
    </div>
  );
}