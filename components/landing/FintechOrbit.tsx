"use client";

import { useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  BookOpen,
  Coins,
  HandCoins,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";

const realms = [
  {
    id: "savings",
    label: "Savings",
    value: "P 6,750",
    detail: "67% of your emergency-fund goal reached.",
    icon: PiggyBank,
    position: { left: "7%", top: "13%" },
  },
  {
    id: "invest",
    label: "Invest",
    value: "+18.4%",
    detail: "Your portfolio is moving beyond its six-month target.",
    icon: TrendingUp,
    position: { right: "7%", top: "13%" },
  },
  {
    id: "insurance",
    label: "NthoppaSure",
    value: "Protected",
    detail: "Flexible cover for life, property, family, and business.",
    icon: ShieldCheck,
    position: { left: "5%", top: "48%" },
  },
  {
    id: "credit",
    label: "Borrow",
    value: "712 score",
    detail: "Responsible activity unlocks clearer credit pathways.",
    icon: HandCoins,
    position: { right: "5%", top: "48%" },
  },
  {
    id: "learn",
    label: "Learn",
    value: "24 modules",
    detail: "Build practical financial confidence one mission at a time.",
    icon: BookOpen,
    position: { left: "12%", top: "72%" },
  },
  {
    id: "community",
    label: "Motshelo",
    value: "8 members",
    detail: "Transparent group saving, collections, records, and payouts.",
    icon: UsersRound,
    position: { right: "12%", top: "72%" },
  },
];

export function FintechOrbit() {
  const [activeRealm, setActiveRealm] = useState(realms[0]);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const sceneRotateY = useSpring(useTransform(pointerX, [-1, 1], [-7, 7]), {
    stiffness: 90,
    damping: 20,
  });
  const sceneRotateX = useSpring(useTransform(pointerY, [-1, 1], [5, -5]), {
    stiffness: 90,
    damping: 20,
  });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2);
  };

  const resetPerspective = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      className="fintech-galaxy mb-16"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPerspective}
      aria-label="Interactive Nthoppa financial galaxy"
    >
      <motion.div
        className="fintech-galaxy__scene"
        style={{ rotateX: sceneRotateX, rotateY: sceneRotateY, transformStyle: "preserve-3d" }}
      >
        <div className="fintech-galaxy__orbit fintech-galaxy__orbit--one" aria-hidden="true" />
        <div className="fintech-galaxy__orbit fintech-galaxy__orbit--two" aria-hidden="true" />
        <div className="fintech-galaxy__orbit fintech-galaxy__orbit--three" aria-hidden="true" />

        <motion.div
          className="fintech-galaxy__phone fintech-galaxy__phone--left"
          animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src="/app-screen-home.jpg" alt="Nthoppa mobile dashboard" />
        </motion.div>

        <motion.div
          className="fintech-galaxy__phone fintech-galaxy__phone--right"
          animate={reduceMotion ? undefined : { y: [0, 11, 0] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          <img src="/app-screen-coins.jpg" alt="Nthoppa rewards dashboard" />
        </motion.div>

        <div className="fintech-galaxy__portal-base" aria-hidden="true" />

        <div className="absolute left-1/2 top-[47%] z-[8] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            drag={!reduceMotion}
            dragConstraints={{ left: -42, right: 42, top: -30, bottom: 30 }}
            dragElastic={0.16}
            dragSnapToOrigin
            whileTap={{ scale: 0.94 }}
            animate={reduceMotion ? undefined : { rotateY: [0, 360], y: [0, -12, 0] }}
            transition={{
              rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
              y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative aspect-square w-[154px] cursor-grab [transform-style:preserve-3d] active:cursor-grabbing sm:w-[210px]"
            aria-label="Draggable 3D Nthoppa coin"
            role="img"
          >
            <div className="nthoppa-coin-3d__edge" aria-hidden="true" />
            <div className="nthoppa-coin-3d__face">
              <span>N</span>
            </div>
          </motion.div>
        </div>

        {realms.map((realm) => {
          const Icon = realm.icon;
          const active = realm.id === activeRealm.id;

          return (
            <motion.button
              key={realm.id}
              type="button"
              className={`fintech-galaxy__realm-node ${active ? "fintech-galaxy__realm-node--active" : ""}`}
              style={realm.position}
              onClick={() => setActiveRealm(realm)}
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={active}
              data-realm-name={`${realm.label} Realm`}
            >
              <Icon aria-hidden="true" />
              <strong>{realm.label}</strong>
            </motion.button>
          );
        })}
      </motion.div>

      <div className="fintech-galaxy__hint">Drag the coin • choose a financial realm</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeRealm.id}
          className="fintech-galaxy__realm-panel"
          initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, scale: 0.97, filter: "blur(6px)" }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <header>
            <div>
              <small>ACTIVE FINANCIAL REALM</small>
              <h3>{activeRealm.label}</h3>
            </div>
            <strong>{activeRealm.value}</strong>
          </header>
          <p>{activeRealm.detail}</p>
          <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff8a50]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Powered by Nthoppa intelligence
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 backdrop-blur-xl">
        <Coins className="h-3.5 w-3.5 text-[#ff7a38]" aria-hidden="true" />
        Live ecosystem
      </div>
    </div>
  );
}
