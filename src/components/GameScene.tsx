import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { Player } from './Player';
import { Environment } from './Environment';
import * as THREE from 'three';

export const GameScene = () => {
  const { gameState } = useGameContext();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && gameState === 'playing') {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <color attach="background" args={['#080808']} />
      <fog attach="fog" args={['#080808', 30, 40]} />

      <group ref={groupRef}>
        <Player />
        <Environment />
      </group>

      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  );
};