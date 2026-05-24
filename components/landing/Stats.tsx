"use client";

import { motion } from "framer-motion";

export function Stats() {
  return (
    <section className="bg-white py-20 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-body text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Platform Dashboard</span>
          <h2 className="font-display text-4xl font-black text-[#0a0a0a] mt-2">Nthoppa by the <span className="text-[#FF6B35]">Numbers</span></h2>
          <p className="font-body text-gray-400 text-base mt-3 max-w-md mx-auto">Real impact, real people. See what the Nthoppa community has built together.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '24,891', label: 'Total Users', icon: '👥', desc: 'and growing daily' },
            { value: '8,342', label: 'Active Agents', icon: '🤝', desc: 'across Botswana' },
            { value: '6,120', label: 'Credit Profiles', icon: '📊', desc: 'built on the platform' },
            { value: '712', label: 'Avg Credit Score', icon: '⭐', desc: 'average member score' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: i * 0.1}}
              className="flex flex-col items-center gap-2 p-6 rounded-2xl hover:bg-[#f8f9fa] transition-colors"
            >
              <span className="text-4xl mb-1">{stat.icon}</span>
              <div className="font-display text-5xl font-black text-[#0a0a0a]">{stat.value}</div>
              <div className="font-body font-semibold text-gray-700 text-sm">{stat.label}</div>
              <div className="font-body text-gray-400 text-xs">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}