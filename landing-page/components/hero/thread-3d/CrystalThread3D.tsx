"use client";

import { useRef, useMemo } from "react";
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

  // 1. 크리스탈 재질 설정
  const crystalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f0f8ff",
        emissive: "#e0f7fa",
        emissiveIntensity: 0.1,
        metalness: 0.1,
        roughness: 0.0,
        transmission: 1.0,
        thickness: 0.8,
        ior: 1.6,
        attenuationColor: "#87cefa",
        attenuationDistance: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        envMapIntensity: 3.0,
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

  // ====== FIX 타입 각도 설정 (여기서 조절) ======
  const fixAngles = {
    // >> 그룹 (첫번째, 세번째, ... 쌍)
    rightRight: {
      top: Math.PI / 4,      // 위쪽 코그 각도
      bottom: Math.PI / -4 + Math.PI,   // 아래쪽 코그 각도
    },
    // << 그룹 (두번째, 네번째, ... 쌍)
    leftLeft: {
      top: -Math.PI / 4,     // 위쪽 코그 각도
      bottom: -Math.PI / -4 + Math.PI,  // 아래쪽 코그 각도
    },
  };

  // COG 타입 각도 설정
  const cogAngle = {
    top: Math.PI / 4,
    bottom: Math.PI / -4 + Math.PI,
  };
  // ============================================

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

  // 2. 기둥 + 코그 합쳐진 단일 지오메트리
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

    // 기둥을 가로로 눕히기 (Z축 90도 회전)
    cylinderGeom.rotateZ(Math.PI / 2);
    geometries.push(cylinderGeom);

    // B. 코그(가시) 추가
    const cogPositions = getCogPositions(type);

    cogPositions.forEach((cog) => {
      let topAngle: number;
      let bottomAngle: number;

      if (type === "cog") {
        // COG 타입: 모두 같은 방향
        topAngle = cogAngle.top;
        bottomAngle = cogAngle.bottom;
      } else {
        // FIX 타입: >> 그룹과 << 그룹 따로
        const groupIndex = Math.floor(cog.index / 2);
        const isRightGroup = groupIndex % 2 === 0; // >> 그룹인지

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

    // 모든 지오메트리 합치기
    const merged = mergeGeometries(geometries, false);
    merged.computeVertexNormals();

    return merged;
  }, [type, settings]);

  // 3. 탄성 출렁임 애니메이션
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const geometry = meshRef.current.geometry;
      const posAttribute = geometry.attributes.position;

      // 원본 위치 저장 (최초 1회)
      if (!geometry.userData.originalPositions) {
        geometry.userData.originalPositions = new Float32Array(posAttribute.array);
      }

      const originalPositions = geometry.userData.originalPositions;

      // 버텍스별 출렁임 적용
      for (let i = 0; i < posAttribute.count; i++) {
        const origX = originalPositions[i * 3];
        const origY = originalPositions[i * 3 + 1];
        const origZ = originalPositions[i * 3 + 2];

        // x 위치에 따른 웨이브 (양 끝이 더 많이 흔들림)
        const distFromCenter = Math.abs(origX) / (settings.length / 2);
        const wavePhase = origX * 0.5;
        const waveAmount = distFromCenter * 0.08;

        const wobbleY = Math.sin(time * 2 + wavePhase) * waveAmount;
        const wobbleZ = Math.cos(time * 1.5 + wavePhase) * waveAmount * 0.5;

        posAttribute.setXYZ(
          i,
          origX,
          origY + wobbleY,
          origZ + wobbleZ
        );
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
  return (
    <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing relative z-10">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
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
