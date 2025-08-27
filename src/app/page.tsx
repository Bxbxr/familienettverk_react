// src/app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import LatestActivitiesSection from "@/components/home/LatestActivitiesSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhoWeAreSection />
      <LatestActivitiesSection />
    </div>
  );
}
