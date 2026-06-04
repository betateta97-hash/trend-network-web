"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShape {
  pos: THREE.Vector3;
  scale: number;
  speed: number;
  offset: number;
}

export default function InteractiveText() {
  const meshRef = useRef<THREE.Group>(null);
  const shapesRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  const fontUrl = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json";

  // Generate floating spheres around typography
  const spheres = useMemo(() => {
    const temp: FloatingShape[] = [];
    for (let i = 0; i < 8; i++) {
      temp.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        ),
        scale: 0.15 + Math.random() * 0.25,
        speed: 0.2 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      const targetX = (mouse.y * viewport.height) * 0.08;
      const targetY = (mouse.x * viewport.width) * 0.08;

      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.08;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.08;
    }

    if (shapesRef.current) {
      shapesRef.current.children.forEach((child, index) => {
        const shape = spheres[index];
        if (shape) {
          child.position.y = shape.pos.y + Math.sin(time * shape.speed + shape.offset) * 0.3;
          child.position.x = shape.pos.x + Math.cos(time * 0.1 * shape.speed) * 0.2;
          child.rotation.x = time * 0.2;
          child.rotation.y = time * 0.1;
        }
      });
    }
  });

  return (
    <group>
      {/* 3D Main Typography */}
      <group ref={meshRef}>
        <Center>
          <Text3D
            font={fontUrl}
            size={1.5}
            height={0.35}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.06}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            TREND NETWORK
            <meshPhysicalMaterial
              color="#0f172a"
              roughness={0.1}
              metalness={0.8}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
              emissive="#4f46e5"
              emissiveIntensity={0.25}
            />
          </Text3D>
        </Center>
      </group>

      {/* Floating 3D shapes */}
      <group ref={shapesRef}>
        {spheres.map((sphere, index) => (
          <mesh key={index} position={sphere.pos} scale={sphere.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshPhysicalMaterial
              color="#3b82f6"
              roughness={0.25}
              metalness={0.7}
              transparent
              opacity={0.6}
              clearcoat={1.0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
