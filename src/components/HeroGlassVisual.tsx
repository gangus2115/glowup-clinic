"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroGlassVisual() {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center overflow-hidden rounded-2xl pointer-events-none">
      {/* Background layer */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute inset-0 flex items-center justify-center opacity-70"
      >
        <div
          className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px]"
          style={{ background: "radial-gradient(circle, #4A001F 0%, transparent 70%)" }}
        />
        <div
          className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full blur-[80px] md:blur-[120px] translate-x-1/4 -translate-y-1/4"
          style={{ background: "radial-gradient(circle, #2A1B38 0%, transparent 70%)" }}
        />
      </motion.div>

      {/* Cards container - scale responsive for mobile */}
      <div className="relative flex items-center justify-center w-full h-full scale-75 md:scale-90 lg:scale-100">
        
        {/* KARTA 1: Back layer */}
        <div className="absolute -translate-x-10 -translate-y-12 -rotate-6 w-64 h-24 rounded-3xl backdrop-blur-xl bg-white/[0.08] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center z-10">
          <span className="text-white/90 text-sm font-light tracking-wide">
            ✦ 4.97 / 5.0 Średnia ocen
          </span>
        </div>

        {/* KARTA 2: Middle layer */}
        <div className="absolute w-72 h-28 rounded-3xl backdrop-blur-xl bg-white/[0.08] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.4),_0_0_40px_rgba(184,161,121,0.15)] flex items-center justify-center z-20">
          <span className="text-white/90 font-light tracking-wide">
            → Ponad 800 zadowolonych Pacjentek
          </span>
        </div>

        {/* KARTA 3: Front layer (Gold frame, no background) */}
        <div className="absolute translate-x-16 translate-y-14 rotate-4 w-56 h-32 rounded-3xl border border-[#B8A179]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] z-30" />

      </div>
    </div>
  );
}
