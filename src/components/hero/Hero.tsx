"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, Server, Activity, ServerCrash, Wifi } from "lucide-react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full -z-10 bg-white" />
  ),
});

interface HeroProps {
  onOpenModal: () => void;
}

const marqueePills = [
  "توليد وطباعة البطاقات",
  "إدارة البطاقات",
  "إدارة الاشتراكات",
  "تطبيق الوصول للمستخدمين",
  "نظام الوكلاء ونقاط البيع",
  "مدراء النظام والشبكات الفرعية",
  "مراقبة الشبكات",
  "مراقبة الاتصالات",
  "طلبات الصيانة",
  "نظام الاشعارات المباشر",
];


interface MagneticLetterProps {
  char: string;
  className?: string;
  style?: React.CSSProperties;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}

function MagneticLetter({ char, className, style, mouseRef }: MagneticLetterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 16, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 90, damping: 16, mass: 0.5 });

  useEffect(() => {
    let active = true;
    function updatePhysics() {
      if (!active || !ref.current) return;
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const dx = elX - mouseX;
      const dy = elY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 180;
      const strength = 55;

      if (dist < radius) {
        const force = (radius - dist) / radius;
        const angle = Math.atan2(dy, dx);
        x.set(Math.cos(angle) * force * strength);
        y.set(Math.sin(angle) * force * strength);
      } else {
        x.set(0);
        y.set(0);
      }
      requestAnimationFrame(updatePhysics);
    }
    requestAnimationFrame(updatePhysics);
    return () => { active = false; };
  }, [mouseRef, x, y]);

  return (
    <motion.span
      ref={ref}
      style={{
        ...style,
        x: springX,
        y: springY,
        display: "inline-block",
      }}
      className={className}
    >
      {char}
    </motion.span>
  );
}

