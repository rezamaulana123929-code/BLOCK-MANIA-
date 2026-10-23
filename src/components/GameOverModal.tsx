import React, { useEffect, useState } from 'react';
import { RotateCcw, Home, Trophy, Sparkles, Flame, Crown, Share2, Check, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getCrownInfoForScore } from '../utils/crowns';
import { GameMode } from '../types/game';

interface GameOverModalProps {
  score: number;
  highScore: number;
  linesCleared: number;
  highestCombo: number;
  mode: GameMode;
  onRestart: () => void;
  onHome: () => void;
  onOpenLogoModal: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  highScore,
  linesCleared,
  highestCombo,
  mode,
  onRestart,
  onHome,
  onOpenLogoModal,
}) => {
  const [copied, setCopied] = useState(false);
  const isNewHighScore = score >= highScore && score > 0;
  const crown = getCrownInfoForScore(score).current;

  useEffect(() => {
    // Fire celebratory confetti if high score or great game
    if (isNewHighScore || score >= 2000) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#06b6d4', '#a855f7', '#10b981', '#f43f5e'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isNewHighScore, score]);

  const handleShare = () => {
    const text = `🎮 I just scored ${score.toLocaleString()} points in BLOCK MANIA (${crown.title})! Can you beat my high score? 🔥`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 border-2 border-cyan-500/50 rounded-3xl p-6 shadow-2xl shadow-blue-950 text-white text-center">
        {/* Crown & Game Over Banner */}
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 mb-2 shadow-lg shadow-amber-950/60">
            <Crown className="w-8 h-8 animate-bounce" />
          </div>

          <h2 className="text-2xl font-black font-game tracking-wider bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-300 bg-clip-text text-transparent">
            {isNewHighScore ? 'NEW RECORD!' : 'GAME OVER'}
          </h2>

          <div className="mt-1 px-3 py-1 rounded-full text-xs font-bold font-game bg-slate-800 border border-slate-700 text-amber-300">
            {crown.title}
          </div>
        </div>

        {/* Score Display */}
        <div className="my-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Final Score
          </span>
          <div className="text-4xl font-extrabold font-game text-white tracking-tight mt-0.5 tabular-nums">
            {score.toLocaleString()}
          </div>
          {isNewHighScore && (
            <span className="inline-block mt-1 text-[11px] font-bold text-amber-400 animate-pulse">
              🏆 New Personal Best!
            </span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-5">
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Lines Cleared</span>
            <span className="font-extrabold text-base font-game text-cyan-300 mt-0.5">
              {linesCleared}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Max Combo</span>
            <span className="font-extrabold text-base font-game text-amber-400 mt-0.5 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              {highestCombo}x
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black font-game text-base shadow-lg shadow-orange-950/60 btn-3d flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>PLAY AGAIN</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Share Score'}</span>
            </button>

            <button
              onClick={onHome}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Main Menu</span>
            </button>
          </div>

          <button
            onClick={onOpenLogoModal}
            className="mt-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 underline flex items-center justify-center gap-1 transition cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>View & Download 1:1 Game Logo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
