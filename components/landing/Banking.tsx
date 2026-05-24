"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";

export function Banking() {
  return (
    <section id="banking" className="bg-[#0a0a0a] py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{opacity: 0, scale: 0.95}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} transition={{duration: 0.6}}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🛡️', label: 'Insurance', color: 'bg-blue-500/10 border-blue-500/20', textColor: 'text-blue-400' },
                { icon: '📈', label: 'Investments', color: 'bg-green-500/10 border-green-500/20', textColor: 'text-green-400' },
                { icon: '📺', label: 'Airtime & Data', color: 'bg-purple-500/10 border-purple-500/20', textColor: 'text-purple-400' },
                { icon: '🛒', label: 'More Products', color: 'bg-[#FF6B35]/10 border-[#FF6B35]/20', textColor: 'text-[#FF6B35]' },
              ].map((item, i) => (
                <motion.div key={i} initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: i * 0.1}}
                  className={`${item.color} border rounded-2xl p-6 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer`}
                >
                  <span className="text-4xl">{item.icon}</span>
                  <span className={`font-body font-semibold ${item.textColor} text-sm`}>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{opacity: 0, x: 30}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{duration: 0.6}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <span className="font-body text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Marketplace</span>
            </div>
            <h2 className="font-display text-5xl font-black text-white leading-tight mb-6">
              Access Financial<br />Products <span className="text-[#FF6B35]">You Need</span>
            </h2>
            <p className="font-body text-white/50 text-lg leading-relaxed mb-8">
              From insurance to investments, get access to a curated marketplace of financial products designed for the everyday Motswana.
            </p>
            {['Affordable insurance products', 'Investment opportunities for everyone', 'Buy airtime and data bundles', 'Exclusive deals and discounts'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 rounded-full bg-[#FF6B35] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="font-body text-white/70">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}