import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TrashBin Private Limited | Sustainable Waste Management",
  description: "Eco-friendly waste collection, recycling, and sustainability services for homes, industries, institutions, and smart cities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased scroll-smooth", inter.variable)}>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-[#25D366] selection:text-white">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
