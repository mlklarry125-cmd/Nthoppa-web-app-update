"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  SavingsIcon,
  LoansIcon,
  NthoppaSureIcon,
  EducationIcon,
  MotsheloIcon,
  CoinsIcon,
} from "@/components/ui/NthoppaIcons";

const offerings = [
  {
    icon: SavingsIcon,
    title: "Smart Savings",
    description: "Set goals, earn interest, and watch your money grow with our automated savings tools.",
    features: ["Goal-based saving", "Competitive interest", "Instant withdrawals"],
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: LoansIcon,
    title: "Instant Loans",
    description: "Access credit in minutes with flexible repayment terms and competitive rates.",
    features: ["No collateral needed", "24/7 approval", "Flexible terms"],
    color: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: NthoppaSureIcon,
    title: "NthoppaSure",
    description: "Comprehensive insurance coverage tailored to protect what matters most to you.",
    features: ["Funeral cover", "Personal all-risk", "Group life"],
    color: "bg-orange-50",
    iconColor: "text-[#FF6B35]",
    badge: "Nthoppa's Own",
  },
  {
    icon: EducationIcon,
    title: "Financial Literacy",
    description: "Free courses and resources to build your financial knowledge and confidence.",
    features: ["Interactive modules", "Certificates", "Expert guidance"],
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: MotsheloIcon,
    title: "Motshelo Groups",
    description: "Join or start community savings groups with digital tracking and payouts.",
    features: ["Transparent records", "Automated collections", "Group chat"],
    color: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: CoinsIcon,
    title: "Nthoppa Coins",
    description: "Earn rewards for financial activities and redeem for exciting prizes.",
    features: ["Spin & win", "Partner rewards", "Referral bonuses"],
    color: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
];

export function Offerings() {
  return (
    <section id="offerings" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-4"
          >
            <span className="text-[#FF6B35] text-sm font-semibold">Everything You Need</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-display text-4xl lg:text-5xl font-black text-[#0a0a0a] mb-4"
          >
            Financial Freedom at Your{" "}
            <span className="text-[#FF6B35]">Fingertips</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            One platform, unlimited possibilities. Access banking, insurance, savings, and more.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF6B35]/20"
            >
              {offering.badge && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-[#FF6B35] text-white text-xs font-semibold rounded-full shadow-md">
                  {offering.badge}
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-xl ${offering.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <offering.icon className={`h-7 w-7 ${offering.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {offering.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {offering.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {offering.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link href="/login">
                <button className="w-full border border-[#FF6B35]/30 text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white py-2 rounded-lg transition-all font-medium">
                  Learn More →
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}