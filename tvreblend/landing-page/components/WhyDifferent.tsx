"use client";

import { useState, useRef } from "react";
import { motion, Variants, PanInfo } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { RotateCcw } from "lucide-react";

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

// 비교 데이터 (강화)
const comparisonData = {
  general: {
    title: "일반 실리프팅",
    items: [
      { label: "소재", value: "PDO 또는 PCL 단일" },
      { label: "실 길이", value: "단실 위주" },
      { label: "시술 층", value: "단일 층" },
      { label: "유지 기간", value: "6개월 ~ 1년" },
      { label: "콜라겐 생성", value: "제한적" },
    ],
  },
  premium: {
    title: "투명브이",
    items: [
      { label: "소재", value: "RAPPO.L", sub: "PDO + PCL 복합" },
      { label: "실 길이", value: "41cm 장실 혼합", sub: "단실 + 장실 조합" },
      { label: "시술 층", value: "입체 다층", sub: "표피 / 진피 / SMAS" },
      { label: "유지 기간", value: "1.5 ~ 2년+", highlight: true },
      { label: "콜라겐 생성", value: "지속적 재생", highlight: true },
    ],
  },
};

// 플립 카드 타입 정의
interface RootCardBack {
  items: { type: "compare" | "highlight"; label: string; value: string; sub: string }[];
}

interface DesignCardBack {
  description: string;
  layers: { depth: string; purpose: string; thread: string }[];
}

interface ResultCardBack {
  comparison: { label: string; duration: string; bar: number }[];
  note: string;
}

interface FlipCardBase {
  id: string;
  number: string;
  label: string;
  front: {
    title: string;
    subtitle?: string;
    teaser?: string;
    stat?: { value: string; unit: string };
  };
}

interface RootCard extends FlipCardBase {
  id: "root";
  back: RootCardBack;
}

interface DesignCard extends FlipCardBase {
  id: "design";
  back: DesignCardBack;
}

interface ResultCard extends FlipCardBase {
  id: "result";
  back: ResultCardBack;
}

type FlipCardData = RootCard | DesignCard | ResultCard;

// 카드 뒷면 이미지
const cardBackImages = {
  root: "/img/card1.png",
  design: "/img/card2.png",
  result: "/img/card3.png",
};

// 플립 카드 데이터
const flipCardData: FlipCardData[] = [
  {
    id: "root",
    number: "01",
    label: "근본",
    front: {
      title: "실부터 다릅니다",
    },
    back: {
      items: [
        { type: "compare", label: "PDO", value: "즉각적 리프팅", sub: "6개월 유지" },
        { type: "compare", label: "PCL", value: "콜라겐 생성", sub: "느린 효과, 2년" },
        { type: "highlight", label: "RAPPO.L", value: "즉각 효과 + 장기 유지", sub: "두 장점만 결합" },
      ],
    },
  },
  {
    id: "design",
    number: "02",
    label: "설계",
    front: {
      title: "실이 허락해야",
      subtitle: "가능한 설계",
    },
    back: {
      description: "입체 다층 시술이란?",
      layers: [
        { depth: "표피층", purpose: "즉각적 탄력", thread: "PDO 성분" },
        { depth: "진피층", purpose: "콜라겐 재생", thread: "PCL 성분" },
        { depth: "SMAS층", purpose: "구조적 리프팅", thread: "복합 Cog" },
      ],
    },
  },
  {
    id: "result",
    number: "03",
    label: "결과",
    front: {
      title: "근본이 다르니,",
      subtitle: "결과가 다릅니다",
      stat: { value: "1.5~2", unit: "년" },
    },
    back: {
      comparison: [
        { label: "일반 실", duration: "6개월~1년", bar: 40 },
        { label: "RAPPO.L", duration: "1.5~2년+", bar: 90 },
      ],
      note: "* 개인차가 있으며, 시술 후 관리에 따라 달라질 수 있습니다.",
    },
  },
];

// 카드별 테마 설정 - 다크 네이비 + 골드 통일
const cardThemes = {
  root: {
    back: {
      bg: "bg-[#0a0a1a]",
      border: "border-amber-500/30",
      labelBg: "bg-amber-500/20 border border-amber-500/30",
      labelText: "text-amber-400",
      flipBtnBg: "bg-amber-500/20 text-amber-400",
    },
  },
  design: {
    back: {
      bg: "bg-[#0a0a1a]",
      border: "border-amber-500/30",
      labelBg: "bg-amber-500/20 border border-amber-500/30",
      labelText: "text-amber-400",
      flipBtnBg: "bg-amber-500/20 text-amber-400",
    },
  },
  result: {
    back: {
      bg: "bg-[#0a0a1a]",
      border: "border-amber-500/30",
      labelBg: "bg-amber-500/20 border border-amber-500/30",
      labelText: "text-amber-400",
      flipBtnBg: "bg-amber-500/20 text-amber-400",
    },
  },
};

