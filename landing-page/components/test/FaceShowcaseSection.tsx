"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// 3D 얼굴은 클라이언트에서만 렌더링
const LiftingFace3D = dynamic(
  () =>
    import("@/components/hero/face-3d/LiftingFace3D").then(
      (mod) => mod.LiftingFace3D
    ),
  { ssr: false }
);

type LiftLevel = 0 | 1 | 2 | 3;

const liftLevels = [
  {
    level: 0 as LiftLevel,
    label: "처진 상태",
    description: "시술 전",
  },
  {
    level: 1 as LiftLevel,
    label: "LEVEL 1",
    description: "자연스러운 리프팅",
  },
  {
    level: 2 as LiftLevel,
    label: "LEVEL 2",
    description: "또렷한 윤곽",
  },
  {
    level: 3 as LiftLevel,
    label: "LEVEL 3",
    description: "극대화 리프팅",
  },
];

export function FaceShowcaseSection() {
  const [activeLevel, setActiveLevel] = useState<LiftLevel>(0);

  return (
    <section className="w-full h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Effects (Consistent with Thread Showcase) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a2035] via-[#050510] to-[#000000] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-0" />

      {/* Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Content Container */}
      <div className="w-full h-full relative z-10 flex flex-col">
        {/* Header Overlay */}
        <div className="absolute top-12 left-0 w-full text-center pointer-events-none z-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] tracking-[0.2em] backdrop-blur-md mb-3">
            LIFTING SIMULATION
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Face{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-sky-500">
              {activeLevel === 0 ? "Before" : `Level ${activeLevel}`}
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-2 font-light">
            {liftLevels[activeLevel].description}
          </p>
        </div>

        {/* 3D Model */}
        <div className="flex-1 w-full min-h-0 flex items-center justify-center">
          <LiftingFace3D liftLevel={activeLevel} />
        </div>

        {/* Level Selection Buttons - 하단 */}
        <div className="absolute bottom-8 left-0 w-full z-20">
          <div className="flex justify-center gap-3">
            {liftLevels.map((item) => (
              <motion.button
                key={item.level}
                onClick={() => setActiveLevel(item.level)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm ${
                  activeLevel === item.level
                    ? "bg-gradient-to-r from-sky-400 to-sky-600 text-white shadow-lg shadow-sky-500/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
                }`}
              >
                <span className="block text-sm font-semibold">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* 설명 텍스트 */}
          <p className="text-center text-white/30 text-xs mt-4">
            버튼을 클릭하여 리프팅 효과를 확인해보세요
          </p>
        </div>
      </div>
    </section>
  );
}
