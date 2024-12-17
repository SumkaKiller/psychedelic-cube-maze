import { useGameContext } from '../contexts/GameContext';

export const GameUI = () => {
  const { gameState, score, startGame, pauseGame, resumeGame } = useGameContext();

  if (gameState === 'playing') {
    return (
      <div className="game-ui">
        <div className="game-score">Score: {score}</div>
      </div>
    );
  }

  return (
    <div className="menu-overlay">
      <div className="menu-content">
        <h1 className="text-4xl font-bold text-primary mb-8">
          {gameState === 'paused' ? 'Paused' : 'Кубическое Безумие'}
        </h1>
        {gameState === 'paused' ? (
          <button className="btn" onClick={resumeGame}>
            Resume
          </button>
        ) : (
          <button className="btn" onClick={startGame}>
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};