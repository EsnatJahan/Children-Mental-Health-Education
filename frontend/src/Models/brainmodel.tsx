import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";
import * as THREE from "three";
import BrainModel from "../assets/3d/brain.glb";

type Props = {
  stress: number; // 0 = normal, 1 = full red
  baseColor?: string; // Optional custom base color
};

export default function Brain3D({ stress, baseColor }: Props) {
  const group = useRef<THREE.Group>(null);
  
  // Load the GLTF and clone the scene so it can be used in multiple Canvas components
  const { scene } = useGLTF(BrainModel);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Set up materials on the cloned scene
  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.emissive = new THREE.Color(0x000000);
        child.material.emissiveIntensity = 0.5;
        // Ensure the model is centered
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Smooth, gentle rotation
    group.current.rotation.y += delta * 0.4;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // Gradually change color based on stress prop
    const redLevel = Math.min(Math.max(stress, 0), 1);
    const MAX_RED_SHIFT = 0.8;

    group.current.traverse((child: any) => {
      if (child.isMesh) {
        if (baseColor) {
          child.material.color.set(baseColor);
        } else {
          // Change color from white (1,1,1) to reddish (1, 0.2, 0.2)
          child.material.color.setRGB(
            1,
            1 - redLevel * MAX_RED_SHIFT,
            1 - redLevel * MAX_RED_SHIFT
          );
        }
        
        // Add a slight glow when stressed
        if (redLevel > 0.5 && !baseColor) {
          child.material.emissive.setRGB(redLevel * 0.3, 0, 0);
        } else {
          child.material.emissive.setRGB(0, 0, 0);
        }
      }
    });
  });

  return (
    <primitive 
      ref={group} 
      object={clonedScene} 
      scale={0.5} 
      position={[0, 0, 0]} 
    />
  );
}

// Preload the model
useGLTF.preload(BrainModel);
