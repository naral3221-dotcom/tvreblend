"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Center, useProgress } from "@react-three/drei";
import { Vector3 } from "three";
import { LiftingFace } from "./LiftingFace";

interface LiftingFace3DProps {
  liftLevel: number; // 0 = 처진 상태, 1 = 1단계, 2 = 2단계, 3 = 3단계
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#87CEEB" wireframe />
    </mesh>
  );
}

function Loader() {
  const { progress, active } = useProgress();

  useEffect(() => {
    console.log("Loading progress:", progress, "Active:", active);
  }, [progress, active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      <div className="text-white/70 text-sm bg-black/50 px-4 py-2 rounded-lg">
        로딩 중... {Math.round(progress)}%
      </div>
    </div>
  );
}

export function LiftingFace3D({ liftLevel }: LiftingFace3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("LiftingFace3D mounted");
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center">
        <div className="text-white/50 text-sm">초기화 중...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing relative z-10">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [-3, -2, 10], fov: 35 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={() => console.log("Canvas created")}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 5]}
          angle={0.2}
          penumbra={1}
          intensity={3}
          color="#ffffff"
        />
        <spotLight position={[-10, -5, -5]} intensity={2.0} color="#00bfff" />
        <pointLight
          position={[0, 0, 2]}
          intensity={1.5}
          color="#e0f7fa"
          distance={5}
        />
        <Environment preset="city" />

        <Suspense fallback={<LoadingFallback />}>
          <LiftingFace liftLevel={liftLevel} />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 2 - 0.4} // 너무 위에서 보지 못하게
          maxPolarAngle={Math.PI / 2 + 0.4} // 너무 아래에서 보지 못하게
          target={new Vector3(-3, 0.8, 0)} // 모델 위치에 맞춰 카메라 타겟 조정
        />
      </Canvas>

      <Loader />
    </div>
  );
}
