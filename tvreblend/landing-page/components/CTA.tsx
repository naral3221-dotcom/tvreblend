"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Sparkles } from "lucide-react";
import { ctaSectionContent } from "@/constants";

// 고정된 파티클 위치
const particlePositions = [
  { left: 5, top: 20 }, { left: 90, top: 15 }, { left: 35, top: 80 },
  { left: 15, top: 75 }, { left: 85, top: 60 }, { left: 60, top: 10 },
  { left: 25, top: 45 }, { left: 75, top: 85 }, { left: 50, top: 25 },
  { left: 10, top: 55 }, { left: 95, top: 40 }, { left: 45, top: 70 },
];

export function CTA() {
  const { headline, subheadline, buttons } = ctaSectionContent;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="cta" className="relative py-24 overflow-hidden">
      {/* 그라데이션 배경 - 다크 웜톤 */}
      <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-stone-800 to-stone-900" />

      {/* 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-yellow-500/10 rounded-full blur-[100px]" />
      </div>

      {/* 상단 라인 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* 파티클 효과 */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + (i % 4) * 0.4,
                repeat: Infinity,
                delay: (i % 8) * 0.2,
              }}
            />
          ))}
        </div>
      )}

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* 상단 아이콘 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6"
          >
            <Sparkles className="w-8 h-8 text-amber-400" />
          </motion.div>

          {/* 필기체 서브타이틀 */}
          <p className="font-handwriting text-xl md:text-2xl mb-4">
            <span className="text-stone-400">실이 다르면,</span>{" "}
            <span className="text-amber-400">결과가 다릅니다</span>
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {headline}
          </h2>

          <p className="text-lg text-slate-300 mb-10">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {/* Primary CTA - 전화 상담 */}
            <motion.a
              href={`tel:${buttons.phone.number}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/30"
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
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FEE500] text-[#3C1E1E] font-semibold rounded-full transition-all hover:bg-[#FEE500]/90 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{buttons.kakao.label}</span>
            </motion.a>
          </div>

          <p className="text-sm text-slate-400">
            상담은 무료이며, 부담 없이 문의해 주세요.
          </p>
        </motion.div>
      </div>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </section>
  );
}
