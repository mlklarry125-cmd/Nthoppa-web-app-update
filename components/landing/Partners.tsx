"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

export function Partners() {
  const partners = [
    { name: "Stanbic Bank", logo: "/partners/stanbic.jpeg", category: "Strategic Banking Partner", featured: true },
    { name: "CreditYame", logo: "/partners/credityame.jpeg", category: "Credit Scoring", featured: false },
    { name: "iPachi Capital", logo: "/partners/ipachi.jpeg", category: "SME Finance", featured: false },
    { name: "Seriti Insights", logo: "/partners/seriti.jpeg", category: "Data & Analytics", featured: false },
    { name: "Seipone.ai", logo: "/partners/seipone.jpeg", category: "AI Solutions", featured: false },
    { name: "InDrive", logo: null, category: "Ride Hailing Partner", featured: false, placeholder: "InDrive" },
  ];

  const stanbicPartner = partners.find(p => p.featured);

  return (
    <section id="partners" className="bg-[#0a0a0a] py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-body text-white/40 text-sm uppercase tracking-widest mb-3"
        >
          Trusted Partners
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-black text-white mb-2"
        >
          Built with <span className="text-[#FF6B35]">Industry Leaders</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-body text-white/40 text-sm mb-12 max-w-md mx-auto"
        >
          Nthoppa partners with Botswana's most trusted financial institutions to deliver real impact.
        </motion.p>

        {/* Featured Stanbic Partner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-sm mx-auto mb-8"
        >
          <div className="bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/5 border border-[#FF6B35]/40 rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-[#FF6B35]/70 transition-all">
            <div className="px-3 py-1 bg-[#FF6B35]/20 border border-[#FF6B35]/30 rounded-full mb-1">
              <span className="text-[#FF6B35] text-[10px] font-bold uppercase tracking-widest">Strategic Banking Partner</span>
            </div>
            <div className="h-14 w-full flex items-center justify-center">
              {stanbicPartner?.logo ? (
                <img 
                  src={stanbicPartner.logo} 
                  alt="Stanbic Bank" 
                  className="max-h-12 max-w-[160px] object-contain opacity-90 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-white font-black text-2xl tracking-tight">STANBIC</span>';
                  }}
                />
              ) : (
                <span className="text-white font-black text-2xl tracking-tight">STANBIC</span>
              )}
            </div>
            <div className="text-center">
              <p className="font-body font-bold text-white text-sm">Stanbic Bank Botswana</p>
              <p className="font-body text-white/40 text-xs mt-0.5">Banking Infrastructure & Product Integration</p>
            </div>
          </div>
        </motion.div>

        {/* Other Partners */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {partners.filter(p => !p.featured).map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-2xl p-5 flex flex-col items-center gap-3 hover:bg-white/10 transition-all border border-white/5 hover:border-white/10"
            >
              <div className="h-12 w-full flex items-center justify-center">
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-10 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity" 
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{partner.placeholder || partner.name}</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="font-body font-semibold text-white/60 text-xs">{partner.name}</p>
                <p className="font-body text-white/30 text-[10px] mt-0.5">{partner.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
            <Check className="w-3 h-3 text-[#FF6B35]" />
            <span>Powered by Nthoppa's Partner Network</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}