"use client";

import { motion } from "framer-motion";
import { 
  Truck, ArrowRightLeft, Route, Recycle, Factory, 
  CheckCircle, Box, Trash2, Globe2 
} from "lucide-react";

const steps = [
  { id: 1, title: "Waste Collection", icon: Truck },
  { id: 2, title: "Segregation", icon: ArrowRightLeft },
  { id: 3, title: "Transportation", icon: Route },
  { id: 4, title: "Material Recovery", icon: Recycle },
  { id: 5, title: "Manufacturing", icon: Factory },
  { id: 6, title: "Quality Checking", icon: CheckCircle },
  { id: 7, title: "Distribution", icon: Box },
  { id: 8, title: "Safe Disposal", icon: Trash2 },
  { id: 9, title: "Environmental Impact", icon: Globe2 },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 relative bg-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[#25D366]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#16A34A] text-sm font-semibold mb-4">
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            How Recycling <span className="text-[#25D366]">Works</span>
          </h2>
          <p className="text-lg text-gray-600">
            A systematic, transparent, and eco-friendly approach to ensure maximum resource recovery and minimal environmental footprint.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[50px] left-[50px] right-[50px] h-1 bg-gradient-to-r from-[#25D366]/20 via-[#25D366] to-[#25D366]/20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  {/* Icon Node */}
                  <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-6 relative group-hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-[#25D366]/10 bg-white">
                    <div className="absolute inset-1 rounded-full border-2 border-dashed border-[#25D366]/30 group-hover:border-[#25D366] group-hover:animate-[spin_4s_linear_infinite]" />
                    <Icon size={32} className="text-[#25D366]" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center text-sm font-bold shadow-lg">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  
                  {/* Mobile Connector */}
                  {index !== steps.length - 1 && (
                    <div className="lg:hidden w-1 h-8 bg-gradient-to-b from-[#25D366]/50 to-transparent my-2" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
