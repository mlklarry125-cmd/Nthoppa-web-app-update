"use client";

import { motion } from "framer-motion";

export function Hero() {
  const handleSmoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF6B35]/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-900/20 rounded-full blur-[80px] animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px'}} />
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
            <a href="/login" className="inline-flex items-center gap-3 bg-[#FF6B35] text-white font-body font-bold px-7 py-4 rounded-2xl hover:bg-[#c44216] transition-all shadow-[0_8px_32px_rgba(233,82,28,0.4)] hover:shadow-[0_12px_40px_rgba(233,82,28,0.6)] hover:-translate-y-0.5 transform text-sm">
              Get Started →
            </a>
            <a href="#partners" onClick={(e) => { e.preventDefault(); handleSmoothScroll('#partners'); }}
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-body font-semibold px-7 py-4 rounded-2xl hover:border-[#FF6B35]/50 hover:text-white transition-all text-sm backdrop-blur-sm"
            >
              Our Partners
            </a>
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
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-black rounded-full z-20" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="relative w-[175px] mb-16 z-10"
          >
            <div className="rounded-[2.8rem] overflow-hidden border-[3px] border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
              <img src="/app-screen-coins.jpg" alt="Nthoppa Rewards" className="w-full h-auto block" />
            </div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-black rounded-full z-20" />
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-8 top-20 bg-[#F5A623] text-black font-display font-black text-xs px-3 py-2 rounded-2xl shadow-xl whitespace-nowrap"
            >
              🪙 +25 Coins Earned!
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-10 bottom-32 bg-white text-black font-body font-semibold text-xs px-3 py-2 rounded-2xl shadow-xl whitespace-nowrap"
            >
              🛡️ Insured & Protected
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}