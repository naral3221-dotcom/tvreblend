"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function RealFace() {
  // 실제 동양인 여성 모델(.glb)이 있다면 이곳 경로를 바꿔주세요
  const { nodes } = useGLTF("https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb");

  // 리얼 스킨 쉐이더 (SSS 느낌 흉내)
  const skinMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffdbac",        // 기본 피부색 (밝은 톤)
        emissive: "#502020",     // 그림자 부분에 혈색 추가
        emissiveIntensity: 0.05,
        roughness: 0.5,          // 피부 질감 (너무 매끈하지 않게)
        metalness: 0.0,
        reflectivity: 0.5,       // 자연스러운 반사
        clearcoat: 0.1,          // 땀/유분 느낌 아주 살짝
        clearcoatRoughness: 0.2,
        sheen: 0.5,              // 피부 표면의 미세한 솜털 빛 반사
        sheenColor: "#ffcccc",   
        side: THREE.FrontSide,
      }),
    []
  );

  if (!nodes || !nodes.LeePerrySmith) return null;

  return (
    <group position={[0, -2, -2]} scale={0.8}> 
      <mesh
        geometry={(nodes.LeePerrySmith as THREE.Mesh).geometry}
        material={skinMaterial}
        rotation={[0, 0, 0]} 
      />
    </group>
  );
}

useGLTF.preload("https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb");
