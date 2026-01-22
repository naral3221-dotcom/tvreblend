"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { solutionSectionContent } from "@/constants";

// 고정된 파티클 위치
const particlePositions = [
  { left: 12, top: 18 }, { left: 82, top: 22 }, { left: 38, top: 72 },
  { left: 8, top: 78 }, { left: 92, top: 48 }, { left: 68, top: 15 },
  { left: 28, top: 82 }, { left: 52, top: 32 }, { left: 22, top: 58 },
  { left: 78, top: 88 },
];

export function SolutionSection() {
  const { badge, headline, subheadline, features, cta } = solutionSectionContent;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="solution" className="relative py-24 overflow-hidden">
      {/* 밝은 그라데이션 배경 - 웜톤 */}
      <div className="absolute inset-0 bg-linear-to-b from-stone-50 via-white to-amber-50/30" />

      {/* 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-orange-100/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-yellow-100/20 rounded-full blur-[80px]" />
      </div>

      {/* 파티클 효과 */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-amber-400/40 rounded-full"
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
                delay: (i % 7) * 0.25,
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
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full mb-4">
            {badge}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-6">
            {headline.line1}
            <br />
            {headline.line2}{" "}
            <span className="bg-linear-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
              {headline.highlight}
            </span>
            합니다
          </h2>
          <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {subheadline.map((line, i) => (
              <span key={i}>
                {line}
                {i < subheadline.length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>

        {/* 특징 카드 */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-white/80 border border-stone-200 backdrop-blur-sm shadow-sm hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-500 text-center relative overflow-hidden">
                {/* 호버 글로우 */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-50/50 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-3 group-hover:text-amber-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-stone-500 leading-relaxed group-hover:text-stone-600 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA 박스 - 웜톤 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative p-1 rounded-3xl bg-linear-to-br from-amber-300 via-yellow-300 to-orange-300"
        >
          <div className="relative rounded-[22px] bg-linear-to-br from-stone-800 via-stone-900 to-stone-800 p-8 md:p-12 text-center overflow-hidden">
            {/* 내부 글로우 */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-amber-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {cta.title.join(" ")}
                <br />
                <span className="bg-linear-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {cta.highlight}
                </span>
              </h3>
              <p className="text-stone-300 max-w-xl mx-auto leading-relaxed">
                {cta.description.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < cta.description.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-amber-50/30 to-transparent pointer-events-none" />
    </section>
  );
}
