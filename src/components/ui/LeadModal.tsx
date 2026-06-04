"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, AlertCircle, RefreshCw, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface FormInputs {
  name: string;
  cafeName: string;
  phone: string;
  country: string;
  networkSize: string;
  notes?: string;
}

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    
    const formattedMessage = 
      `السلام عليكم TREND NETWORK، أود طلب نظام شبكات لشركتي:\n\n` +
      `• الاسم بالكامل: ${data.name}\n` +
      `• اسم الكافيه / النشاط: ${data.cafeName}\n` +
      `• رقم الهاتف: ${data.phone}\n` +
      `• الدولة: ${data.country}\n` +
      `• حجم الشبكة الحالي: ${data.networkSize}\n` +
      (data.notes ? `• تفاصيل إضافية: ${data.notes}` : "");

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
            className="absolute inset-0 bg-brand-navy/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative bg-white w-full max-w-3xl rounded-[2rem] overflow-hidden z-10 font-sans flex flex-col md:flex-row"
            style={{ boxShadow: "0 30px 80px -15px rgba(0, 0, 0, 0.1), 0 8px 24px -4px rgba(14, 165, 233, 0.06)" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 end-5 w-9 h-9 rounded-full bg-brand-light-gray hover:bg-brand-gray flex items-center justify-center text-brand-navy transition-colors duration-200 cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Software Features / Info Badges (SaaS Dashboard layout) */}
            <div className="md:w-5/12 p-8 flex flex-col justify-between" style={{ background: "linear-gradient(160deg, #e0f2fe 0%, #f0f9ff 60%, #ffffff 100%)", borderRight: "1px solid #e0f2fe" }}>
              <div>
                <h4 className="text-xl font-display font-black text-brand-navy mb-4">
                  عضوية TREND NETWORK
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-8">
                  انضم إلى ملاك المقاهي الذين قاموا بحماية وإدارة شبكاتهم بشكل تلقائي.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="icon-circle-sm flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-brand-navy">تأمين تام للشبكة</h5>
                      <p className="text-[11px] text-gray-400">حظر تلقائي للأعطال والهجمات.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="icon-circle-sm flex-shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-brand-navy">تشغيل فوري وسهل</h5>
                      <p className="text-[11px] text-gray-400">إعداد متكامل ينجزه مهندسونا.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 flex items-center gap-2 text-[11px] text-gray-400" style={{ borderTop: "1px solid #f1f5f9" }}>
                <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue" />
                <span>دعم فني وضمان استمرارية الخدمة.</span>
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="md:w-7/12 p-8 flex flex-col justify-center">
              <div className="mb-6 text-start">
                <h3 className="text-2xl font-display font-black text-brand-navy mb-2">
                  اطلب <span className="text-brand-blue">النظام الآن</span>
                </h3>
                <p className="text-gray-500 text-xs">
                  سجل بياناتك للتحدث مع مهندس متخصص مباشرة.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs text-brand-navy">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-600 mb-1.5 font-medium">الاسم بالكامل *</label>
                    <input
                      type="text"
                      placeholder="أدخل اسمك"
                      {...register("name", { required: "الاسم مطلوب", minLength: { value: 3, message: "يجب ألا يقل عن 3 أحرف" } })}
                      className="w-full bg-brand-light-gray border border-brand-gray rounded-xl px-4 py-2.5 placeholder-gray-400 focus:outline-none focus:border-brand-blue/60 transition-colors"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Cafe Name */}
                  <div>
                    <label className="block text-gray-600 mb-1.5 font-medium">اسم الكافيه / النشاط *</label>
                    <input
                      type="text"
                      placeholder="أدخل اسم الكافيه"
                      {...register("cafeName", { required: "اسم النشاط مطلوب" })}
                      className="w-full bg-brand-light-gray border border-brand-gray rounded-xl px-4 py-2.5 placeholder-gray-400 focus:outline-none focus:border-brand-blue/60 transition-colors"
                    />
                    {errors.cafeName && (
                      <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.cafeName.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-gray-600 mb-1.5 font-medium">رقم الهاتف (واتساب) *</label>
                    <input
                      type="text"
                      placeholder="مثال: 01012345678"
                      {...register("phone", { required: "رقم الهاتف مطلوب", pattern: { value: /^[0-9+ ]{8,15}$/, message: "الرقم غير صالح" } })}
                      className="w-full bg-brand-light-gray border border-brand-gray rounded-xl px-4 py-2.5 placeholder-gray-400 focus:outline-none focus:border-brand-blue/60 transition-colors"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-gray-600 mb-1.5 font-medium">الدولة *</label>
                    <select
                      {...register("country", { required: "يرجى اختيار الدولة" })}
                      className="w-full bg-brand-light-gray border border-brand-gray rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-blue/60 transition-colors"
                    >
                      <option value="">اختر دولتك</option>
                      <option value="مصر">مصر</option>
                      <option value="السودان">السودان</option>
                      <option value="العراق">العراق</option>
                      <option value="ليبيا">ليبيا</option>
                      <option value="اليمن">اليمن</option>
                      <option value="سوريا">سوريا</option>
                    </select>
                    {errors.country && (
                      <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.country.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Network Size */}
                <div>
                  <label className="block text-gray-600 mb-1.5 font-medium">حجم الشبكة الحالي *</label>
                  <select
                    {...register("networkSize", { required: "يرجى تحديد حجم الشبكة" })}
                    className="w-full bg-brand-light-gray border border-brand-gray rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-blue/60 transition-colors"
                  >
                    <option value="">حدد الحجم</option>
                    <option value="أقل من 50 مستخدم">أقل من 50 مستخدم</option>
                    <option value="50 إلى 150 مستخدم">50 إلى 150 مستخدم</option>
                    <option value="150 إلى 300 مستخدم">150 إلى 300 مستخدم</option>
                    <option value="أكثر من 300 مستخدم">أكثر من 300 مستخدم</option>
                  </select>
                  {errors.networkSize && (
                    <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.networkSize.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 cursor-pointer text-sm shadow-md shadow-brand-blue/20"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      جاري التوجيه للواتساب...
                    </>
                  ) : (
                    <>
                      تأكيد الطلب والتواصل الفوري
                      <Send className="w-4 h-4 transform rotate-180" />
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
