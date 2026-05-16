"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Czy Weronika działa 24 godziny na dobę?",
    a: "Tak. System jest aktywny przez całą dobę, 7 dni w tygodniu, bez przerw i urlopów.",
  },
  {
    q: "Jakie zabiegi obsługuje system rezerwacji?",
    a: "Weronika obsługuje pełną listę zabiegów dostępnych w klinice. Lista jest konfigurowana indywidualnie podczas wdrożenia.",
  },
  {
    q: "Czy moje dane medyczne są bezpieczne?",
    a: "Wszystkie dane są przetwarzane zgodnie z RODO. System nie przechowuje informacji medycznych dłużej niż wymaga tego cel rezerwacji.",
  },
  {
    q: "Jak wdrożyć Weronikę w mojej klinice?",
    a: "Wdrożenie trwa do 7 dni roboczych. Obejmuje konfigurację, testy i szkolenie personelu.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="max-w-2xl mx-auto px-4 py-20 bg-[#0a0a0f]"
    >
      <h2 className="text-2xl font-semibold text-white/90 tracking-tight text-center mb-12"
          style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
        Najczęstsze pytania
      </h2>
      <div className="flex flex-col gap-3">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span
                className="text-[0.95rem] font-medium text-white/85"
                style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
              >
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-white/40 text-xl font-light ml-4 flex-shrink-0"
              >
                +
              </motion.span>
            </div>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <p
                    className="px-6 pb-5 text-[0.875rem] text-white/50 leading-relaxed"
                    style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
