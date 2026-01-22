"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Center } from "@react-three/drei";
import { CrystalFace } from "./CrystalFace";

export function CrystalFace3D() {
    return (
        <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing relative z-10">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 6], fov: 35 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 5]} angle={0.2} penumbra={1} intensity={3} color="#ffffff" />
                <spotLight position={[-10, -5, -5]} intensity={2.0} color="#00bfff" />
                <pointLight position={[0, 0, 2]} intensity={1.5} color="#e0f7fa" distance={5} />
                <Environment preset="city" />

                <Center>
                    <CrystalFace />
                </Center>

                <OrbitControls
                    makeDefault
                    enablePan={false}
                    minDistance={3}
                    maxDistance={10}
                />
            </Canvas>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none fade-in opacity-70">
                <p className="text-white text-xs tracking-widest uppercase mb-1">Interactive 3D Model</p>
                <p className="text-white/40 text-[10px]">Crystal Face Structure</p>
            </div>
        </div>
    );
}
