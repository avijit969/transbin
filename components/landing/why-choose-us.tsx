"use client";

import { motion } from "framer-motion";
import { Leaf, Clock, Award, Users, Shield, Repeat } from "lucide-react";

const features = [
  { icon: Leaf, title: "Eco-Friendly Solutions", desc: "Commitment to zero-waste and green practices." },
  { icon: Clock, title: "Fast Pickup", desc: "Prompt and reliable waste collection on your schedule." },
  { icon: Award, title: "Government Compliance", desc: "Fully certified and compliant with environmental laws." },
  { icon: Users, title: "Experienced Team", desc: "Professionals trained in safe waste handling and processing." },
  { icon: Shield, title: "Safe Waste Handling", desc: "Strict safety protocols for hazardous and e-waste." },
  { icon: Repeat, title: "End-To-End Management", desc: "From collection to recycling and safe disposal." },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 relative bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#16A34A] text-sm font-semibold mb-4">
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            The TrashBin <span className="text-[#25D366]">Advantage</span>
          </h2>
          <p className="text-lg text-gray-600">
            We are more than just a waste management company. We are your partners in building a sustainable future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#25D366]/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <Icon size={120} className="text-[#25D366]" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-6 group-hover:bg-[#25D366] transition-colors duration-300">
                    <Icon size={24} className="text-[#25D366] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
