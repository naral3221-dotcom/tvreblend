"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// 3D 실은 클라이언트에서만 렌더링 + 로딩 상태 처리
const CrystalThread3D = dynamic(
  () => import("./hero/thread-3d/CrystalThread3D").then((mod) => mod.CrystalThread3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
      </div>
    )
  }
);

// 실 타입 정의
type ThreadType = "cog" | "fix";

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
      { label: "실 종류", value: "자체 개발 RAPPO.L 실|PDO, PCL (장실,단실) 혼합 사용", isList: true },
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

export function WhyDifferent() {
  const [mounted, setMounted] = useState(false);
  const [threadType, setThreadType] = useState<ThreadType>("cog");
  const [activeCard, setActiveCard] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 스크롤 위치에 따라 활성 카드 감지
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = 280 + 16; // 카드 너비 + gap
    const newActiveCard = Math.round(scrollLeft / cardWidth);
    setActiveCard(Math.min(newActiveCard, differences.length - 1));
  }, []);

  return (
    <section id="why-different" className="relative py-24 overflow-hidden">
      {/* 화이트 크리스탈 배경 - 밝고 깨끗한 느낌 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-sky-50" />

      {/* 크리스탈 컷 패턴 배경 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 은은한 글로우 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-100/40 rounded-full blur-[200px]" />

        {/* 크리스탈 컷 SVG 패턴 */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="crystal-pattern"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              {/* 다이아몬드 형태의 크리스탈 컷 */}
              <path
                d="M60 0 L120 60 L60 120 L0 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-cyan-500"
              />
              {/* 내부 삼각형 패싯 */}
              <path
                d="M60 0 L60 60 L0 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-cyan-400"
              />
              <path
                d="M60 0 L120 60 L60 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-sky-400"
              />
              <path
                d="M60 120 L60 60 L120 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-cyan-400"
              />
              <path
                d="M60 120 L0 60 L60 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-sky-400"
              />
              {/* 중심점 */}
              <circle
                cx="60"
                cy="60"
                r="2"
                fill="currentColor"
                className="text-cyan-300"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crystal-pattern)" />
        </svg>

        {/* 프리즘 빛 반사 효과 - 정적 */}
        <div className="absolute top-0 right-1/4 w-[300px] h-[600px] bg-gradient-to-b from-cyan-200/10 via-transparent to-transparent rotate-12 blur-2xl" />
        <div className="absolute bottom-0 left-1/4 w-[200px] h-[400px] bg-gradient-to-t from-sky-200/10 via-transparent to-transparent -rotate-12 blur-2xl" />

        {/* 상단 라이트 라인 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>

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
            <span className="text-slate-500">똑같은 실리프팅인데,</span>
            <br />
            <span className="text-cyan-600">왜 투명브이만 결과가 다를까요?</span>
          </p>

          {/* 메인 타이틀 */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            투명브이리프팅의
            <br className="md:hidden" />
            {" "}
            <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
              '결정적 디테일'
            </span>
          </h2>

          {/* 일반체 서브타이틀 */}
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            독자적 소재 <span className="font-bold text-slate-700">RAPPO.L</span>과
            <br className="md:hidden" />
            {" "}안면 구조 맞춤 설계의 만남,
            <br />
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
            <div className="relative aspect-square max-w-lg mx-auto overflow-hidden rounded-3xl">
              {/* 크리스탈 프레임 - 밝은 버전 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/50 to-cyan-50 border border-cyan-200/50 shadow-xl shadow-cyan-100/30">
                {/* 내부 다크 배경 (3D 뷰어용) */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-[#0a1628]" />
              </div>

              {/* 3D 캔버스 영역 */}
              <div className="absolute inset-4 z-10 overflow-hidden rounded-2xl">
                {mounted && <CrystalThread3D type={threadType} />}
              </div>

              {/* 코너 장식 - 프레임 둥글기(3xl)와 일치 */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-3xl z-20" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-3xl z-20" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-3xl z-20" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-400/60 rounded-br-3xl z-20" />

              {/* 타입 전환 버튼 - 우측 상단 */}
              <div className="absolute top-4 right-4 z-30 flex gap-2">
                <button
                  onClick={() => setThreadType("cog")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    threadType === "cog"
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-400/40"
                      : "bg-white/20 text-white/70 hover:bg-white/30 hover:text-white"
                  }`}
                >
                  COG
                </button>
                <button
                  onClick={() => setThreadType("fix")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    threadType === "fix"
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-400/40"
                      : "bg-white/20 text-white/70 hover:bg-white/30 hover:text-white"
                  }`}
                >
                  FIX
                </button>
              </div>
            </div>

            {/* 라벨 - 밝은 버전 */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
              <span className="px-4 py-2 text-sm text-cyan-700 bg-white/90 backdrop-blur-sm rounded-full border border-cyan-200 shadow-md">
                RAPPO.L {threadType === "cog" ? "COG" : "FIX"} 실
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
            <div className="p-6 rounded-2xl bg-slate-100/80 border border-slate-200 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-slate-500 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                {comparisonData.general.title}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {comparisonData.general.items.map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                    <p className="text-sm text-slate-600">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 투명브이리프팅 (하이라이트) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-cyan-50/50 to-sky-50 border border-cyan-300/50 shadow-lg shadow-cyan-100/30 relative overflow-hidden">
              {/* 빛나는 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent animate-shine" />

              <h4 className="text-lg font-semibold text-cyan-700 mb-4 flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-lg shadow-cyan-400/50" />
                {comparisonData.premium.title}
              </h4>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {comparisonData.premium.items.map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-cyan-600/70 mb-1">{item.label}</p>
                    {"isList" in item && item.isList ? (
                      <ul className="space-y-1.5">
                        {item.value.split("|").map((text, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 shrink-0" />
                            <span>{text}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate-800 font-medium">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 차별점 카드들 - 모바일: 가로 스크롤 / 데스크탑: 그리드 */}
        <div className="relative">
          {/* 모바일 가로 스크롤 - 스케일+페이드 효과 */}
          <div className="md:hidden -mx-4 px-4">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            >
              {differences.map((diff, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`group relative flex-shrink-0 w-[280px] p-6 rounded-2xl backdrop-blur-sm shadow-sm snap-center transition-all duration-300 ${
                    activeCard === index
                      ? "bg-white border-cyan-300 shadow-lg shadow-cyan-100/40 scale-100 opacity-100"
                      : "bg-white/60 border-slate-200 scale-95 opacity-60"
                  } border`}
                >
                  {/* 활성 카드 글로우 효과 */}
                  {activeCard === index && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-50/50 to-sky-50/30 pointer-events-none" />
                  )}

                  {/* 넘버 */}
                  <span className={`relative z-10 inline-block text-4xl font-bold bg-gradient-to-b bg-clip-text text-transparent mb-3 transition-all duration-300 ${
                    activeCard === index
                      ? "from-cyan-500 to-cyan-400"
                      : "from-cyan-500/60 to-cyan-300/20"
                  }`}>
                    {diff.number}
                  </span>

                  {/* 내용 */}
                  <h3 className={`relative z-10 text-lg font-semibold mb-2 transition-colors duration-300 ${
                    activeCard === index ? "text-cyan-700" : "text-slate-800"
                  }`}>
                    {diff.title}
                  </h3>
                  <p className="relative z-10 text-sm text-slate-500 leading-relaxed">
                    {diff.description}
                  </p>
                </motion.div>
              ))}
            </div>
            {/* 스크롤 인디케이터 - 활성 상태 표시 */}
            <div className="flex justify-center gap-2 mt-3">
              {differences.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeCard === index
                      ? "w-6 bg-cyan-500"
                      : "w-2 bg-cyan-300/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 데스크탑 그리드 */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {differences.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="group relative p-8 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-sm shadow-sm hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100/30 transition-all duration-500"
              >
                {/* 호버 글로우 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-50/50 to-sky-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* 넘버 */}
                <span className="inline-block text-5xl font-bold bg-gradient-to-b from-cyan-500/60 to-cyan-300/20 bg-clip-text text-transparent mb-4">
                  {diff.number}
                </span>

                {/* 내용 */}
                <h3 className="relative z-10 text-xl font-semibold text-slate-800 mb-3 group-hover:text-cyan-700 transition-colors">
                  {diff.title}
                </h3>
                <p className="relative z-10 text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                  {diff.description}
                </p>

                {/* 하단 라인 */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 하단 문구 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 text-lg md:text-xl text-slate-600 font-medium"
        >
          "모두의 얼굴이 다르듯,
          <br className="md:hidden" />
          {" "}
          <span className="text-cyan-600 font-semibold">당신의 리프팅도 달라야 합니다.</span>"
        </motion.p>
      </div>

      {/* 하단 웨이브 디바이더 */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120V60C240 20 480 0 720 20C960 40 1200 80 1440 60V120H0Z"
            fill="url(#wave-gradient)"
            fillOpacity="0.5"
          />
          <path
            d="M0 120V80C360 40 720 60 1080 40C1260 30 1380 50 1440 60V120H0Z"
            fill="url(#wave-gradient-2)"
            fillOpacity="0.3"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="50%" stopColor="#cffafe" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
