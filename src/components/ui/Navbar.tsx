"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { Globe, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const { language, theme, toggleLanguage, toggleTheme } = useApp();
  const t = translations[language];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-4"
    >
      <div className="max-w-7xl mx-auto rounded-2xl md:rounded-[32px] mt-3 md:mt-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border border-white/20 dark:border-slate-800/80 px-4 md:px-8 py-2.5 md:py-3.5 flex items-center justify-between transition-colors duration-300">
        {/* Right side in RTL / Left in LTR: Logo & Sleek Tech Icon */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] text-white shadow-md shadow-sky-500/20">
            <svg className="w-5.5 h-5.5 md:w-6.5 md:h-6.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" />
              <path d="M8.5 13.5a5 5 0 0 1 7 0" />
              <path d="M5 9.5a10 10 0 0 1 14 0" />
              <path d="M1.5 5.5a15 15 0 0 1 21 0" />
            </svg>
          </div>
          <div className="flex flex-col text-start leading-none font-display select-none">
            <span className="text-[8px] md:text-[11px] font-bold text-slate-400 tracking-widest uppercase">TREND</span>
            <span className="text-xs md:text-base font-black text-[#4f46e5] tracking-wider uppercase mt-0.5 md:mt-1">NETWORK</span>
          </div>
        </div>

        {/* Center: Navigation Links matching reference */}
        <nav className="hidden md:flex items-center gap-10 text-base font-semibold text-slate-600 dark:text-slate-300">
          <a
            href="#services"
            className="relative hover:text-[#4f46e5] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#4f46e5] hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav_services}
          </a>
          <a
            href="#global-reach"
            className="relative hover:text-[#4f46e5] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#4f46e5] hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav_pricing}
          </a>
          <a
            href="#portfolio"
            className="relative hover:text-[#4f46e5] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#4f46e5] hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav_about}
          </a>
          <button
            onClick={onOpenModal}
            className="relative hover:text-[#4f46e5] transition-colors duration-200 cursor-pointer after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#4f46e5] hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav_contact}
          </button>
        </nav>

        {/* Left in RTL / Right in LTR: Toggle Switchers & CTA Button */}
        <div className="flex items-center gap-2 md:gap-3.5">
          {/* Language Switch Button */}
          <button
            onClick={toggleLanguage}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors duration-200 cursor-pointer flex items-center justify-center"
            title={language === "ar" ? "English" : "العربية"}
          >
            <Globe className="w-4.5 h-4.5 md:w-5 h-5" />
            <span className="hidden sm:inline ms-1 text-xs font-black font-sans leading-none">
              {language === "ar" ? "EN" : "AR"}
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors duration-200 cursor-pointer flex items-center justify-center"
            title={theme === "light" ? "Dark Mode" : "Light Mode"}
          >
            {theme === "light" ? (
              <Moon className="w-4.5 h-4.5 md:w-5 h-5" />
            ) : (
              <Sun className="w-4.5 h-4.5 md:w-5 h-5 text-amber-400" />
            )}
          </button>

          {/* CTA Subscribe Button */}
          <button
            onClick={onOpenModal}
            className="group flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-sm font-bold text-white transition-all duration-300 cursor-pointer bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <span>{t.nav_cta}</span>
            <svg className={`w-3 md:w-3.5 h-3 md:h-3.5 transition-transform duration-300 ${language === "ar" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1 rotate-180"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
