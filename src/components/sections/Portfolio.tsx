import { motion } from "framer-motion";
import { Coffee, Cpu, CheckCircle2, TrendingUp } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";

interface Project {
  title: string;
  location: string;
  usersCount: string;
  hardware: string;
  features: string[];
  accentColor: string;
}

const projects: Project[] = [
  {
    title: "أسترو كافيه",
    location: "القاهرة، مصر",
    usersCount: "+300 متصل متزامن",
    hardware: "سيستم إنترنت ذكي",
    features: [
      "توزيع سرعات ديناميكي وذكي",
      "صفحة دخول مخصصة وسيستم واي فاي متطور",
      "ربط الفروع البعيدة ببعضها",
    ],
    accentColor: "#4f46e5",
  },
  {
    title: "أوكسجين جيمينج لاونج",
    location: "الخرطوم، السودان",
    usersCount: "+150 متصل متزامن",
    hardware: "سيستم واي فاي متطور",
    features: [
      "تحديد أولوية البنج للألعاب التنافسية",
      "عزل تام للأجهزة لضمان الحماية",
      "كروت شحن تلقائي للاشتراكات",
    ],
    accentColor: "#3b82f6",
  },
  {
    title: "نيكسس كافيه",
    location: "بغداد، العراق",
    usersCount: "+200 متصل متزامن",
    hardware: "سيستم إدارة الشبكة",
    features: [
      "صفحة ترويجية لعرض خدمات الكافيه",
      "تقييد أحمال التحميل للمستخدم الفردي",
      "حظر الإعلانات والمواقع الضارة",
    ],
    accentColor: "#10b981",
  },
  {
    title: "كاسل لاونج",
    location: "طرابلس، ليبيا",
    usersCount: "+250 متصل متزامن",
    hardware: "سيستم توزيع سرعات",
    features: [
      "إدارة الجلسات ومراقبتها تلقائياً",
      "نظام كروت إنترنت مدمج متكامل",
      "تغطية كاملة بتقنية الـ Mesh Wi-Fi",
    ],
    accentColor: "#f59e0b",
  },
];

// Stagger container & card variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Portfolio() {
  const { language, theme } = useApp();
  const t = translations[language];

  const localizedProjects = projects.map((project, idx) => ({
    ...project,
    title: t.portfolio_projects[idx]?.title || project.title,
    location: t.portfolio_projects[idx]?.location || project.location,
    usersCount: t.portfolio_projects[idx]?.usersCount || project.usersCount,
    hardware: t.portfolio_projects[idx]?.hardware || project.hardware,
    features: t.portfolio_projects[idx]?.features || project.features,
  }));

  return (
    <section
      key={language}
      id="portfolio"
      className="relative w-full py-32 md:py-44 overflow-hidden text-brand-navy dark:text-slate-100 transition-colors duration-300"
      style={{
        background: theme === 'dark' 
          ? "linear-gradient(180deg, #090d16 0%, #070a13 40%, #090d16 100%)" 
          : "linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 40%, #ffffff 100%)",
      }}
    >
      {/* Ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          insetInlineEnd: "-8%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: theme === 'dark'
            ? "radial-gradient(circle at center, rgba(125,211,252,0.12) 0%, rgba(186,230,253,0.04) 55%, transparent 75%)"
            : "radial-gradient(circle at center, rgba(125,211,252,0.42) 0%, rgba(186,230,253,0.18) 55%, transparent 75%)",
          filter: "blur(65px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          insetInlineStart: "-6%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: theme === 'dark'
            ? "radial-gradient(circle at center, rgba(186,230,253,0.10) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(186,230,253,0.38) 0%, transparent 70%)",
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
            <Coffee className="w-3.5 h-3.5" />
            {t.portfolio_badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-3xl md:text-5xl font-display font-black mb-6 text-brand-navy dark:text-white leading-tight"
          >
            {t.portfolio_title_1}{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              }}
            >
              {t.portfolio_title_2}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-gray-400 dark:text-slate-400 font-sans text-lg leading-relaxed"
          >
            {t.portfolio_description}
          </motion.p>
        </div>

        {/* ── Portfolio Grid — Spring Stagger ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {localizedProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="card-soft p-6 md:p-10 group text-start"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${project.accentColor}15`,
                      color: project.accentColor,
                    }}
                  >
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div className="text-start">
                    <h3 className="text-xl font-display font-black text-brand-navy dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-slate-500 font-sans">
                      {project.location}
                    </p>
                  </div>
                </div>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full text-emerald-600 dark:text-emerald-450 flex items-center gap-1.5 bg-[#f0fdf4] dark:bg-emerald-950/30 transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  {t.portfolio_status}
                </motion.span>
              </div>

              {/* Metrics row */}
              <div
                className="grid grid-cols-2 gap-4 mb-8 py-5 font-sans border-y border-[#f1f5f9] dark:border-slate-800/80 transition-colors duration-300"
              >
                <div className="text-start">
                  <span className="text-[11px] text-gray-400 dark:text-slate-500 block mb-1.5 uppercase tracking-wide">
                    {t.portfolio_metric_users}
                  </span>
                  <span className="text-sm font-black text-brand-navy dark:text-slate-200 flex items-center gap-1.5">
                    <TrendingUp
                      className="w-3.5 h-3.5"
                      style={{ color: project.accentColor }}
                    />
                    {project.usersCount}
                  </span>
                </div>
                <div className="text-start">
                  <span className="text-[11px] text-gray-400 dark:text-slate-500 block mb-1.5 uppercase tracking-wide">
                    {t.portfolio_metric_hardware}
                  </span>
                  <span className="text-sm font-black text-brand-navy dark:text-slate-200 flex items-center gap-1.5">
                    <Cpu
                      className="w-3.5 h-3.5"
                      style={{ color: project.accentColor }}
                    />
                    {project.hardware}
                  </span>
                </div>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 text-start">
                {project.features.map((feature, fIdx) => (
                  <motion.li
                    key={fIdx}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + fIdx * 0.1,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                    className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-3 font-sans justify-start"
                  >
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: project.accentColor }}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
