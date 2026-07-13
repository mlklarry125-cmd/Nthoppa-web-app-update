"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Coins, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

const particles = [
  { left: "8%", top: "18%", delay: 0.1, duration: 4.8 },
  { left: "18%", top: "72%", delay: 1.2, duration: 5.6 },
  { left: "31%", top: "10%", delay: 0.7, duration: 4.2 },
  { left: "64%", top: "16%", delay: 1.8, duration: 5.2 },
  { left: "76%", top: "76%", delay: 0.4, duration: 4.7 },
  { left: "91%", top: "30%", delay: 1.4, duration: 5.9 },
];

export function FintechOrbit() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto mb-16 h-[430px] max-w-5xl overflow-hidden rounded-[2rem] border border-gray-200 bg-[#080808] shadow-[0_28px_80px_rgba(15,23,42,0.16)]"
      style={{ perspective: "1200px" }}
      aria-label="Animated Nthoppa digital finance ecosystem"
      role="img"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,107,53,0.22),transparent_31%),radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#FF6B35] shadow-[0_0_14px_rgba(255,107,53,0.9)]"
          style={{ left: particle.left, top: particle.top }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -14, 0],
                  opacity: [0.25, 0.95, 0.25],
                  scale: [0.8, 1.35, 0.8],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <motion.div
          className="h-[310px] w-[310px] rounded-full border border-[#FF6B35]/25 sm:h-[360px] sm:w-[360px]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#FF6B35] shadow-[0_0_20px_rgba(255,107,53,1)]" />
        </motion.div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <div style={{ transform: "rotateX(68deg)", transformStyle: "preserve-3d" }}>
          <motion.div
            className="h-[230px] w-[360px] rounded-[50%] border border-white/10"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative h-[330px] w-[300px]"
          animate={reduceMotion ? undefined : { y: [0, -10, 0], rotateY: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute left-[22px] top-[62px] w-[154px] overflow-hidden rounded-[2.2rem] border-[3px] border-white/15 bg-black shadow-[0_28px_70px_rgba(0,0,0,0.72)] sm:left-[14px] sm:w-[170px]"
            style={{ transform: "rotateY(12deg) rotateZ(-5deg) translateZ(34px)" }}
          >
            <img src="/app-screen-home.jpg" alt="" className="block h-auto w-full" />
          </div>

          <div
            className="absolute right-[14px] top-[30px] w-[142px] overflow-hidden rounded-[2rem] border-[3px] border-white/10 bg-black opacity-90 shadow-[0_24px_60px_rgba(0,0,0,0.62)] sm:w-[158px]"
            style={{ transform: "rotateY(-12deg) rotateZ(6deg) translateZ(-30px)" }}
          >
            <img src="/app-screen-coins.jpg" alt="" className="block h-auto w-full" />
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="flex h-24 w-24 items-center justify-center rounded-full border border-[#FF6B35]/35 bg-[radial-gradient(circle_at_35%_30%,#ffb08d,#FF6B35_42%,#9f2f0f_100%)] shadow-[0_0_55px_rgba(255,107,53,0.58)]"
              animate={reduceMotion ? undefined : { rotateY: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Coins className="h-10 w-10 text-white drop-shadow-md" strokeWidth={1.6} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute left-5 top-7 hidden min-w-[178px] rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-left shadow-2xl backdrop-blur-xl sm:block"
        animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
          <TrendingUp className="h-4 w-4 text-[#FF6B35]" />
          Savings growth
        </div>
        <div className="text-2xl font-black text-white">+18.4%</div>
        <div className="mt-1 text-xs text-white/45">Goal progress this month</div>
      </motion.div>

      <motion.div
        className="absolute right-5 top-8 hidden min-w-[170px] rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-left shadow-2xl backdrop-blur-xl md:block"
        animate={reduceMotion ? undefined : { y: [0, 9, 0], rotate: [1, -1, 1] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
          <ShieldCheck className="h-4 w-4 text-[#FF6B35]" />
          Protected
        </div>
        <div className="text-sm font-bold text-white">Secure digital wallet</div>
        <div className="mt-1 text-xs text-white/45">Built for everyday finance</div>
      </motion.div>

      <motion.div
        className="absolute bottom-7 right-6 hidden min-w-[180px] rounded-2xl border border-[#FF6B35]/25 bg-[#FF6B35]/10 p-4 text-left shadow-2xl backdrop-blur-xl sm:block"
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4.9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#FF9B73]">
          <Sparkles className="h-4 w-4" />
          Nthoppa Coins
        </div>
        <div className="text-xl font-black text-white">2,480 rewards</div>
        <div className="mt-1 text-xs text-white/45">Earn, redeem, move forward</div>
      </motion.div>

      <div className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 backdrop-blur-md">
        Interactive finance ecosystem
      </div>
    </div>
  );
}
