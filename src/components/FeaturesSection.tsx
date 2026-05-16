import React from "react";
import { Calendar, ShieldCheck, AlertCircle } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16 relative z-10">
      <h2
        className="text-center text-2xl font-semibold tracking-tight text-white/90 mb-10"
        style={{ fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif" }}
      >
        Zarządzanie na najwyższym poziomie.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-4">

        {/* Niezawodny Kalendarz */}
        <div className="bento-card flex flex-col gap-4 cursor-default relative overflow-hidden">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0"
            style={{
              background: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            <Calendar className="w-[22px] h-[22px] text-white/70" />
          </div>
          <div>
            <h3 className="text-[1.05rem] font-semibold text-white/90 tracking-tight leading-snug">
              Niezawodny Kalendarz
            </h3>
            <p className="text-[0.85rem] text-white/55 leading-relaxed mt-2">
              Inteligentne zarządzanie rezerwacjami 24/7. System sam układa wizyty, eliminując puste okienka.
            </p>
          </div>
        </div>

        {/* Bezpieczeństwo Pacjenta */}
        <div className="bento-card flex flex-col gap-4 cursor-default relative overflow-hidden">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0"
            style={{
              background: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            <ShieldCheck className="w-[22px] h-[22px] text-white/70" />
          </div>
          <div>
            <h3 className="text-[1.05rem] font-semibold text-white/90 tracking-tight leading-snug">
              Bezpieczeństwo Pacjenta
            </h3>
            <p className="text-[0.85rem] text-white/55 leading-relaxed mt-2">
              Zautomatyzowany wywiad medyczny. Weronika bezbłędnie wyłapuje przeciwwskazania do zabiegów jeszcze przed potwierdzeniem wizyty.
            </p>
          </div>
        </div>

        {/* Ochrona Biznesu */}
        <div className="bento-card flex flex-col gap-4 cursor-default relative overflow-hidden">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0"
            style={{
              background: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            <AlertCircle className="w-[22px] h-[22px] text-white/70" />
          </div>
          <div>
            <h3 className="text-[1.05rem] font-semibold text-white/90 tracking-tight leading-snug">
              Ochrona Biznesu
            </h3>
            <p className="text-[0.85rem] text-white/55 leading-relaxed mt-2">
              System wczesnego reagowania. Natychmiastowe powiadomienia SMS w przypadku sytuacji kryzysowych.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}