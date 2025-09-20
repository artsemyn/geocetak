import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Grid,
  GizmoHelper,
  GizmoViewport,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ThreeDViewportProps {
  children: React.ReactNode;
  showGrid?: boolean;
  showGizmo?: boolean;
  cameraPosition?: [number, number, number];
  height?: number;
}

const LoadingFallback: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      gap: 2,
    }}
  >
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      Loading 3D model...
    </Typography>
  </Box>
);

const ThreeDViewport: React.FC<ThreeDViewportProps> = ({
  children,
  showGrid = true,
  showGizmo = true,
  cameraPosition = [5, 5, 5],
  height = 400,
}) => {
  return (
    <Box
      sx={{
        height,
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 50,
        }}
        shadows
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Environment */}
        <Environment preset="studio" />
        
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
        
        {/* Ground */}
        <ContactShadows
          opacity={0.4}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        
        {/* Grid Helper */}
        {showGrid && (
          <Grid
            args={[10, 10]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6e6e6e"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#9d4b4b"
            fadeDistance={25}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
          />
        )}
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Gizmo Helper */}
        {showGizmo && (
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={['#ff0000', '#00ff00', '#0000ff']}
              labelColor="black"
            />
          </GizmoHelper>
        )}
      </Canvas>
    </Box>
  );
};

export default ThreeDViewport;