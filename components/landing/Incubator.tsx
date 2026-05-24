"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export function Incubator() {
  return (
    <section id="incubator" className="bg-white py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}}>
            <div className="bg-[#0a0a0a] rounded-3xl p-8 shadow-2xl">
              <div className="font-body text-white/40 text-xs uppercase tracking-widest mb-6">Accelerate Incubator — Programme Stats</div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: '2,840', label: 'Assessed', color: 'text-[#FF6B35]' },
                  { value: '412', label: 'Referred', color: 'text-orange-400' },
                  { value: '189', label: 'Evaluated', color: 'text-amber-400' },
                  { value: '134', label: 'Businesses Launched', color: 'text-green-400' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-4">
                    <div className={`font-display text-3xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="font-body text-white/50 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="font-body text-white/60 text-xs uppercase tracking-wider mb-3">Entry Requirements</div>
                {[
                  'Grit score 70 or higher',
                  '90-day savings streak',
                  'Weekly activity maintained',
                  '50% module completion',
                ].map((req, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                    </div>
                    <span className="font-body text-white/60 text-xs">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{opacity: 0, x: 30}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{duration: 0.6}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <span className="font-body text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Accelerate Incubator</span>
            </div>
            <h2 className="font-display text-5xl font-black text-[#0a0a0a] leading-tight mb-6">
              Nurturing the Next Generation of <span className="text-[#FF6B35]">Entrepreneurs</span>
            </h2>
            <p className="font-body text-gray-500 text-lg leading-relaxed mb-8">
              Nthoppa acts as a preparatory layer for the Accelerate Incubator, equipping early-stage entrepreneurs with baseline financial capability and business discipline — improving the quality and readiness of participants entering the programme.
            </p>
            {[
              { icon: '📚', title: 'Financial Baseline', desc: 'Entrepreneurs complete structured financial literacy modules before programme entry' },
              { icon: '🎯', title: 'Readiness Scoring', desc: 'Behaviour-based scoring identifies the most prepared candidates automatically' },
              { icon: '📊', title: 'Business Discipline', desc: 'Savings streaks, quiz completion and engagement data track discipline over time' },
              { icon: '🚀', title: 'Programme Quality', desc: 'Higher-quality, more prepared entrants improve overall incubator success rates' },
            ].map((item, i) => (
              <motion.div key={i} initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: i * 0.1}}
                className="flex items-start gap-4 mb-5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div>
                  <div className="font-body font-bold text-[#0a0a0a] text-sm mb-1">{item.title}</div>
                  <div className="font-body text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}