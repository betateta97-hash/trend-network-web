"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Wifi } from "lucide-react";


// ─── Feature data (Current copy of the website preserved) ───────────────────────

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    id: 0,
    title: "سيرفرات مايكروتيك الذكية",
    description:
      "برمجة متكاملة لراوترات MikroTik لتقسيم النطاق الترددي ديناميكياً بين الزبائن وضمان ألا يستحوذ مستخدم واحد على السرعة الكاملة.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 1,
    title: "أنظمة كروت الهوتسبوت",
    description:
      "مولد قسائم اشتراك تلقائي لطباعة وتوزيع كروت شحن الواي فاي بمدد زمنية أو حجم استهلاك محدد، مع صفحة دخول مخصصة بهوية كافيهك.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 2,
    title: "باقات وخصومات مدروسة",
    description:
      "خطط اشتراك سنوية وشهرية مرنة تتضمن الدعم الفني الكامل وتحديثات السيرفر الفورية بتكلفة تشغيل تنافسية.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 3,
    title: "مراقبة وصيانة مستمرة 24/7",
    description:
      "فريق دعم فني متخصص يراقب السيرفرات عن بعد ويتدخل في دقائق معدودة لضمان أفضل تجربة إنترنت لزوار كافيهك.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function Services() {
  const [activeFeature, setActiveFeature] = useState(0);
  const active = features[activeFeature];
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced hover intent handler to filter out fast cursor sweeps
  const handleMouseEnter = (idx: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveFeature(idx);
    }, 80);
  };

  const handleClick = (idx: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveFeature(idx);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <section id="services" className="relative w-full text-brand-navy bg-white py-20 md:py-28 overflow-hidden">
      
      {/* =========================================
          DECORATIONS: Wave Ribbons & Ambient Orbs
          ========================================= */}
      {/* Background wave ribbons (top) */}
      <div className="absolute top-0 start-0 w-full pointer-events-none z-0 overflow-hidden">
        <svg viewBox="0 0 1440 220" className="w-full block" preserveAspectRatio="none">
          <path d="M0,0 C360,160 720,40 1080,120 C1260,160 1380,80 1440,100 L1440,0 Z" fill="#c7d2fe" fillOpacity="0.15" />
          <path d="M0,0 C240,140 600,20 900,100 C1100,150 1300,60 1440,80 L1440,0 Z" fill="#818cf8" fillOpacity="0.22" />
          <path d="M0,0 C180,110 480,0 720,70 C900,120 1200,30 1440,60 L1440,0 Z" fill="#a5b4fc" fillOpacity="0.28" />
        </svg>
      </div>

      {/* Ambient orbs */}
      <div style={{ position: "absolute", top: "-5%", insetInlineEnd: "-8%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle at center, rgba(79,70,229,0.42) 0%, rgba(59,130,246,0.18) 55%, transparent 75%)", filter: "blur(65px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "10%", insetInlineStart: "-6%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle at center, rgba(99,102,241,0.40) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ── Section header ── */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-brand-blue mb-5"
            style={{ background: "#eef2ff" }}
          >
            <Wifi className="w-3.5 h-3.5" />
            خدمات ومميزات النظام
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-3xl md:text-5xl font-display font-black mb-6 text-brand-navy leading-tight"
          >
            تحكم كامل في شبكتك{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #4f46e5, #3b82f6)" }}>
              بلمسة سحابية
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 font-sans text-lg leading-relaxed max-w-2xl mx-auto"
          >
            قمنا بهندسة بنية تحتية متكاملة لشبكة الكافيه الخاص بك مع موازنة ذكية للأحمال لتوفير استقرار لا مثيل له.
          </motion.p>
        </div>

        {/* ── Content Row (Split view) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Vertical Interactive Feature List (RTL reading with button forced LTR flow) */}
          <div className="lg:col-span-7 flex flex-col border-t border-slate-100/80">
            {features.map((feature, idx) => {
              const isActive = idx === activeFeature;
              return (
                <div
                  key={feature.id}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onClick={() => handleClick(idx)}
                  className="group flex flex-row items-start gap-5 md:gap-7 py-6 md:py-8 border-b border-slate-100/80 cursor-pointer transition-all duration-300 relative select-none"
                  dir="ltr" // Force LTR layout for the row structure so Button is on the Left, Text is on the Right
                >
                  
                  {/* Arrow Indicator Button on Left */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${isActive 
                        ? "border-transparent bg-[#4f46e5] text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)] scale-105" 
                        : "border-slate-200/60 bg-white text-slate-400 group-hover:border-transparent group-hover:bg-[#4f46e5] group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(79,70,229,0.3)]"
                      }`}
                    >
                      <ArrowRight className={`w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "rotate-[-45deg]" : "rotate-0 group-hover:rotate-[-45deg]"}`} />
                    </div>
                  </div>

                  {/* Text Container on Right (Arabic Aligned right) */}
                  <div className="flex-1 flex flex-col text-right" dir="rtl">
                    <h3 className={`text-lg md:text-xl font-bold font-display transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mb-2 leading-snug ${isActive ? 'text-[#4f46e5]' : 'text-slate-800 group-hover:text-[#4f46e5]'}`}>
                      {feature.title}
                    </h3>
                    
                    {/* Tiny Sky Blue Dot Floating below the active title - height-constant to avoid layout shift */}
                    <div className="flex justify-start items-center h-3.5 mb-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full bg-[#4f46e5] animate-pulse transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
                    </div>
 
                    <p className={`text-sm md:text-base font-normal font-sans transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] leading-relaxed ${isActive ? 'text-[#4f46e5]/85' : 'text-slate-400 group-hover:text-[#4f46e5]/85'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium High-fidelity CSS Laptop Mockup */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-md md:max-w-xl mx-auto">
              
              {/* Ambient Glow */}
              <motion.div
                animate={{
                  background: `radial-gradient(ellipse at center, #4f46e522 0%, transparent 70%)`,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-[-40px] pointer-events-none z-0"
                style={{ filter: "blur(50px)" }}
              />

              {/* Laptop Screen (Refined border/notch bezel) */}
              <div className="relative z-10 w-full aspect-[16/10] bg-slate-950 rounded-t-2xl border-[6px] border-slate-800 shadow-2xl overflow-hidden">
                {/* Webcam Notch Dot */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700 z-30" />
                
                {/* Cross-fade screen image transition */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeFeature}
                    src={active.image}
                    alt={active.title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Reflective Laptop Keyboard Base */}
              <div className="relative z-20 w-[112%] -start-[6%] h-3.5 bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-xl border-t border-slate-100 shadow-lg flex justify-center">
                {/* Recess Notch */}
                <div className="w-16 h-1.5 bg-slate-500/30 rounded-full mt-0.5" />
              </div>

              {/* Pager Dots underneath Laptop */}
              <div className="flex items-center justify-center gap-2 mt-8 relative z-10">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === activeFeature ? 28 : 8,
                      opacity: i === activeFeature ? 1 : 0.25,
                      backgroundColor: i === activeFeature ? "#4f46e5" : "#94a3b8",
                    }}
                    transition={{ duration: 0.4 }}
                    className="h-2 rounded-full cursor-pointer"
                    onClick={() => setActiveFeature(i)}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>


      {/* 3-layer translucent wave bottom */}
      <div className="relative w-full overflow-hidden pointer-events-none z-10">
        <svg viewBox="0 0 1440 130" className="w-full block" preserveAspectRatio="none">
          <path d="M0,50 C360,130 720,10 1080,80 C1260,120 1380,50 1440,70 L1440,130 L0,130 Z" fill="#c7d2fe" fillOpacity="0.18" />
          <path d="M0,70 C240,20 600,120 900,60 C1100,20 1300,100 1440,55 L1440,130 L0,130 Z" fill="#818cf8" fillOpacity="0.25" />
          <path d="M0,90 C300,30 660,120 960,65 C1150,30 1320,100 1440,80 L1440,130 L0,130 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
