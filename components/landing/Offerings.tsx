"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Coins,
  HandCoins,
  PiggyBank,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const offerings = [
  {
    icon: PiggyBank,
    title: "Smart Savings",
    description: "Set goals, earn interest, and watch your money grow with our automated savings tools.",
    features: ["Goal-based saving", "Competitive interest", "Instant withdrawals"],
  },
  {
    icon: HandCoins,
    title: "Instant Loans",
    description: "Access credit in minutes with flexible repayment terms and competitive rates.",
    features: ["No collateral needed", "24/7 approval", "Flexible terms"],
  },
  {
    icon: ShieldCheck,
    title: "NthoppaSure",
    description: "Comprehensive insurance coverage tailored to protect what matters most to you.",
    features: ["Funeral cover", "Personal all-risk", "Group life"],
    badge: "Nthoppa's Own",
  },
  {
    icon: BookOpen,
    title: "Financial Literacy",
    description: "Free courses and resources to build your financial knowledge and confidence.",
    features: ["Interactive modules", "Certificates", "Expert guidance"],
  },
  {
    icon: UsersRound,
    title: "Motshelo Groups",
    description: "Join or start community savings groups with digital tracking and payouts.",
    features: ["Transparent records", "Automated collections", "Group chat"],
  },
  {
    icon: Coins,
    title: "Nthoppa Coins",
    description: "Earn rewards for positive financial activity and redeem them across the Nthoppa ecosystem.",
    features: ["Partner rewards", "Referral bonuses", "Activity rewards"],
  },
];

export function Offerings() {
  return (
    <section id="offerings" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center rounded-full border border-[#FF6B35]/20 bg-[#FF6B35]/5 px-4 py-2"
          >
            <span className="text-sm font-semibold text-[#FF6B35]">Everything You Need</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            viewport={{ once: true }}
            className="mb-4 font-display text-4xl font-black tracking-tight text-[#0a0a0a] lg:text-5xl"
          >
            Financial Freedom at Your <span className="text-[#FF6B35]">Fingertips</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500"
          >
            One platform for banking, insurance, savings, education, and rewards.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering, index) => {
            const Icon = offering.icon;

            return (
              <motion.article
                key={offering.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#FF6B35]/35 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
              >
                {offering.badge && (
                  <div className="absolute right-5 top-5 rounded-full border border-[#FF6B35]/20 bg-[#FF6B35]/5 px-2.5 py-1 text-[11px] font-semibold text-[#FF6B35]">
                    {offering.badge}
                  </div>
                )}

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 transition-colors group-hover:border-[#FF6B35]/25 group-hover:bg-[#FF6B35]/5 group-hover:text-[#FF6B35]">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <h3 className="mb-2 text-xl font-bold text-gray-950">{offering.title}</h3>
                <p className="mb-5 leading-relaxed text-gray-600">{offering.description}</p>

                <div className="mb-6 space-y-2.5">
                  {offering.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-sm text-gray-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" aria-hidden="true" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-[#FF6B35]"
                >
                  Learn more
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
