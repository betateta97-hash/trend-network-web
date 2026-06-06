"use client";

import { Canvas } from "@react-three/fiber";
import NetworkNodes from "./NetworkNodes";
import InteractiveText from "./InteractiveText";
import { Suspense } from "react";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-gradient-to-b from-[#ffffff] via-[#f7fafc] to-[#ffffff] dark:from-[#090d16] dark:via-[#0c101d] dark:to-[#090d16] transition-colors duration-300">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.75} />
        
        {/* Indigo-Blue directional lights */}
        <directionalLight position={[5, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, 5, 2]} intensity={1.2} color="#4f46e5" />
        
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#3b82f6" />
        
        <Suspense fallback={null}>
          <group position={[0, 0.4, 0]}>
            <InteractiveText />
          </group>
          <NetworkNodes />
        </Suspense>
      </Canvas>
    </div>
  );
}
