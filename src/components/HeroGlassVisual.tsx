"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

const positions = [
  // Stan A (domyślny)
  {
    card1: { x: -48, y: -56, rotate: -6, zIndex: 10, scale: 0.92 },
    card2: { x: 0,   y: 0,   rotate: 2,  zIndex: 20, scale: 1.00 },
    card3: { x: 64,  y: 64,  rotate: 4,  zIndex: 30, scale: 0.96 },
  },
  // Stan B
  {
    card1: { x: 64,  y: 64,  rotate: 4,  zIndex: 30, scale: 0.96 },
    card2: { x: -48, y: -56, rotate: -6, zIndex: 10, scale: 0.92 },
    card3: { x: 0,   y: 0,   rotate: 2,  zIndex: 20, scale: 1.00 },
  },
  // Stan C
  {
    card1: { x: 0,   y: 0,   rotate: 2,  zIndex: 20, scale: 1.00 },
    card2: { x: 64,  y: 64,  rotate: 4,  zIndex: 30, scale: 0.96 },
    card3: { x: -48, y: -56, rotate: -6, zIndex: 10, scale: 0.92 },
  }
];

export default function HeroGlassVisual() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeState, setActiveState] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Cykliczna zmiana stanu co 6 sekund (6000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveState((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const isMobileMV = useMotionValue(isMobile ? 1 : 0);
  useEffect(() => {
    isMobileMV.set(isMobile ? 1 : 0);
  }, [isMobile]);

  // Bazowe wartości przesunięcia jako MotionValues
  const card1BaseX = useMotionValue(positions[0].card1.x);
  const card1BaseY = useMotionValue(positions[0].card1.y);

  const card2BaseX = useMotionValue(positions[0].card2.x);
  const card2BaseY = useMotionValue(positions[0].card2.y);

  const card3BaseX = useMotionValue(positions[0].card3.x);
  const card3BaseY = useMotionValue(positions[0].card3.y);

  // Animowanie bazowych wartości x i y przy zmianie stanu
  useEffect(() => {
    const state = positions[activeState];
    animate(card1BaseX, state.card1.x, { duration: 2.4, ease: "easeInOut" });
    animate(card1BaseY, state.card1.y, { duration: 2.4, ease: "easeInOut" });

    animate(card2BaseX, state.card2.x, { duration: 2.4, ease: "easeInOut" });
    animate(card2BaseY, state.card2.y, { duration: 2.4, ease: "easeInOut" });

    animate(card3BaseX, state.card3.x, { duration: 2.4, ease: "easeInOut" });
    animate(card3BaseY, state.card3.y, { duration: 2.4, ease: "easeInOut" });
  }, [activeState]);

  // Warstwa 1 (najwolniejsza, -0.3 współczynnik):
  const card1RotateX = useTransform(smoothY, [-300, 300], [4, -4]);
  const card1RotateY = useTransform(smoothX, [-300, 300], [-6, 6]);
  const card1X = useTransform([card1BaseX, smoothX, isMobileMV], (values) => {
    const baseX = values[0] as number;
    const mouseXVal = values[1] as number;
    const mob = values[2] as number;
    if (mob === 1) return baseX;
    const mouseOffset = (mouseXVal / 300) * 6;
    return baseX + mouseOffset;
  });
  const card1Y = useTransform([card1BaseY, smoothY, isMobileMV], (values) => {
    const baseY = values[0] as number;
    const mouseYVal = values[1] as number;
    const mob = values[2] as number;
    if (mob === 1) return baseY;
    const mouseOffset = (mouseYVal / 300) * 4;
    return baseY + mouseOffset;
  });

  // Warstwa 2 (pośrednia, 0.5 współczynnik):
  const card2RotateX = useTransform(smoothY, [-300, 300], [7, -7]);
  const card2RotateY = useTransform(smoothX, [-300, 300], [-9, 9]);
  const card2X = useTransform([card2BaseX, smoothX, isMobileMV], (values) => {
    const baseX = values[0] as number;
    const mouseXVal = values[1] as number;
    const mob = values[2] as number;
    if (mob === 1) return baseX;
    const mouseOffset = (mouseXVal / 300) * 10;
    return baseX + mouseOffset;
  });
  const card2Y = useTransform([card2BaseY, smoothY, isMobileMV], (values) => {
    const baseY = values[0] as number;
    const mouseYVal = values[1] as number;
    const mob = values[2] as number;
    if (mob === 1) return baseY;
    const mouseOffset = (mouseYVal / 300) * 7;
    return baseY + mouseOffset;
  });

  // Warstwa 3 (najszybsza, 0.8 współczynnik):
  const card3RotateX = useTransform(smoothY, [-300, 300], [11, -11]);
  const card3RotateY = useTransform(smoothX, [-300, 300], [-14, 14]);
  const card3X = useTransform([card3BaseX, smoothX, isMobileMV], (values) => {
    const baseX = values[0] as number;
    const mouseXVal = values[1] as number;
    const mob = values[2] as number;
    if (mob === 1) return baseX;
    const mouseOffset = (mouseXVal / 300) * 16;
    return baseX + mouseOffset;
  });
  const card3Y = useTransform([card3BaseY, smoothY, isMobileMV], (values) => {
    const baseY = values[0] as number;
    const mouseYVal = values[1] as number;
    const mob = values[2] as number;
    if (mob === 1) return baseY;
    const mouseOffset = (mouseYVal / 300) * 11;
    return baseY + mouseOffset;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => {
        if (isMobile) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }}
      onMouseLeave={() => {
        if (isMobile) return;
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center overflow-visible rounded-2xl pointer-events-auto select-none"
    >
      {/* Background layer */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute -inset-x-0 -inset-y-24 md:-inset-y-32 flex items-center justify-center opacity-80 will-change-transform"
      >
        {/* Okrąg 1 (większy, centralny) */}
        <div
          className="absolute w-[350px] h-[350px] md:w-[560px] md:h-[560px] rounded-full blur-[100px] md:blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(72, 58, 22, 0.75) 0%, transparent 70%)" }}
        />
        {/* Okrąg 2 (mniejszy, przesunięty w górę-prawo) */}
        <div
          className="absolute w-[220px] h-[220px] md:w-[380px] md:h-[380px] rounded-full blur-[80px] md:blur-[110px] translate-x-1/3 -translate-y-1/3"
          style={{ background: "radial-gradient(circle, rgba(55, 42, 14, 0.65) 0%, transparent 70%)" }}
        />
        {/* Okrąg 3 (akcentowy złoty, subtelny) */}
        <div
          className="absolute w-[150px] h-[150px] md:w-[260px] md:h-[260px] rounded-full blur-[60px] md:blur-[90px] -translate-x-1/2 translate-y-1/3 opacity-60"
          style={{ background: "radial-gradient(circle, rgba(184, 161, 121, 0.22) 0%, transparent 60%)" }}
        />
        {/* Okrąg 4 (strefa kontrastu) */}
        <div
          className="absolute w-[400px] h-[200px] md:w-[600px] md:h-[280px] rounded-full blur-[120px] md:blur-[160px] translate-y-1/4 opacity-30"
          style={{ background: "radial-gradient(ellipse, rgba(255, 245, 210, 0.08) 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* Cards container - scale responsive for mobile */}
      <div className="relative flex items-center justify-center w-full h-full scale-75 md:scale-90 lg:scale-100">
        
        {/* KARTA 1: Back layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: positions[activeState].card1.rotate,
            scale: positions[activeState].card1.scale,
            zIndex: positions[activeState].card1.zIndex,
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.1, ease: "easeOut" },
            default: { duration: 2.4, ease: "easeInOut" },
          }}
          style={isMobile ? {
            x: card1X,
            y: card1Y,
            zIndex: positions[activeState].card1.zIndex,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)"
          } : {
            x: card1X,
            y: card1Y,
            rotateX: card1RotateX,
            rotateY: card1RotateY,
            transformPerspective: 800,
            zIndex: positions[activeState].card1.zIndex,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)"
          }}
          className="absolute w-60 h-20 rounded-3xl backdrop-blur-md bg-white/[0.04] border border-white/[0.07] flex items-center justify-center will-change-transform"
        >
          <div className="flex items-center gap-2.5">
            <span style={{ color: "#B8A179", fontSize: "0.7rem" }}>✦</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.8rem", fontWeight: 300, letterSpacing: "0.02em", fontFamily: "var(--font-sans), 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
              4.97 / 5.0 · Średnia ocen
            </span>
          </div>
        </motion.div>

        {/* KARTA 2: Middle layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: positions[activeState].card2.rotate,
            scale: positions[activeState].card2.scale,
            zIndex: positions[activeState].card2.zIndex,
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.25, ease: "easeOut" },
            default: { duration: 2.4, ease: "easeInOut" },
          }}
          style={isMobile ? {
            x: card2X,
            y: card2Y,
            zIndex: positions[activeState].card2.zIndex,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 32px rgba(0,0,0,0.45), 0 0 60px rgba(184,161,121,0.18)"
          } : {
            x: card2X,
            y: card2Y,
            rotateX: card2RotateX,
            rotateY: card2RotateY,
            transformPerspective: 800,
            zIndex: positions[activeState].card2.zIndex,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 32px rgba(0,0,0,0.45), 0 0 60px rgba(184,161,121,0.18)"
          }}
          className="absolute w-72 h-24 rounded-3xl backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center will-change-transform"
        >
          <div className="flex items-center gap-2.5">
            <span style={{ color: "#B8A179", fontSize: "0.75rem" }}>→</span>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", fontWeight: 300, letterSpacing: "0.01em", fontFamily: "var(--font-sans), 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
              847 zadowolonych Pacjentek
            </span>
          </div>
        </motion.div>

        {/* KARTA 3: Front layer (Gold frame, no background) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: positions[activeState].card3.rotate,
            scale: positions[activeState].card3.scale,
            zIndex: positions[activeState].card3.zIndex,
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.45, ease: "easeOut" },
            default: { duration: 2.4, ease: "easeInOut" },
          }}
          style={isMobile ? {
            x: card3X,
            y: card3Y,
            zIndex: positions[activeState].card3.zIndex,
            boxShadow: "0 0 30px rgba(184,161,121,0.20), 0 0 8px rgba(184,161,121,0.12), inset 0 0 24px rgba(184,161,121,0.06)"
          } : {
            x: card3X,
            y: card3Y,
            rotateX: card3RotateX,
            rotateY: card3RotateY,
            transformPerspective: 800,
            zIndex: positions[activeState].card3.zIndex,
            boxShadow: "0 0 30px rgba(184,161,121,0.20), 0 0 8px rgba(184,161,121,0.12), inset 0 0 24px rgba(184,161,121,0.06)"
          }}
          className="absolute w-52 h-28 rounded-3xl border border-[#B8A179]/90 will-change-transform"
        />

      </div>
    </div>
  );
}
