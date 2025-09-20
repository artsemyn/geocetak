import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface CylinderProps {
  radius?: number;
  height?: number;
  color?: string;
  wireframe?: boolean;
  animated?: boolean;
}

const Cylinder: React.FC<CylinderProps> = ({
  radius = 1,
  height = 2,
  color = '#4A90E2',
  wireframe = false,
  animated = false,
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (animated && meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height, 32]} />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent={wireframe}
        opacity={wireframe ? 0.7 : 1}
      />
    </mesh>
  );
};

export default Cylinder;