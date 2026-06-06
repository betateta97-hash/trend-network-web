"use client";

// Suppress Three.js Clock deprecation warnings from React Three Fiber in console/terminal
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (args[0] && typeof args[0] === "string" && args[0].includes("THREE.Clock")) {
      return;
    }
    originalWarn(...args);
  };
}

import { useState, useEffect } from "react";
import Preloader from "@/components/ui/Preloader";
import LeadModal from "@/components/ui/LeadModal";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/hero/Hero";
import GlobalReach from "@/components/sections/GlobalReach";
import Services from "@/components/sections/Services";
import Radius from "@/components/sections/Radius";
import Portfolio from "@/components/sections/Portfolio";
import { Server } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";

export default function Home() {
  const { language, theme } = useApp();
  const t = translations[language];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#090d16] flex flex-col selection:bg-brand-blue selection:text-white transition-colors duration-300">
      {/* 1. Page Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* 2. Lead Form Popup Modal */}
      <LeadModal isOpen={isModalOpen} onClose={closeModal} />

      {/* 3. Floating Pill Navbar */}
      {!isLoading && <Navbar onOpenModal={openModal} />}

      {/* 4. Hero Section */}
      <Hero onOpenModal={openModal} />

      {/* 5. Services Bento Grid */}
      <Services />

      {/* 5.5. Super Speed Radius Section */}
      <Radius />

      {/* 6. Global Reach Grid */}
      <GlobalReach />

      {/* 7. Portfolio Coffee Shop Success Stories */}
      <Portfolio />

      {/* 8. Final CTA + Footer */}
      {/* 8. Final CTA */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden text-white"
        style={{ background: theme === 'dark' ? "linear-gradient(135deg, #070a12 0%, #0c0a2b 50%, #070a12 100%)" : "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(79,70,229,0.15) 0%, transparent 60%)" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Logo mark */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8"
            style={{ background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.3)" }}
          >
            <Server className="w-7 h-7 text-indigo-300" />
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-black mb-6 leading-tight">
            {t.cta_title_1}{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8, #60a5fa)" }}
            >
              {t.cta_title_2}
            </span>
          </h2>

          <p className="text-slate-400 font-sans text-lg mb-12 leading-relaxed max-w-xl mx-auto">
            {t.cta_description}
          </p>

          <button
            onClick={openModal}
            className="px-10 py-5 rounded-2xl text-white font-bold text-base transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] hover:shadow-[0_20px_60px_rgba(79,70,229,0.55)] hover:-translate-y-1"
            style={{
              boxShadow: "0 10px 40px rgba(79, 70, 229, 0.40)",
            }}
          >
            {t.cta_btn}
          </button>
        </div>
      </section>

      {/* 9. Premium Footer with Letter Stretch Typography */}
      <footer className="w-full bg-[#090d16] text-white pt-20 pb-10 overflow-hidden relative border-t border-slate-900">
        
        {/* Massive TREND NETWORK Letters with Hover-Stretch Effect */}
        <div className="w-full flex justify-center items-start py-10 md:py-16 px-4">
          <div className="flex items-center justify-center flex-wrap gap-y-4 gap-x-6 md:gap-x-12 leading-none select-none max-w-7xl" dir="ltr">
            
            {/* Word: TREND */}
            <div className="flex items-center whitespace-nowrap">
              {"TREND".split("").map((char, index) => (
                <div key={`trend-${index}`} className="relative group/letter inline-block">
                  <span className="absolute -top-3 md:-top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4f46e5] opacity-0 scale-0 group-hover/letter:opacity-100 group-hover/letter:scale-100 transition-all duration-500 ease-out pointer-events-none" />
                  <span 
                    className="font-bebas text-[12vw] sm:text-[10.5vw] md:text-[9vw] lg:text-[8.5vw] xl:text-[8vw] font-black leading-none inline-block transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top group-hover/letter:scale-y-[1.38] select-none text-white/90"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {char}
                  </span>
                </div>
              ))}
            </div>

            {/* Word: NETWORK */}
            <div className="flex items-center whitespace-nowrap">
              {"NETWORK".split("").map((char, index) => (
                <div key={`network-${index}`} className="relative group/letter inline-block">
                  <span className="absolute -top-3 md:-top-5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4f46e5] opacity-0 scale-0 group-hover/letter:opacity-100 group-hover/letter:scale-100 transition-all duration-500 ease-out pointer-events-none" />
                  <span 
                    className="font-bebas text-[12vw] sm:text-[10.5vw] md:text-[9vw] lg:text-[8.5vw] xl:text-[8vw] font-black leading-none inline-block transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top group-hover/letter:scale-y-[1.38] select-none text-white/90"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {char}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Thin Divider Line */}
        <div className="w-[90%] max-w-7xl mx-auto h-[1px] bg-slate-800/40 my-8" />

        {/* Footer Bottom Bar */}
        <div className="w-[90%] max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 font-sans text-xs md:text-sm">
          {/* Right: Copyright Text */}
          <div className="text-center md:text-right order-1 md:order-2">
            <p>{t.footer_copyright} {new Date().getFullYear()}</p>
          </div>

          {/* Left: Contact info */}
          <div className="flex items-center justify-center md:justify-start order-2 md:order-1 w-full md:w-auto">
            {/* Email and Phone */}
            <div className="text-center md:text-left font-mono tracking-wider flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-slate-400">
              <span>sales@trendnetwork.com</span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <span dir="ltr">+20 100 000 0000</span>
            </div>
          </div>
        </div>

      </footer>

      {/* Floating Back-to-Top Button on the far Left, slightly larger & premium */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 left-8 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#090d16]/90 backdrop-blur-md hover:bg-[#111827] border border-white/10 hover:border-[#3b82f6]/50 text-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5),_0_0_15px_rgba(79,70,229,0.2)] transition-all duration-300 cursor-pointer group ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
        }`}
        title={t.footer_back_to_top}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#4f46e5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-6 h-6 md:w-7 h-7 text-white transition-transform duration-300 group-hover:-translate-y-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
          />
        </svg>
      </button>
    </div>
  );
}
