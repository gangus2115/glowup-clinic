import React from "react";
import { Calendar, ShieldCheck, AlertCircle } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

export function FeaturesSection() {
  const features = [
    {
      Icon: ShieldCheck,
      name: "Bezpieczeństwo Pacjenta",
      description: "Zautomatyzowany wywiad medyczny. Weronika wyłapuje przeciwwskazania przed wizytą.",
      href: "#",
      cta: "Więcej informacji",
      className: "md:col-span-2",
      background: <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />,
    },
    {
      Icon: Calendar,
      name: "Inteligentny Kalendarz",
      description: "Rezerwacje 24/7 bez luk w grafiku.",
      href: "#",
      cta: "Zarządzaj rezerwacjami",
      className: "md:col-span-1",
      background: <div className="absolute inset-0 bg-stone-50/50 pointer-events-none" />,
    },
    {
      Icon: AlertCircle,
      name: "Ochrona Biznesu",
      description: "Zabezpieczenie przychodów dzięki zintegrowanym płatnościom Stripe.",
      href: "#",
      cta: "Skonfiguruj płatności",
      className: "md:col-span-3 lg:col-span-1", // Zmieniłem na 3 na md żeby ładnie wyglądało, na lg col-span-1 będzie puste miejsce
      background: <div className="absolute inset-0 bg-stone-50/50 pointer-events-none" />,
    }
  ];

  return (
    <section className="bg-white py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-800">
            Zarządzanie na najwyższym poziomie.
          </h2>
        </div>

        <BentoGrid className="lg:grid-rows-2">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

