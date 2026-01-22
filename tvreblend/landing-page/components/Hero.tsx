"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const secondScreenRef = useRef<HTMLDivElement>(null);

  // 전체 섹션 스크롤 진행도
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // 두 번째 화면 진입 감지
  const { scrollYProgress: textScrollProgress } = useScroll({
    target: secondScreenRef,
    offset: ["start end", "start center"],
  });

  // 스크롤에 따른 하단 그라데이션 강도
  const mobileGradientOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  // 텍스트 애니메이션 값들 - 순차적 등장
  const taglineOpacity = useTransform(textScrollProgress, [0, 0.3], [0, 1]);
  const taglineY = useTransform(textScrollProgress, [0, 0.3], [30, 0]);

  const invisibleOpacity = useTransform(textScrollProgress, [0.1, 0.4], [0, 1]);
  const invisibleY = useTransform(textScrollProgress, [0.1, 0.4], [50, 0]);

  const vliftingOpacity = useTransform(textScrollProgress, [0.2, 0.5], [0, 1]);
  const vliftingY = useTransform(textScrollProgress, [0.2, 0.5], [50, 0]);

  const badgeOpacity = useTransform(textScrollProgress, [0.3, 0.6], [0, 1]);
  const badgeScale = useTransform(textScrollProgress, [0.3, 0.6], [0.8, 1]);

  const descOpacity = useTransform(textScrollProgress, [0.4, 0.7], [0, 1]);
  const descY = useTransform(textScrollProgress, [0.4, 0.7], [30, 0]);

  return (
    <>
      {/* ===== 모바일 전용: 스크롤 스냅 + 그라데이션 전환 ===== */}
      <section
        ref={sectionRef}
        id="hero"
        className="lg:hidden relative bg-[#0a0a0a] snap-y snap-mandatory h-[200dvh] overflow-y-auto"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {/* 첫 번째 화면: 모델 얼굴만 */}
        <div
          className="relative h-[100dvh] overflow-hidden snap-start snap-always"
          style={{ scrollSnapAlign: "start" }}
        >
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-[length:auto_120%] bg-[76%_45%] will-change-transform"
            style={{
              backgroundImage: "url('/models/hero-bg.webp')",
            }}
          />

          {/* 기본 상단 어둡게 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* 스크롤에 따라 하단이 점점 어두워지는 그라데이션 */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: mobileGradientOpacity,
              background: "linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 60%, rgba(10,10,10,0.95) 85%, rgba(10,10,10,1) 100%)"
            }}
          />

          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]"
            />
          </div>

          {/* Model Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-[120px] right-6 z-20 text-right"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">BalanceLab Muse</p>
            <p className="text-lg font-display text-white tracking-widest">Lee Ga-heun</p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
              />
            </div>
          </motion.div>
        </div>

        {/* 두 번째 화면: 텍스트 섹션 (검정 배경) - 순차 모션 */}
        <div
          ref={secondScreenRef}
          className="relative h-[100dvh] bg-[#0a0a0a] flex flex-col justify-center px-6 snap-start snap-always"
          style={{ scrollSnapAlign: "start" }}
        >
          {/* Ambient Glow for text section */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[10%] right-[-20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]"
            />
          </div>

          {/* Text Content - 순차적 등장 애니메이션 */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Tagline */}
            <motion.div
              className="overflow-hidden mb-4"
              style={{ opacity: taglineOpacity, y: taglineY }}
            >
              <p className="font-serif italic text-xl text-cyan-200/80 tracking-wide">
                The Art of Defining Lines
              </p>
            </motion.div>

            <div className="space-y-2 mb-8">
              {/* INVISIBLE */}
              <motion.div
                className="overflow-hidden"
                style={{ opacity: invisibleOpacity, y: invisibleY }}
              >
                <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter">
                  INVISIBLE
                </h1>
              </motion.div>

              {/* V-LIFTING */}
              <motion.div
                className="overflow-hidden"
                style={{ opacity: vliftingOpacity, y: vliftingY }}
              >
                <span className="block font-display text-6xl md:text-8xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] leading-[0.9] tracking-tighter">
                  V-LIFTING
                </span>
              </motion.div>

              {/* Badge */}
              <motion.div
                className="pt-4"
                style={{ opacity: badgeOpacity, scale: badgeScale }}
              >
                <span className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs text-white/60 tracking-widest font-light">
                  투명브이 리프팅
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              className="text-white/70 text-base font-light leading-relaxed max-w-xl mx-auto tracking-wide"
              style={{ opacity: descOpacity, y: descY }}
            >
              <span className="text-white font-semibold">실리프팅, 다 같지 않습니다.</span><br />
              <span className="text-white">자체 개발 RAPPO.L 실로 완성하는</span><br />
              근본부터 다른 리프팅을 경험하세요.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== 데스크톱 전용: 기존 방식 ===== */}
      <section
        id="hero-desktop"
        className="hidden lg:block relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a]"
      >
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: "url('/models/hero-bg.webp')",
            }}
          />
          {/* 상하 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          {/* 왼쪽에서 오른쪽으로 밝아지는 그라데이션 (텍스트 가독성) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)"
            }}
          />
        </div>

        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]"
          />
        </div>

        {/* Main Content Layer */}
        <div className="relative z-10 min-h-[100dvh] flex flex-col justify-center pl-[12vw]">
          <div className="max-w-4xl text-left translate-x-[20px] translate-y-[-11px]">
            <div className="overflow-hidden mb-8">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif italic text-2xl text-cyan-200/80 tracking-wide"
              >
                The Art of Defining Lines
              </motion.p>
            </div>

            <div className="mb-10">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-[8rem] font-bold text-white leading-[0.9] tracking-tighter"
                >
                  INVISIBLE
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-display text-[8rem] font-bold text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.4)] leading-[0.9] tracking-tighter"
                >
                  V-LIFTING
                </motion.span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="pt-6"
              >
                <span className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-sm text-white/60 tracking-widest font-light">
                  투명브이 리프팅
                </span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="text-white/70 text-xl font-light leading-relaxed max-w-xl tracking-wide"
            >
              <span className="text-white font-semibold">실리프팅, 다 같지 않습니다.</span><br />
              <span className="text-white">자체 개발 RAPPO.L 실로 완성하는</span><br />
              근본부터 다른 리프팅을 경험하세요.
            </motion.p>
          </div>
        </div>

        {/* Model Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-[130px] right-[380px] z-20 text-right"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">BalanceLab Muse</p>
          <p className="text-lg font-display text-white tracking-widest">Lee Ga-heun</p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.button
            onClick={() => document.getElementById("why-different")?.scrollIntoView({ behavior: "smooth" })}
            className="flex flex-col items-center gap-2 group cursor-pointer p-4"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 group-hover:text-cyan-400 transition-colors duration-300">
              Discover
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-white/0 overflow-hidden relative">
              <motion.div
                animate={{ y: [-20, 48] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-[50%] bg-cyan-400 blur-[1px]"
              />
            </div>
          </motion.button>
        </motion.div>
      </section>
    </>
  );
}
