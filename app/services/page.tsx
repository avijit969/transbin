import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ServicesSection } from "@/components/landing/services-section";
import { WhatsAppButton } from "@/components/landing/whatsapp-button";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-[#25D366] selection:text-white pt-20">
      <Navbar />
      <ServicesSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
