import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";

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

        {/* Left/Right Split Column: Light Mockups Panel */}
        <div className="lg:col-span-6 bg-[#f8fafc] dark:bg-[#0a0d16] relative min-h-[300px] sm:min-h-[400px] lg:min-h-0 aspect-[4/3] sm:aspect-video lg:aspect-auto flex items-center justify-center overflow-hidden transition-colors duration-300">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: theme === 'dark' 
                ? 'radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)' 
                : 'radial-gradient(#0f172a 1.5px, transparent 1.5px)',
              backgroundSize: "24px 24px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full absolute inset-0 animate-fade-in"
          >
            <img
              src="/radius_mockup.png"
              alt="Radius Mobile Dashboard App Mockups"
              className="w-full h-full object-contain md:object-cover object-center select-none pointer-events-none"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
