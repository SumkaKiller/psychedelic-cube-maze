import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameContext } from '../contexts/GameContext';
import * as THREE from 'three';

export const Player = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { gameState, controls } = useGameContext();
  const velocity = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!meshRef.current || gameState !== 'playing') return;

    const speed = 5;
    const drag = 0.95;

    if (controls.forward) velocity.current.z -= speed * delta;
    if (controls.backward) velocity.current.z += speed * delta;
    if (controls.left) velocity.current.x -= speed * delta;
    if (controls.right) velocity.current.x += speed * delta;

    velocity.current.multiplyScalar(drag);
    meshRef.current.position.add(velocity.current);

    meshRef.current.rotation.y += delta * 2;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#9b87f5"
        emissive="#7E69AB"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};