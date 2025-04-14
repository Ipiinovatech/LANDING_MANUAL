import { AboutSection } from "./sections/AboutSection";
import { AboutButtons } from "./sections/about/AboutButtons";
import { ServicesSection } from "./sections/ServicesSection";
import { ProductsSection } from "./sections/ProductsSection";
import { BlogSection } from "./sections/BlogSection";
import { BrochureSection } from "./sections/BrochureSection";
import { FaqSection } from "./sections/FaqSection";
import { ContactSection } from "./sections/ContactSection";

export function Sections() {
  return (
    <>
      <AboutSection />
      <AboutButtons />
      <ServicesSection />
      <ProductsSection />
      <BlogSection />
      <BrochureSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}