"use client";

import { motion } from "framer-motion";
import { BarChart3, Shield, Zap, Target, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

export function CreditScoring() {
  const features = [
    {
      icon: BarChart3,
      title: "Alternative Data Scoring",
      description: "We analyze mobile money usage, utility payments, and social data to create your credit profile",
    },
    {
      icon: Zap,
      title: "Instant Decisions",
      description: "Get your credit score instantly with our AI-powered assessment engine",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared without your explicit consent",
    },
    {
      icon: Award,
      title: "Build Credit History",
      description: "Start building your formal credit history with every transaction",
    },
  ];

  return (
    <section id="credit-scoring" className="bg-white py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full px-4 py-2 mb-6"
          >
            <BarChart3 className="w-4 h-4 text-[#FF6B35]" />
            <span className="font-body text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Nthoppa Credit Score</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-display text-5xl lg:text-6xl font-black text-[#0a0a0a] leading-tight mb-6"
          >
            Credit Scoring for the <span className="text-[#FF6B35]">Underserved</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-body text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Nthoppa's behaviour-based credit scoring uses alternative data to help you build a credit profile — even without formal banking history.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#0a0a0a] rounded-3xl p-8 shadow-2xl">
              <div className="font-body text-white/40 text-xs uppercase tracking-widest mb-6">Behavioural Credit Metrics</div>
              <div className="space-y-4 mb-8">
                {[
                  { label: 'Savings Consistency', pct: 82, icon: '🏦' },
                  { label: 'Income Patterns', pct: 74, icon: '📊' },
                  { label: 'Financial Discipline', pct: 68, icon: '🎯' },
                  { label: 'Transaction History', pct: 66, icon: '💳' },
                  { label: 'Behavioural Score', pct: 77, icon: '⭐' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.icon}</span>
                        <span className="font-body text-white/70 text-sm">{item.label}</span>
                      </div>
                      <span className="font-body text-[#FF6B35] font-bold text-sm">{item.pct}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: `${item.pct}%` }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-[#FF6B35] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-2xl p-5 border border-[#FF6B35]/20">
                <div className="text-center">
                  <div className="text-5xl font-black text-white mb-2">685</div>
                  <div className="text-white/60 text-sm">Your Nthoppa Credit Score</div>
                  <div className="flex justify-center gap-2 mt-3">
                    {['Poor', 'Fair', 'Good', 'Great', 'Excellent'].map((level, i) => (
                      <div key={i} className={`text-[10px] ${i === 2 ? 'text-[#FF6B35] font-bold' : 'text-white/30'}`}>
                        {level}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0a0a0a] text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
              
              <div className="pt-4">
                <Link href="/login">
                  <button className="w-full bg-[#FF6B35] text-white font-body font-bold px-6 py-3 rounded-xl hover:bg-[#e55a2b] transition-all shadow-lg">
                    Check Your Score Free →
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}