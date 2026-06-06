"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Increment counter from 0 to 100
    let start = 0;
    const end = 100;
    const duration = 1400; // 1.4s
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
        // Add a slight delay before hiding the preloader
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            y: "-100%",
            scale: 0.95,
            opacity: 0,
            transition: { 
              y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
              opacity: { duration: 0.4, delay: 0.1 },
              scale: { duration: 0.7, ease: "easeOut" }
            }
          }}
          className="fixed inset-0 w-full h-full bg-[#060813] z-50 flex flex-col items-center justify-center select-none pointer-events-none"
        >
          {/* Ambient Glowing Tech Orb in background */}
          <div className="absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-gradient-to-tr from-[#4f46e5]/10 to-[#3b82f6]/10 blur-[80px] sm:blur-[100px] pointer-events-none z-0" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant Tech Logo Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] text-white shadow-xl shadow-sky-500/25 mb-8"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" />
                <path d="M8.5 13.5a5 5 0 0 1 7 0" />
                <path d="M5 9.5a10 10 0 0 1 14 0" />
                <path d="M1.5 5.5a15 15 0 0 1 21 0" />
              </svg>
            </motion.div>

            {/* Logo Text letter reveal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[0.18em] text-white flex gap-x-[0.1em] items-center mb-6 leading-none" dir="ltr">
              {"TREND NETWORK".split("").map((char, index) => {
                if (char === " ") return <span key={index} className="w-3" />;
                const isTrend = index < 5; // "TREND" is first 5 chars
                return (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={isTrend
                      ? "text-white" 
                      : "text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] to-[#60a5fa]"}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </h1>

            {/* Glowing Tech Info / Loading Counter */}
            <div className="flex flex-col items-center gap-2 mt-4">
              {/* Circular or horizontal glowing progress ring */}
              <div className="relative w-48 h-1 bg-white/5 rounded-full overflow-hidden mb-3">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.5)] rounded-full"
                  style={{ width: `${count}%` }}
                />
              </div>

              {/* Progress counter text */}
              <motion.span 
                className="text-xs font-mono font-bold tracking-widest text-slate-500 flex items-center justify-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span>SYS_INIT //</span>
                <span className="text-white w-8 text-right font-black">{count}%</span>
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
