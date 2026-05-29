"use client";

import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Rajeev Sharma",
    role: "Facility Manager",
    city: "Patna",
    content: "TrashBin transformed how we manage our commercial building's waste. Their prompt service and recycling reports are fantastic.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Resident Society Secretary",
    city: "Delhi",
    content: "We partnered with them for our housing society. The segregation training they provided was excellent. Highly recommended!",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Factory Owner",
    city: "Jaipur",
    content: "Their industrial waste management and safe disposal services are top-notch. It ensures we stay compliant with environmental laws.",
    rating: 5,
  },
  {
    name: "Priya Mukherjee",
    role: "School Principal",
    city: "Kolkata",
    content: "TrashBin's awareness campaigns and e-waste collection drives in our school really educated our students about sustainability.",
    rating: 4,
  },
  {
    name: "Amit Kumar",
    role: "Restaurant Owner",
    city: "Ranchi",
    content: "The composting solutions they offered helped us reduce our wet waste disposal costs significantly.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#16A34A] text-sm font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            What Our <span className="text-[#25D366]">Clients</span> Say
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="glass-panel p-6 rounded-3xl h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-[#25D366] text-[#25D366]" />
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed italic mb-6">"{t.content}"</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#86EFAC] to-[#25D366] flex items-center justify-center text-white font-bold text-lg shadow-inner">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                        <p className="text-sm text-gray-500">{t.role}, {t.city}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white hover:bg-[#25D366] hover:text-white border-0 shadow-lg text-gray-700 h-12 w-12" />
            <CarouselNext className="hidden md:flex -right-12 bg-white hover:bg-[#25D366] hover:text-white border-0 shadow-lg text-gray-700 h-12 w-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
