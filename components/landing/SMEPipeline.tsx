"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export function SMEPipeline() {
  return (
    <section id="sme-pipeline" className="bg-[#0a0a0a] py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/8 rounded-full blur-[140px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <span className="font-body text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">SME Pipeline Development</span>
        </div>
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{opacity: 0, x: -30}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{duration: 0.6}}>
            <h2 className="font-display text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              From Informal Trader<br />to <span className="text-[#FF6B35]">Business Banking</span>
            </h2>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-8">
              Nthoppa provides visibility into informal traders and micro-entrepreneurs who may, over time, transition into formal Business Banking, creating a longer-term pipeline into SME accounts, working capital solutions, and enterprise development support.
            </p>
            <div className="space-y-4">
              {[
                { icon: '🏪', title: 'Informal Traders', desc: 'Identify and onboard micro-entrepreneurs at the base of the pyramid' },
                { icon: '📈', title: 'Business Banking Ready', desc: 'Track financial discipline scores that signal readiness for formal products' },
                { icon: '🏦', title: 'Working Capital Access', desc: 'Bridge informal traders into SME accounts and working capital solutions' },
                { icon: '🚀', title: 'Enterprise Development', desc: 'Create a long-term pipeline into enterprise and corporate banking' },
              ].map((item, i) => (
                <motion.div key={i} initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: i * 0.1}}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-colors border border-white/5 hover:border-[#FF6B35]/20 group"
                >
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <div className="font-body font-bold text-white text-sm mb-1">{item.title}</div>
                    <div className="font-body text-white/40 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6, delay: 0.2}}>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="font-body text-white/40 text-xs uppercase tracking-widest mb-6">iPachi Integration — SMME Pipeline</div>
              {[
                { stage: 'Informal Traders', value: 12480, pct: 100, color: 'bg-[#FF6B35]' },
                { stage: 'Qualified Skills', value: 5240, pct: 42, color: 'bg-orange-400' },
                { stage: 'Business Banking', value: 863, pct: 7, color: 'bg-amber-400' },
                { stage: 'Enterprise', value: 218, pct: 2, color: 'bg-yellow-300' },
              ].map((item, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-body text-white/70 text-sm">{item.stage}</span>
                    <span className="font-body text-white font-bold text-sm">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{width: 0}} whileInView={{width: `${item.pct}%`}} viewport={{once: true}} transition={{duration: 1.2, delay: i * 0.15}}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  {['Identify', 'Qualify', 'Graduate'].map((step, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm ${i === 0 ? 'bg-[#FF6B35] text-white' : 'bg-white/10 text-white/40'}`}>
                        {i + 1}
                      </div>
                      <span className="font-body text-white/50 text-xs">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}