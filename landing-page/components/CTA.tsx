"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { ctaSectionContent } from "@/constants";

export function CTA() {
  const { headline, subheadline, buttons } = ctaSectionContent;

  return (
    <section id="cta" className="section-padding bg-primary text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {headline}
          </h2>

          <p className="text-lg text-white/80 mb-10">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            {/* Primary CTA - 전화 상담 */}
            <motion.a
              href={`tel:${buttons.phone.number}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-primary font-semibold rounded-full transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30"
            >
              <Phone className="w-5 h-5" />
              <span>{buttons.phone.label}</span>
            </motion.a>

            {/* Secondary CTA - 카카오톡 */}
            <motion.a
              href={buttons.kakao.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FEE500] text-[#3C1E1E] font-semibold rounded-full transition-all hover:bg-[#FEE500]/90"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{buttons.kakao.label}</span>
            </motion.a>
          </div>

          <p className="text-sm text-white/60">
            상담은 무료이며, 부담 없이 문의해 주세요.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
