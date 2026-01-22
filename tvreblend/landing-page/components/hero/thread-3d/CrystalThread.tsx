"use client";

import { motion } from "framer-motion";

export function CrystalThread() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* 메인 실 SVG - 천천히 회전 */}
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateX: [-5, 5, -5],
        }}
        transition={{
          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        className="relative"
      >
        <svg
          viewBox="0 0 800 200"
          className="w-[600px] md:w-[800px] lg:w-[1000px] h-auto opacity-40"
          style={{ filter: "drop-shadow(0 0 20px rgba(201, 169, 98, 0.5))" }}
        >
          <defs>
            {/* 크리스탈 그라데이션 */}
            <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
              <stop offset="25%" stopColor="rgba(201, 169, 98, 0.6)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="75%" stopColor="rgba(201, 169, 98, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.7)" />
            </linearGradient>

            {/* 빛 반사 효과 */}
            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="60%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>

            {/* 글로우 필터 */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 크리스탈 반사 필터 */}
            <filter id="crystalFilter">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
              <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" result="specular">
                <fePointLight x="400" y="-100" z="200" />
              </feSpecularLighting>
              <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular" />
              <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            </filter>
          </defs>

          {/* 메인 실 몸통 */}
          <g filter="url(#crystalFilter)">
            {/* 중심 실 */}
            <path
              d="M 50 100 Q 200 95 400 100 Q 600 105 750 100"
              stroke="url(#crystalGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />

            {/* 꼬임 효과 - 상단 */}
            <path
              d="M 50 100 Q 125 90 200 100 Q 275 90 350 100 Q 425 90 500 100 Q 575 90 650 100 Q 725 90 750 100"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="3"
              fill="none"
            />

            {/* 꼬임 효과 - 하단 */}
            <path
              d="M 50 100 Q 125 110 200 100 Q 275 110 350 100 Q 425 110 500 100 Q 575 110 650 100 Q 725 110 750 100"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* 가시(Cog) - 크리스탈 형태 */}
          {[150, 280, 410, 540, 670].map((x, i) => (
            <g key={i} filter="url(#glow)">
              {/* 상단 가시 */}
              <path
                d={`M ${x} 100 L ${x - 15} 60 L ${x} 75 L ${x + 15} 60 Z`}
                fill="url(#crystalGradient)"
                opacity="0.8"
              />
              {/* 하단 가시 */}
              <path
                d={`M ${x} 100 L ${x - 15} 140 L ${x} 125 L ${x + 15} 140 Z`}
                fill="url(#crystalGradient)"
                opacity="0.6"
              />
              {/* 가시 하이라이트 */}
              <path
                d={`M ${x} 75 L ${x + 5} 65 L ${x + 10} 70`}
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="1"
                fill="none"
              />
            </g>
          ))}

          {/* 움직이는 빛 반사 */}
          <motion.rect
            x="0"
            y="50"
            width="800"
            height="100"
            fill="url(#shineGradient)"
            animate={{ x: [-800, 800] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>

      {/* 추가 장식 실들 (작은 사이즈) */}
      <motion.div
        className="absolute top-1/4 left-1/4 opacity-20"
        animate={{ rotate: 360, y: [0, -10, 0] }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 opacity-15"
        animate={{ rotate: -360, y: [0, 10, 0] }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
      </motion.div>
    </div>
  );
}
