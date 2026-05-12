import React from "react";
import { Calendar, ShieldCheck, AlertCircle } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-stone-400 stroke-[1.5]" />,
      title: "Niezawodny Kalendarz",
      desc: "Inteligentne zarządzanie rezerwacjami 24/7. System sam układa wizyty, eliminując puste okienka i maksymalizując zyski."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-stone-400 stroke-[1.5]" />,
      title: "Bezpieczeństwo Pacjenta",
      desc: "Zautomatyzowany wywiad medyczny. Weronika bezbłędnie wyłapuje przeciwwskazania do zabiegów jeszcze przed potwierdzeniem wizyty."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-stone-400 stroke-[1.5]" />,
      title: "Ochrona Biznesu",
      desc: "System wczesnego reagowania. Natychmiastowe powiadomienia SMS do właściciela w przypadku sytuacji kryzysowych lub nietypowych próśb."
    }
  ];

  return (
    <section className="bg-white py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-800">
            Zarządzanie na najwyższym poziomie.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group flex flex-col p-10 bg-white border border-stone-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-transparent rounded-2xl"
            >
              <div className="mb-8 p-4 rounded-full bg-stone-50 w-fit group-hover:scale-105 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-light text-neutral-800 mb-4 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-stone-500 font-light leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

