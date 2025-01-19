import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
// import navbar
import Navbar from "@/components/Navbar";
// import providers

const inter = Inter({
  subsets: ["cyrillic-ext", "greek"],
});

export const metadata: Metadata = {
  title: "Crime Report",
  description: "Report and track crimes to help law enforcement keep your community safe."
}

// Export root layout for entire application
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen bg-black selection:bg-sky-500/20">

          {/* Gradient Background */}
          <div className="fixed inset-0 -z-10 min-h-screen">
            <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
            <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
          </div>

          {/* Navbar  */}
          <Navbar/>

          {/* Main div: Providers wrapped around here */}
          <div className="pt-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}