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
      {/* 그라데이션 배경 - 다크 크리스탈 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* 상단 라인 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* 파티클 효과 */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-sky-500/20 border border-cyan-500/30 mb-6"
          >
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </motion.div>

          {/* 필기체 서브타이틀 */}
          <p className="font-handwriting text-xl md:text-2xl mb-4">
            <span className="text-slate-400">지금 바로</span>{" "}
            <span className="text-cyan-400">시작하세요</span>
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
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-cyan-500/30"
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
