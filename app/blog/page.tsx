import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { BlogSection } from "@/components/landing/blog-section";
import { WhatsAppButton } from "@/components/landing/whatsapp-button";

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-[#25D366] selection:text-white pt-20">
      <Navbar />
      <BlogSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
