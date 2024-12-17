import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Environment = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[100, 100, '#9b87f5', '#1A1F2C']} position={[0, -2, 0]} />
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 60 - 30,
            Math.random() * 20 - 10,
            Math.random() * 60 - 30,
          ]}
        >
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color="#D946EF"
            emissive="#D946EF"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};