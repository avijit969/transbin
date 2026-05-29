"use client";

import { motion } from "framer-motion";
import { 
  Trash2, Layers, Recycle, FileText, MonitorSmartphone, 
  Wheat, Sprout, Hammer, Truck, Factory, Trash, ShieldCheck 
} from "lucide-react";

const services = [
  { icon: Trash2, title: "Waste Collection", desc: "Reliable and timely waste pickup for homes and businesses." },
  { icon: Layers, title: "Waste Segregation", desc: "Advanced sorting of wet, dry, and hazardous materials." },
  { icon: Recycle, title: "Plastic Recycling", desc: "Converting plastic waste into reusable raw materials." },
  { icon: FileText, title: "Paper Recycling", desc: "Eco-friendly paper pulping and recycling processes." },
  { icon: MonitorSmartphone, title: "E-Waste Management", desc: "Safe disposal and data destruction for electronics." },
  { icon: Wheat, title: "Agro Waste Management", desc: "Transforming agricultural residue into useful by-products." },
  { icon: Sprout, title: "Composting", desc: "Organic waste conversion into nutrient-rich compost." },
  { icon: Hammer, title: "Construction Waste", desc: "Processing construction and demolition debris safely." },
  { icon: Truck, title: "Reverse Logistics", desc: "Efficient return flow of materials back into the supply chain." },
  { icon: Factory, title: "RDF Transportation", desc: "Refuse-Derived Fuel transport to cement plants and factories." },
  { icon: Trash, title: "Waste Disposal (EOL)", desc: "End-of-life safe and compliant waste disposal." },
  { icon: ShieldCheck, title: "EPR & FR Credit", desc: "Extended Producer Responsibility compliance solutions." },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 relative bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#16A34A] text-sm font-semibold mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            Comprehensive <span className="text-[#25D366]">Solutions</span>
          </h2>
          <p className="text-lg text-gray-600">
            We provide end-to-end waste management services tailored to create a circular economy and protect our environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-panel p-6 rounded-2xl group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#25D366]/20 transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/0 to-[#25D366]/0 group-hover:from-[#25D366]/5 group-hover:to-[#86EFAC]/10 transition-colors duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white/80 shadow-sm flex items-center justify-center mb-6 group-hover:bg-[#25D366] group-hover:text-white text-[#25D366] transition-colors duration-300">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
