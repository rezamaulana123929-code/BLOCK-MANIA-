import React from 'react';
import { BlockShape, BoardCell } from '../types/game';
import { canPlaceAnywhere, THEME_STYLES } from '../utils/shapes';

interface PieceTrayProps {
  pieces: (BlockShape | null)[];
  selectedIndex: number | null;
  board: BoardCell[][];
  onSelectPiece: (index: number) => void;
}

export const PieceTray: React.FC<PieceTrayProps> = ({
  pieces,
  selectedIndex,
  board,
  onSelectPiece,
}) => {
  return (
    <div className="w-full max-w-md mx-auto grid grid-cols-3 gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl select-none min-h-[110px] sm:min-h-[125px] items-center">
      {pieces.map((piece, idx) => {
        if (!piece) {
          return (
            <div
              key={`empty-${idx}`}
              className="h-24 sm:h-28 rounded-xl border border-dashed border-slate-800/80 bg-slate-950/40 flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>
          );
        }

        const isSelected = selectedIndex === idx;
        const canFit = canPlaceAnywhere(board, piece);
        const rows = piece.matrix.length;
        const cols = piece.matrix[0].length;
        const style = THEME_STYLES[piece.color];

        return (
          <button
            key={piece.id}
            onClick={() => onSelectPiece(idx)}
            className={`relative h-24 sm:h-28 rounded-xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer group ${
              isSelected
                ? 'bg-blue-900/40 border-2 border-cyan-400 ring-4 ring-cyan-500/30 scale-105 shadow-lg shadow-cyan-950/60'
                : canFit
                ? 'bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 hover:scale-102 active:scale-98'
                : 'bg-slate-950/40 border border-red-950/40 opacity-45 cursor-not-allowed'
            }`}
            title={canFit ? `${piece.name} (Press ${idx + 1})` : `${piece.name} - No room on board`}
          >
            {/* Keyboard shortcut key indicator */}
            <span className="absolute top-1.5 left-2 text-[10px] font-mono font-bold text-slate-400">
              {idx + 1}
            </span>

            {/* Shape Matrix Rendering */}
            <div
              className="grid gap-1 sm:gap-1.5 transition-transform"
              style={{
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              }}
            >
              {piece.matrix.map((rowArr, rIdx) =>
                rowArr.map((val, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md transition-all ${
                      val === 1
                        ? `${style.bg} block-3d border-t border-l border-white/40 shadow-sm ${
                            isSelected ? 'ring-1 ring-white' : ''
                          }`
                        : 'opacity-0'
                    }`}
                  />
                ))
              )}
            </div>

            {/* If unable to fit anywhere, show subtle indicator */}
            {!canFit && (
              <span className="absolute bottom-1 text-[9px] font-bold text-rose-400/90 tracking-tight">
                No space
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
