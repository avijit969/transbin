"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: 50, suffix: "K+", label: "Tons Recycled" },
  { value: 1, suffix: "M+", label: "KG Plastic Processed" },
  { value: 100, suffix: "+", label: "Cities Served" },
  { value: 500, suffix: "+", label: "Industrial Clients" },
];

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = (duration / end) * 2;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <div ref={ref} className="glass-panel p-8 rounded-3xl text-center group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#25D366]/20 transition-all duration-300">
      <div className="text-5xl lg:text-6xl font-extrabold text-[#111827] mb-2 font-mono flex items-center justify-center">
        {count}
        <span className="text-[#25D366]">{suffix}</span>
      </div>
      <p className="text-gray-500 font-semibold tracking-wide uppercase text-sm mt-4">{label}</p>
    </div>
  );
}

export function ImpactSection() {
  return (
    <section className="py-24 relative bg-[#111827] overflow-hidden">
      {/* Dark background with green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#25D366]/20 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Our Environmental <span className="text-[#25D366]">Impact</span>
          </h2>
          <p className="text-lg text-gray-400">
            Every step we take contributes to a massive shift towards a greener planet. The numbers speak for themselves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
