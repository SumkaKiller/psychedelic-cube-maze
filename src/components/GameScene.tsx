import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';
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
      
      <EffectComposer>
        <Bloom 
          intensity={1.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.002, 0.002)}
        />
      </EffectComposer>

      <group ref={groupRef}>
        <Player />
        <Environment />
      </group>

      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </>
  );
};