"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Center } from "@react-three/drei";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// 실 타입 정의
type ThreadType = "cog" | "fix";

interface LiftingThreadModelProps {
  type?: ThreadType;
}

// --- 리프팅 실 모델 (Crystal Lifting Thread) ---
function LiftingThreadModel({ type = "cog" }: LiftingThreadModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentType, setCurrentType] = useState(type);

  // type이 변경되면 부드럽게 전환 (컴포넌트 재생성 없이)
  useEffect(() => {
    setCurrentType(type);
  }, [type]);

  // 1. 크리스탈 재질 설정 - 기존 입체감 좋았던 버전 복원
  const crystalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f0f8ff",           // 기존: 연한 흰색 (입체감 좋음)
        emissive: "#e0f7fa",        // 기존: 연한 시안
        emissiveIntensity: 0.1,     // 기존: 낮은 발광 (자연스러움)
        metalness: 0.1,
        roughness: 0.0,
        transmission: 1.0,          // 기존: 완전 투명 (크리스탈 느낌)
        thickness: 0.8,
        ior: 1.6,                   // 굴절률
        attenuationColor: "#87cefa", // 하늘색 감쇠
        attenuationDistance: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        envMapIntensity: 3.0,       // 기존: 높은 환경맵 강도
        transparent: false,
        opacity: 1.0,
        side: THREE.DoubleSide,
      }),
    []
  );

  const settings = {
    length: 20,
    radius: 0.12,
    cogGroupCount: 30,
    cogSize: 0.14,
    twistRate: 12,
  };

  // ====== FIX 타입 각도 설정 ======
  const fixAngles = {
    rightRight: {
      top: Math.PI / 4,
      bottom: Math.PI / -4 + Math.PI,
    },
    leftLeft: {
      top: -Math.PI / 4,
      bottom: -Math.PI / -4 + Math.PI,
    },
  };

  const cogAngle = {
    top: Math.PI / 4,
    bottom: Math.PI / -4 + Math.PI,
  };

  // 가시 위치 데이터 생성
  const getCogPositions = (threadType: ThreadType) => {
    if (threadType === "cog") {
      return Array.from({ length: settings.cogGroupCount }).map((_, i) => {
        const t = i / (settings.cogGroupCount - 1);
        const x = (t - 0.5) * settings.length;
        return { x, index: i };
      });
    } else {
      const result: { x: number; index: number }[] = [];
      const pairCount = 8;
      const innerGap = 0.7;
      const outerGap = 1.0;
      const barbGap = 0.4;

      let currentX = -settings.length / 2 + 0.5;
      let index = 0;

      for (let pair = 0; pair < pairCount; pair++) {
        result.push({ x: currentX, index: index++ });
        currentX += barbGap;
        result.push({ x: currentX, index: index++ });
        currentX += innerGap;
        result.push({ x: currentX, index: index++ });
        currentX += barbGap;
        result.push({ x: currentX, index: index++ });
        currentX += outerGap;
      }

      return result;
    }
  };

  // 2. 기둥 + 코그 합쳐진 단일 지오메트리 (currentType 사용)
  const mergedGeometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];

    // A. 메인 기둥 (트위스트)
    const cylinderGeom = new THREE.CylinderGeometry(
      settings.radius,
      settings.radius,
      settings.length,
      10,
      300
    );

    // 트위스트 적용
    const posAttribute = cylinderGeom.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      const angle =
        (vertex.y / settings.length) * settings.twistRate * Math.PI * 2;
      const x = vertex.x * Math.cos(angle) - vertex.z * Math.sin(angle);
      const z = vertex.x * Math.sin(angle) + vertex.z * Math.cos(angle);
      posAttribute.setXYZ(i, x, vertex.y, z);
    }

    cylinderGeom.computeVertexNormals();
    cylinderGeom.rotateZ(Math.PI / 2);
    geometries.push(cylinderGeom);

    // B. 코그(가시) 추가
    const cogPositions = getCogPositions(currentType);

    cogPositions.forEach((cog) => {
      let topAngle: number;
      let bottomAngle: number;

      if (currentType === "cog") {
        topAngle = cogAngle.top;
        bottomAngle = cogAngle.bottom;
      } else {
        const groupIndex = Math.floor(cog.index / 2);
        const isRightGroup = groupIndex % 2 === 0;

        if (isRightGroup) {
          topAngle = fixAngles.rightRight.top;
          bottomAngle = fixAngles.rightRight.bottom;
        } else {
          topAngle = fixAngles.leftLeft.top;
          bottomAngle = fixAngles.leftLeft.bottom;
        }
      }

      // Top Wing
      const topCone = new THREE.ConeGeometry(
        settings.cogSize,
        settings.cogSize * 2.8,
        4
      );
      topCone.scale(1, 1, 0.3);
      topCone.rotateZ(topAngle);
      topCone.translate(cog.x, settings.radius * 1.2, 0);
      geometries.push(topCone);

      // Bottom Wing
      const bottomCone = new THREE.ConeGeometry(
        settings.cogSize,
        settings.cogSize * 2.8,
        4
      );
      bottomCone.scale(1, 1, 0.3);
      bottomCone.rotateZ(bottomAngle);
      bottomCone.translate(cog.x, -settings.radius * 1.2, 0);
      geometries.push(bottomCone);
    });

    const merged = mergeGeometries(geometries, false);
    merged.computeVertexNormals();

    return merged;
  }, [currentType]);

  // 3. 탄성 출렁임 애니메이션
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const geometry = meshRef.current.geometry;
      const posAttribute = geometry.attributes.position;

      if (!geometry.userData.originalPositions) {
        geometry.userData.originalPositions = new Float32Array(posAttribute.array);
      }

      const originalPositions = geometry.userData.originalPositions;

      for (let i = 0; i < posAttribute.count; i++) {
        const origX = originalPositions[i * 3];
        const origY = originalPositions[i * 3 + 1];
        const origZ = originalPositions[i * 3 + 2];

        const distFromCenter = Math.abs(origX) / (settings.length / 2);
        const wavePhase = origX * 0.5;
        const waveAmount = distFromCenter * 0.08;

        const wobbleY = Math.sin(time * 2 + wavePhase) * waveAmount;
        const wobbleZ = Math.cos(time * 1.5 + wavePhase) * waveAmount * 0.5;

        posAttribute.setXYZ(i, origX, origY + wobbleY, origZ + wobbleZ);
      }

      posAttribute.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} geometry={mergedGeometry} material={crystalMaterial} />
  );
}

// --- 메인 Scene 컴포넌트 ---
interface CrystalThread3DProps {
  type?: ThreadType;
}

export function CrystalThread3D({ type = "cog" }: CrystalThread3DProps) {
  const [isClient, setIsClient] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 컨텍스트 손실 시 Canvas 재생성
  const handleContextLost = (e: Event) => {
    e.preventDefault();
    // 약간의 딜레이 후 Canvas 재생성
    setTimeout(() => {
      setCanvasKey((prev) => prev + 1);
    }, 100);
  };

  // 서버 사이드에서는 로딩 표시
  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-[#0a1628] rounded-2xl">
        <div className="w-10 h-10 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing relative z-10">
      <Canvas
        key={`canvas-${canvasKey}`}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 35 }}
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
        <color attach="background" args={["#0a1628"]} />

        {/* 기존 조명 설정 복원 + 하늘색 톤 */}
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

        {/* 기존: city 프리셋 (입체감 좋음) */}
        <Environment preset="city" />

        <Center>
          <LiftingThreadModel type={type} />
        </Center>

        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          enablePan={false}
          minDistance={3}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}
