"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
          isScrolled ? "glass-panel" : "bg-transparent"
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo/trashbin-logo.png" alt="TrashBin Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              TrashBin <span className="text-[#25D366] font-medium text-sm hidden sm:inline-block">Pvt. Ltd.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#25D366] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:flex items-center justify-center rounded-full bg-white border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-[#25D366] hover:border-[#25D366] transition-all hover:-translate-y-0.5"
            >
              Login
            </Link>
            <Link
              href="/#contact"
              className="hidden md:flex items-center justify-center rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#1FAF57] hover:shadow-xl hover:shadow-[#25D366]/40 transition-all hover:-translate-y-0.5"
            >
              Get Waste Pickup
            </Link>
            
            <button
              className="md:hidden text-gray-700 hover:text-[#25D366] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 px-4 md:hidden"
          >
            <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4 shadow-xl">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-800 hover:text-[#25D366] border-b border-gray-100 pb-2"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-[#25D366] border-b border-gray-100 pb-2"
              >
                Login
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-[#1FAF57] transition-all"
              >
                Get Waste Pickup
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
