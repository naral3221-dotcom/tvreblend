"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/constants";

export function GlassCard() {
  const { badge, headline, subheadline } = heroContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative z-20"
    >
      {/* 글래스모피즘 카드 */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl">
        {/* 카드 내부 빛 효과 */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-accent/10 to-transparent" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-white/5 to-transparent" />
        </div>

        {/* 콘텐츠 */}
        <div className="relative text-center">
          {/* 배지 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-1.5 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full text-accent text-xs md:text-sm font-medium tracking-widest uppercase">
              {badge}
            </span>
          </motion.div>

          {/* 메인 헤드라인 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            {headline.line1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent">
              {headline.highlight}
            </span>
          </motion.h1>

          {/* 서브 헤드라인 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-base md:text-lg text-white/70 max-w-md mx-auto mb-8 leading-relaxed"
          >
            {subheadline}
          </motion.p>

        </div>
      </div>

      {/* 카드 하단 반사 효과 */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-accent/20 blur-2xl rounded-full" />
    </motion.div>
  );
}
