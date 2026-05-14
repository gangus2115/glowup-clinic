import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ExitIntentModal } from "@/components/ExitIntentModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <ExitIntentModal />
    </main>
  );
}

