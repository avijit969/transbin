"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do you provide doorstep pickup?",
    answer: "Yes, we provide scheduled doorstep waste collection for residential societies, commercial buildings, and industrial facilities across our service areas.",
  },
  {
    question: "Do you recycle e-waste?",
    answer: "Absolutely! We handle electronic waste safely and securely. This includes proper data destruction and ensuring valuable metals are recovered and toxic components are disposed of responsibly.",
  },
  {
    question: "Do you provide composting services?",
    answer: "Yes, we offer both centralized and decentralized composting solutions for bulk waste generators like restaurants, hotels, and large residential complexes.",
  },
  {
    question: "Which areas do you serve?",
    answer: "Currently, our primary operations are based in Patna, Delhi, Kolkata, Ranchi, and Jaipur. We are continuously expanding to more smart cities across India.",
  },
  {
    question: "What are your working hours?",
    answer: "Our collection teams operate from 6:00 AM to 6:00 PM, Monday through Saturday. Our customer support is available 24/7 for urgent industrial requirements.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 relative bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#16A34A] text-sm font-semibold mb-6">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
              Got Questions? <br /> We've Got <span className="text-[#25D366]">Answers</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Find answers to common questions about our waste management and recycling services. If you need further assistance, our team is always ready to help.
            </p>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-3xl shadow-xl shadow-[#25D366]/5">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-0 px-2">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-[#25D366] py-6 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-6 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
