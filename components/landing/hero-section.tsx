"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Recycle, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-[#25D366]/10 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-[#86EFAC]/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#16A34A] text-sm font-semibold mb-6">
              <span>🌱</span> Sustainable Waste Management
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Recycle <span className="text-[#25D366]">•</span> Reuse <span className="text-[#25D366]">•</span> Restore
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 font-medium mb-4 max-w-xl">
              Creating A Cleaner & Greener Tomorrow with Smart Waste Management Solutions.
            </p>

            <p className="text-gray-600 text-lg mb-8 max-w-lg leading-relaxed">
              Eco-friendly waste collection, recycling, and sustainability services for homes, industries, institutions, and smart cities.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#services"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#1FAF57] hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#contact"
                className="flex items-center gap-2 rounded-full bg-white border-2 border-gray-100 px-8 py-4 text-base font-semibold text-gray-700 hover:border-[#25D366] hover:text-[#25D366] transition-all hover:-translate-y-1"
              >
                <PhoneCall size={18} />
                Contact Us
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Illustration & Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center"
          >
            {/* Main Center Piece (Abstract representation) */}
            <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full overflow-hidden flex items-center justify-center shadow-2xl shadow-[#25D366]/40 border-8 border-white group">
              <div className="absolute inset-0 bg-[#25D366]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image 
                src="/images/hero_landing.png"
                alt="Sustainable Smart City"
                fill
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Floating Stat Card 1 */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 -left-4 md:left-0 glass-panel p-4 rounded-2xl flex items-center gap-4 shadow-xl shadow-[#25D366]/10"
            >
              <div className="bg-[#25D366] p-3 rounded-xl text-white">
                <Recycle size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">10K+</p>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Waste Collections</p>
              </div>
            </motion.div>

            {/* Floating Stat Card 2 */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 -right-4 md:right-0 glass-panel p-4 rounded-2xl flex items-center gap-4 shadow-xl shadow-[#25D366]/10"
            >
              <div className="bg-[#16A34A] p-3 rounded-xl text-white">
                <Users size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Partners</p>
              </div>
            </motion.div>

            {/* Floating Stat Card 3 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-4 left-10 md:left-20 glass-panel p-4 rounded-2xl flex items-center gap-4 shadow-xl shadow-[#25D366]/10"
            >
              <div className="bg-[#22C55E] p-3 rounded-xl text-white">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Recycling Efficiency</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
