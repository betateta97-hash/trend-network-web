"use client";

import { motion } from "framer-motion";

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-4"
    >
      <div className="max-w-7xl mx-auto rounded-[32px] mt-6 bg-white/95 backdrop-blur-md shadow-sm border border-white/20 px-8 py-3.5 flex items-center justify-between">
        {/* Right side in RTL: Logo & Sleek Tech Icon */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] text-white shadow-md shadow-sky-500/20">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              <path d="M12 13c-4 0-7 2-7 4.5V20h14v-2.5c0-2.5-3-4.5-7-4.5z" />
              <path d="M7.5 5a6 6 0 0 1 9 0" strokeWidth="2" strokeDasharray="1.5 1.5" />
              <path d="M9.5 6.5a3.5 3.5 0 0 1 5 0" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-col text-start leading-none font-display select-none">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">TREND</span>
            <span className="text-sm font-black text-[#4f46e5] tracking-wider uppercase mt-1">NETWORK</span>
          </div>
        </div>

        {/* Center: Navigation Links matching reference */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600">
          <a
            href="#services"
            className="relative hover:text-[#4f46e5] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#4f46e5] hover:after:w-full after:transition-all after:duration-300"
          >
            خدماتنا
          </a>
          <a
            href="#global-reach"
            className="relative hover:text-[#4f46e5] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#4f46e5] hover:after:w-full after:transition-all after:duration-300"
          >
            الأسعار
          </a>
          <a
            href="#portfolio"
            className="relative hover:text-[#4f46e5] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#4f46e5] hover:after:w-full after:transition-all after:duration-300"
          >
            من نحن
          </a>
          <button
            onClick={onOpenModal}
            className="relative hover:text-[#4f46e5] transition-colors duration-200 cursor-pointer after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#4f46e5] hover:after:w-full after:transition-all after:duration-300"
          >
            تواصل معنا
          </button>
        </nav>

        {/* Left: CTA Button with arrow matching reference */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenModal}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <span>اشترك الآن</span>
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
