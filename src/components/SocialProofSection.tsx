import React from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import ScrollReveal from "@/components/ScrollReveal";

const statFont: React.CSSProperties = {
  fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
};

export function SocialProofSection() {
  return (
    <ScrollReveal className="relative py-24 px-6 overflow-hidden bg-[#0a0a0f]">
      {/* Subtle radial silver glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,192,192,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto relative z-10">

        {/* 120h */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-[0.15em]">
            <NumberTicker
              value={120}
              delay={0}
              className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] text-[#D4AF37] [text-shadow:0_0_20px_rgba(212,175,55,0.3)]"
              style={statFont}
            />
            <span
              style={{
                fontSize: "0.55em",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#C0C0C0",
                opacity: 0.72,
                lineHeight: 1,
                paddingBottom: "0.15em",
              }}
            >
              h
            </span>
          </div>
          <p className="text-[0.75rem] font-normal uppercase tracking-[0.08em] text-white/40"
             style={statFont}>
            Zaoszczędzone miesięcznie
          </p>
        </div>

        {/* 0 leadów */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-[0.15em]">
            <NumberTicker
              value={0}
              delay={0.15}
              className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] text-[#D4AF37] [text-shadow:0_0_20px_rgba(212,175,55,0.3)]"
              style={statFont}
            />
          </div>
          <p className="text-[0.75rem] font-normal uppercase tracking-[0.08em] text-white/40"
             style={statFont}>
            Utraconych leadów
          </p>
        </div>

        {/* 100% */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-[0.15em]">
            <NumberTicker
              value={100}
              delay={0.30}
              className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] text-[#D4AF37] [text-shadow:0_0_20px_rgba(212,175,55,0.3)]"
              style={statFont}
            />
            <span
              style={{
                fontSize: "0.55em",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#C0C0C0",
                opacity: 0.72,
                lineHeight: 1,
                paddingBottom: "0.15em",
              }}
            >
              %
            </span>
          </div>
          <p className="text-[0.75rem] font-normal uppercase tracking-[0.08em] text-white/40"
             style={statFont}>
            Dyskrecji
          </p>
        </div>

      </div>
    </ScrollReveal>
  );
}