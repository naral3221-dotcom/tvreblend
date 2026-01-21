"use client";

import { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 모델 설정
export const MODEL_CONFIG = {
  position: [0, 0, 0] as [number, number, number],  // 모델 위치 (고정)
  scale: 0.25,  // 크기 조절
  // cameraTarget: 카메라가 바라보는 점 (모델의 실제 중심 찾기)
  // X: 양수 = 오른쪽, 음수 = 왼쪽
  // Y: 양수 = 위, 음수 = 아래
  // Z: 양수 = 앞, 음수 = 뒤
  cameraTarget: [0, -0.5, 1.2] as [number, number, number],
};

// Shape Key 이름 매핑
const SHAPE_KEY_NAMES = {
  base: "level 3_base",
  level1: "level 3_1",
  level2: "level 3_2",
  level3: "level 3_3",
};

interface LowLevel3DProps {
  liftLevel: number; // 0 = base, 1 = level1, 2 = level2, 3 = level3
}

export function LowLevel3D({ liftLevel }: LowLevel3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentInfluences = useRef<number[]>([0, 0, 0, 0]);

  // GLB 모델 로드
  const { scene } = useGLTF("/3d-model/LOW LEVEL 3_final.glb");

  // Shape Key 인덱스 찾기
  const shapeKeyIndices = useMemo(() => {
    const indices = { base: -1, level1: -1, level2: -1, level3: -1 };

    // 디버그: 모든 메시 정보 출력
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const morphAttrs = child.geometry?.morphAttributes;
        console.log("🔎 Mesh found:", {
          name: child.name,
          hasMorphDict: !!child.morphTargetDictionary,
          hasMorphInfluences: !!child.morphTargetInfluences,
          morphDict: child.morphTargetDictionary,
          morphAttrKeys: morphAttrs ? Object.keys(morphAttrs) : [],
          morphAttrPositionLength: morphAttrs?.position?.length,
        });

        // morphAttributes가 있으면 수동으로 설정
        if (morphAttrs?.position && !child.morphTargetDictionary) {
          console.log("🛠️ Setting up morph targets for:", child.name);
          child.morphTargetInfluences = new Array(morphAttrs.position.length).fill(0);
          child.morphTargetDictionary = {};
          morphAttrs.position.forEach((attr: THREE.BufferAttribute, i: number) => {
            const name = attr.name || `morphTarget_${i}`;
            child.morphTargetDictionary![name] = i;
          });
          console.log("✅ morphTargetDictionary:", child.morphTargetDictionary);
        }
      }
    });

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.morphTargetDictionary) {
        console.log("🔍 Shape Keys found:", child.morphTargetDictionary);
        Object.entries(child.morphTargetDictionary).forEach(([name, index]) => {
          if (name.includes("basis")) indices.base = index as number;
          else if (name.includes("3_1")) indices.level1 = index as number;
          else if (name.includes("3_2")) indices.level2 = index as number;
          else if (name.includes("3_3")) indices.level3 = index as number;
        });
      }
    });

    console.log("📊 Shape Key Indices:", indices);
    return indices;
  }, [scene]);

  // 메시 초기화 - model_expression 메시만 사용 (001 버전 제외)
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.computeVertexNormals();

        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.flatShading = false;
              mat.needsUpdate = true;
            }
          });
        }

        // model_expression 메시만 선택 (001, 002 등 제외)
        const isTargetMesh = child.name === "model_expression" ||
          (child.morphTargetInfluences && child.morphTargetDictionary && Object.keys(child.morphTargetDictionary).length > 0);

        if (isTargetMesh && child.morphTargetInfluences) {
          console.log("✅ Using mesh:", child.name, "with morphTargets:", child.morphTargetDictionary);
          meshRef.current = child;
          child.morphTargetInfluences.fill(0);
          if (shapeKeyIndices.base >= 0) {
            child.morphTargetInfluences[shapeKeyIndices.base] = 1;
            currentInfluences.current = [1, 0, 0, 0];
          }
        }
      }
    });
  }, [scene, shapeKeyIndices]);

  // Shape Key 전환 애니메이션
  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh?.morphTargetInfluences) return;

    const targetInfluences = [0, 0, 0, 0];
    targetInfluences[liftLevel] = 1;

    const indices = [
      shapeKeyIndices.base,
      shapeKeyIndices.level1,
      shapeKeyIndices.level2,
      shapeKeyIndices.level3,
    ];

    indices.forEach((shapeIndex, i) => {
      if (shapeIndex >= 0 && mesh.morphTargetInfluences) {
        const newValue = THREE.MathUtils.lerp(
          currentInfluences.current[i],
          targetInfluences[i],
          delta * 3
        );
        currentInfluences.current[i] = newValue;
        mesh.morphTargetInfluences[shapeIndex] = newValue;
      }
    });
  });

  return (
    <group position={MODEL_CONFIG.position} scale={MODEL_CONFIG.scale}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/3d-model/LOW LEVEL 3_final.glb");
