import React from 'react';
import { BoardCell, BlockShape } from '../types/game';
import { THEME_STYLES } from '../utils/shapes';
import { Bomb, Sparkles, Gem } from 'lucide-react';

interface GameBoardProps {
  board: BoardCell[][];
  selectedPiece: BlockShape | null;
  hoverPos: { r: number; c: number } | null;
  clearingRows: number[];
  clearingCols: number[];
  predictedClears: { rows: number[]; cols: number[] };
  isHammerActive: boolean;
  onCellClick: (row: number, col: number) => void;
  onCellMouseEnter: (row: number, col: number) => void;
  onCellMouseLeave: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  selectedPiece,
  hoverPos,
  clearingRows,
  clearingCols,
  predictedClears,
  isHammerActive,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
}) => {
  // Determine if a cell is part of the ghost preview
  const isGhostCell = (r: number, c: number): boolean => {
    if (!selectedPiece || !hoverPos) return false;
    const shapeRows = selectedPiece.matrix.length;
    const shapeCols = selectedPiece.matrix[0].length;

    const rOffset = r - hoverPos.r;
    const cOffset = c - hoverPos.c;

    if (rOffset >= 0 && rOffset < shapeRows && cOffset >= 0 && cOffset < shapeCols) {
      return selectedPiece.matrix[rOffset][cOffset] === 1;
    }
    return false;
  };

  // Determine if cell is part of a clearing or predicted clear line
  const isTargetOfClear = (r: number, c: number): boolean => {
    return (
      clearingRows.includes(r) ||
      clearingCols.includes(c) ||
      predictedClears.rows.includes(r) ||
      predictedClears.cols.includes(c)
    );
  };

  return (
    <div className="relative select-none p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-slate-900/95 via-blue-950/80 to-slate-900/95 border-2 border-blue-600/40 shadow-2xl shadow-blue-950/80 mx-auto max-w-md w-full aspect-square flex flex-col justify-center">
      {/* Outer Glow & Corner Accents */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg pointer-events-none" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg pointer-events-none" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl-lg pointer-events-none" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br-lg pointer-events-none" />

      {/* Grid container */}
      <div
        className={`grid grid-cols-8 grid-rows-8 gap-1 sm:gap-1.5 w-full h-full p-2 bg-slate-950/90 rounded-2xl border border-slate-800 shadow-inner ${
          isHammerActive ? 'cursor-crosshair' : ''
        }`}
        onMouseLeave={onCellMouseLeave}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            const ghost = isGhostCell(r, c);
            const inClearAnimation = clearingRows.includes(r) || clearingCols.includes(c) || cell.isClearing;
            const inClearPrediction = predictedClears.rows.includes(r) || predictedClears.cols.includes(c);

            return (
              <div
                key={`${r}-${c}`}
                onClick={() => onCellClick(r, c)}
                onMouseEnter={() => onCellMouseEnter(r, c)}
                className={`relative rounded-lg sm:rounded-xl transition-all duration-100 flex items-center justify-center overflow-hidden aspect-square ${
                  cell.filled
                    ? `${cell.colorClass || 'bg-amber-500'} block-3d border-t border-l border-white/40 shadow-md ${
                        inClearAnimation
                          ? 'scale-110 brightness-150 animate-pulse'
                          : inClearPrediction
                          ? 'ring-2 ring-white/80 brightness-125'
                          : ''
                      }`
                    : ghost
                    ? `${
                        selectedPiece
                          ? THEME_STYLES[selectedPiece.color].bg
                          : 'bg-cyan-500'
                      } opacity-75 ring-2 ring-white animate-pulse block-3d`
                    : inClearPrediction
                    ? 'bg-blue-900/60 ring-1 ring-cyan-400/50'
                    : 'bg-slate-900/80 border border-slate-800/80 hover:bg-slate-800/60'
                }`}
              >
                {/* Cell content: Bomb countdown, Jewel, or Highlight */}
                {cell.filled && cell.isBomb && cell.bombCountdown !== undefined && (
                  <div className="flex flex-col items-center justify-center text-white drop-shadow-md z-10">
                    <Bomb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 animate-bounce" />
                    <span className="text-[10px] sm:text-xs font-black font-game text-white bg-slate-950/80 px-1 rounded-full">
                      {cell.bombCountdown}
                    </span>
                  </div>
                )}

                {cell.filled && cell.isJewel && (
                  <div className="z-10 drop-shadow-md">
                    <Gem className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
                  </div>
                )}

                {/* Anticipated Clear indicator shimmer */}
                {inClearPrediction && !cell.filled && !ghost && (
                  <div className="absolute inset-0 bg-cyan-400/10 pointer-events-none animate-pulse" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
