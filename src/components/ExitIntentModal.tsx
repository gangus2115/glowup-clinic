"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const phoneRegex = /^\+?\d{9,}$/;
  const isValid = phoneRegex.test(phone.replace(/\s/g, ""));

  useEffect(() => {
    const hasShown = sessionStorage.getItem("exitIntentShown");
    if (hasShown) return;

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 20 && !e.relatedTarget) {
        setIsOpen(true);
        sessionStorage.setItem("exitIntentShown", "true");
        document.removeEventListener("mouseout", handleMouseOut);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseOut);
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md mx-4 p-8 rounded-2xl bg-zinc-950 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Gold top reflection */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors duration-200 p-2"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="text-xs font-medium tracking-widest uppercase text-white/40 block mb-4">
                Ostatnia Szansa
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-4 tracking-tight">
                Zanim wyjdziesz...
              </h2>
              <p className="text-white/50 font-light leading-relaxed mb-8">
                Zostaw numer telefonu, a Weronika oddzwoni do Ciebie w 5 minut z darmową wyceną systemu dla Twojej kliniki.
              </p>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-white/40" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Wpisz swój numer telefonu"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setIsTouched(true);
                    }}
                    className={`w-full bg-white/5 border ${
                      isTouched && !isValid
                        ? "border-red-500/50 focus:border-red-400/60"
                        : "border-white/10 focus:border-white/25"
                    } rounded-xl py-3 pl-12 pr-4 text-white/90 placeholder-white/30 text-sm focus:outline-none transition-colors`}
                  />
                  {isTouched && !isValid && (
                    <p className="text-[10px] text-red-400 mt-2 text-left absolute -bottom-5">
                      Nieprawidłowy format (min. 9 cyfr, opcjonalnie + na początku).
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="cta-button w-full justify-center mt-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  Zamów wycenę
                </button>
              </form>

              <div className="mt-8">
                <p className="text-xs text-white/40 font-light tracking-wide leading-relaxed">
                  Gwarantujemy 100% dyskrecji. Nie wysyłamy spamu.
                  <br />
                  Wersja demonstracyjna. Prosimy nie podawać prawdziwych danych medycznych. Zostawiając numer, zgadzasz się na jednorazowy kontakt.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
