import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ProcessSection } from "@/components/landing/process-section";
import { WhatsAppButton } from "@/components/landing/whatsapp-button";

export default function ProcessPage() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-[#25D366] selection:text-white pt-20">
      <Navbar />
      <ProcessSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
