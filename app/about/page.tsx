import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { AboutSection } from "@/components/landing/about-section";
import { WhatsAppButton } from "@/components/landing/whatsapp-button";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-[#25D366] selection:text-white pt-20">
      <Navbar />
      <AboutSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
