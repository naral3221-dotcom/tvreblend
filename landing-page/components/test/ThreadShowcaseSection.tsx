"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CrystalThread3D } from "@/components/hero/thread-3d/CrystalThread3D";

type ThreadType = "cog" | "fix";

export function ThreadShowcaseSection() {
  const [activeType, setActiveType] = useState<ThreadType>("cog");

  const threadTypes = [
    {
      type: "cog" as ThreadType,
      label: "COG TYPE",
      pattern: ">>>>>>>",
    },
    {
      type: "fix" as ThreadType,
      label: "FIX TYPE",
      pattern: ">><<>><<",
    },
  ];

  return (
    <section className="w-full h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a2035] via-[#050510] to-[#000000] z-0" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-0" />

      {/* Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Content Container */}
      <div className="w-full h-full relative z-10 flex flex-col">
        {/* Header Overlay */}
        <div className="absolute top-12 left-0 w-full text-center pointer-events-none z-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] tracking-[0.2em] backdrop-blur-md mb-3">
            TECHNOLOGY PREVIEW
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Crystal{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500">
              {activeType === "cog" ? "Dual-Cog" : "Bi-Fix"}
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-2 font-light">
            드래그하여 360도 회전해보세요
          </p>
        </div>

        {/* 3D Model */}
        <div className="flex-1 w-full min-h-0 flex items-center justify-center">
          <CrystalThread3D type={activeType} />
        </div>

        {/* Type Selection Buttons - 하단 */}
        <div className="absolute bottom-8 left-0 w-full z-20">
          <div className="flex justify-center gap-4">
            {threadTypes.map((item) => (
              <motion.button
                key={item.type}
                onClick={() => setActiveType(item.type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm ${
                  activeType === item.type
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
                }`}
              >
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block text-xs opacity-60 font-mono mt-0.5">
                  {item.pattern}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
