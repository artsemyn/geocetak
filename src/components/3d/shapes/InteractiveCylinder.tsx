import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { useCylinderStore } from '../../../stores/cylinderStore';

interface InteractiveCylinderProps {
  showNet?: boolean;
  animated?: boolean;
}

const InteractiveCylinder: React.FC<InteractiveCylinderProps> = ({
  showNet = false,
  animated = false,
}) => {
  const groupRef = useRef<Group>(null);
  const cylinderRef = useRef<Mesh>(null);
  
  const {
    radius,
    height,
    showWireframe,
    isAnimating,
  } = useCylinderStore();

  useFrame((state) => {
    if (animated && groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
    
    if (isAnimating && cylinderRef.current) {
      cylinderRef.current.rotation.y = state.clock.getElapsedTime();
    }
  });

  if (showNet) {
    return <CylinderNet radius={radius} height={height} />;
  }

  return (
    <group ref={groupRef}>
      <mesh ref={cylinderRef} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial
          color="#4A90E2"
          wireframe={showWireframe}
          transparent={showWireframe}
          opacity={showWireframe ? 0.7 : 0.9}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
      
      {/* Dimension indicators */}
      <DimensionIndicators radius={radius} height={height} />
    </group>
  );
};

// Component untuk menampilkan jaring-jaring tabung
const CylinderNet: React.FC<{ radius: number; height: number }> = ({
  radius,
  height,
}) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Animate unfolding
      groupRef.current.children.forEach((child, index) => {
        const delay = index * 0.5;
        const progress = Math.max(0, Math.min(1, (time - delay) / 2));
        
        if (index === 0) {
          // Bottom circle
          child.position.y = -height / 2 - progress * 2;
        } else if (index === 1) {
          // Top circle  
          child.position.y = height / 2 + progress * 2;
        } else if (index === 2) {
          // Side rectangle (unfolded)
          child.rotation.z = progress * Math.PI / 2;
          child.position.x = progress * radius * 2;
        }
      });
    }
  });

  const circumference = 2 * Math.PI * radius;

  return (
    <group ref={groupRef}>
      {/* Bottom circle */}
      <mesh position={[0, -height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial color="#FFD700" side={2} />
      </mesh>
      
      {/* Top circle */}
      <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshStandardMaterial color="#FFD700" side={2} />
      </mesh>
      
      {/* Side rectangle (unfolded) */}
      <mesh>
        <planeGeometry args={[circumference, height]} />
        <meshStandardMaterial color="#4A90E2" side={2} />
      </mesh>
    </group>
  );
};

// Component untuk indikator dimensi
const DimensionIndicators: React.FC<{ radius: number; height: number }> = ({
  radius,
  height,
}) => {
  return (
    <group>
      {/* Height indicator */}
      <group position={[radius + 0.5, 0, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, height, 8]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
        {/* Height labels could be added here */}
      </group>
      
      {/* Radius indicator */}
      <group position={[0, height / 2 + 0.3, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, radius, 8]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      </group>
    </group>
  );
};

export default InteractiveCylinder;     