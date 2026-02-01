import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import BrainModel from "../assets/3d/brain.glb";

type Props = {
  stress: number; // 0 = normal, 1 = full red
};

export default function Brain3D({ stress }: Props) {
  const group = useRef<any>();
  const { scene } = useGLTF(BrainModel);

  // clone materials once
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.emissive = new THREE.Color(0, 0, 0); // start with no red
        child.material.emissiveIntensity = 0.7;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // slow rotation
    group.current.rotation.y += delta * 0.5;

    // gradually change color based on stress prop
    const redLevel = Math.min(Math.max(stress, 0), 1); // clamp 0-1
      const MAX_RED = 0.7; // maximum intensity

      group.current.traverse((child: any) => {
        if (child.isMesh) {
          child.material.color.setRGB(
            1,                        // red channel
            1 - redLevel * MAX_RED,    // green decreases
            1 - redLevel * MAX_RED     // blue decreases
          );
        }
      });

  });

  return <primitive ref={group} object={scene} scale={0.5} position={[0, 0, 0]} />;
}
