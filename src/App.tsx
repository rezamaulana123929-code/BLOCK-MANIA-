/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { HeaderBar } from './components/HeaderBar';
import { GameBoard } from './components/GameBoard';
import { PieceTray } from './components/PieceTray';
import { GameOverModal } from './components/GameOverModal';
import { PauseModal } from './components/PauseModal';
import { LogoBrandingModal } from './components/LogoBrandingModal';
import { BoardCell, BlockShape, GameMode, CrownTier } from './types/game';
import { sound } from './utils/audio';
import { 
  generatePieceTray, 
  canPlaceAt, 
  canPlaceAnywhere, 
  getSimulatedClears,
  THEME_STYLES 
} from './utils/shapes';
import { getCrownInfoForScore } from './utils/crowns';

type GameState = 'title' | 'playing' | 'paused' | 'gameover';

const INITIAL_BOARD: BoardCell[][] = Array.from({ length: 8 }, () =>
  Array.from({ length: 8 }, () => ({ filled: false }))
);

export default function App() {
  const [gameState, setGameState] = useState<GameState>('title');
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [board, setBoard] = useState<BoardCell[][]>(INITIAL_BOARD);
  const [pieces, setPieces] = useState<(BlockShape | null)[]>([null, null, null]);
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);

  // Score & Stats
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('block_mania_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [linesCleared, setLinesCleared] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [highestCombo, setHighestCombo] = useState<number>(0);
  const [movesCount, setMovesCount] = useState<number>(0);

  // Power-ups
  const [hammerCharges, setHammerCharges] = useState<number>(1);
  const [isHammerActive, setIsHammerActive] = useState<boolean>(false);
  const [refreshCharges, setRefreshCharges] = useState<number>(1);

  // Hover & Feedback
  const [hoverPos, setHoverPos] = useState<{ r: number; c: number } | null>(null);
  const [clearingRows, setClearingRows] = useState<number[]>([]);
  const [clearingCols, setClearingCols] = useState<number[]>([]);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [comboBanner, setComboBanner] = useState<{ text: string; combo: number } | null>(null);

  // UI Modals
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);

  // Track previous crown tier to celebrate level ups
  const prevCrownRef = useRef<CrownTier>('bronze');

  // Start new game
  const startGame = useCallback((mode: GameMode = 'classic') => {
    const emptyBoard: BoardCell[][] = Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => ({ filled: false }))
    );

    // If adventure mode, add a few jewel blocks to the board
    if (mode === 'adventure') {
      emptyBoard[2][2] = { filled: true, color: 'cyan', colorClass: THEME_STYLES.cyan.bg, isJewel: true };
      emptyBoard[2][5] = { filled: true, color: 'gold', colorClass: THEME_STYLES.gold.bg, isJewel: true };
      emptyBoard[5][2] = { filled: true, color: 'purple', colorClass: THEME_STYLES.purple.bg, isJewel: true };
      emptyBoard[5][5] = { filled: true, color: 'green', colorClass: THEME_STYLES.green.bg, isJewel: true };
    }

    const newPieces = generatePieceTray(emptyBoard);

    setBoard(emptyBoard);
    setPieces(newPieces);
    setSelectedPieceIndex(0);
    setScore(0);
    setLinesCleared(0);
    setCombo(0);
    setHighestCombo(0);
    setMovesCount(0);
    setHammerCharges(1);
    setIsHammerActive(false);
    setRefreshCharges(1);
    setGameMode(mode);
    setClearingRows([]);
    setClearingCols([]);
    setComboBanner(null);
    prevCrownRef.current = 'bronze';
    setGameState('playing');
  }, []);

  // Check Game Over: returns true if any piece can fit anywhere
  const checkGameOver = useCallback((currentBoard: BoardCell[][], currentPieces: (BlockShape | null)[]) => {
    const activePieces = currentPieces.filter((p): p is BlockShape => p !== null);
    if (activePieces.length === 0) return false;

    const canAnyMove = activePieces.some((p) => canPlaceAnywhere(currentBoard, p));
    return !canAnyMove;
  }, []);

  // Update high score
  const updateHighScore = useCallback((newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('block_mania_highscore', newScore.toString());
    }
  }, [highScore]);

  // Audio Toggle
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Hammer Power-up Toggle
  const handleToggleHammer = () => {
    if (hammerCharges <= 0 && !isHammerActive) return;
    setIsHammerActive((prev) => !prev);
    sound.playPick();
  };

  // Use Refresh Tray Power-up
  const handleUseRefresh = () => {
    if (refreshCharges <= 0) return;
    const newPieces = generatePieceTray(board);
    setPieces(newPieces);
    setSelectedPieceIndex(0);
    setRefreshCharges((prev) => prev - 1);
    sound.playPowerUp();
  };

  // Select piece from tray
  const handleSelectPiece = (index: number) => {
    if (!pieces[index]) return;
    if (selectedPieceIndex === index) {
      setSelectedPieceIndex(null);
    } else {
      setSelectedPieceIndex(index);
      sound.playPick();
    }
  };

  // Placing piece onto board at (startRow, startCol)
  const placePieceAt = useCallback((startRow: number, startCol: number) => {
    if (selectedPieceIndex === null) return;
    const currentPiece = pieces[selectedPieceIndex];
    if (!currentPiece) return;

    if (!canPlaceAt(board, currentPiece, startRow, startCol)) {
      return;
    }

    sound.playPlace();

    // 1. Fill board cells
    const shapeRows = currentPiece.matrix.length;
    const shapeCols = currentPiece.matrix[0].length;
    let blockCount = 0;

    const nextBoard = board.map((r) => r.map((c) => ({ ...c })));

    for (let r = 0; r < shapeRows; r++) {
      for (let c = 0; c < shapeCols; c++) {
        if (currentPiece.matrix[r][c] === 1) {
          blockCount++;
          nextBoard[startRow + r][startCol + c] = {
            filled: true,
            color: currentPiece.color,
            colorClass: currentPiece.colorClass,
          };
        }
      }
    }

    // 2. Consume piece from tray
    const nextPieces = [...pieces];
    nextPieces[selectedPieceIndex] = null;

    // Base score for placing the blocks
    let addedScore = blockCount * 10;
    const newMovesCount = movesCount + 1;
    setMovesCount(newMovesCount);

    // Reward power-ups every milestone
    if (newMovesCount % 15 === 0) {
      setHammerCharges((prev) => Math.min(prev + 1, 3));
      setRefreshCharges((prev) => Math.min(prev + 1, 3));
    }

    // 3. In Bomb Mode: decrement bomb countdowns & potentially spawn a bomb
    let bombExploded = false;
    if (gameMode === 'bomb') {
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (nextBoard[r][c].isBomb && nextBoard[r][c].bombCountdown !== undefined) {
            const nextCount = nextBoard[r][c].bombCountdown! - 1;
            nextBoard[r][c].bombCountdown = nextCount;
            if (nextCount <= 0) {
              bombExploded = true;
            } else if (nextCount <= 3) {
              sound.playBombTick();
            }
          }
        }
      }

      // Spawn a new bomb tile every 10 moves if none exists
      if (newMovesCount % 10 === 0) {
        // Find empty cell
        const emptyCells: { r: number; c: number }[] = [];
        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            if (!nextBoard[r][c].filled) emptyCells.push({ r, c });
          }
        }
        if (emptyCells.length > 0) {
          const randCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          nextBoard[randCell.r][randCell.c] = {
            filled: true,
            color: 'red',
            colorClass: THEME_STYLES.red.bg,
            isBomb: true,
            bombCountdown: 9,
          };
        }
      }
    }

    // 4. Check for full rows and columns
    const fullRows: number[] = [];
    for (let r = 0; r < 8; r++) {
      if (nextBoard[r].every((cell) => cell.filled)) {
        fullRows.push(r);
      }
    }

    const fullCols: number[] = [];
    for (let c = 0; c < 8; c++) {
      let isFull = true;
      for (let r = 0; r < 8; r++) {
        if (!nextBoard[r][c].filled) {
          isFull = false;
          break;
        }
      }
      if (isFull) {
        fullCols.push(c);
      }
    }

    const totalLines = fullRows.length + fullCols.length;

    if (totalLines > 0) {
      // Line clear occurred!
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > highestCombo) setHighestCombo(newCombo);
      setLinesCleared((prev) => prev + totalLines);

      // Line score scaling + Combo multiplier
      const lineBaseScore = [0, 100, 300, 600, 1000, 1500, 2100, 2800][Math.min(totalLines, 7)] || totalLines * 400;
      const comboMultiplier = Math.max(1, newCombo * 1.5);
      addedScore += Math.round(lineBaseScore * comboMultiplier);

      // Trigger Screen Shake for 2+ lines
      if (totalLines >= 2) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 300);
      }

      // Combo praise text
      const comboTexts = ['', 'NICE!', 'GREAT!', 'SUPER!', 'MANIA BLAST!', 'UNSTOPPABLE!', 'DIVINE!'];
      const text = comboTexts[Math.min(newCombo, comboTexts.length - 1)] || 'GODLIKE!';
      setComboBanner({ text, combo: newCombo });
      setTimeout(() => setComboBanner(null), 1400);

      // Audio feedback
      sound.playLineClear(totalLines, newCombo);
      if (newCombo > 1) {
        sound.playCombo(newCombo);
      }

      // Clear row & column cells
      setClearingRows(fullRows);
      setClearingCols(fullCols);

      for (const r of fullRows) {
        for (let c = 0; c < 8; c++) {
          nextBoard[r][c] = { filled: false };
        }
      }
      for (const c of fullCols) {
        for (let r = 0; r < 8; r++) {
          nextBoard[r][c] = { filled: false };
        }
      }

      // Check for MEGA BOARD CLEAR (entire board empty)
      const isBoardEmpty = nextBoard.every((row) => row.every((c) => !c.filled));
      if (isBoardEmpty) {
        addedScore += 1000;
        setComboBanner({ text: 'BOARD CLEAR! +1000', combo: newCombo });
        sound.playCrownLevelUp();
      }

      // Reset clear highlights after brief animation
      setTimeout(() => {
        setClearingRows([]);
        setClearingCols([]);
      }, 250);
    } else {
      // No lines cleared, reset combo
      setCombo(0);
    }

    // 5. Update Score & check Crown Level Up
    const newScore = score + addedScore;
    setScore(newScore);
    updateHighScore(newScore);

    const currentCrownTier = getCrownInfoForScore(newScore).current.tier;
    if (currentCrownTier !== prevCrownRef.current) {
      prevCrownRef.current = currentCrownTier;
      sound.playCrownLevelUp();
    }

    // 6. Handle Piece Tray replenishment
    const remainingPieces = nextPieces.filter((p) => p !== null);
    let finalPieces = nextPieces;

    if (remainingPieces.length === 0) {
      finalPieces = generatePieceTray(nextBoard);
      setSelectedPieceIndex(0);
    } else {
      // Automatically select the next available piece
      const nextIdx = nextPieces.findIndex((p) => p !== null);
      setSelectedPieceIndex(nextIdx !== -1 ? nextIdx : null);
    }

    setBoard(nextBoard);
    setPieces(finalPieces);

    // 7. Check if Bomb exploded or No Moves left
    if (bombExploded) {
      sound.playGameOver();
      setGameState('gameover');
      return;
    }

    if (checkGameOver(nextBoard, finalPieces)) {
      sound.playGameOver();
      setTimeout(() => setGameState('gameover'), 400);
    }
  }, [
    selectedPieceIndex, 
    pieces, 
    board, 
    movesCount, 
    gameMode, 
    combo, 
    highestCombo, 
    score, 
    updateHighScore, 
    checkGameOver
  ]);

  // Click on cell (places piece or uses hammer)
  const handleCellClick = (r: number, c: number) => {
    // If hammer is active, smash the clicked cell
    if (isHammerActive) {
      if (board[r][c].filled) {
        const nextBoard = board.map((row) => row.map((cell) => ({ ...cell })));
        nextBoard[r][c] = { filled: false };
        setBoard(nextBoard);
        setHammerCharges((prev) => Math.max(0, prev - 1));
        setIsHammerActive(false);
        sound.playPlace();

        // Check if any tray piece can now fit
        const anyFit = pieces.some((p) => p && canPlaceAnywhere(nextBoard, p));
        if (anyFit && gameState === 'gameover') {
          setGameState('playing');
        }
      }
      return;
    }

    if (selectedPieceIndex === null) return;
    placePieceAt(r, c);
  };

  const handleCellMouseEnter = (r: number, c: number) => {
    setHoverPos({ r, c });
  };

  const handleCellMouseLeave = () => {
    setHoverPos(null);
  };

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Title screen: Space or Enter to start
      if (gameState === 'title') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          startGame(gameMode);
        }
        return;
      }

      // Pause toggle
      if (e.code === 'Escape') {
        e.preventDefault();
        if (gameState === 'playing') setGameState('paused');
        else if (gameState === 'paused') setGameState('playing');
        return;
      }

      // During gameplay
      if (gameState === 'playing') {
        if (e.key === '1') handleSelectPiece(0);
        else if (e.key === '2') handleSelectPiece(1);
        else if (e.key === '3') handleSelectPiece(2);
        else if (e.key.toLowerCase() === 'h') handleToggleHammer();
        else if (e.key.toLowerCase() === 'r') handleUseRefresh();
        else if (e.code === 'Space' || e.code === 'Enter') {
          if (hoverPos) {
            e.preventDefault();
            placePieceAt(hoverPos.r, hoverPos.c);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, gameMode, hoverPos, placePieceAt, startGame]);

  // Compute simulated clears for ghost hover anticipation
  const selectedPiece = selectedPieceIndex !== null ? pieces[selectedPieceIndex] : null;
  const predictedClears =
    selectedPiece && hoverPos && canPlaceAt(board, selectedPiece, hoverPos.r, hoverPos.c)
      ? getSimulatedClears(board, selectedPiece, hoverPos.r, hoverPos.c)
      : { rows: [], cols: [] };

  return (
    <div
      className={`relative w-full h-full min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white select-none overflow-x-hidden ${
        isShaking ? 'translate-x-1 duration-75' : ''
      }`}
    >
      {/* Title Screen View */}
      {gameState === 'title' && (
        <TitleScreen
          onStart={startGame}
          selectedMode={gameMode}
          onSelectMode={setGameMode}
          highScore={highScore}
          onOpenLogoModal={() => setIsLogoModalOpen(true)}
        />
      )}

      {/* Main Game Playing Screen */}
      {(gameState === 'playing' || gameState === 'paused' || gameState === 'gameover') && (
        <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-between py-2 sm:py-3 px-3">
          {/* Header Bar */}
          <HeaderBar
            score={score}
            highScore={highScore}
            combo={combo}
            gameMode={gameMode}
            isMuted={isMuted}
            hammerCharges={hammerCharges}
            isHammerActive={isHammerActive}
            refreshCharges={refreshCharges}
            onToggleMute={handleToggleMute}
            onPause={() => setGameState('paused')}
            onOpenLogoModal={() => setIsLogoModalOpen(true)}
            onToggleHammer={handleToggleHammer}
            onUseRefresh={handleUseRefresh}
          />

          {/* Center: Game Board & Overlay Combo Banner */}
          <div className="relative my-auto flex flex-col items-center justify-center">
            {/* Combo Banner Floating Badge */}
            {comboBanner && (
              <div className="absolute -top-7 z-20 pointer-events-none animate-combo-popup">
                <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-black font-game text-sm sm:text-base tracking-wider shadow-xl shadow-orange-950/80 border-2 border-white flex items-center gap-1.5">
                  <span>{comboBanner.text}</span>
                  {comboBanner.combo > 1 && <span>🔥 {comboBanner.combo}x</span>}
                </div>
              </div>
            )}

            {/* The 8x8 Grid */}
            <GameBoard
              board={board}
              selectedPiece={selectedPiece}
              hoverPos={hoverPos}
              clearingRows={clearingRows}
              clearingCols={clearingCols}
              predictedClears={predictedClears}
              isHammerActive={isHammerActive}
              onCellClick={handleCellClick}
              onCellMouseEnter={handleCellMouseEnter}
              onCellMouseLeave={handleCellMouseLeave}
            />
          </div>

          {/* Bottom Piece Tray */}
          <div className="w-full flex flex-col gap-1 pb-1">
            <PieceTray
              pieces={pieces}
              selectedIndex={selectedPieceIndex}
              board={board}
              onSelectPiece={handleSelectPiece}
            />

            {/* Quick status bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono px-2 pt-1">
              <span>Lines: <strong className="text-cyan-300">{linesCleared}</strong></span>
              <span>Moves: <strong className="text-slate-200">{movesCount}</strong></span>
              <span>Streak: <strong className="text-amber-400">{combo}x</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Pause Modal */}
      <PauseModal
        isOpen={gameState === 'paused'}
        isMuted={isMuted}
        onResume={() => setGameState('playing')}
        onRestart={() => startGame(gameMode)}
        onHome={() => setGameState('title')}
        onToggleMute={handleToggleMute}
        onOpenLogoModal={() => setIsLogoModalOpen(true)}
      />

      {/* Game Over Modal */}
      {gameState === 'gameover' && (
        <GameOverModal
          score={score}
          highScore={highScore}
          linesCleared={linesCleared}
          highestCombo={highestCombo}
          mode={gameMode}
          onRestart={() => startGame(gameMode)}
          onHome={() => setGameState('title')}
          onOpenLogoModal={() => setIsLogoModalOpen(true)}
        />
      )}

      {/* 1:1 Logo & Brand Identity Modal */}
      <LogoBrandingModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </div>
  );
}
