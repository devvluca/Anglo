import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MissionSection } from "@/components/MissionSection";
import { CategoriesSection } from "@/components/OurPillars";
import { ColorsSection } from "@/components/ColorsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { ProductsSection } from "@/components/ProductsSection";
import { ChatWidget } from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <MissionSection />
      <CategoriesSection /> 
      {/* <ColorsSection /> */}
      {/* <TestimonialsSection /> */}
      <NewsletterSection />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
