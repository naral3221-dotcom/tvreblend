"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { beforeAfterSectionContent } from "@/constants";
import Image from "next/image";

// 고정된 파티클 위치 (hydration 에러 방지)
const particlePositions = [
  { left: 10, top: 20 }, { left: 85, top: 15 }, { left: 40, top: 70 },
  { left: 5, top: 85 }, { left: 92, top: 50 }, { left: 70, top: 10 },
  { left: 30, top: 80 }, { left: 55, top: 30 }, { left: 20, top: 55 },
  { left: 80, top: 90 }, { left: 48, top: 25 }, { left: 15, top: 42 },
];

export function BeforeAfter() {
  const { headline, subheadline, cases } = beforeAfterSectionContent;
  const [activeCase, setActiveCase] = useState(0);
  const [activePair, setActivePair] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentCase = cases[activeCase];
  const currentPair = currentCase.pairs[activePair];
  const totalPairs = currentCase.pairs.length;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleCaseChange = (index: number) => {
    setActiveCase(index);
    setActivePair(0);
    setSliderPosition(50);
  };

  const handlePrevPair = () => {
    setActivePair((prev) => (prev === 0 ? totalPairs - 1 : prev - 1));
    setSliderPosition(50);
  };

  const handleNextPair = () => {
    setActivePair((prev) => (prev === totalPairs - 1 ? 0 : prev + 1));
    setSliderPosition(50);
  };

  return (
    <section id="before-after" className="relative py-24 overflow-hidden">
      {/* 밝은 그라데이션 배경 - WhyDifferent와 연결 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-slate-50" />

      {/* 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-200/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-sky-200/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-blue-200/15 rounded-full blur-[80px]" />
      </div>

      {/* 파티클 효과 */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3 + (i % 4) * 0.5,
                repeat: Infinity,
                delay: (i % 8) * 0.25,
              }}
            />
          ))}
        </div>
      )}

      <div className="container-custom relative z-10">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* 필기체 서브타이틀 */}
          <p className="font-handwriting text-xl md:text-2xl mb-4">
            <span className="text-slate-500">결과로 증명하는,</span>{" "}
            <span className="text-cyan-600">실제 변화</span>
          </p>

          {/* 메인 타이틀 */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            {headline.text}{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
              {headline.highlight}
            </span>
            를 확인하세요
          </h2>

          {/* 서브타이틀 */}
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>
        </motion.div>

        {/* LEVEL 탭 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 mb-10"
        >
          {cases.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleCaseChange(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCase === index
                  ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-200/50"
                  : "bg-white/80 text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>

        {/* Before/After 슬라이더 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          {/* 크리스탈 프레임 */}
          <div className="relative p-2 rounded-3xl bg-gradient-to-br from-white via-cyan-50/50 to-sky-50 border border-cyan-200/50 shadow-xl shadow-cyan-100/30">
            {/* 코너 장식 */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-3xl z-20" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-3xl z-20" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-3xl z-20" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-400/60 rounded-br-3xl z-20" />

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCase}-${activePair}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {/* After 이미지 (배경) */}
                  <div className="absolute inset-0">
                    <Image
                      src={currentPair.afterImage}
                      alt={`${currentCase.label} After`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 672px"
                      priority
                    />
                  </div>

                  {/* Before 이미지 (클리핑) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <div
                      className="relative h-full"
                      style={{ width: `${100 / (sliderPosition / 100)}%` }}
                    >
                      <Image
                        src={currentPair.beforeImage}
                        alt={`${currentCase.label} Before`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 슬라이더 라인 */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-sky-500 to-cyan-400 shadow-lg shadow-cyan-400/50 z-10"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                {/* 슬라이더 핸들 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/40 cursor-grab border-2 border-white">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>

              {/* 슬라이더 입력 */}
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-20"
              />

              {/* 레벨 라벨 */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-cyan-700 text-sm font-medium rounded-full border border-cyan-200 shadow-sm z-10">
                {currentCase.label}
              </div>

              {/* BEFORE / AFTER 라벨 */}
              <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium z-10">
                BEFORE
              </div>
              <div className="absolute bottom-4 right-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg shadow-cyan-400/30 z-10">
                AFTER
              </div>

              {/* 슬라이드 네비게이션 버튼 */}
              {totalPairs > 1 && (
                <>
                  <button
                    onClick={handlePrevPair}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-slate-200 z-30 hover:scale-105"
                    aria-label="이전 사례"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={handleNextPair}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-slate-200 z-30 hover:scale-105"
                    aria-label="다음 사례"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </>
              )}

              {/* 페이지 인디케이터 */}
              {totalPairs > 1 && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 border border-slate-200 z-10">
                  {activePair + 1} / {totalPairs}
                </div>
              )}
            </div>
          </div>

          {/* 케이스 설명 */}
          <motion.p
            key={activeCase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-slate-600 mt-8 text-lg"
          >
            {currentCase.description}
          </motion.p>

          {/* 도트 인디케이터 */}
          {totalPairs > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {currentCase.pairs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActivePair(index);
                    setSliderPosition(50);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activePair === index
                      ? "bg-gradient-to-r from-cyan-500 to-sky-500 w-6"
                      : "bg-slate-300 w-2.5 hover:bg-slate-400"
                  }`}
                  aria-label={`사례 ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* 안내 문구 */}
          <p className="text-center text-slate-400 text-sm mt-4">
            ← 슬라이더를 좌우로 움직여 비교해보세요 →
          </p>
        </motion.div>
      </div>

      {/* 하단 그라데이션 - 다음 섹션으로 자연스럽게 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}
