"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface FormInputs {
  name: string;
  cafeName: string;
  phone: string;
  country: string;
  notes?: string;
}

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    
    // Format the client request message for WhatsApp redirect
    const formattedMessage = 
      `السلام عليكم TREND NETWORK، أود طلب تركيب نظام شبكات:\n\n` +
      `• الاسم بالكامل: ${data.name}\n` +
      `• اسم الكافيه / المركز: ${data.cafeName}\n` +
      `• رقم الهاتف: ${data.phone}\n` +
      `• الدولة: ${data.country}\n` +
      (data.notes ? `• تفاصيل إضافية: ${data.notes}` : "");

    // Simulate small UI state delay before opening window
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Placeholder phone number redirect
    const whatsappNumber = "201000000000";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;
    
    window.open(whatsappUrl, "_blank");
    
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <section id="request-form" className="relative w-full py-24 bg-brand-dark overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold mb-4 text-white"
          >
            اطلب <span className="text-brand-blue">النظام الآن</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 font-sans text-base"
          >
            املأ الاستمارة وسيتواصل معك أحد مهندسينا خلال 24 ساعة لمناقشة التفاصيل وتحديد موعد التركيب.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 font-sans text-sm"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label className="block text-gray-400 mb-2 font-medium">الاسم بالكامل *</label>
                    <input
                      type="text"
                      placeholder="أدخل اسمك الكريم"
                      {...register("name", { required: "الاسم مطلوب", minLength: { value: 3, message: "يجب ألا يقل الاسم عن 3 أحرف" } })}
                      className={`w-full bg-brand-dark/50 border ${
                        errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-brand-blue/50"
                      } rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors duration-200`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Cafe name field */}
                  <div>
                    <label className="block text-gray-400 mb-2 font-medium">اسم الكافيه / المركز *</label>
                    <input
                      type="text"
                      placeholder="أدخل اسم نشاطك التجاري"
                      {...register("cafeName", { required: "اسم الكافيه مطلوب", minLength: { value: 2, message: "يجب ألا يقل الاسم عن حرفين" } })}
                      className={`w-full bg-brand-dark/50 border ${
                        errors.cafeName ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-brand-blue/50"
                      } rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors duration-200`}
                    />
                    {errors.cafeName && (
                      <span className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.cafeName.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone field */}
                  <div>
                    <label className="block text-gray-400 mb-2 font-medium">رقم الهاتف (واتساب مفضل) *</label>
                    <input
                      type="text"
                      placeholder="مثال: 01012345678"
                      {...register("phone", {
                        required: "رقم الهاتف مطلوب",
                        pattern: { value: /^[0-9+ ]{8,15}$/, message: "يرجى إدخال رقم هاتف صالح" },
                      })}
                      className={`w-full bg-brand-dark/50 border ${
                        errors.phone ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-brand-blue/50"
                      } rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ltr transition-colors duration-200`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  {/* Country Selection */}
                  <div>
                    <label className="block text-gray-400 mb-2 font-medium">الدولة *</label>
                    <select
                      {...register("country", { required: "يرجى اختيار الدولة" })}
                      className={`w-full bg-brand-dark/50 border ${
                        errors.country ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-brand-blue/50"
                      } rounded-xl px-4 py-3 text-white focus:outline-none transition-colors duration-200`}
                    >
                      <option className="bg-brand-gray text-gray-600" value="">
                        اختر دولتك
                      </option>
                      <option className="bg-brand-gray" value="مصر">
                        مصر
                      </option>
                      <option className="bg-brand-gray" value="السودان">
                        السودان
                      </option>
                      <option className="bg-brand-gray" value="العراق">
                        العراق
                      </option>
                      <option className="bg-brand-gray" value="ليبيا">
                        ليبيا
                      </option>
                      <option className="bg-brand-gray" value="اليمن">
                        اليمن
                      </option>
                      <option className="bg-brand-gray" value="سوريا">
                        سوريا
                      </option>
                    </select>
                    {errors.country && (
                      <span className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.country.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Notes/Optional message */}
                <div>
                  <label className="block text-gray-400 mb-2 font-medium">تفاصيل إضافية أو متطلبات خاصة (اختياري)</label>
                  <textarea
                    rows={4}
                    placeholder="اكتب أي مواصفات أو متطلبات إضافية تريدها في شبكتك"
                    {...register("notes")}
                    className="w-full bg-brand-dark/50 border border-white/10 focus:border-brand-blue/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_30px_rgba(0,163,255,0.2)] disabled:opacity-50 cursor-pointer text-base"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      جاري إرسال طلبك...
                    </>
                  ) : (
                    <>
                      إرسال الطلب
                      <Send className="w-5 h-5 transform rotate-180" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue mx-auto mb-6 shadow-[0_0_30px_rgba(0,163,255,0.2)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">تم إرسال طلبك بنجاح!</h3>
                <p className="text-gray-400 font-sans max-w-md mx-auto mb-8 leading-relaxed">
                  نشكرك على ثقتك في TREND NETWORK. سيتصل بك فريقنا الفني والمهندسون عبر رقم الهاتف أو الواتساب لمناقشة تركيب النظام وتجهيزه.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-gray-300 text-sm hover:text-white transition-colors duration-200"
                >
                  إرسال طلب جديد
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
