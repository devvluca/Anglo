import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MissionSection } from "@/components/MissionSection";
import { CategoriesSection } from "@/components/OurPillars";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MissionSection />
      <CategoriesSection /> 
  <TestimonialsSection />
  <NewsletterSection />
  <Footer />
    </div>
  );
};

export default Index;
