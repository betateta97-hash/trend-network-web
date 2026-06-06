"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [statusLog, setStatusLog] = useState(">> INIT_BOOTSTRAP...");

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 1600; // 1.6s
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);

      // Dynamic tech status logs
      if (start < 25) {
        setStatusLog(">> LOADING CORE MODULES...");
      } else if (start >= 25 && start < 50) {
        setStatusLog(">> RESOLVING NETWORK NODES...");
      } else if (start >= 50 && start < 75) {
        setStatusLog(">> CONFIGURING SECURITY PROTOCOLS...");
      } else if (start >= 75 && start < 95) {
        setStatusLog(">> ENCRYPTING CLOUD DATABASE...");
      } else if (start >= 95 && start < 100) {
        setStatusLog(">> OPTIMIZING WIFI ROUTING...");
      } else if (start === 100) {
        setStatusLog(">> SYSTEM READY // WELCOME");
      }

      if (start === end) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 500);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // SVG Circular progress math
  const radius = 45;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { 
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
          className="fixed inset-0 w-full h-full bg-[#05070f] z-[9999] flex flex-col items-center justify-center select-none pointer-events-auto"
        >
          {/* Cyberpunk Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #4f46e5 1px, transparent 1px),
                linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }}
          />

          {/* Multiple Ambient Radial Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-[#4f46e5]/10 blur-[90px] sm:blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-[#3b82f6]/10 blur-[80px] sm:blur-[110px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }} />

          <div className="relative z-10 flex flex-col items-center">
            {/* Circular HUD Loader Area */}
            <div className="relative flex items-center justify-center w-36 h-36 mb-8">
              {/* Outer Slow Rotating Dotted Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-indigo-500/20 scale-105"
              />

              {/* Inner Opposite Rotating Ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-indigo-500/10 scale-95"
              />

              {/* SVG Circular Progress Loader */}
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Track circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke="rgba(79, 70, 229, 0.08)"
                  strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Tech Emblem (Scales and pulses with wifi signal) */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [1, 1.03, 1], opacity: 1 }}
                transition={{ 
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  opacity: { duration: 0.6 }
                }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center z-10"
              >
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" />
                  <path d="M8.5 13.5a5 5 0 0 1 7 0" />
                  <path d="M5 9.5a10 10 0 0 1 14 0" />
                  <path d="M1.5 5.5a15 15 0 0 1 21 0" />
                </svg>
              </motion.div>
            </div>

            {/* Logo Text Reveal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[0.2em] text-white flex gap-x-[0.1em] items-center mb-4 leading-none" dir="ltr">
              {"TREND NETWORK".split("").map((char, index) => {
                if (char === " ") return <span key={index} className="w-3" />;
                const isTrend = index < 5;
                return (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.03,
                      duration: 0.5,
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
            <div className="flex flex-col items-center gap-2.5 mt-2">
              {/* Progress counter text */}
              <div className="text-base sm:text-lg font-mono font-black text-white bg-indigo-950/40 border border-indigo-500/10 px-4 py-1 rounded-full shadow-inner min-w-[70px] text-center">
                <span>{count}%</span>
              </div>

              {/* Interactive Status Log terminal line */}
              <motion.span 
                key={statusLog}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-500 h-4 min-w-[280px] text-center"
              >
                {statusLog}
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