// 플립 카드 컴포넌트 - 3개 모두 다른 디자인
function FlipCard({ data, isFlipped, onFlip }: {
  data: FlipCardData;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const theme = cardThemes[data.id];

  // 뒷면 콘텐츠 렌더링 - 다크 네이비 + 골드 톤
  const renderBackContent = () => {
    if (data.id === "root") {
      return (
        <div className="flex-1 space-y-2.5">
          {data.back.items.map((item, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                item.type === "highlight"
                  ? "bg-linear-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25"
                  : "bg-white/5 border border-amber-500/20"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${
                  item.type === "highlight" ? "text-white/90" : "text-amber-400/70"
                }`}>{item.label}</span>
                <span className={`text-[10px] ${
                  item.type === "highlight" ? "text-white/70" : "text-amber-300/50"
                }`}>{item.sub}</span>
              </div>
              <p className={`text-sm font-semibold ${
                item.type === "highlight" ? "text-white" : "text-amber-100"
              }`}>{item.value}</p>
            </div>
          ))}
        </div>
      );
    }

    if (data.id === "design") {
      return (
        <div className="flex-1">
          <p className="text-amber-200/80 text-sm font-medium mb-3">{data.back.description}</p>
          <div className="space-y-2">
            {data.back.layers.map((layer, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 bg-white/5 border border-amber-500/20 rounded-lg">
                <div className="w-14 text-[11px] font-bold text-amber-400 uppercase">{layer.depth}</div>
                <div className="flex-1 text-xs text-amber-100/80">{layer.purpose}</div>
                <div className="text-[10px] text-amber-900 bg-amber-400 px-2 py-0.5 rounded font-medium">{layer.thread}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (data.id === "result") {
      return (
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            {data.back.comparison.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold text-amber-100">{item.label}</span>
                  <span className="text-amber-300/80 font-medium">{item.duration}</span>
                </div>
                <div className="h-2.5 bg-amber-500/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isFlipped ? `${item.bar}%` : 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-amber-300/50 mt-4">{data.back.note}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      className="relative aspect-[3/4] cursor-pointer group"
      style={{ perspective: "1200px" }}
      onClick={onFlip}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 앞면 - 카드 이미지 자체가 프레임 */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* 카드 이미지 - 꽉 채움 */}
          <Image
            src={cardBackImages[data.id]}
            alt={`${data.label} 카드`}
            fill
            className="object-cover"
          />

          {/* 텍스트 오버레이 - 카드 내부 중앙에 위치 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            {/* 라벨 뱃지 - 숫자 제거, 크고 굵게 */}
            <span className="px-4 py-1.5 mb-4 rounded-full bg-amber-500/90 text-white text-base md:text-lg font-bold tracking-wide">
              {data.label}
            </span>

            {/* 타이틀 */}
            <h3 className="text-xl font-display font-bold leading-tight text-amber-100 text-center">
              {data.front.title}
              {data.front.subtitle && (
                <>
                  <br />
                  <span className="text-lg text-amber-300/70">
                    {data.front.subtitle}
                  </span>
                </>
              )}
            </h3>

            {data.front.stat && (
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-t from-amber-400 to-amber-200">
                  {data.front.stat.value}
                </span>
                <span className="text-lg font-medium text-amber-300/60">{data.front.stat.unit}</span>
              </div>
            )}
          </div>
        </div>

        {/* 뒷면 - 다크 네이비 + 골드 */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden ${theme.back.bg}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* 카드 내부 테두리 */}
          <div className={`absolute inset-[3px] rounded-xl border-2 ${theme.back.border}`} />

          {/* 콘텐츠 영역 */}
          <div className="relative z-10 h-full flex flex-col p-6">
            {/* 상단 라벨 */}
            <div className={`inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${theme.back.labelBg}`}>
              <span className={`text-[11px] font-bold tracking-widest uppercase ${theme.back.labelText}`}>
                {data.number}. {data.label} 상세
              </span>
            </div>

            {renderBackContent()}

            {/* 뒤집기 아이콘 */}
            <div className={`absolute bottom-5 right-5 flex items-center justify-center w-9 h-9 rounded-full ${theme.back.flipBtnBg}`}>
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function WhyDifferent() {
  const [threadType, setThreadType] = useState<ThreadType>("cog");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // 모바일 스와이프 핸들러
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentCardIndex < flipCardData.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else if (info.offset.x > threshold && currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

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
          {/* 서브타이틀 - 손으로 그린 곡선 포함 */}
          <p className="text-lg md:text-xl text-stone-500 font-light mb-3 flex items-center justify-center gap-1">
            <span>시작점이 다르기에</span>
            {/* 손으로 그린 듯한 실 곡선 */}
            <svg
              viewBox="0 0 120 24"
              className="w-20 md:w-28 h-6 inline-block"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M2 12 C10 4, 20 20, 35 12 S55 4, 70 12 S90 20, 105 12 S115 8, 118 12"
                stroke="url(#threadGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(180, 83, 9, 0.3))"
                }}
              />
              <defs>
                <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
            </svg>
            <span>결과가 다릅니다</span>
          </p>

          {/* 메인타이틀 */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 leading-[1.1]">
            똑같은 실리프팅,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-700 via-yellow-600 to-amber-800">
              다른 결과
            </span>
          </h2>
        </motion.div>

        {/* 3D Thread Card - 가로 배치 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto mb-8"
        >
          <motion.div
            variants={itemVariants}
            className="relative group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-stone-200/50 border border-stone-100"
          >
            <div className="relative h-[200px] md:h-[240px] bg-[#0c0c0c] rounded-[2rem] m-2 overflow-hidden">
              {/* 3D Thread Component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <CrystalThread3D type={threadType} />
              </div>

              {/* Toggles */}
              <div className="absolute top-4 right-4 z-20 flex gap-2">
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
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg">
                  <span className={`w-1.5 h-1.5 rounded-full ${threadType === 'cog' ? 'bg-amber-400' : 'bg-rose-400'}`} />
                  RAPPO.L {threadType} TYPE
                </span>
              </div>

              {/* Content - 좌측 하단 */}
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <p className="text-amber-300/80 text-xs font-medium tracking-widest uppercase mb-1">근본이 다른 실</p>
                <h3 className="text-2xl font-display font-bold">RAPPO.L</h3>
                <p className="text-white/60 font-light text-sm">PDO + PCL 복합 설계</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Flip Cards - 데스크탑: 그리드 / 모바일: 캐러셀 */}

        {/* 데스크탑 그리드 (md 이상) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {flipCardData.map((cardData, index) => (
            <motion.div
              key={cardData.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <FlipCard
                data={cardData}
                isFlipped={flippedCards[cardData.id] || false}
                onFlip={() => setFlippedCards(prev => ({
                  ...prev,
                  [cardData.id]: !prev[cardData.id]
                }))}
              />
            </motion.div>
          ))}
        </div>

        {/* 모바일 스와이프 캐러셀 (md 미만) */}
        <div className="md:hidden relative overflow-hidden" ref={constraintsRef}>
          <motion.div
            className="flex gap-4 px-4"
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            animate={{ x: -currentCardIndex * 280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {flipCardData.map((cardData) => (
              <motion.div
                key={cardData.id}
                className="shrink-0 w-[260px]"
                animate={{
                  scale: flipCardData[currentCardIndex].id === cardData.id ? 1 : 0.9,
                  opacity: flipCardData[currentCardIndex].id === cardData.id ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              >
                <FlipCard
                  data={cardData}
                  isFlipped={flippedCards[cardData.id] || false}
                  onFlip={() => setFlippedCards(prev => ({
                    ...prev,
                    [cardData.id]: !prev[cardData.id]
                  }))}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* 페이지 인디케이터 */}
          <div className="flex justify-center gap-2 mt-6">
            {flipCardData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentCardIndex
                    ? "w-6 bg-amber-500"
                    : "bg-stone-300"
                }`}
              />
            ))}
          </div>

          {/* 스와이프 힌트 */}
          <p className="text-center text-xs text-stone-400 mt-3">
            좌우로 스와이프하세요
          </p>
        </div>

        {/* 비교 테이블 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto mt-24"
        >
          {/* 섹션 헤더 */}
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-stone-800 mb-2">
              한눈에 보는 <span className="text-amber-600">차이</span>
            </h3>
            <p className="text-stone-500 text-sm">일반 실리프팅과 투명브이의 핵심 비교</p>
          </div>

          {/* 비교 테이블 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* General - 일반 실리프팅 */}
            <div className="p-6 md:p-8 rounded-[2rem] bg-stone-100 border border-stone-200/50">
              <h4 className="text-lg font-display font-bold text-stone-500 mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-stone-400" />
                {comparisonData.general.title}
              </h4>
              <ul className="space-y-4">
                {comparisonData.general.items.map((item, i) => (
                  <li key={i} className="flex justify-between items-center py-2 border-b border-stone-200/50 last:border-0">
                    <span className="text-stone-400 text-sm">{item.label}</span>
                    <span className="font-medium text-stone-600 text-sm text-right">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium - 투명브이 */}
            <div className="relative p-6 md:p-8 rounded-[2rem] bg-white border-2 border-amber-200 shadow-2xl shadow-amber-500/10 overflow-hidden">
              {/* 배경 글로우 */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              {/* 추천 뱃지 */}
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-white rounded-full shadow-lg shadow-amber-500/30">
                  추천
                </span>
              </div>

              <h4 className="relative z-10 text-lg font-display font-bold text-stone-800 mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                {comparisonData.premium.title}
              </h4>

              <ul className="relative z-10 space-y-4">
                {comparisonData.premium.items.map((item, i) => (
                  <li
                    key={i}
                    className={`flex justify-between items-start py-2 border-b border-amber-100 last:border-0 ${
                      "highlight" in item && item.highlight ? "bg-amber-50/50 -mx-2 px-2 rounded-lg" : ""
                    }`}
                  >
                    <span className="text-amber-700/70 font-medium text-sm">{item.label}</span>
                    <div className="text-right">
                      <span className={`font-bold text-sm ${
                        "highlight" in item && item.highlight ? "text-amber-600" : "text-stone-800"
                      }`}>
                        {item.value}
                      </span>
                      {"sub" in item && item.sub && (
                        <span className="block text-[10px] text-stone-400 font-normal mt-0.5">{item.sub}</span>
                      )}
                    </div>
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
