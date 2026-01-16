"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { beforeAfterSectionContent } from "@/constants";
import Image from "next/image";

export function BeforeAfter() {
  const { headline, subheadline, cases } = beforeAfterSectionContent;
  const [activeCase, setActiveCase] = useState(0);
  const [activePair, setActivePair] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

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
    <section id="before-after" className="section-padding bg-primary text-white">
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {headline.text} <span className="text-accent">{headline.highlight}</span>를 확인하세요
          </h2>
          <p className="text-white/70 text-lg">
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
                  ? "bg-accent text-primary"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
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
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5">
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
              className="absolute top-0 bottom-0 w-1 bg-accent shadow-lg z-10"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              {/* 슬라이더 핸들 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg cursor-grab">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* 라벨 */}
            <Badge className="absolute top-4 left-4 bg-white/20 text-white z-10">
              {currentCase.label}
            </Badge>

            {/* BEFORE / AFTER 라벨 */}
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-full text-sm font-medium z-10">
              BEFORE
            </div>
            <div className="absolute bottom-4 right-4 bg-accent/80 text-primary px-3 py-1 rounded-full text-sm font-medium z-10">
              AFTER
            </div>

            {/* 슬라이드 네비게이션 버튼 */}
            {totalPairs > 1 && (
              <>
                <button
                  onClick={handlePrevPair}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors z-30"
                  aria-label="이전 사례"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={handleNextPair}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors z-30"
                  aria-label="다음 사례"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* 페이지 인디케이터 */}
            {totalPairs > 1 && (
              <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-sm font-medium z-10">
                {activePair + 1} / {totalPairs}
              </div>
            )}
          </div>

          {/* 케이스 설명 */}
          <motion.p
            key={activeCase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white/80 mt-6 text-lg"
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
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activePair === index
                      ? "bg-accent w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`사례 ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* 안내 문구 */}
          <p className="text-center text-white/40 text-sm mt-4">
            ← 슬라이더를 좌우로 움직여 비교해보세요 →
          </p>
        </motion.div>
      </div>
    </section>
  );
}
