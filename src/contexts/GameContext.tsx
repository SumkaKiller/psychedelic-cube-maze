import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type GameState = 'menu' | 'playing' | 'paused';

interface Controls {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

interface GameContextType {
  gameState: GameState;
  score: number;
  controls: Controls;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [controls, setControls] = useState<Controls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setControls(prev => ({ ...prev, forward: true }));
          break;
        case 's':
        case 'arrowdown':
          setControls(prev => ({ ...prev, backward: true }));
          break;
        case 'a':
        case 'arrowleft':
          setControls(prev => ({ ...prev, left: true }));
          break;
        case 'd':
        case 'arrowright':
          setControls(prev => ({ ...prev, right: true }));
          break;
        case 'escape':
          pauseGame();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setControls(prev => ({ ...prev, forward: false }));
          break;
        case 's':
        case 'arrowdown':
          setControls(prev => ({ ...prev, backward: false }));
          break;
        case 'a':
        case 'arrowleft':
          setControls(prev => ({ ...prev, left: false }));
          break;
        case 'd':
        case 'arrowright':
          setControls(prev => ({ ...prev, right: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setScore(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        score,
        controls,
        startGame,
        pauseGame,
        resumeGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};