"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NodePoint {
  pos: THREE.Vector3;
  targetPos: THREE.Vector3;
  velocity: THREE.Vector3;
  speed: number;
}

export default function NetworkNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  const count = 50; // Lowered count slightly for cleaner light-themed background node layout

  const nodes = useMemo(() => {
    const temp: NodePoint[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8;
      temp.push({
        pos: new THREE.Vector3(x, y, z),
        targetPos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.008
        ),
        speed: 0.15 + Math.random() * 0.4,
      });
    }
    return temp;
  }, [count]);

  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const linePos = new Float32Array(count * count * 6);
    return { positions: pos, linePositions: linePos };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    const pointsGeo = pointsRef.current.geometry;
    const linesGeo = linesRef.current.geometry;

    const posAttr = pointsGeo.getAttribute("position") as THREE.BufferAttribute;
    const linePosAttr = linesGeo.getAttribute("position") as THREE.BufferAttribute;

    let lineIndex = 0;
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    nodes.forEach((node, i) => {
      node.pos.x += node.velocity.x + Math.sin(time * 0.5 + i) * 0.001;
      node.pos.y += node.velocity.y + Math.cos(time * 0.5 + i) * 0.001;
      node.pos.z += node.velocity.z;

      if (Math.abs(node.pos.x) > 10) node.velocity.x *= -1;
      if (Math.abs(node.pos.y) > 7) node.velocity.y *= -1;
      if (Math.abs(node.pos.z) > 4) node.velocity.z *= -1;

      // Mouse interactive push
      const distToMouse = node.pos.distanceTo(new THREE.Vector3(mouseX, mouseY, node.pos.z));
      if (distToMouse < 3.5) {
        const force = (3.5 - distToMouse) * 0.008;
        node.pos.x += (mouseX - node.pos.x) * force;
        node.pos.y += (mouseY - node.pos.y) * force;
      }

      posAttr.setXYZ(i, node.pos.x, node.pos.y, node.pos.z);
    });

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = nodes[i].pos.distanceTo(nodes[j].pos);
        if (dist < 2.8) {
          linePosAttr.setXYZ(lineIndex, nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z);
          linePosAttr.setXYZ(lineIndex + 1, nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z);
          lineIndex += 2;
        }
      }
    }

    posAttr.needsUpdate = true;
    linesGeo.setDrawRange(0, lineIndex);
    linePosAttr.needsUpdate = true;

    // Soft rotation
    pointsRef.current.rotation.y = time * 0.015;
    linesRef.current.rotation.y = time * 0.015;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00a3ff"
          size={0.15}
          sizeAttenuation={true}
          transparent
          opacity={0.65}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0055ff"
          transparent
          opacity={0.08}
        />
      </lineSegments>
    </group>
  );
}
