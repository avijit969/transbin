import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { blogs } from "@/lib/data/blogs";
import { WhatsAppButton } from "@/components/landing/whatsapp-button";

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-gray-50 selection:bg-[#25D366] selection:text-white pt-20">
      <Navbar />

      <article className="pb-24 pt-12">
        {/* Header section with image */}
        <header className="container mx-auto px-4 md:px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#16A34A] hover:text-[#1FAF57] font-medium mb-8 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to all posts
            </Link>

            <div className="flex items-center gap-4 mb-6 text-sm">
              <span className="font-semibold text-[#25D366] uppercase tracking-wider">{blog.category}</span>
              <span className="text-gray-400">&bull;</span>
              <span className="text-gray-500">{blog.date}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
              {blog.title}
            </h1>

            {blog.image ? (
              <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            ) : (
              <div className={`w-full h-[300px] md:h-[500px] rounded-3xl mb-12 bg-gradient-to-br ${blog.gradient} opacity-80`} />
            )}
          </div>
        </header>

        {/* Content section */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-[#25D366]/5 border border-gray-100">
            <div className="prose prose-lg md:prose-xl text-gray-700 leading-relaxed max-w-none">
              <p className="text-xl text-gray-600 font-medium mb-8">
                {blog.content}
              </p>

              <p>
                In today's rapidly changing landscape, the shift towards a more sustainable and environmentally conscious framework has never been more critical.
                As businesses, governments, and individuals become more aware of the long-term impact of their daily choices,
                new innovations and policies are being developed to rethink how we manage resources.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Need for Immediate Action</h2>
              <p>
                The traditional linear model of "take, make, dispose" is proving to be unsustainable.
                Our environment is sending clear signals that a systemic change is necessary to preserve
                ecosystems and ensure that future generations inherit a healthy planet.
                This shift requires continuous education, advanced technological intervention, and stringent policy reforms.
              </p>

              <div className="my-8 p-6 bg-green-50 border-l-4 border-[#25D366] rounded-r-2xl">
                <p className="italic text-gray-700 m-0">
                  "Sustainability is no longer about doing less harm. It's about doing more good. The circular economy model allows us to rethink our processes from the ground up."
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Looking Forward</h2>
              <p>
                As we continue to explore and implement these strategies, collaboration remains key.
                From local community initiatives to global corporate commitments, everyone has a role to play.
                The journey towards zero waste and optimal resource recovery is long, but every step forward is a victory for the planet.
              </p>
            </div>
          </div>
        </div>
      </article>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
