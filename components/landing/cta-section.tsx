"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Leaf } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CtaSection() {
  return (
    <section className="py-24 relative bg-gray-50/50 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[3rem] overflow-hidden bg-[#111827] flex flex-col md:flex-row items-center justify-between p-8 md:p-16 lg:p-20 shadow-2xl"
        >
          {/* Background Image and Gradients */}
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              src="/images/cta_bg.png"
              alt="Green abstract background"
              fill
              className="object-cover opacity-60 mix-blend-overlay pointer-events-none"
            />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#25D366]/30 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#16A34A]/20 to-transparent rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-2xl mb-10 md:mb-0 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#86EFAC] text-sm font-semibold mb-6 backdrop-blur-md border border-white/5">
              <Leaf size={16} /> Ready to make a change?
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Join The <span className="text-[#25D366]">Green Revolution</span>
            </h2>
            <p className="text-xl text-gray-300 font-medium">
              Together we can create a cleaner and sustainable future. Let's manage waste the right way.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="#contact"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#1FAF57] transition-all hover:-translate-y-1 w-full sm:w-auto"
            >
              Schedule Pickup
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#contact"
              className="flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-lg font-bold text-white hover:bg-white/20 transition-all hover:-translate-y-1 w-full sm:w-auto"
            >
              <Phone size={20} />
              Contact Team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
