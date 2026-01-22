"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function CrystalFace() {
    // 1. 3D 헤드 모델 로드
    // 중요: 실제 '동양인 여성' 모델 파일(.glb)을 구하셔서 프로젝트의 public 폴더에 넣고 경로를 수정해주세요.
    // 예: useGLTF("/models/asian_female_head.glb");
    const { nodes } = useGLTF("https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb");

    // 2. 리얼 스킨 (Skin) 재질 - 동양인 피부 톤
    const skinMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: "#ffe4c4",       // Bisque / 밝은 살구색
                roughness: 0.5,         // 피부의 자연스러운 거칠기
                metalness: 0.0,         // 금속성 없음
                side: THREE.FrontSide,  // 겉면만 렌더링 to avoid seeing inside
            }),
        []
    );

    // 로드 여부 확인
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

// Preload
useGLTF.preload("https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb");
