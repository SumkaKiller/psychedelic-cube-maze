import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { GameScene } from './GameScene';
import { GameUI } from './GameUI';
import { GameProvider } from '../contexts/GameContext';

export const Game = () => {
  return (
    <GameProvider>
      <div className="game-container relative w-full h-screen">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 75 }}
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <GameScene />
          </Suspense>
        </Canvas>
        <GameUI />
      </div>
    </GameProvider>
  );
};