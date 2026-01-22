"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { benefitsSectionContent } from "@/constants";

// 고정된 파티클 위치
const particlePositions = [
  { left: 15, top: 22 }, { left: 80, top: 18 }, { left: 42, top: 68 },
  { left: 6, top: 82 }, { left: 88, top: 52 }, { left: 62, top: 8 },
  { left: 32, top: 78 }, { left: 55, top: 38 },
];

export function Benefits() {
  const { headline, benefits } = benefitsSectionContent;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="benefits" className="relative py-24 overflow-hidden">
      {/* 밝은 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50/30 to-sky-50" />

      {/* 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-violet-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-indigo-100/25 rounded-full blur-[100px]" />
      </div>

      {/* 파티클 효과 */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-violet-400/40 rounded-full"
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
                delay: (i % 5) * 0.3,
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
            <span className="text-slate-500">투명브이리프팅만의</span>{" "}
            <span className="text-violet-600">특별함</span>
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
            {headline.text}{" "}
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              {headline.highlight}
            </span>
            인가요?
          </h2>
        </motion.div>

        {/* 혜택 그리드 */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-sm shadow-sm hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/30 transition-all duration-500 relative overflow-hidden">
                {/* 호버 글로우 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-50/50 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-violet-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                      {benefit.description}
                    </p>
                  </div>
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
