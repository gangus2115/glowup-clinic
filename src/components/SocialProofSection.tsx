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

        <div className="flex flex-col items-center justify-center">
          <span
            className="mb-3 flex items-center justify-center [text-shadow:0_0_20px_rgba(212,175,55,0.3)]"
            style={{
              ...statFont,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#D4AF37",
            }}
          >
            <NumberTicker value={120} />h
          </span>
          <span
            style={{
              ...statFont,
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.45)",
            }}
          >
            Zaoszczędzone miesięcznie
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span
            className="mb-3 flex items-center justify-center [text-shadow:0_0_20px_rgba(212,175,55,0.3)]"
            style={{
              ...statFont,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#D4AF37",
            }}
          >
            <NumberTicker value={0} />
          </span>
          <span
            style={{
              ...statFont,
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.45)",
            }}
          >
            Utraconych leadów
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span
            className="mb-3 flex items-center justify-center [text-shadow:0_0_20px_rgba(212,175,55,0.3)]"
            style={{
              ...statFont,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#D4AF37",
            }}
          >
            <NumberTicker value={100} />%
          </span>
          <span
            style={{
              ...statFont,
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.45)",
            }}
          >
            Dyskrecji
          </span>
        </div>

      </div>
    </ScrollReveal>
  );
}