"use client";

import { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";

// 3D 실은 클라이언트에서만 렌더링 + 로딩 상태 처리
const CrystalThread3D = dynamic(
  () => import("./hero/thread-3d/CrystalThread3D").then((mod) => mod.CrystalThread3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
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
  // Differences array removed as we are using bentogrid
};

export function WhyDifferent() {
  // Use scroll hook from framer motion for parallax or trigger effects
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [threadType, setThreadType] = useState<ThreadType>("cog");

  // Bento Grid Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="why-different" className="relative py-24 md:py-32 overflow-hidden bg-[#f9f8f7]">
      {/* Warm Ambient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-50" />
        {/* Soft Warm Glow - Top Right */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px]" />
        {/* Soft Warm Glow - Bottom Left */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="block font-serif italic text-xl md:text-2xl text-stone-500 mb-4 tracking-wide">
            The Science of Harmony
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 leading-[1.1]">
            다름을 만드는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800">
              세 가지 결정적 차이
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {/* Card 1: 3D Thread (Large/Tall) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 row-span-2 relative group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-stone-200/50 border border-stone-100"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-50/50 pointer-events-none" />

            <div className="relative h-[400px] md:h-full min-h-[500px] bg-[#0c0c0c] rounded-[2rem] m-2 overflow-hidden">
              {/* 3D Thread Component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <CrystalThread3D type={threadType} />
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
              </div>

              {/* Toggles - Restored */}
              <div className="absolute top-6 right-6 z-20 flex gap-2">
                <button
                  onClick={() => setThreadType("cog")}
                  className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border transition-all duration-300 ${threadType === "cog"
                      ? "bg-amber-500 border-amber-500 text-black"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    }`}
                >
                  Cog
                </button>
                <button
                  onClick={() => setThreadType("fix")}
                  className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border transition-all duration-300 ${threadType === "fix"
                      ? "bg-amber-500 border-amber-500 text-black"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    }`}
                >
                  Fix
                </button>
              </div>

              {/* Type Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg">
                  <span className={`w-1.5 h-1.5 rounded-full ${threadType === 'cog' ? 'bg-amber-400' : 'bg-rose-400'}`} />
                  RAPPO.L {threadType} TYPE
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <p className="text-amber-200 text-sm font-bold tracking-widest uppercase mb-2">01. Material</p>
                <h3 className="text-3xl font-display font-medium mb-3">RAPPO.L</h3>
                <p className="text-white/70 font-light leading-relaxed text-sm">
                  기존 PDO 실의 한계를 넘은 특허 소재. <br />
                  강력한 고정력과 유연함의 완벽한 밸런스.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Method (Wide) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 relative group overflow-hidden rounded-[2rem] bg-white p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-1 space-y-4">
              <p className="text-amber-600 text-sm font-bold tracking-widest uppercase">02. Method</p>
              <h3 className="text-3xl font-display font-bold text-stone-800">
                얼굴 구조 맞춤형<br />
                <span className="text-stone-500 italic font-serif">Deep Layer Architecture</span>
              </h3>
              <p className="text-stone-600 leading-relaxed font-light">
                단순히 당기는 것이 아닙니다. 얼굴의 굴곡과 깊이에 맞춰<br className="hidden lg:block" />
                실의 층(Layer)을 설계하여 자연스러운 입체감을 만듭니다.
              </p>
            </div>
            {/* Abstract Visual for Architecture */}
            <div className="w-full md:w-1/3 aspect-square relative rounded-full bg-gradient-to-tr from-stone-100 to-stone-50 border border-stone-200 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full border border-stone-300 relative animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
              </div>
              <div className="w-1/2 h-1/2 rounded-full border border-stone-300 relative animate-[spin_15s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -ml-1 w-2 h-2 bg-stone-400 rounded-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif italic text-stone-400 text-sm">Multi-Layer</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Result (Normal) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 relative group overflow-hidden rounded-[2rem] bg-stone-900 p-8 shadow-xl shadow-stone-900/20 text-white"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 h-full flex flex-col justify-between min-h-[240px]">
              <div>
                <p className="text-amber-400/80 text-sm font-bold tracking-widest uppercase mb-2">03. Result</p>
                <h3 className="text-2xl font-display font-medium">지속력의 차이</h3>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-white to-stone-300">1.5</span>
                  <span className="text-xl text-stone-400">년 +</span>
                </div>
                <p className="text-stone-400 text-sm font-light">
                  평균 유지 기간.<br />
                  일반 실리프팅 대비 2배 이상의 지속력.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Satisfaction or Detail (Normal) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 relative group overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl shadow-stone-200/50 border border-stone-100"
          >
            <p className="text-amber-600 text-sm font-bold tracking-widest uppercase mb-4">Satisfaction</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-serif text-stone-800 italic">95<span className="text-xl not-italic">%</span></div>
              <div className="h-px flex-1 bg-stone-200" />
            </div>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              재시술 고객 만족도.<br />
              "다른 리프팅과는 확실히 다릅니다"
            </p>
          </motion.div>

        </motion.div>

        {/* Restored Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto mt-24"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* General */}
            <div className="p-8 rounded-[2rem] bg-stone-100 border border-stone-200/50">
              <h4 className="text-xl font-display font-bold text-stone-500 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-stone-400" />
                {comparisonData.general.title}
              </h4>
              <ul className="space-y-4">
                {comparisonData.general.items.map((item, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-stone-400">{item.label}</span>
                    <span className="font-medium text-stone-600">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium */}
            <div className="relative p-8 rounded-[2rem] bg-white border border-amber-100 shadow-2xl shadow-amber-500/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <h4 className="relative z-10 text-xl font-display font-bold text-stone-800 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                {comparisonData.premium.title}
              </h4>

              <ul className="relative z-10 space-y-4">
                {comparisonData.premium.items.map((item, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-1">
                    <span className="text-amber-600/70 font-medium">{item.label}</span>
                    {"isList" in item && item.isList ? (
                      <span className="text-right font-bold text-stone-800">
                        {item.value.split('|')[0]}
                        <span className="block text-[10px] text-stone-400 font-normal">{item.value.split('|')[1]}</span>
                      </span>
                    ) : (
                      <span className="text-right font-bold text-stone-800">{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
