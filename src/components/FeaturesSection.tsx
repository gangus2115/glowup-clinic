import React from "react";
import { Calendar, ShieldCheck, AlertCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export function FeaturesSection() {
  return (
    <ScrollReveal className="w-full bg-[#0a0a0f] px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-center text-2xl font-semibold tracking-tight text-white/90 mb-12"
          style={{ fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif" }}
        >
          Zarządzanie na najwyższym poziomie.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-4 md:px-0">

          {/* Niezawodny Kalendarz */}
          <div className="bento-card flex flex-col">
            <div className="mb-[14px]">
              <Calendar style={{ width: 22, height: 22, color: "#C0C0C0" }} />
            </div>
            <h3
              className="text-[1.05rem] font-semibold text-white/90 tracking-tight leading-snug mb-2"
            >
              Niezawodny Kalendarz
            </h3>
            <p className="text-[0.85rem] text-white/55 leading-relaxed">
              Inteligentne zarządzanie rezerwacjami 24/7. System sam układa wizyty, eliminując puste okienka.
            </p>
          </div>

          {/* Bezpieczeństwo Pacjenta */}
          <div className="bento-card flex flex-col">
            <div className="mb-[14px]">
              <ShieldCheck style={{ width: 22, height: 22, color: "#C0C0C0" }} />
            </div>
            <h3
              className="text-[1.05rem] font-semibold text-white/90 tracking-tight leading-snug mb-2"
            >
              Bezpieczeństwo Pacjenta
            </h3>
            <p className="text-[0.85rem] text-white/55 leading-relaxed">
              Zautomatyzowany wywiad medyczny. Weronika bezbłędnie wyłapuje przeciwwskazania do zabiegów jeszcze przed potwierdzeniem wizyty.
            </p>
          </div>

          {/* Ochrona Biznesu */}
          <div className="bento-card flex flex-col">
            <div className="mb-[14px]">
              <AlertCircle style={{ width: 22, height: 22, color: "#C0C0C0" }} />
            </div>
            <h3
              className="text-[1.05rem] font-semibold text-white/90 tracking-tight leading-snug mb-2"
            >
              Ochrona Biznesu
            </h3>
            <p className="text-[0.85rem] text-white/55 leading-relaxed">
              System wczesnego reagowania. Natychmiastowe powiadomienia SMS w przypadku sytuacji kryzysowych.
            </p>
          </div>

        </div>
      </div>
    </ScrollReveal>
  );
}