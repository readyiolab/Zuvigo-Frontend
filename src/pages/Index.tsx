import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowWeBuildSection } from "@/components/landing/HowWeBuildSection";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { SelectedWorkSection } from "@/components/landing/SelectedWorkSection";
import { AnalyticsSection } from "@/components/landing/AnalyticsSection";
import { FooterCTA } from "@/components/landing/FooterCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowWeBuildSection />
        <SolutionsSection />
        <SelectedWorkSection />
        {/* <AnalyticsSection /> */}
      </main>
      <FooterCTA />
    </div>
  );
};

export default Index;
