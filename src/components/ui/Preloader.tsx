"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep visible for the animation duration (1.8s) then unmount
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ ease: [0.76, 0, 0.24, 1] as [number, number, number, number], duration: 1.2, delay: 1.4 }}
      className="fixed inset-0 w-full h-full bg-brand-blue z-50 flex items-center justify-center pointer-events-none"
    >
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-display font-black tracking-widest text-white"
        >
          TREND NETWORK
        </motion.h1>
        
        {/* Subtle decorative loading indicator */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 140 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="h-1 bg-white/40 mx-auto mt-4 rounded-full overflow-hidden relative"
        >
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-white"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
