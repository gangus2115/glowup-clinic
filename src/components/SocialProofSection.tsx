import React from "react";
import { NumberTicker } from "@/components/ui/number-ticker";

export function SocialProofSection() {
  return (
    <section className="bg-stone-50 py-16 px-6 md:px-12 border-t border-stone-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-200">
        
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-4 text-center">
          <span className="text-4xl font-bold text-neutral-800 mb-2 tracking-tight [text-shadow:0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center">
            <NumberTicker value={120} />h
          </span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Zaoszczędzone miesięcznie</span>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-4 text-center">
          <span className="text-4xl font-bold text-neutral-800 mb-2 tracking-tight [text-shadow:0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center">
            <NumberTicker value={0} />
          </span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Utraconych leadów</span>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-4 text-center">
          <span className="text-4xl font-bold text-neutral-800 mb-2 tracking-tight [text-shadow:0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center">
            <NumberTicker value={100} />%
          </span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Dyskrecji</span>
        </div>

      </div>
    </section>
  );
}
