"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { CrystalThread } from "./CrystalThread";

// Three.js 컴포넌트를 동적으로 로드 (코드 스플리팅)
const CrystalThread3D = lazy(() =>
  import("./CrystalThread3D").then((mod) => ({ default: mod.CrystalThread3D }))
);

// 디바이스 성능 체크
function useDeviceCapability() {
  const [isHighEnd, setIsHighEnd] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const checkCapability = () => {
      // 모바일 체크
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      // GPU 성능 체크 (WebGL)
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      let hasGoodGPU = false;
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          // 좋은 GPU 키워드 체크
          const goodGPUs = ["NVIDIA", "AMD", "Radeon", "GeForce", "RTX", "GTX", "Apple M", "Intel Iris"];
          hasGoodGPU = goodGPUs.some((gpu) => renderer.includes(gpu));
        }
      }

      // 메모리 체크 (4GB 이상)
      const hasEnoughMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
        ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory! >= 4
        : true;

      // 하드웨어 동시성 체크 (4코어 이상)
      const hasEnoughCores = navigator.hardwareConcurrency >= 4;

      // 최종 결정: 데스크탑이고, GPU 좋고, 메모리/코어 충분하면 고사양
      const result = !isMobile && hasGoodGPU && hasEnoughMemory && hasEnoughCores;

      setIsHighEnd(result);
      setIsChecked(true);
    };

    checkCapability();
  }, []);

  return { isHighEnd, isChecked };
}

// 로딩 플레이스홀더
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  );
}

export function CrystalThreadWrapper() {
  const { isHighEnd, isChecked } = useDeviceCapability();

  // 아직 체크 중이면 아무것도 표시 안 함
  if (!isChecked) {
    return null;
  }

  // 고사양: Three.js 3D
  // 저사양: CSS/SVG 버전
  return isHighEnd ? (
    <Suspense fallback={<LoadingFallback />}>
      <CrystalThread3D />
    </Suspense>
  ) : (
    <CrystalThread />
  );
}
