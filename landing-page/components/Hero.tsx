"use client";

import { motion } from "framer-motion";

export function Hero() {

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a]"
    >
      {/* 1. Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-[length:auto_120%] bg-[76%_45%] lg:bg-cover lg:bg-center will-change-transform"
          style={{
            backgroundImage: "url('/models/hero-bg.webp')",
          }}
        />
        {/* Cinematic Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 lg:to-black/60 pointer-events-none" />
      </div>

      {/* 2. Ambient Glow Effects */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Right Cyan Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]"
        />
        {/* Bottom Left Subtle Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]"
        />
      </div>

      {/* 3. Main Content Layer */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col justify-center px-6 lg:px-0 lg:pl-[12vw]">

        <div className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left lg:translate-x-[20px] lg:translate-y-[-11px]">

          {/* Eyebrow Text: Brand Tagline */}
          <div className="overflow-hidden mb-4 lg:mb-8">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif italic text-xl lg:text-2xl text-cyan-200/80 tracking-wide"
            >
              The Art of Defining Lines
            </motion.p>
          </div>

          {/* Main Headline: Mask Reveal Effect */}
          <div className="space-y-2 lg:space-y-0 mb-8 lg:mb-10">
            {/* INVISIBLE */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-6xl md:text-8xl lg:text-[8rem] font-bold text-white leading-[0.9] tracking-tighter"
              >
                INVISIBLE
              </motion.h1>
            </div>
            {/* V-LIFTING */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="block font-display text-6xl md:text-8xl lg:text-[8rem] font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] lg:[-webkit-text-stroke:2px_rgba(255,255,255,0.4)] leading-[0.9] tracking-tighter"
              >
                V-LIFTING
              </motion.span>
            </div>
            {/* Korean Badge - 별도 라인 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="pt-4 lg:pt-6"
            >
              <span className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-xs lg:text-sm text-white/60 tracking-widest font-light">
                투명브이 리프팅
              </span>
            </motion.div>
          </div>

          {/* Descriptive Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-white/70 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl tracking-wide text-center lg:text-left"
          >
            <span className="text-white font-semibold">얼굴 구조를 완벽하게 이해하는 기술,</span><br />
            <span className="text-white">자체 개발 6종 실로 완성하는</span><br />
            가장 자연스럽고 강력한 리프팅을 경험하세요.
          </motion.p>

        </div>
      </div>

      {/* 4. Model Info (Clean Minimalist) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-[46px] lg:bottom-[130px] right-6 lg:right-[380px] z-20 text-right"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">BalanceLab Muse</p>
        <p className="text-lg font-display text-white tracking-widest">Lee Ga-heun</p>
      </motion.div>

      {/* 5. Scroll Indicator */}
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
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-white/0 overflow-hidden relative">
            <motion.div
              animate={{ y: [-20, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-[50%] bg-cyan-400 blur-[1px]"
            />
          </div>
        </motion.button>
      </motion.div>

    </section>
  );
}
