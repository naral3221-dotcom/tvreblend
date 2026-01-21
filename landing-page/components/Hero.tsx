"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
    >
      {/* 배경 이미지 - 줌인 애니메이션 적용 */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-no-repeat lg:bg-right"
        style={{
          backgroundImage: "url('/models/hero-bg.webp')",
          backgroundPosition: "80% 30%",
        }}
      />
      {/* PC에서 배경 위치 오버라이드 */}
      <style>{`
        @media (min-width: 1024px) {
          section#hero > div:first-child {
            background-position: right center !important;
          }
        }
      `}</style>

      {/* 시안 글로우 효과 - 펄스 애니메이션 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.3, 0.15, 0.25, 0.15],
            scale: [0.8, 1.2, 1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.3, 0.5, 0.7, 1]
          }}
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[120px]"
        />
        {/* 추가 글로우 - 좌측 하단 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.2, 0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-300/20 rounded-full blur-[150px]"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex items-center justify-center lg:justify-start">

        {/* 모바일: 글래스모피즘 카드 / PC: 일반 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="
            text-section
            absolute bottom-0 left-0 w-full
            px-6 pb-24 pt-32
            bg-gradient-to-t from-black/80 via-black/20 to-transparent
            text-center
            lg:bg-none lg:p-0 lg:w-auto lg:static lg:bg-transparent lg:text-left
          "
        >
          {/* PC 위치 오버라이드 유지를 위한 기존 스타일 블록 보존 또는 Tailwind로 대체 고려. 
              기존 코드가 style block을 사용하고 있으므로, mobile-only styles를 tailwind로 처리하고 
              PC override는 기존 로직과 충돌하지 않도록 조정합니다. 
          */}
          <style>{`
            @media (min-width: 1024px) {
              section#hero .text-section {
                position: absolute !important;
                left: 22% !important;
                top: 53% !important;
                transform: translateY(-50%) !important;
                bottom: auto !important;
                background: none !important;
                width: auto !important;
                padding: 0 !important;
                margin: 0 !important;
              }
            }
          `}</style>

          {/* 메인 타이틀 - IMK 스타일: 세미볼드 + 넓은 자간 */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white lg:text-slate-800 mb-8 lg:mb-10 leading-[1.2] tracking-[0.02em]">
            <span className="block lg:inline">투명브이</span>
            <span className="text-cyan-400 lg:text-cyan-700">리프팅</span>
          </h1>

          {/* 구분선 - 더 얇고 우아하게 */}
          <div className="w-16 h-[2px] bg-white/60 lg:bg-slate-400 mb-8 lg:mb-10 mx-auto lg:mx-0" />

          {/* 서브 타이틀 1 - 가벼운 세리프 */}
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white/90 lg:text-slate-700 mb-5 lg:mb-6 leading-relaxed font-normal tracking-wide">
            "실리프팅의 <span className="text-white lg:text-slate-800">기준</span>을 바꾸다"
          </p>

          {/* 서브 타이틀 2 - 얇고 가벼운 본문 */}
          <p className="text-base md:text-lg lg:text-xl text-white/70 lg:text-slate-500 font-light tracking-[0.03em] leading-relaxed">
            얼굴 구조를 읽는 리프팅,<br />
            자체 개발 6종의 실로 완성합니다.
          </p>
        </motion.div>
      </div>

      {/* 우측 하단 모델 정보 - PC만 표시 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute z-20 text-right hidden lg:block right-[20%] bottom-[3%]"
      >
        <p className="text-sm md:text-base font-medium text-white">
          밸런스랩 전속모델
        </p>
        <p className="text-sm md:text-base font-medium text-white">
          이가흔
        </p>
      </motion.div>

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
            document.getElementById("why-different")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
