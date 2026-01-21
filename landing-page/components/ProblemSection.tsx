"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { problemSectionContent } from "@/constants";

// 고정된 파티클 위치
const particlePositions = [
  { left: 8, top: 15 }, { left: 88, top: 20 }, { left: 35, top: 75 },
  { left: 12, top: 80 }, { left: 90, top: 55 }, { left: 65, top: 12 },
  { left: 25, top: 85 }, { left: 50, top: 35 }, { left: 18, top: 50 },
];

export function ProblemSection() {
  const { headline, subheadline, emphasis, problems } = problemSectionContent;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="problem" className="relative py-24 overflow-hidden">
      {/* 밝은 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-sky-50" />

      {/* 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-rose-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-orange-100/25 rounded-full blur-[100px]" />
      </div>

      {/* 파티클 효과 */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-rose-300/40 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + (i % 4) * 0.5,
                repeat: Infinity,
                delay: (i % 6) * 0.3,
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
            <span className="text-slate-500">실리프팅, 왜</span>{" "}
            <span className="text-rose-500">걱정되시나요?</span>
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            {headline.text}{" "}
            <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              {headline.highlight}
            </span>
            할까요?
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {subheadline.map((line, i) => (
              <span key={i}>
                {line}
                {i < subheadline.length - 1 && <br />}
              </span>
            ))}
            <br />
            <span className="font-semibold text-slate-800">
              {emphasis}
            </span>
          </p>
        </motion.div>

        {/* 문제점 카드 */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-sm shadow-sm hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/30 transition-all duration-500 text-center">
                {/* 호버 글로우 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-50/50 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <problem.icon className="w-7 h-7 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-rose-600 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-50 to-transparent pointer-events-none" />
    </section>
  );
}
