import React from "react";
import { Calendar, ShieldCheck, AlertCircle } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16 relative z-10">
      <h2 className="text-center text-2xl font-semibold tracking-tight text-white/90 mb-10"
          style={{ fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif" }}>
        Zarządzanie na najwyższym poziomie.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-none md:grid-rows-2 gap-4 md:h-[480px]">

        {/* LEWA — duża karta, pełna wysokość */}
        <div
          className="md:row-span-2 rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden"
          style={{
            background: "rgba(10, 10, 18, 0.60)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            border: "1px solid rgba(255, 255, 255, 0.09)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <div className="relative z-10">
            <div className="mb-5 w-10 h-10 flex items-center justify-center rounded-xl"
                 style={{ background: "rgba(168, 85, 247, 0.15)", border: "1px solid rgba(168,85,247,0.25)" }}>
              <ShieldCheck className="w-5 h-5 text-purple-300" />
            </div>
            <h3
              className="mb-3"
              style={{
                fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif",
                fontSize: "1.2rem",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.93)",
              }}
            >
              Bezpieczeństwo Pacjenta
            </h3>
            <p
              style={{
                fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.52)",
              }}
            >
              Zautomatyzowany wywiad medyczny. Weronika bezbłędnie wyłapuje przeciwwskazania do zabiegów jeszcze przed potwierdzeniem wizyty.
            </p>
          </div>
          {/* Subtelny glow w rogu — dekoracyjny */}
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />
        </div>

        {/* PRAWA GÓRA — Niezawodny Kalendarz */}
        <div
          className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
          style={{
            background: "rgba(10, 10, 18, 0.60)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            border: "1px solid rgba(255, 255, 255, 0.09)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <div className="mb-4 w-9 h-9 flex items-center justify-center rounded-xl"
                 style={{ background: "rgba(168, 85, 247, 0.15)", border: "1px solid rgba(168,85,247,0.25)" }}>
              <Calendar className="w-4 h-4 text-purple-300" />
            </div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "rgba(255,255,255,0.93)",
              }}
            >
              Niezawodny Kalendarz
            </h3>
            <p
              style={{
                fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.52)",
              }}
            >
              Inteligentne zarządzanie rezerwacjami 24/7. System sam układa wizyty, eliminując puste okienka.
            </p>
          </div>
        </div>

        {/* PRAWA DÓŁ — Ochrona Biznesu */}
        <div
          className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
          style={{
            background: "rgba(10, 10, 18, 0.60)",
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
            border: "1px solid rgba(255, 255, 255, 0.09)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <div className="mb-4 w-9 h-9 flex items-center justify-center rounded-xl"
                 style={{ background: "rgba(168, 85, 247, 0.15)", border: "1px solid rgba(168,85,247,0.25)" }}>
              <AlertCircle className="w-4 h-4 text-purple-300" />
            </div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "rgba(255,255,255,0.93)",
              }}
            >
              Ochrona Biznesu
            </h3>
            <p
              style={{
                fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.52)",
              }}
            >
              System wczesnego reagowania. Natychmiastowe powiadomienia SMS w przypadku sytuacji kryzysowych.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

