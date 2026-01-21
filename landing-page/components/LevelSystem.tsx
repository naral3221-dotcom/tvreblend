"use client";

import { useState, useEffect } from "react";
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

// 고정된 파티클 위치 (hydration 에러 방지)
const particlePositions = [
  { left: 10, top: 20 }, { left: 85, top: 15 }, { left: 40, top: 70 },
  { left: 5, top: 85 }, { left: 92, top: 50 }, { left: 70, top: 10 },
  { left: 30, top: 80 }, { left: 55, top: 30 }, { left: 20, top: 55 },
  { left: 75, top: 90 }, { left: 48, top: 25 }, { left: 15, top: 40 },
];

export function LevelSystem() {
  const { headline, levels } = levelSystemContent;
  const [activeLevel, setActiveLevel] = useState(3); // 기본: LEVEL 3 (활성화된 것)
  const [activeStep, setActiveStep] = useState(0); // 0 = 시술 전, 1-3 = STEP
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLevel = levels.find((l) => l.level === activeLevel);
  const isLevelAvailable = currentLevel?.available ?? false;

  // LEVEL 변경 시 STEP 초기화
  const handleLevelChange = (level: number) => {
    const levelData = levels.find((l) => l.level === level);
    if (levelData?.available) {
      setActiveLevel(level);
      setActiveStep(0);
    }
  };

  return (
    <section id="level-system" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* 배경 - 더 진한 톤으로 섹션 구분 */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-slate-50 to-white" />

      {/* 상단 섹션 구분 라인 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

      {/* 크리스탈 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 메인 시안 글로우 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[120px]" />
        {/* 좌측 스카이 글로우 */}
        <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-sky-100/30 rounded-full blur-[100px]" />
        {/* 우측 블루 글로우 */}
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-blue-100/25 rounded-full blur-[80px]" />
      </div>

      {/* 크리스탈 파티클 효과 */}
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
                delay: (i % 8) * 0.3,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 섹션 라벨 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-cyan-200/50 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-600 tracking-wide">LEVEL SYSTEM</span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 animate-pulse" />
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight">
            {headline.text}{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
              {headline.highlight}
            </span>
            은?
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
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-sm rounded-2xl gap-2 border border-cyan-100 shadow-lg shadow-cyan-100/20">
            {levels.map((level) => (
              <button
                key={level.level}
                onClick={() => handleLevelChange(level.level)}
                disabled={!level.available}
                className={`
                  relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                  ${activeLevel === level.level && level.available
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-400/30"
                    : level.available
                      ? "text-slate-600 hover:text-cyan-700 hover:bg-cyan-50/50"
                      : "text-slate-400 cursor-not-allowed"
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
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-medium bg-cyan-500 text-white rounded-full shadow-lg shadow-cyan-400/40">
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
              {/* 크리스탈 프레임 - 밝은 버전 */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white via-sky-50/50 to-cyan-50 border border-cyan-200/50 shadow-xl shadow-cyan-100/30 overflow-hidden">
                {/* 내부 다크 배경 (3D 뷰어용) */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-[#0a1628]" />
              </div>

              {/* 3D 캔버스 영역 */}
              <div className="absolute inset-4 z-10">
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

              {/* 코너 장식 */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-3xl z-20" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-3xl z-20" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-3xl z-20" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-400/60 rounded-br-3xl z-20" />

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
                    : "text-cyan-300 bg-cyan-500/20 border-cyan-400/30"
                  }
                `}>
                  {activeStep === 0 ? "시술 전" : `STEP ${activeStep}`}
                </span>
              </div>
            </div>

            {/* 라벨 */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
              <span className="px-4 py-2 text-sm text-cyan-700 bg-white/90 backdrop-blur-sm rounded-full border border-cyan-200 shadow-md">
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
                <p className="text-cyan-600 font-semibold text-sm tracking-wide uppercase mb-3">
                  {currentLevel?.tagline}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {currentLevel?.title}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
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
                      ? "bg-slate-800 border-slate-800 shadow-xl shadow-slate-800/20"
                      : "bg-white/80 border-slate-200 hover:border-cyan-200 hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                        ${activeStep === 0 ? "bg-white text-slate-800" : "bg-slate-100 text-slate-500"}
                      `}>
                        전
                      </div>
                      <div>
                        <p className={`font-semibold ${activeStep === 0 ? "text-white" : "text-slate-800"}`}>
                          시술 전
                        </p>
                        <p className={`text-sm ${activeStep === 0 ? "text-slate-300" : "text-slate-500"}`}>
                          현재 상태 확인
                        </p>
                      </div>
                    </div>
                    {activeStep === 0 && (
                      <Check className="w-5 h-5 text-cyan-400" />
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
                        ? "bg-gradient-to-r from-cyan-500 to-sky-500 border-cyan-500 shadow-xl shadow-cyan-400/30"
                        : "bg-white/80 border-slate-200 hover:border-cyan-200 hover:shadow-md"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`
                          w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                          ${activeStep === step.step ? "bg-white/20 text-white" : "bg-cyan-50 text-cyan-600"}
                        `}>
                          {step.step}
                        </div>
                        <div>
                          <p className={`font-semibold ${activeStep === step.step ? "text-white" : "text-slate-800"}`}>
                            {step.name}
                          </p>
                          {step.description && (
                            <p className={`text-sm ${activeStep === step.step ? "text-cyan-100" : "text-slate-500"}`}>
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {activeStep === step.step && (
                        <Check className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* 특징 리스트 */}
            <div className="bg-gradient-to-br from-white/80 via-cyan-50/30 to-sky-50/50 rounded-2xl p-6 border border-cyan-100/50 backdrop-blur-sm">
              <p className="text-sm font-semibold text-cyan-600/70 uppercase tracking-wide mb-4">
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
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-100 to-sky-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-cyan-600" />
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* 추천 대상 */}
              <div className="mt-6 pt-4 border-t border-cyan-100/50">
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">추천 대상:</span>{" "}
                  {currentLevel?.target}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 하단 그라데이션 - 다음 섹션으로 자연스럽게 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
