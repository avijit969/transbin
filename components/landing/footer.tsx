import Link from "next/link";
import { Leaf, Mail, PhoneCall, MapPin, Hash, MessageSquare, Share2, Link as LinkIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#25D366]/5 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src="/logo/trashbin-logo.png" alt="TrashBin Logo" className="h-10 w-auto" />
              <span className="font-bold text-2xl text-gray-900 tracking-tight">
                TrashBin
              </span>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Leading the way in sustainable waste management, recycling, and environmental protection across India.
            </p>
            <div className="flex gap-4">
              {[Hash, MessageSquare, Share2, LinkIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-600 hover:text-[#25D366] hover:-translate-y-1 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "About Us", "Our Services", "Process", "Blog"].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-gray-600 hover:text-[#25D366] transition-colors font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              {["Waste Collection", "Plastic Recycling", "E-Waste Management", "Composting", "EPR Solutions"].map((link) => (
                <li key={link}>
                  <Link href="#services" className="text-gray-600 hover:text-[#25D366] transition-colors font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div id="contact">
            <h4 className="font-bold text-gray-900 text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="text-[#25D366] shrink-0 mt-1" size={20} />
                <span>203, 2nd Floor, Block-B, Capital Tower,<br />Fraser Road, Patna-800001</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <PhoneCall className="text-[#25D366] shrink-0" size={20} />
                <span>0612-319 9940</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="text-[#25D366] shrink-0" size={20} />
                <div className="flex flex-col">
                  <a href="mailto:info@trashbin.co.in" className="hover:text-[#25D366] transition-colors">info@trashbin.co.in</a>
                  <a href="mailto:sales@trashbin.co.in" className="hover:text-[#25D366] transition-colors">sales@trashbin.co.in</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 font-medium text-center md:text-left">
            © {new Date().getFullYear()} TrashBin Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 font-medium">
            <Link href="#" className="hover:text-[#25D366] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#25D366] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
