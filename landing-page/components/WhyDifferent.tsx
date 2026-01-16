"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// 3D 실은 클라이언트에서만 렌더링
const CrystalThread3D = dynamic(
  () => import("./hero/thread-3d/CrystalThread3D").then((mod) => mod.CrystalThread3D),
  { ssr: false }
);

// 비교 데이터
const comparisonData = {
  general: {
    title: "일반 실리프팅",
    items: [
      { label: "실 종류", value: "단일 실 사용" },
      { label: "시술 방식", value: "표준 매뉴얼" },
      { label: "유지기간", value: "6개월 ~ 1년" },
      { label: "시술 디자인", value: "제한적" },
    ],
  },
  premium: {
    title: "투명브이리프팅",
    items: [
      { label: "실 종류", value: "● 자체 개발 RAPPO.L 실\n● PDO, PCL (장실,단실) 혼합 사용" },
      { label: "시술 방식", value: "얼굴 구조 맞춤 설계" },
      { label: "유지기간", value: "1.5년 ~ 2년+" },
      { label: "시술 디자인", value: "완전 개인화 맞춤 시술" },
    ],
  },
};

const differences = [
  {
    number: "01",
    title: "실 자체가 다릅니다",
    description:
      "10년간의 임상 경험을 바탕으로 직접 설계한 실. 기성품으로는 불가능한 정밀한 리프팅 효과를 구현합니다.",
  },
  {
    number: "02",
    title: "시술 방식이 다릅니다",
    description:
      "얼굴 골격과 피부 두께를 분석한 맞춤 설계. 레이어별 정밀 삽입으로 자연스러우면서도 강력한 리프팅.",
  },
  {
    number: "03",
    title: "결과가 증명합니다",
    description:
      "평균 1.5년 이상 유지되는 효과. 재시술 고객의 95%가 만족을 표현한 검증된 시술입니다.",
  },
];

// 고정된 파티클 위치 (hydration 에러 방지)
const particlePositions = [
  { left: 15, top: 25 }, { left: 82, top: 18 }, { left: 43, top: 67 },
  { left: 8, top: 89 }, { left: 91, top: 45 }, { left: 67, top: 12 },
  { left: 34, top: 78 }, { left: 56, top: 34 }, { left: 23, top: 56 },
  { left: 78, top: 91 }, { left: 45, top: 23 }, { left: 12, top: 45 },
  { left: 89, top: 67 }, { left: 5, top: 34 }, { left: 95, top: 78 },
  { left: 38, top: 5 }, { left: 62, top: 95 }, { left: 28, top: 15 },
  { left: 72, top: 82 }, { left: 50, top: 50 },
];

export function WhyDifferent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* 하늘색 크리스탈 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d2137] to-[#0a1628]" />

      {/* 크리스탈 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 메인 하늘색 글로우 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-[150px]" />
        {/* 좌측 시안 글로우 */}
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-cyan-400/8 rounded-full blur-[120px]" />
        {/* 우측 블루 글로우 */}
        <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-blue-400/8 rounded-full blur-[100px]" />
        {/* 상단 라이트 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
      </div>

      {/* 크리스탈 파티클 효과 */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-sky-300/40 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + (i % 5) * 0.4,
                repeat: Infinity,
                delay: (i % 10) * 0.2,
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
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* 필기체 서브타이틀 */}
          <p className="font-handwriting text-xl md:text-2xl mb-4">
            <span className="text-white/70">똑같은 실리프팅인데,</span>{" "}
            <span className="text-sky-300">왜 투명브이만 결과가 다를까요?</span>
          </p>

          {/* 메인 타이틀 */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            투명브이리프팅의{" "}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              '결정적 디테일'
            </span>
          </h2>

          {/* 일반체 서브타이틀 */}
          <p className="text-base md:text-lg text-sky-100/60 max-w-2xl mx-auto leading-relaxed">
            독자적 소재 RAPPO.L과 안면 구조 맞춤 설계의 만남,
            <br className="hidden md:block" />
            시작부터 결과까지의 차이를 만듭니다.
          </p>
        </motion.div>

        {/* 3D 실 + 비교 섹션 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* 3D 실 뷰어 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* 크리스탈 프레임 */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-400/10 via-transparent to-cyan-400/10 border border-sky-400/20 backdrop-blur-sm" />

              {/* 3D 캔버스 영역 */}
              <div className="absolute inset-4">
                <CrystalThread3D />
              </div>

              {/* 코너 장식 */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-sky-400/40 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-sky-400/40 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-sky-400/40 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-sky-400/40 rounded-br-xl" />
            </div>

            {/* 라벨 */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-2 text-sm text-sky-300 bg-sky-950/80 backdrop-blur-sm rounded-full border border-sky-400/20">
                RAOPO.L 실
              </span>
            </div>
          </motion.div>

          {/* 비교 카드 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* 일반 실리프팅 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white/60 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/40" />
                {comparisonData.general.title}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {comparisonData.general.items.map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-white/40 mb-1">{item.label}</p>
                    <p className="text-sm text-white/70">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 투명브이리프팅 (하이라이트) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-400/10 to-cyan-400/5 border border-sky-400/30 backdrop-blur-sm relative overflow-hidden">
              {/* 빛나는 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/5 to-transparent animate-shine" />

              <h4 className="text-lg font-semibold text-sky-300 mb-4 flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-lg shadow-sky-400/50" />
                {comparisonData.premium.title}
              </h4>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {comparisonData.premium.items.map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-sky-200/50 mb-1">{item.label}</p>
                    <p className="text-sm text-white font-medium whitespace-pre-line">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 차별점 카드들 */}
        <div className="grid md:grid-cols-3 gap-6">
          {differences.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-sky-400/30 transition-all duration-500"
            >
              {/* 호버 글로우 */}
              <div className="absolute inset-0 rounded-2xl bg-sky-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 넘버 */}
              <span className="inline-block text-5xl font-bold bg-gradient-to-b from-sky-400/30 to-transparent bg-clip-text text-transparent mb-4">
                {diff.number}
              </span>

              {/* 내용 */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-sky-300 transition-colors">
                {diff.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                {diff.description}
              </p>

              {/* 하단 라인 */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* 하단 문구 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 text-lg md:text-xl text-sky-200/70 font-medium"
        >
          "모두의 얼굴이 다르듯,{" "}
          <span className="text-sky-300">당신의 리프팅도 달라야 합니다.</span>"
        </motion.p>
      </div>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a1628] to-transparent pointer-events-none" />
    </section>
  );
}
