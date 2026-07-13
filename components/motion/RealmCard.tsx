"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface RealmCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RealmCard({ children, className = "", delay = 0 }: RealmCardProps) {
  const reduceMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 180, damping: 22, mass: 0.55 });
  const rotateY = useSpring(rotateYValue, { stiffness: 180, damping: 22, mass: 0.55 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / Math.max(rect.width, 1);
    const normalizedY = (event.clientY - rect.top) / Math.max(rect.height, 1);

    rotateYValue.set((normalizedX - 0.5) * 14);
    rotateXValue.set((0.5 - normalizedY) * 12);
    event.currentTarget.style.setProperty("--card-light-x", `${normalizedX * 100}%`);
    event.currentTarget.style.setProperty("--card-light-y", `${normalizedY * 100}%`);
  };

  const resetTilt = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`realm-tilt-card ${className}`}
    >
      <div className="realm-tilt-card__glow" aria-hidden="true" />
      <div className="realm-tilt-card__content">{children}</div>
    </motion.article>
  );
}
