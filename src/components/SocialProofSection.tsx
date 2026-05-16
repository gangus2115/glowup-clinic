import React from "react";
import { NumberTicker } from "@/components/ui/number-ticker";

const statFont: React.CSSProperties = {
  fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
};

export function SocialProofSection() {
  return (
    <section
      className="py-16 px-6 md:px-12 border-t border-white/5"
      style={{ background: "#0a0a0f" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-4 text-center">
          <span
            className="text-4xl mb-2 flex items-center justify-center [text-shadow:0_0_15px_rgba(168,85,247,0.4)]"
            style={{ ...statFont, fontWeight: 700, letterSpacing: "-0.03em", color: "#ffffff" }}
          >
            <NumberTicker value={120} />h
          </span>
          <span
            className="uppercase"
            style={{
              ...statFont,
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Zaoszczędzone miesięcznie
          </span>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-4 text-center">
          <span
            className="text-4xl mb-2 flex items-center justify-center [text-shadow:0_0_15px_rgba(168,85,247,0.4)]"
            style={{ ...statFont, fontWeight: 700, letterSpacing: "-0.03em", color: "#ffffff" }}
          >
            <NumberTicker value={0} />
          </span>
          <span
            className="uppercase"
            style={{
              ...statFont,
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Utraconych leadów
          </span>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-4 text-center">
          <span
            className="text-4xl mb-2 flex items-center justify-center [text-shadow:0_0_15px_rgba(168,85,247,0.4)]"
            style={{ ...statFont, fontWeight: 700, letterSpacing: "-0.03em", color: "#ffffff" }}
          >
            <NumberTicker value={100} />%
          </span>
          <span
            className="uppercase"
            style={{
              ...statFont,
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Dyskrecji
          </span>
        </div>

      </div>
    </section>
  );
}