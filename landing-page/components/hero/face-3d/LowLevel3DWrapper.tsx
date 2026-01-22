"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { LowLevel3D, MODEL_CONFIG } from "./LowLevel3D";

interface LowLevel3DWrapperProps {
  liftLevel: number; // 0 = base, 1 = level1, 2 = level2, 3 = level3
}

export function LowLevel3DWrapper({ liftLevel }: LowLevel3DWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 컨텍스트 손실 시 Canvas 재생성
  const handleContextLost = (e: Event) => {
    e.preventDefault();
    console.log("WebGL context lost, recreating canvas...");
    setTimeout(() => {
      setCanvasKey((prev) => prev + 1);
    }, 100);
  };

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-slate-900">
        <div className="w-10 h-10 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing relative z-10">
      <Canvas
        key={`face-canvas-${canvasKey}`}
        dpr={[1, 1.5]}
        camera={{ position: [7, 0, 7], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", handleContextLost);
        }}
      >
        {/* 배경색 */}
        <color attach="background" args={["#1a1a2e"]} />

        {/* 조명 설정 - 대각선 위에서 내려쬐어 음영 극대화 */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[8, 12, 6]} intensity={3} />
        <directionalLight position={[-2, 8, 4]} intensity={1} color="#e0f7fa" />

        {/* 3D 모델 */}
        <Suspense fallback={null}>
          <LowLevel3D liftLevel={liftLevel} />
        </Suspense>

        {/* 카메라 컨트롤 */}
        <OrbitControls
          makeDefault
          enablePan={false}
          enableRotate={true}
          // 줌 제한
          minDistance={6}
          maxDistance={9}
          // 수평 회전 제한: 오른쪽 옆모습 45도 범위만
          // 카메라가 [5,0,0]에서 시작 = 90도 위치
          // 정면은 0도, 완전 옆은 90도
          minAzimuthAngle={Math.PI / 8}    // 45도 (정면쪽 제한)
          maxAzimuthAngle={Math.PI / 2}    // 90도 (완전 옆)
          // 수직 회전 제한
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          target={MODEL_CONFIG.cameraTarget}
        />
      </Canvas>
    </div>
  );
}
