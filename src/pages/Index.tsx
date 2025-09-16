import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { InfoBanner } from "@/components/InfoBanner";
import { FeaturedBooks } from "@/components/FeaturedBooks";
import { MissionSection } from "@/components/MissionSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* <CategoriesSection /> */}
      {/*<InfoBanner /> */}
      {/* <FeaturedBooks /> */}
      <MissionSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
