import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { ServicesSection } from "@/components/landing/services-section";
import { ProcessSection } from "@/components/landing/process-section";
import { WhyChooseUsSection } from "@/components/landing/why-choose-us";
import { ImpactSection } from "@/components/landing/impact-section";
import { BlogSection } from "@/components/landing/blog-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { WhatsAppButton } from "@/components/landing/whatsapp-button";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-[#25D366] selection:text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <ImpactSection />
      <BlogSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}