import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { UnifiedAboutSection } from "@/components/UnifiedAboutSection";
import { MissionSection } from "@/components/MissionSection";
import { CategoriesSection } from "@/components/OurPillars";
import { ColorsSection } from "@/components/ColorsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <UnifiedAboutSection />
      <MissionSection />
      <CategoriesSection /> 
      <ColorsSection />
      {/* <TestimonialsSection /> */}
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
