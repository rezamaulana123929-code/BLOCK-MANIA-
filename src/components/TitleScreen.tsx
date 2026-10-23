import React from 'react';
import { Play, Crown, Sparkles, Flame, Bomb, Trophy, Info, Image as ImageIcon } from 'lucide-react';
import { GameMode } from '../types/game';

interface TitleScreenProps {
  onStart: (mode: GameMode) => void;
  selectedMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  highScore: number;
  onOpenLogoModal: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStart,
  selectedMode,
  onSelectMode,
  highScore,
  onOpenLogoModal,
}) => {
  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-[#070b1a] via-[#0d1633] to-[#080d21] text-white select-none overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Bar: High Score & 1:1 Logo Showcase trigger */}
      <div className="w-full max-w-xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>BEST SCORE: {highScore.toLocaleString()}</span>
        </div>

        <button
          onClick={onOpenLogoModal}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-blue-900/80 to-indigo-900/80 hover:from-blue-800 hover:to-indigo-800 border border-cyan-400/50 text-cyan-300 text-xs font-bold transition shadow-lg shadow-cyan-950/60 cursor-pointer"
        >
          <ImageIcon className="w-4 h-4" />
          <span>VIEW 1:1 LOGO</span>
        </button>
      </div>

      {/* Centerpiece: Hero 3D Logo Lockup */}
      <div className="flex flex-col items-center justify-center my-auto z-10 max-w-md w-full">
        {/* The 1:1 3D Logo Card */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/90 border-2 border-cyan-400/40 p-1 bg-gradient-to-b from-cyan-400/30 to-amber-400/20 group hover:scale-102 transition-transform duration-300 animate-float-gentle">
          <img
            src="/src/assets/images/block_mania_logo_1792684222092.jpg"
            alt="BLOCK MANIA 3D Game Logo"
            className="w-full h-full object-cover rounded-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-cyan-500/10 via-transparent to-amber-400/10" />
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-2 w-full mt-6">
          <button
            onClick={() => onSelectMode('classic')}
            className={`p-2.5 rounded-2xl text-xs font-bold font-game flex flex-col items-center gap-1 transition cursor-pointer border ${
              selectedMode === 'classic'
                ? 'bg-blue-600 text-white border-cyan-300 shadow-lg shadow-blue-950 ring-2 ring-cyan-400'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Classic 8×8</span>
          </button>

          <button
            onClick={() => onSelectMode('bomb')}
            className={`p-2.5 rounded-2xl text-xs font-bold font-game flex flex-col items-center gap-1 transition cursor-pointer border ${
              selectedMode === 'bomb'
                ? 'bg-rose-600 text-white border-rose-300 shadow-lg shadow-rose-950 ring-2 ring-rose-400'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bomb className="w-4 h-4 text-rose-300" />
            <span>Bomb Mania</span>
          </button>

          <button
            onClick={() => onSelectMode('adventure')}
            className={`p-2.5 rounded-2xl text-xs font-bold font-game flex flex-col items-center gap-1 transition cursor-pointer border ${
              selectedMode === 'adventure'
                ? 'bg-emerald-600 text-white border-emerald-300 shadow-lg shadow-emerald-950 ring-2 ring-emerald-400'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Crown Rush</span>
          </button>
        </div>

        {/* Primary Start CTA Button */}
        <button
          onClick={() => onStart(selectedMode)}
          className="mt-5 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black font-game text-xl tracking-wider shadow-xl shadow-orange-950/70 btn-3d flex items-center justify-center gap-3 cursor-pointer group"
        >
          <Play className="w-6 h-6 fill-slate-950 group-hover:scale-110 transition-transform" />
          <span>PLAY NOW</span>
        </button>
      </div>

      {/* Control Hint Line (adhering to game guidelines) */}
      <div className="w-full max-w-xl text-center py-2 z-10">
        <p className="text-xs font-mono text-slate-400 tracking-wider">
          <span className="text-cyan-400 font-semibold">Touch / Drag</span> or <span className="text-amber-400 font-semibold">1-3 Select</span> · <span className="text-white font-semibold">Space / Enter Place</span> · <span className="text-slate-300 font-semibold">Esc Pause</span>
        </p>
      </div>
    </div>
  );
};
