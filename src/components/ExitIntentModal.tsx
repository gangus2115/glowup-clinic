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
    // Check if modal has already been shown in this session
    const hasShown = sessionStorage.getItem("exitIntentShown");
    if (hasShown) return;

    const handleMouseOut = (e: MouseEvent) => {
      // Trigger when mouse leaves from the top (threshold 20px) and goes out of window
      if (e.clientY <= 20 && !e.relatedTarget) {
        setIsOpen(true);
        sessionStorage.setItem("exitIntentShown", "true");
        // Remove listener after triggering
        document.removeEventListener("mouseout", handleMouseOut);
      }
    };

    // Add 4-second safety buffer
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 md:p-12 border border-stone-100 overflow-hidden"
          >
            {/* Very subtle gold reflection on top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-600 transition-colors bg-stone-50 hover:bg-stone-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-stone-400 block mb-4">
                Ostatnia Szansa
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-4 tracking-tight">
                Zanim wyjdziesz...
              </h2>
              <p className="text-stone-500 font-light leading-relaxed mb-8">
                Zostaw numer telefonu, a Weronika oddzwoni do Ciebie w 5 minut z darmową wyceną systemu dla Twojej kliniki.
              </p>

              <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-stone-400" />
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
                    className={`w-full bg-stone-50 border ${isTouched && !isValid ? 'border-red-300 focus:ring-red-300' : 'border-stone-200 focus:ring-stone-300'} rounded-lg py-4 pl-12 pr-4 text-stone-800 font-light focus:outline-none focus:ring-1 transition-shadow placeholder:text-stone-400`}
                  />
                  {isTouched && !isValid && (
                    <p className="text-[10px] text-red-500 mt-2 text-left absolute -bottom-5">
                      Nieprawidłowy format (min. 9 cyfr, opcjonalnie + na początku).
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full py-4 mt-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-medium text-sm tracking-widest uppercase rounded-lg transition-colors"
                >
                  Zamów wycenę
                </button>
              </form>
              
              <div className="mt-6">
                <p className="text-[10px] text-stone-400 font-light tracking-wide leading-relaxed">
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
