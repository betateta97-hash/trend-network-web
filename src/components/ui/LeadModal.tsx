"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, AlertCircle, RefreshCw, CheckCircle2, ShieldCheck, Zap, Wifi, Home } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";

interface FormInputs {
  name: string;
  phone: string;
  governorate: string;
  internetType: "home" | "mobile_sim" | "";
  provider: string;
}

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const { language, theme } = useApp();
  const t = translations[language];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      internetType: "",
      provider: "WE",
    },
  });

  const currentInternetType = watch("internetType");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    
    const internetTypeLabel = data.internetType === 'home' ? 
      (language === 'ar' ? 'انترنت منزلي' : 'Home Internet') : 
      (language === 'ar' ? 'روتر هوائي' : 'Mobile Router / SIM Card');

    const formattedMessage = language === 'ar' ?
      `السلام عليكم TREND NETWORK، أود طلب نظام شبكات:\n\n` +
      `• الاسم بالكامل: ${data.name}\n` +
      `• رقم الهاتف: ${data.phone}\n` +
      `• المحافظة: ${data.governorate}\n` +
      `• نوع الإنترنت الحالي: ${internetTypeLabel}\n` +
      `• الشركة المشترك بها: ${data.provider}`
      :
      `Hello TREND NETWORK, I would like to request a network system:\n\n` +
      `• Full Name: ${data.name}\n` +
      `• Phone Number: ${data.phone}\n` +
      `• Governorate: ${data.governorate}\n` +
      `• Current Internet Type: ${internetTypeLabel}\n` +
      `• Provider: ${data.provider}`;

    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const whatsappNumber = "201000000000";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
    
    window.open(whatsappUrl, "_blank");
    
    setIsSubmitting(false);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-navy/40 dark:bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[2rem] overflow-y-auto md:overflow-hidden max-h-[90vh] md:max-h-none z-10 font-sans flex flex-col md:flex-row transition-colors duration-300"
            style={{ boxShadow: "0 30px 80px -15px rgba(0, 0, 0, 0.1), 0 8px 24px -4px rgba(14, 165, 233, 0.06)" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 end-5 w-9 h-9 rounded-full bg-brand-light-gray dark:bg-slate-800 hover:bg-brand-gray dark:hover:bg-slate-700 flex items-center justify-center text-brand-navy dark:text-slate-200 transition-colors duration-200 cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Software Features / Info Badges (SaaS Dashboard layout) */}
            <div className="hidden md:flex md:w-5/12 p-8 flex flex-col justify-between" 
              style={{ 
                background: theme === 'dark' 
                  ? "linear-gradient(160deg, #0f172a 0%, #0d1322 60%, #090d16 100%)" 
                  : "linear-gradient(160deg, #e0f2fe 0%, #f0f9ff 60%, #ffffff 100%)", 
                borderInlineEnd: theme === 'dark' ? "1px solid #1e293b" : "1px solid #e0f2fe" 
              }}
            >
              <div>
                <h4 className="text-xl font-display font-black text-brand-navy dark:text-white mb-4 text-start">
                  {t.modal_title_brand}
                </h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-8 text-start">
                  {t.modal_sub}
                </p>

                <div className="space-y-4 text-start">
                  <div className="flex gap-3 items-start">
                    <div className="icon-circle-sm flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-brand-navy dark:text-white">{t.modal_feature_1_title}</h5>
                      <p className="text-[11px] text-gray-405 dark:text-slate-400">{t.modal_feature_1_desc}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="icon-circle-sm flex-shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-brand-navy dark:text-white">{t.modal_feature_2_title}</h5>
                      <p className="text-[11px] text-gray-405 dark:text-slate-400">{t.modal_feature_2_desc}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 flex items-center gap-2 text-[11px] text-gray-400 dark:text-slate-500 border-t border-[#f1f5f9] dark:border-slate-800">
                <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue dark:text-indigo-400" />
                <span>{t.modal_badge}</span>
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-center">
              <div className="mb-6 text-start">
                <h3 className="text-2xl font-display font-black text-brand-navy dark:text-white mb-2">
                  {t.modal_form_title}
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-xs">
                  {t.modal_form_sub}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs text-brand-navy dark:text-slate-200">
                {/* Row 1: Name and Governorate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="text-start">
                    <label className="block text-gray-600 dark:text-slate-400 mb-1.5 font-medium">{t.modal_label_name}</label>
                    <input
                      type="text"
                      placeholder={t.modal_placeholder_name}
                      {...register("name", { required: t.modal_error_name, minLength: { value: 3, message: t.modal_error_name_len } })}
                      className="w-full bg-brand-light-gray dark:bg-slate-800 border border-brand-gray dark:border-slate-700 rounded-xl px-4 py-2.5 placeholder-gray-400 focus:outline-none focus:border-brand-blue/60 focus:dark:border-indigo-500/50 transition-colors"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Governorate */}
                  <div className="text-start">
                    <label className="block text-gray-600 dark:text-slate-400 mb-1.5 font-medium">{t.modal_label_governorate}</label>
                    <input
                      type="text"
                      placeholder={t.modal_placeholder_governorate}
                      {...register("governorate", { required: t.modal_error_governorate })}
                      className="w-full bg-brand-light-gray dark:bg-slate-800 border border-brand-gray dark:border-slate-700 rounded-xl px-4 py-2.5 placeholder-gray-400 focus:outline-none focus:border-brand-blue/60 focus:dark:border-indigo-500/50 transition-colors"
                    />
                    {errors.governorate && (
                      <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.governorate.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone */}
                <div className="text-start" dir="ltr">
                  <label className={`block text-gray-600 dark:text-slate-400 mb-1.5 font-medium ${language === 'ar' ? 'text-end' : 'text-start'}`}>{t.modal_label_phone}</label>
                  <input
                    type="text"
                    placeholder={t.modal_placeholder_phone}
                    {...register("phone", { required: t.modal_error_phone, pattern: { value: /^[0-9+ ]{8,15}$/, message: t.modal_error_phone_val } })}
                    className={`w-full bg-brand-light-gray dark:bg-slate-800 border border-brand-gray dark:border-slate-700 rounded-xl px-4 py-2.5 placeholder-gray-400 focus:outline-none focus:border-brand-blue/60 focus:dark:border-indigo-500/50 transition-colors ${language === 'ar' ? 'text-right' : 'text-left'}`}
                  />
                  {errors.phone && (
                    <span className={`text-red-500 text-[10px] mt-1 flex items-center gap-1 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                {/* Row 3: Internet Type selector using modern interactive radio cards */}
                <div className="text-start">
                  <label className="block text-gray-600 dark:text-slate-400 mb-2 font-medium">
                    {t.modal_label_internet}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Home Internet Option */}
                    <div
                      onClick={() => setValue("internetType", "home")}
                      className={`cursor-pointer rounded-2xl p-3.5 border transition-all duration-300 flex items-center gap-3.5 group ${
                        currentInternetType === "home"
                          ? "border-brand-blue bg-blue-50/40 dark:border-indigo-500 dark:bg-indigo-950/20 text-brand-navy dark:text-white"
                          : "border-brand-gray hover:border-brand-blue/40 bg-brand-light-gray/40 dark:border-slate-800 dark:bg-slate-800/40 hover:dark:border-indigo-500/30 text-gray-600 dark:text-slate-400"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        currentInternetType === "home"
                          ? "bg-brand-blue/10 dark:bg-indigo-500/20 text-brand-blue dark:text-indigo-400"
                          : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 group-hover:text-brand-blue dark:group-hover:text-indigo-400"
                      }`}>
                        <Home className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 text-start">
                        <p className="font-bold text-xs">{t.modal_option_internet_home}</p>
                        <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5">
                          {language === 'ar' ? 'ADSL / VDSL / فايبر منزلي' : 'ADSL / VDSL / Home Fiber'}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        currentInternetType === "home"
                          ? "border-brand-blue dark:border-indigo-500 bg-brand-blue dark:bg-indigo-500"
                          : "border-gray-300 dark:border-slate-600"
                      }`}>
                        {currentInternetType === "home" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>

                    {/* Mobile Router / SIM Option */}
                    <div
                      onClick={() => setValue("internetType", "mobile_sim")}
                      className={`cursor-pointer rounded-2xl p-3.5 border transition-all duration-300 flex items-center gap-3.5 group ${
                        currentInternetType === "mobile_sim"
                          ? "border-brand-blue bg-blue-50/40 dark:border-indigo-500 dark:bg-indigo-950/20 text-brand-navy dark:text-white"
                          : "border-brand-gray hover:border-brand-blue/40 bg-brand-light-gray/40 dark:border-slate-800 dark:bg-slate-800/40 hover:dark:border-indigo-500/30 text-gray-600 dark:text-slate-400"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        currentInternetType === "mobile_sim"
                          ? "bg-brand-blue/10 dark:bg-indigo-500/20 text-brand-blue dark:text-indigo-400"
                          : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 group-hover:text-brand-blue dark:group-hover:text-indigo-400"
                      }`}>
                        <Wifi className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 text-start">
                        <p className="font-bold text-xs">{t.modal_option_internet_mobile}</p>
                        <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5">
                          {language === 'ar' ? 'أبو شريحة' : 'Mobile Router / SIM'}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        currentInternetType === "mobile_sim"
                          ? "border-brand-blue dark:border-indigo-500 bg-brand-blue dark:bg-indigo-500"
                          : "border-gray-300 dark:border-slate-600"
                      }`}>
                        {currentInternetType === "mobile_sim" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </div>
                  <input type="hidden" {...register("internetType", { required: t.modal_error_internet })} />
                  {errors.internetType && (
                    <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.internetType.message}
                    </span>
                  )}
                </div>

                {/* Conditional Provider Selection using Interactive Brand Cards */}
                <AnimatePresence>
                  {!!currentInternetType && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -10 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden text-start space-y-2"
                    >
                      <label className="block text-gray-600 dark:text-slate-400 mb-2 font-medium">
                        {t.modal_label_provider}
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {/* WE Card (Full Width / Spans 3 columns) */}
                        <div
                          onClick={() => setValue("provider", "WE")}
                          className={`col-span-3 cursor-pointer rounded-2xl p-3.5 border transition-all duration-300 flex items-center justify-between group px-5 ${
                            watch("provider") === "WE"
                              ? "border-purple-600 bg-purple-50/20 dark:border-purple-500 dark:bg-purple-950/10 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20"
                              : "border-brand-gray hover:border-purple-600/40 bg-brand-light-gray/40 dark:border-slate-800 dark:bg-slate-800/40 hover:dark:border-purple-500/20 text-gray-600 dark:text-slate-400"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#512275] text-white">
                              {/* Official WE lowercase typographic symbol */}
                              <span className="font-sans font-black text-sm tracking-tight">we</span>
                            </div>
                            <div className="text-start">
                              <span className="font-bold text-xs">WE</span>
                              <p className="text-[10px] text-gray-400 dark:text-slate-500">
                                {language === 'ar' ? 'المصرية للاتصالات - الخيار المرشح' : 'Telecom Egypt - Recommended'}
                              </p>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            watch("provider") === "WE"
                              ? "border-purple-600 dark:border-purple-500 bg-purple-600 dark:bg-purple-500"
                              : "border-gray-300 dark:border-slate-600"
                          }`}>
                            {watch("provider") === "WE" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>

                        {/* Vodafone Card */}
                        <div
                          onClick={() => setValue("provider", "Vodafone")}
                          className={`col-span-1 cursor-pointer rounded-2xl p-3 border transition-all duration-300 flex flex-col items-center justify-center text-center group ${
                            watch("provider") === "Vodafone"
                              ? "border-red-500 bg-red-50/20 dark:border-red-500 dark:bg-red-950/10 text-red-700 dark:text-red-300 ring-2 ring-red-500/20"
                              : "border-brand-gray hover:border-red-500/40 bg-brand-light-gray/40 dark:border-slate-800 dark:bg-slate-800/40 hover:dark:border-red-500/20 text-gray-600 dark:text-slate-400"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1.5 bg-[#E60000] text-white">
                            {/* Official Vodafone Speechmark representation */}
                            <svg className="w-5 h-5 text-white" viewBox="0 0 64 64" fill="currentColor">
                              <circle cx="32" cy="32" r="28" fill="#E60000" />
                              <path d="M32 14c-9.94 0-18 8.06-18 18c0 5.09 2.12 9.69 5.53 12.91c.28.27.7.35 1.05.21c.36-.14.61-.47.63-.86c.03-3.66 3-6.6 6.66-6.6c1.07 0 2.11.26 3.05.75c.34.18.75.14 1.05-.1c.3-.24.44-.64.36-1.03C29.69 34.62 29 31.91 29 29c0-8.28 6.72-15 15-15c4.76 0 9.01 2.22 11.75 5.67c.25.32.68.43 1.04.29c.36-.14.6-.48.61-.87C57.49 20.2 50.14 14 42 14c-3.6 0-7 1-10 2.67V14z" fill="#fff"/>
                              <circle cx="43.5" cy="28.5" r="5.5" fill="#fff" />
                            </svg>
                          </div>
                          <span className="font-semibold text-[10px] sm:text-[11px]">{language === 'ar' ? 'فودافون' : 'Vodafone'}</span>
                        </div>

                        {/* Orange Card */}
                        <div
                          onClick={() => setValue("provider", "Orange")}
                          className={`col-span-1 cursor-pointer rounded-2xl p-3 border transition-all duration-300 flex flex-col items-center justify-center text-center group ${
                            watch("provider") === "Orange"
                              ? "border-orange-500 bg-orange-50/20 dark:border-orange-500 dark:bg-orange-950/10 text-orange-700 dark:text-orange-300 ring-2 ring-orange-500/20"
                              : "border-brand-gray hover:border-orange-500/40 bg-brand-light-gray/40 dark:border-slate-800 dark:bg-slate-800/40 hover:dark:border-orange-500/20 text-gray-600 dark:text-slate-400"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-md flex flex-col items-center justify-center mb-1.5 relative overflow-hidden bg-[#FF7900] text-white">
                            {/* Official Orange logo is a simple orange square with white text inside */}
                            <span className="font-sans font-black text-[7px] text-white absolute bottom-0.5 right-0.5 tracking-tighter lowercase">orange</span>
                          </div>
                          <span className="font-semibold text-[10px] sm:text-[11px]">{language === 'ar' ? 'أورنج' : 'Orange'}</span>
                        </div>

                        {/* Etisalat Card */}
                        <div
                          onClick={() => setValue("provider", "Etisalat")}
                          className={`col-span-1 cursor-pointer rounded-2xl p-3 border transition-all duration-300 flex flex-col items-center justify-center text-center group ${
                            watch("provider") === "Etisalat"
                              ? "border-green-600 bg-green-50/20 dark:border-green-500 dark:bg-green-950/10 text-green-700 dark:text-green-300 ring-2 ring-green-500/20"
                              : "border-brand-gray hover:border-green-600/40 bg-brand-light-gray/40 dark:border-slate-800 dark:bg-slate-800/40 hover:dark:border-green-500/20 text-gray-600 dark:text-slate-400"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1.5 bg-[#789904] text-white">
                            {/* Official etisalat (e&) representation */}
                            <span className="font-sans font-black text-xs lowercase">e&</span>
                          </div>
                          <span className="font-semibold text-[10px] sm:text-[11px]">{language === 'ar' ? 'اتصالات' : 'Etisalat'}</span>
                        </div>
                      </div>
                      <input type="hidden" {...register("provider", { required: !!currentInternetType ? t.modal_error_provider : false })} />
                      {errors.provider && (
                        <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.provider.message}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 cursor-pointer text-sm shadow-md shadow-brand-blue/20 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      {t.modal_btn_loading}
                    </>
                  ) : (
                    <>
                      {t.modal_btn_submit}
                      <Send className={`w-4 h-4 transform ${language === 'ar' ? 'rotate-180' : 'rotate-0'}`} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
