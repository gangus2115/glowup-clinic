import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import FAQAccordion from "@/components/FAQAccordion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <FAQAccordion />
      <ExitIntentModal />
    </main>
  );
}
