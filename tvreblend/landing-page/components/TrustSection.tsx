"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { trustSectionContent } from "@/constants";

// 고정된 파티클 위치
const particlePositions = [
  { left: 10, top: 25 }, { left: 85, top: 20 }, { left: 45, top: 75 },
  { left: 8, top: 80 }, { left: 90, top: 55 }, { left: 70, top: 15 },
];

export function TrustSection() {
  const { headline, hospital, hours } = trustSectionContent;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="trust" className="relative py-24 overflow-hidden">
      {/* 밝은 그라데이션 배경 - 웜톤 */}
      <div className="absolute inset-0 bg-linear-to-b from-amber-50/50 via-white to-stone-50" />

      {/* 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-orange-100/25 rounded-full blur-[100px]" />
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* 스토리라인 연결 서브타이틀 */}
          <p className="font-handwriting text-xl md:text-2xl mb-4">
            <span className="text-stone-500">좋은 실도</span>{" "}
            <span className="text-amber-600">누가 쓰느냐</span>
            <span className="text-stone-500">에 따라 다릅니다</span>
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-4">
            {headline.join(" ")}
          </h2>

          <p className="text-stone-600 mb-12">
            RAPPO.L을 직접 개발한 의료진이 시술합니다
          </p>

          {/* 정보 카드 그리드 */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 위치 정보 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-white/80 border border-stone-200 backdrop-blur-sm shadow-sm hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">위치</h3>
              <p className="text-stone-600 text-sm">{hospital.address}</p>
              <p className="text-amber-600 text-xs mt-1 flex items-center justify-center gap-1">
                <Navigation className="w-3 h-3" />
                신사역 8번 출구 앞
              </p>
            </motion.div>

            {/* 전화 정보 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-white/80 border border-stone-200 backdrop-blur-sm shadow-sm hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">전화</h3>
              <a
                href={`tel:${hospital.phone}`}
                className="text-lg font-bold bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                {hospital.phone}
              </a>
            </motion.div>

            {/* 진료 시간 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-2xl bg-white/80 border border-stone-200 backdrop-blur-sm shadow-sm hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">진료 시간</h3>
              <div className="text-sm space-y-1">
                <p className="text-stone-600">{hours.weekday}</p>
                <p className="text-stone-600">{hours.saturday}</p>
                <p className="text-stone-400">{hours.sunday}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#f9f8f7] to-transparent pointer-events-none" />
    </section>
  );
}