export default function Hero({ onOpenModal }: HeroProps) {
  // Create a mouseRef to track client coordinates for physics calculations
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // ── Mouse parallax tracking ──────────────────────────────────
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  // Spring config: gentle lag for a "floating depth" feel
  const springCfg = { stiffness: 35, damping: 18, mass: 0.8 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);

  // Watermark moves OPPOSITE to cursor (parallax depth illusion)
  const wmX = useTransform(springX, [0, 1], [28, -28]);
  const wmY = useTransform(springY, [0, 1], [14, -14]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - left) / width);
    rawY.set((e.clientY - top) / height);
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden text-brand-navy"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseRef.current = { x: -1000, y: -1000 }; }}
    >

      {/* =========================================
          LAYER 0: 3D R3F Canvas background
          ========================================= */}
      <HeroScene />

      {/* =========================================
          LAYER 1: PARALLAX BACKGROUND WATERMARK (MASSIVE LEFT TYPOGRAPHY)
          ========================================= */}
      <div className="absolute top-[28%] left-[5%] md:left-[10%] flex flex-col items-start pointer-events-none z-[1] overflow-hidden select-none" dir="ltr">
        <motion.h1
          style={{
            x: wmX,
            y: wmY,
          }}
          className="font-black whitespace-nowrap select-none pointer-events-none font-display tracking-tighter flex items-baseline"
        >
          {/* Outlined TR part of TREND with Magnetic/Repelling Letters Effect */}
          <span className="text-[13vw] flex select-none pointer-events-none">
            {"TR".split("").map((char, index) => (
              <MagneticLetter
                key={`trend-outline-${index}`}
                char={char}
                className="text-transparent select-none pointer-events-none"
                style={{ WebkitTextStroke: '2.5px rgba(95, 92, 229, 0.35)' }}
                mouseRef={mouseRef}
              />
            ))}
          </span>

          {/* Solid END part of TREND with Magnetic/Repelling Letters Effect */}
          <span className="text-[13vw] flex select-none pointer-events-none">
            {"END".split("").map((char, index) => (
              <MagneticLetter
                key={`trend-solid-${index}`}
                char={char}
                className="text-slate-900 mix-blend-overlay opacity-30 font-bold select-none pointer-events-none"
                mouseRef={mouseRef}
              />
            ))}
          </span>
        </motion.h1>

        {/* Arabic Subtitle: تريند نيتورك */}
        <motion.div
          style={{
            x: wmX,
            y: wmY,
          }}
          dir="rtl"
          className="text-[2.2vw] font-black text-[#5f5ce5]/25 tracking-[0.2em] select-none pointer-events-none font-display mt-[-1vw] ps-4"
        >
          تريند نيتورك
        </motion.div>
      </div>

      {/* =========================================
          LAYER 2: MULTI-LAYER GRADIENT RIBBON
          ========================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Sweeping, overlapping translucent ribbons crossing the screen */}
        <div className="absolute top-[15%] left-[-10%] w-[120%] h-48 bg-gradient-to-r from-sky-100/50 to-white/0 blur-2xl -rotate-12 transform origin-top-left" />
        <div className="absolute top-[40%] right-[-10%] w-[120%] h-56 bg-gradient-to-l from-sky-100/40 to-white/0 blur-3xl rotate-6 transform origin-bottom-right" />
        <div 
          className="absolute top-[25%] left-0 w-full h-[350px] bg-gradient-to-r from-sky-100/40 via-indigo-50/20 to-white/0 blur-2xl opacity-60"
          style={{ clipPath: "polygon(0 15%, 100% 0, 90% 100%, 10% 85%)" }}
        />

        {/* =============================================
            MORPHING ANIMATED BLOBS — Living fluid background
            ============================================= */}

        {/* BLOB 1: TOP-LEFT — Primary indigo morphing blob */}
        <motion.div
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "40% 60% 60% 40% / 40% 40% 60% 60%",
              "70% 30% 40% 60% / 30% 70% 60% 40%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
            scale: [1, 1.08, 1.04, 1.1, 1],
            rotate: [0, 30, 60, 90, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "-15%",
            insetInlineStart: "-10%",
            width: "650px",
            height: "650px",
            background:
              "radial-gradient(circle at 40% 40%, rgba(125,161,255,0.52) 0%, rgba(99,102,241,0.24) 50%, transparent 75%)",
            filter: "blur(55px)",
            willChange: "transform, border-radius",
          }}
        />

        {/* BLOB 2: MID-RIGHT — Violet morphing blob, slower */}
        <motion.div
          animate={{
            borderRadius: [
              "40% 60% 60% 40% / 40% 40% 60% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "70% 30% 50% 50% / 40% 60% 40% 60%",
              "40% 60% 60% 40% / 40% 40% 60% 60%",
            ],
            scale: [1, 1.06, 1.12, 1.04, 1],
            rotate: [0, -25, -50, -75, 0],
            y: [0, -20, 10, -10, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "25%",
            insetInlineEnd: "-12%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle at 60% 40%, rgba(165,180,252,0.50) 0%, rgba(196,181,253,0.22) 50%, transparent 75%)",
            filter: "blur(60px)",
            willChange: "transform, border-radius",
          }}
        />

        {/* BLOB 3: CENTER-BOTTOM — Sky blue pulsing accent blob */}
        <motion.div
          animate={{
            borderRadius: [
              "50% 50% 60% 40% / 40% 60% 40% 60%",
              "40% 60% 40% 60% / 60% 40% 60% 40%",
              "60% 40% 50% 50% / 50% 50% 50% 50%",
              "50% 50% 60% 40% / 40% 60% 40% 60%",
            ],
            scale: [1, 1.14, 0.96, 1],
            x: [0, 20, -15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            bottom: "2%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "520px",
            height: "420px",
            background:
              "radial-gradient(circle at center, rgba(186,230,253,0.45) 0%, rgba(125,161,255,0.18) 55%, transparent 75%)",
            filter: "blur(55px)",
            willChange: "transform, border-radius",
          }}
        />
      </div>

      {/* =========================================
          LAYER 4: HERO CONTENT & MARQUEE WRAPPER (FOR VERTICAL CENTERING)
          ========================================= */}
      <div className="relative w-full flex-1 flex flex-col justify-center z-10 pt-28 pb-16 md:pb-20">
        
        {/* Constrained Content Row */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="max-w-2xl text-start">

            {/* Floating statistics capsules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-xs font-semibold text-brand-navy"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(79,70,229,0.04)" }}
              >
                <Activity className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
                <span>+100,000 مستخدم نشط</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-xs font-semibold text-brand-navy"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(79,70,229,0.04)" }}
              >
                <ServerCrash className="w-3.5 h-3.5 text-brand-accent" />
                <span>+400 شبكة مفعلة</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-xs font-semibold text-brand-navy"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(79,70,229,0.04)" }}
              >
                <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                <span>99.9% وقت تشغيل</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="text-4xl md:text-6xl xl:text-7xl font-display font-black leading-[1.1] text-brand-navy mb-6 tracking-tight"
            >
              بنية تحتية متطورة{" "}
              <br className="hidden md:block" />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #6366f1 100%)",
                }}
              >
                لشبكات الكافيهات
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-gray-500 text-lg md:text-xl mb-12 leading-relaxed font-sans max-w-lg"
            >
              برمجة سيرفرات مايكروتيك مخصصة وإصدار كروت هوتسبوت سحابية ذكية وحماية شبكة فورية — مصممة لتفوق مقهاك ومراكز الألعاب على المنافسين.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={onOpenModal}
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold tracking-wider transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                  boxShadow: "0 8px 30px rgba(79, 70, 229, 0.30), 0 2px 8px rgba(79, 70, 229, 0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 45px rgba(79, 70, 229, 0.40), 0 4px 12px rgba(79, 70, 229, 0.20)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(79, 70, 229, 0.30), 0 2px 8px rgba(79, 70, 229, 0.15)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                اطلب النظام الآن
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              </button>

              <a
                href="#services"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-brand-navy font-bold tracking-wider transition-all duration-300"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)", background: "rgba(255,255,255,0.9)" }}
              >
                استكشف المميزات
              </a>
            </motion.div>
          </div>
        </div>

        {/* =========================================
            LAYER 5: THE SCROLLING PILLS MARQUEE (FULL WIDTH)
            ========================================= */}
        <div className="w-full overflow-hidden border-y border-slate-100/40 bg-slate-50/10 backdrop-blur-[2px] py-4 md:py-5 z-20 mt-8 md:mt-10" dir="ltr">
          <div className="animate-marquee-infinite flex" dir="ltr">
            {[...marqueePills, ...marqueePills, ...marqueePills].map((pill, idx) => (
              <div
                key={idx}
                className="px-6 py-2.5 md:px-7 md:py-3.5 rounded-2xl bg-white/50 backdrop-blur-md border border-white/70 shadow-sm text-slate-800 whitespace-nowrap text-sm md:text-base font-bold font-sans tracking-wide hover:bg-white/80 transition-colors duration-300 mr-6"
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed right-5 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 md:gap-6 z-50">
        
        {/* Cursively connected vertical text "تابعونا" (rotated for top-to-bottom RTL layout) */}
        <span 
          className="text-xs md:text-sm font-black text-slate-500 select-none transition-colors duration-300 hover:text-[#4f46e5] rotate-180" 
          style={{ writingMode: "vertical-rl" }}
        >
          تابعونا
        </span>

        {/* Downward pointing vertical arrow */}
        <svg className="w-3.5 h-10 md:h-12 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 48">
          <line x1="12" y1="0" x2="12" y2="44" />
          <path d="M6 38 L12 44 L18 38" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <a href="#" className="text-slate-500 hover:text-[#4f46e5] transition-all duration-300 hover:scale-110">
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>
        <a href="#" className="text-slate-500 hover:text-[#4f46e5] transition-all duration-300 hover:scale-110">
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div>

      {/* =========================================
          LAYER 7: ORGANIC MULTI-CURVE SVG WAVE DIVIDER
          ========================================= */}
      <div className="absolute bottom-0 start-0 w-full overflow-hidden z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full block" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eef2ff" />
              <stop offset="50%" stopColor="#e0e7ff" />
              <stop offset="100%" stopColor="#eef2ff" />
            </linearGradient>
          </defs>
          {/* Second wave - slightly offset */}
          <path
            d="M0,60 C180,120 360,0 540,60 C720,120 900,20 1080,70 C1260,120 1380,50 1440,80 L1440,120 L0,120 Z"
            fill="#eef2ff"
            fillOpacity="0.5"
          />
          {/* Primary wave */}
          <path
            d="M0,80 C240,20 480,110 720,60 C960,10 1200,90 1440,50 L1440,120 L0,120 Z"
            fill="url(#waveGrad)"
          />
        </svg>
      </div>

    </section>
  );
}
