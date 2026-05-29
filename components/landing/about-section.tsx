"use client";

import { motion } from "framer-motion";
import { CheckCircle2, LeafyGreen } from "lucide-react";

const features = [
  "Cleaner Cities",
  "Smart Recycling",
  "Resource Recovery",
  "Environmental Protection",
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative h-full min-h-[400px] rounded-[2.5rem] bg-gradient-to-br from-[#DCFCE7] to-[#86EFAC] flex items-center justify-center p-8 shadow-2xl shadow-[#25D366]/10"
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-[2.5rem]"></div>
            <div className="relative z-10 glass-panel p-10 rounded-3xl text-center max-w-sm">
              <LeafyGreen size={80} className="mx-auto text-[#1FAF57] mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                To transform waste into wealth and preserve our environment for future generations.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#16A34A] text-sm font-semibold mb-6">
              About Us
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Building A <span className="text-[#25D366]">Sustainable</span> Future
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              TrashBin Private Limited focuses on sustainable waste management, eco-friendly recycling, pollution reduction, and resource recovery to build cleaner and greener communities. We believe in the power of the circular economy to create lasting environmental impact.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="glass-panel p-4 rounded-xl flex items-center gap-3 hover:border-[#25D366]/50 hover:shadow-md transition-all group"
                >
                  <CheckCircle2 className="text-[#25D366] group-hover:scale-110 transition-transform" size={20} />
                  <span className="font-semibold text-gray-800">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
