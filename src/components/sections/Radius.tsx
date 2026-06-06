import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { Wifi, Activity, Cpu, ShieldCheck } from "lucide-react";

export default function Radius() {
  const { language, theme } = useApp();
  const t = translations[language];

  return (
    <section id="radius" key={language} className="w-full relative overflow-hidden bg-white dark:bg-slate-900/20 transition-colors duration-300">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[650px] lg:min-h-[750px]">
        
        {/* Left/Right Split Column: Dark Navy Text Panel */}
        <div className="lg:col-span-6 bg-[#0b0f19] flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 lg:px-24 text-start relative z-10">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(circle at 30% 30%, #4f46e5 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative z-10 max-w-xl lg:ms-auto">
            {/* Top Purple Dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-2.5 h-2.5 rounded-full bg-[#4f46e5] mb-6 inline-block"
            />

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-display font-black mb-8 text-white leading-tight"
            >
              {t.radius_title}
            </motion.h2>

            {/* Paragraph 1: Highlights */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-300 font-sans text-base md:text-lg leading-relaxed mb-6 font-medium"
            >
              {t.radius_desc_1}
            </motion.p>

            {/* Paragraph 2: Core features */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 font-sans text-sm md:text-base leading-relaxed mb-8"
            >
              {t.radius_desc_2}
            </motion.p>

            {/* Paragraph 3: Closing Slogan with violet border decoration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border-e-3 border-[#4f46e5] pe-4"
            >
              <p className="text-transparent bg-clip-text font-display font-bold text-base md:text-lg leading-relaxed inline-block"
                style={{ backgroundImage: "linear-gradient(135deg, #a5b4fc, #818cf8)" }}
              >
                {t.radius_slogan}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Left/Right Split Column: Live SaaS Mockup Panel */}
        <div className="lg:col-span-6 bg-[#030712] relative min-h-[450px] lg:min-h-0 flex items-center justify-center overflow-hidden p-6 sm:p-12">
          {/* High-tech background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/tech-bg.png"
              alt="Technology Network Background"
              className="w-full h-full object-cover opacity-60 filter saturate-150 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712] opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-transparent opacity-70" />
          </div>

          {/* Interactive Glassmorphic SaaS Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="relative z-10 w-full max-w-md rounded-3xl backdrop-blur-xl bg-slate-950/70 border border-slate-800/80 p-6 sm:p-8 shadow-[0_0_50px_rgba(79,70,229,0.15)] flex flex-col gap-6 text-start"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {/* Header Widget */}
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)] animate-pulse">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-white text-sm">TREND NETWORK</h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                    {language === 'ar' ? 'النظام نشط ومستقر' : 'System Active & Stable'}
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400">
                v2.4.8
              </div>
            </div>

            {/* Simulated Live Analytics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Clients Card */}
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] text-slate-400 font-semibold">{language === 'ar' ? 'المستخدمين النشطين' : 'Active Users'}</span>
                <span className="text-xl font-display font-black text-white font-mono">1,492</span>
                <div className="w-full bg-slate-800 rounded-full h-1 mt-1 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bg-indigo-500 h-1 rounded-full" 
                  />
                </div>
              </div>

              {/* Uptime Card */}
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-4 flex flex-col gap-1.5">
                <span className="text-[10px] text-slate-400 font-semibold">{language === 'ar' ? 'نسبة التشغيل المستمر' : 'Network Uptime'}</span>
                <span className="text-xl font-display font-black text-emerald-400 font-mono">99.98%</span>
                <div className="w-full bg-slate-800 rounded-full h-1 mt-1 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "99.9%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bg-emerald-500 h-1 rounded-full" 
                  />
                </div>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="flex flex-col gap-3 bg-slate-900/30 border border-slate-800/40 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  {language === 'ar' ? 'ضغط المعالج' : 'CPU Load'}
                </span>
                <span className="text-white font-mono font-bold">14%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "14%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="bg-indigo-400 h-1.5 rounded-full" 
                />
              </div>

              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  {language === 'ar' ? 'معدل نقل البيانات' : 'Live Traffic'}
                </span>
                <span className="text-white font-mono font-bold">482 Mbps</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "68%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-cyan-400 h-1.5 rounded-full" 
                />
              </div>
            </div>

            {/* Status Footer Badge */}
            <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-slate-900/40 border border-slate-800/60 rounded-xl p-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                {language === 'ar' 
                  ? 'يتم تشغيل ونسخ إعدادات السيرفر احتياطياً بشكل آمن وتلقائي.' 
                  : 'Server settings are running and backed up securely and automatically.'}
              </span>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
