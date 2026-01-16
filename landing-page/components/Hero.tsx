"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ParticleBackground } from "./hero/ParticleBackground";
import { GlassCard } from "./hero/GlassCard";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 배경 - 깊은 네이비 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f1629] to-[#1a1a2e]" />

      {/* 배경 글로우 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[80px]" />
      </div>

      {/* 파티클 배경 */}
      <ParticleBackground />

      {/* 글래스모피즘 콘텐츠 카드 */}
      <div className="container-custom relative z-20 py-20">
        <GlassCard />
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={() => {
            document.getElementById("before-after")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-6 h-6 text-accent/60" />
          </div>
        </motion.div>
      </motion.div>

      {/* 하단 페이드 아웃 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
    </section>
  );
}
