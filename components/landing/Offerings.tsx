"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FintechOrbit } from "@/components/landing/FintechOrbit";
import { RealmCard } from "@/components/motion/RealmCard";
import {
  ArrowRight,
  BookOpen,
  Coins,
  HandCoins,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const offerings = [
  {
    icon: PiggyBank,
    title: "Smart Savings",
    realm: "Savings Realm",
    description: "Set goals, earn interest, and watch your money grow with automated savings missions.",
    features: ["Goal-based saving", "Competitive interest", "Instant withdrawals"],
  },
  {
    icon: HandCoins,
    title: "Instant Loans",
    realm: "Credit Realm",
    description: "Access responsible credit pathways with clear terms and flexible repayment options.",
    features: ["No collateral needed", "Always-on access", "Flexible terms"],
  },
  {
    icon: ShieldCheck,
    title: "NthoppaSure",
    realm: "Protection Realm",
    description: "Protect the people, property, and ambitions that matter most through one connected ecosystem.",
    features: ["Funeral cover", "Personal all-risk", "Group life"],
    badge: "Nthoppa's Own",
  },
  {
    icon: BookOpen,
    title: "Financial Literacy",
    realm: "Knowledge Realm",
    description: "Build confidence through interactive missions, practical lessons, and measurable progress.",
    features: ["Interactive modules", "Certificates", "Expert guidance"],
  },
  {
    icon: UsersRound,
    title: "Motshelo Groups",
    realm: "Community Realm",
    description: "Bring trusted community saving into a transparent digital world with shared milestones.",
    features: ["Transparent records", "Automated collections", "Group chat"],
  },
  {
    icon: Coins,
    title: "Nthoppa Coins",
    realm: "Rewards Realm",
    description: "Earn digital rewards for positive financial behaviour and redeem them across the ecosystem.",
    features: ["Partner rewards", "Referral bonuses", "Activity rewards"],
  },
];

export function Offerings() {
  return (
    <section id="offerings" className="relative overflow-hidden bg-[#060606] py-28 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-8 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#FF6B35]/10 blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/45 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF6B35]/25 bg-[#FF6B35]/10 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-[#FF7A38]" aria-hidden="true" />
            <span className="text-sm font-semibold text-[#FF9B73]">Enter the Nthoppa Financial Galaxy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.08 }}
            viewport={{ once: true }}
            className="mb-5 font-display text-4xl font-black tracking-tight text-white lg:text-6xl"
          >
            Every service is a <span className="text-[#FF6B35]">new realm</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.16 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/50"
          >
            Move between savings, protection, learning, community, credit, and rewards through one immersive financial universe.
          </motion.p>
        </div>

        <FintechOrbit />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering, index) => {
            const Icon = offering.icon;

            return (
              <RealmCard
                key={offering.title}
                delay={index * 0.07}
                className="group min-h-[350px] rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-colors duration-300 hover:border-[#FF6B35]/45 hover:bg-white/[0.065]"
              >
                {offering.badge && (
                  <div className="absolute right-0 top-0 rounded-full border border-[#FF6B35]/25 bg-[#FF6B35]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#FF9B73]">
                    {offering.badge}
                  </div>
                )}

                <div className="mb-6 flex items-center justify-between">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-[#FF8750] shadow-[0_14px_35px_rgba(0,0,0,0.35)] transition duration-300 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:border-[#FF6B35]/40 group-hover:shadow-[0_18px_45px_rgba(255,107,53,0.18)]">
                    <div className="absolute inset-2 rounded-xl border border-[#FF6B35]/10" aria-hidden="true" />
                    <Icon aria-hidden="true" className="relative h-7 w-7" strokeWidth={1.65} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">Realm {String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF8750]">{offering.realm}</div>
                <h3 className="mb-3 text-2xl font-black text-white">{offering.title}</h3>
                <p className="mb-6 leading-relaxed text-white/48">{offering.description}</p>

                <div className="mb-7 space-y-2.5">
                  {offering.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-sm text-white/45">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35] shadow-[0_0_10px_rgba(255,107,53,0.9)]" aria-hidden="true" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/login"
                  data-realm-name={offering.realm}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#FF8750]"
                >
                  Enter realm
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </RealmCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
