import React from "react";

export function SocialProofSection() {
  return (
    <section className="bg-stone-50 py-16 px-6 md:px-12 border-t border-stone-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-200">
        
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-4 text-center">
          <span className="text-4xl font-extralight text-neutral-800 mb-2 tracking-tight">120h</span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Zaoszczędzone miesięcznie</span>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-4 text-center">
          <span className="text-4xl font-extralight text-neutral-800 mb-2 tracking-tight">0</span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Utraconych leadów po godzinach</span>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-4 text-center">
          <span className="text-4xl font-extralight text-neutral-800 mb-2 tracking-tight">100%</span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Dyskrecji i bezpieczeństwa</span>
        </div>

      </div>
    </section>
  );
}
