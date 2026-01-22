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
      {/* 밝은 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-slate-50" />

      {/* 글로우 효과들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-sky-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-100/25 rounded-full blur-[100px]" />
      </div>

      {/* 파티클 효과 */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-sky-400/40 rounded-full"
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
          {/* 필기체 서브타이틀 */}
          <p className="font-handwriting text-xl md:text-2xl mb-4">
            <span className="text-slate-500">믿을 수 있는</span>{" "}
            <span className="text-sky-600">밸런스랩</span>
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-12">
            {headline.join(" ")}
          </h2>

          {/* 정보 카드 그리드 */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* 위치 정보 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-sm shadow-sm hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">위치</h3>
              <p className="text-slate-600 text-sm">{hospital.address}</p>
              <p className="text-sky-600 text-xs mt-1 flex items-center justify-center gap-1">
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
              className="p-6 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-sm shadow-sm hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">전화</h3>
              <a
                href={`tel:${hospital.phone}`}
                className="text-lg font-bold bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent hover:from-sky-600 hover:to-cyan-600 transition-all"
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
              className="p-6 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-sm shadow-sm hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">진료 시간</h3>
              <div className="text-sm space-y-1">
                <p className="text-slate-600">{hours.weekday}</p>
                <p className="text-slate-600">{hours.saturday}</p>
                <p className="text-slate-400">{hours.sunday}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}
