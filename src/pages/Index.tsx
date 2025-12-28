import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import Process from "@/components/landing/HowWeBuildSection";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { SelectedWorkSection } from "@/components/landing/SelectedWorkSection";
import { AnalyticsSection } from "@/components/landing/AnalyticsSection";
import { FooterCTA } from "@/components/landing/FooterCTA";
import CTA from "@/components/landing/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <Process />
        <SolutionsSection />
        <SelectedWorkSection />
        {/* <AnalyticsSection /> */}
        <CTA/>
      </main>
      <FooterCTA />
    </div>
  );
};

export default Index;
