import { motion } from "framer-motion";
import { Globe as GlobeIcon, MapPin, Users, Wifi, ArrowUpRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";

interface Country {
  name: string;
  enName: string;
  clients: string;
  ping: string;
  description: string;
  color: string;
}

const countries: Country[] = [
  {
    name: "مصر",
    enName: "Egypt",
    clients: "+250 كافيه",
    ping: "15ms",
    description: "البنية التحتية الأساسية ومراكز توزيع كروت الإنترنت مع ضمان تشغيل الشبكة دون انقطاع.",
    color: "#4f46e5",
  },
  {
    name: "السودان",
    enName: "Sudan",
    clients: "+120 كافيه",
    ping: "28ms",
    description: "تغطية واسعة للشبكات المحلية وحلول سيستم واي فاي مخصصة للمناطق ذات التحديات الخاصة.",
    color: "#3b82f6",
  },
  {
    name: "العراق",
    enName: "Iraq",
    clients: "+180 كافيه",
    ping: "22ms",
    description: "إدارة متطورة لسرعات الألعاب وحلول كروت إنترنت سحابية فائقة السرعة لمراكز الألعاب جيمينج.",
    color: "#10b981",
  },
  {
    name: "ليبيا",
    enName: "Libya",
    clients: "+90 كافيه",
    ping: "25ms",
    description: "أنظمة مستقرة لربط الفروع البعيدة وإدارة فواتير الاشتراك التلقائي بكفاءة عالية.",
    color: "#f59e0b",
  },
  {
    name: "اليمن",
    enName: "Yemen",
    clients: "+70 كافيه",
    ping: "35ms",
    description: "حلول مرنة وموفرة للطاقة تعمل بكفاءة تامة على مدار الساعة في ظروف الشبكة المتغيرة.",
    color: "#06b6d4",
  },
  {
    name: "سوريا",
    enName: "Syria",
    clients: "+85 كافيه",
    ping: "30ms",
    description: "إعدادات سيستم واي فاي مخصصة لإدارة أحمال وسرعات الإنترنت عبر نقاط بث متعددة.",
    color: "#7dd3fc",
  },
];

// Stagger container variant
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function GlobalReach() {
  const { language, theme } = useApp();
  const t = translations[language];

  const localizedCountries = countries.map((country, idx) => ({
    ...country,
    name: language === "ar" ? t.global_countries[idx]?.name : t.global_countries[idx]?.enName || country.name,
    enName: t.global_countries[idx]?.enName || country.enName,
    clients: t.global_countries[idx]?.clients || country.clients,
    ping: t.global_countries[idx]?.ping || country.ping,
    description: t.global_countries[idx]?.description || country.description,
  }));

  return (
    <section
      key={language}
      id="global-reach"
      className="relative w-full py-32 md:py-44 overflow-hidden text-brand-navy dark:text-slate-100 bg-white dark:bg-slate-900/40 transition-colors duration-300"
    >
      {/* Ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: theme === 'dark'
            ? "radial-gradient(circle at center, rgba(125,211,252,0.12) 0%, rgba(56,189,248,0.04) 50%, transparent 75%)"
            : "radial-gradient(circle at center, rgba(125,211,252,0.38) 0%, rgba(56,189,248,0.16) 50%, transparent 75%)",
          filter: "blur(65px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-10%",
          insetInlineStart: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: theme === 'dark'
            ? "radial-gradient(circle at center, rgba(186,230,253,0.10) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(186,230,253,0.42) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-brand-blue dark:text-sky-400 mb-5 bg-[#e0f2fe] dark:bg-slate-800 transition-colors duration-300"
          >
            <GlobeIcon className="w-3.5 h-3.5" />
            {t.global_badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-3xl md:text-5xl font-display font-black mb-6 text-brand-navy dark:text-white leading-tight"
          >
            {t.global_title_1}{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              }}
            >
              {t.global_title_2}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-gray-400 dark:text-slate-400 font-sans text-lg leading-relaxed"
          >
            {t.global_description}
          </motion.p>
        </div>

        {/* ── Country Cards — Spring Stagger ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {localizedCountries.map((country) => (
            <motion.div
              key={country.name}
              variants={cardVariants}
              className="card-soft p-6 md:p-8 group cursor-default"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-start">
                  <h3 className="text-2xl font-display font-black text-brand-navy dark:text-white mb-1">
                    {country.name}
                  </h3>
                  <span className="text-[11px] text-gray-400 dark:text-slate-500 font-sans tracking-[0.12em] uppercase">
                    {country.enName}
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${country.color}15`,
                    color: country.color,
                  }}
                >
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              <p className="text-gray-400 dark:text-slate-400 font-sans text-sm mb-8 leading-relaxed text-start">
                {country.description}
              </p>

              <div
                className="flex items-center justify-between text-xs font-sans text-gray-500 dark:text-slate-450 pt-4 border-t border-[#f1f5f9] dark:border-slate-800/85"
              >
                <span className="flex items-center gap-1.5 font-semibold">
                  <Users className="w-3.5 h-3.5" style={{ color: country.color }} />
                  {country.clients}
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <Wifi className="w-3.5 h-3.5" style={{ color: country.color }} />
                  {country.ping}
                </span>
                <span
                  className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-[11px]"
                  style={{ color: country.color }}
                >
                  {t.global_details}
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SVG Wave bottom */}
      <div className="absolute bottom-0 start-0 w-full overflow-hidden pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 100"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradGR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#070a13' : '#f5f3ff'} />
              <stop offset="50%" stopColor={theme === 'dark' ? '#090d16' : '#eef2ff'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#070a13' : '#f5f3ff'} />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C240,110 480,5 720,60 C960,115 1200,20 1440,55 L1440,100 L0,100 Z"
            fill="url(#waveGradGR)"
          />
        </svg>
      </div>
    </section>
  );
}
