"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { levelSystemContent, LEVEL_MODELS } from "@/constants";
import dynamic from "next/dynamic";

// 3D Face 모델 (클라이언트에서만 렌더링)
const LowLevel3DWrapper = dynamic(
  () =>
    import("@/components/hero/face-3d/LowLevel3DWrapper").then(
      (mod) => mod.LowLevel3DWrapper
    ),
  { ssr: false }
);

export function LevelSystem() {
  const { headline, levels } = levelSystemContent;
  const [activeLevel, setActiveLevel] = useState(3); // 기본: LEVEL 3 (활성화된 것)
  const [activeStep, setActiveStep] = useState(0); // 0 = 시술 전, 1-3 = STEP

  const currentLevel = levels.find((l) => l.level === activeLevel);
  const isLevelAvailable = currentLevel?.available ?? false;

  const handleLevelChange = (level: number) => {
    const levelData = levels.find((l) => l.level === level);
    if (levelData?.available) {
      setActiveLevel(level);
      setActiveStep(0);
    }
  };


  return (
    <section id="level-system" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* 단색 배경 */}
      <div className="absolute inset-0 bg-[#5b2121]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 섹션 라벨 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="w-2 h-2 rounded-full bg-linear-to-r from-amber-400 to-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-white/80 tracking-wide">LEVEL SYSTEM</span>
            <span className="w-2 h-2 rounded-full bg-linear-to-r from-yellow-400 to-amber-400 animate-pulse" />
          </div>
        </motion.div>

        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {headline.text}{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-300 via-yellow-300 to-amber-400">
              {headline.highlight}
            </span>
          </h2>
        </motion.div>

        {/* LEVEL 탭 선택 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1.5 bg-white/10 backdrop-blur-sm rounded-2xl gap-2 border border-white/20">
            {levels.map((level) => (
              <button
                key={level.level}
                onClick={() => handleLevelChange(level.level)}
                disabled={!level.available}
                className={`
                  relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                  ${activeLevel === level.level && level.available
                    ? "bg-white text-[#5b2121] shadow-lg"
                    : level.available
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-white/30 cursor-not-allowed"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  {!level.available && <Lock className="w-3.5 h-3.5" />}
                  {level.title}
                </span>
                {!level.available && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-medium bg-slate-200 text-slate-500 rounded-full">
                    준비중
                  </span>
                )}
                {level.popular && level.available && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-medium bg-amber-500 text-white rounded-full shadow-lg shadow-amber-400/40">
                    인기
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 메인 컨텐츠 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 3D Face 모델 영역 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* 3D 모델 컨테이너 - WhyDifferent 스타일 크리스탈 프레임 */}
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* 크리스탈 프레임 - 웜톤 버전 */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white via-amber-50/30 to-stone-50 border border-amber-200/50 shadow-xl shadow-amber-100/30 overflow-hidden">
                {/* 내부 다크 배경 (3D 뷰어용) */}
                <div className="absolute inset-0 bg-linear-to-br from-stone-800 via-stone-900 to-[#0c0c0c]" />
              </div>

              {/* 3D 캔버스 영역 */}
              <div className="absolute inset-4 z-10 overflow-hidden rounded-2xl">
                {isLevelAvailable && LEVEL_MODELS[activeLevel as keyof typeof LEVEL_MODELS] ? (
                  <LowLevel3DWrapper liftLevel={activeStep} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Lock className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                      <p className="text-slate-400 font-medium">준비 중입니다</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 코너 장식 - 웜톤 */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-amber-400/60 rounded-tl-3xl z-20" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-amber-400/60 rounded-tr-3xl z-20" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-amber-400/60 rounded-bl-3xl z-20" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-amber-400/60 rounded-br-3xl z-20" />

              {/* 상단 레벨 표시 */}
              <div className="absolute top-6 left-6 z-30">
                <span className="px-3 py-1.5 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
                  {currentLevel?.title}
                </span>
              </div>

              {/* STEP 표시 */}
              <div className="absolute top-6 right-6 z-30">
                <span className={`
                  px-3 py-1.5 text-xs font-medium rounded-full border backdrop-blur-sm
                  ${activeStep === 0
                    ? "text-white/70 bg-black/50 border-white/10"
                    : "text-amber-200 bg-amber-500/20 border-amber-400/30"
                  }
                `}>
                  {activeStep === 0 ? "시술 전" : `STEP ${activeStep}`}
                </span>
              </div>
            </div>

            {/* 라벨 */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
              <span className="px-4 py-2 text-sm text-amber-700 bg-white/90 backdrop-blur-sm rounded-full border border-amber-200 shadow-md">
                3D 시뮬레이션
              </span>
            </div>
          </motion.div>

          {/* 오른쪽: STEP 선택 + 정보 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            {/* LEVEL 정보 - 가운데 정렬 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLevel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-8"
              >
                <p className="text-amber-300 font-semibold text-sm tracking-wide uppercase mb-3 transition-colors duration-300">
                  {currentLevel?.tagline}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {currentLevel?.title}
                </h3>
                <p className="text-lg text-white/70 leading-relaxed">
                  {currentLevel?.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* STEP 선택 버튼들 */}
            {isLevelAvailable && (
              <div className="space-y-3 mb-8">
                {/* 시술 전 */}
                <button
                  onClick={() => setActiveStep(0)}
                  className={`
                    w-full p-4 rounded-2xl text-left transition-all duration-300 border-2
                    ${activeStep === 0
                      ? "bg-white/20 border-white/30 shadow-xl shadow-black/20"
                      : "bg-white/10 border-white/20 hover:border-amber-300/50 hover:bg-white/15"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                        ${activeStep === 0 ? "bg-white text-[#5b2121]" : "bg-white/20 text-white/70"}
                      `}>
                        전
                      </div>
                      <div>
                        <p className={`font-semibold ${activeStep === 0 ? "text-white" : "text-white/80"}`}>
                          시술 전
                        </p>
                        <p className={`text-sm ${activeStep === 0 ? "text-white/70" : "text-white/50"}`}>
                          현재 상태 확인
                        </p>
                      </div>
                    </div>
                    {activeStep === 0 && (
                      <Check className="w-5 h-5 text-amber-300" />
                    )}
                  </div>
                </button>

                {/* STEP 1, 2, 3 */}
                {currentLevel?.steps.map((step) => (
                  <button
                    key={step.step}
                    onClick={() => setActiveStep(step.step)}
                    className={`
                      w-full p-4 rounded-2xl text-left transition-all duration-300 border-2
                      ${activeStep === step.step
                        ? "bg-amber-500/30 border-amber-400/50 shadow-xl shadow-amber-500/20"
                        : "bg-white/10 border-white/20 hover:border-amber-300/50 hover:bg-white/15"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`
                          w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                          ${activeStep === step.step ? "bg-amber-400 text-[#5b2121]" : "bg-white/20 text-white/70"}
                        `}>
                          {step.step}
                        </div>
                        <div>
                          <p className={`font-semibold ${activeStep === step.step ? "text-white" : "text-white/80"}`}>
                            {step.name}
                          </p>
                          {step.description && (
                            <p className={`text-sm ${activeStep === step.step ? "text-amber-200" : "text-white/50"}`}>
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {activeStep === step.step && (
                        <Check className="w-5 h-5 text-amber-300" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* 특징 리스트 */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
              <p className="text-sm font-semibold text-amber-300 uppercase tracking-wide mb-4">
                주요 특징
              </p>
              <ul className="space-y-3">
                {currentLevel?.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* 추천 대상 */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-sm text-white/60">
                  <span className="font-semibold text-white/80">추천 대상:</span>{" "}
                  {currentLevel?.target}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
