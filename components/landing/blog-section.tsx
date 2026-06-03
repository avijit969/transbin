"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/lib/data/blogs";

export function BlogSection() {
  return (
    <section id="blog" className="py-24 relative bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#16A34A] text-sm font-semibold mb-4">
              Latest Insights
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
              News & <span className="text-[#25D366]">Articles</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-[#16A34A] font-semibold hover:text-[#1FAF57] transition-colors"
          >
            View All Posts
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-4 rounded-3xl cursor-pointer hover:shadow-2xl hover:shadow-[#25D366]/20 transition-all duration-300 h-full"
              >
                {/* Image Placeholder with Gradient */}
                <div className={`w-full h-48 rounded-2xl mb-6 overflow-hidden relative`}>
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-80 group-hover:scale-110 transition-transform duration-700`} />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="px-2 pb-2 flex flex-col h-[calc(100%-14rem)]">
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="font-semibold text-[#25D366] uppercase tracking-wider">{blog.category}</span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-500">{blog.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#25D366] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                    {blog.content}
                  </p>
                  <div className="flex items-center text-gray-500 font-medium group-hover:text-[#25D366] transition-colors mt-auto">
                    Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
