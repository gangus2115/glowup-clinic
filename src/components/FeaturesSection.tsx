import React from "react";
import { Calendar, ShieldCheck, AlertCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";

const cardTitleStyle: React.CSSProperties = {
  fontFamily: "'Inter', 'Geist', ui-sans-serif, system-ui, sans-serif",
  fontSize: "1.1rem",
  fontWeight: 600,
  letterSpacing: "-0.015em",
  lineHeight: 1.3,
  color: "rgba(255, 255, 255, 0.90)",
  marginBottom: "0.55rem",
};

const cardDescStyle: React.CSSProperties = {
  fontFamily: "'Inter', 'Geist', ui-sans-serif, system-ui, sans-serif",
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: 1.7,
  color: "rgba(255, 255, 255, 0.52)",
  margin: 0,
};

export function FeaturesSection() {
  return (
    <ScrollReveal className="w-full bg-[#0a0a0f] py-20">
      <div
        className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16"
        style={{ fontFamily: "'Inter', 'Geist', ui-sans-serif, system-ui, sans-serif" }}
      >
        <h2
          className="text-center text-2xl font-semibold tracking-tight text-white/90 mb-12"
        >
          Zarządzanie na najwyższym poziomie.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full">

          {/* Niezawodny Kalendarz */}
          <SpotlightCard>
            <div className="flex flex-col gap-5 p-8 md:p-10 lg:p-11">
              <div>
                <Calendar style={{ width: 22, height: 22, color: "#C0C0C0" }} />
              </div>
              <h3 style={cardTitleStyle}>Niezawodny Kalendarz</h3>
              <p style={cardDescStyle}>
                Inteligentne zarządzanie rezerwacjami 24/7. System sam układa wizyty, eliminując puste okienka.
              </p>
            </div>
          </SpotlightCard>

          {/* Bezpieczeństwo Pacjenta */}
          <SpotlightCard>
            <div className="flex flex-col gap-5 p-8 md:p-10 lg:p-11">
              <div>
                <ShieldCheck style={{ width: 22, height: 22, color: "#C0C0C0" }} />
              </div>
              <h3 style={cardTitleStyle}>Bezpieczeństwo Pacjenta</h3>
              <p style={cardDescStyle}>
                Zautomatyzowany wywiad medyczny. Weronika bezbłędnie wyłapuje przeciwwskazania do zabiegów jeszcze przed potwierdzeniem wizyty.
              </p>
            </div>
          </SpotlightCard>

          {/* Ochrona Biznesu */}
          <SpotlightCard>
            <div className="flex flex-col gap-5 p-8 md:p-10 lg:p-11">
              <div>
                <AlertCircle style={{ width: 22, height: 22, color: "#C0C0C0" }} />
              </div>
              <h3 style={cardTitleStyle}>Ochrona Biznesu</h3>
              <p style={cardDescStyle}>
                System wczesnego reagowania. Natychmiastowe powiadomienia SMS w przypadku sytuacji kryzysowych.
              </p>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </ScrollReveal>
  );
}