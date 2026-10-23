import React from 'react';
import { Volume2, VolumeX, Pause, Trophy, Flame, Image as ImageIcon, Wand2, Hammer } from 'lucide-react';
import { CrownMeter } from './CrownMeter';
import { GameMode } from '../types/game';

interface HeaderBarProps {
  score: number;
  highScore: number;
  combo: number;
  gameMode: GameMode;
  isMuted: boolean;
  hammerCharges: number;
  isHammerActive: boolean;
  refreshCharges: number;
  onToggleMute: () => void;
  onPause: () => void;
  onOpenLogoModal: () => void;
  onToggleHammer: () => void;
  onUseRefresh: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  score,
  highScore,
  combo,
  gameMode,
  isMuted,
  hammerCharges,
  isHammerActive,
  refreshCharges,
  onToggleMute,
  onPause,
  onOpenLogoModal,
  onToggleHammer,
  onUseRefresh,
}) => {
  return (
    <header className="w-full max-w-xl mx-auto flex flex-col gap-2 pt-2 px-3 select-none">
      {/* Top Bar: Brand Tag, Tools, Audio & Pause */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mini Logo trigger */}
          <button
            onClick={onOpenLogoModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold text-cyan-300 shadow-md hover:bg-slate-800 transition cursor-pointer group"
            title="Inspect 1:1 Game Logo & Brand Specs"
          >
            <div className="w-4 h-4 rounded-md overflow-hidden shrink-0 border border-amber-400/50">
              <img
                src="/src/assets/images/block_mania_logo_1792684222092.jpg"
                alt="Mini Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-game tracking-wide hidden sm:inline">LOGO SPECS</span>
            <span className="font-game tracking-wide sm:hidden">LOGO</span>
          </button>

          {/* Mode Badge */}
          <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold font-game tracking-wide bg-slate-900/80 border border-slate-800 text-slate-300 uppercase">
            {gameMode === 'classic' ? 'Classic 8×8' : gameMode === 'bomb' ? 'Bomb Mania' : 'Adventure'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Power-up: Hammer */}
          <button
            onClick={onToggleHammer}
            disabled={hammerCharges <= 0 && !isHammerActive}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
              isHammerActive
                ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400 animate-pulse'
                : hammerCharges > 0
                ? 'bg-slate-900/90 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed'
            }`}
            title="Hammer: Click to smash any single block"
          >
            <Hammer className="w-3.5 h-3.5" />
            <span className="text-[10px]">{hammerCharges}</span>
          </button>

          {/* Power-up: Refresh Tray */}
          <button
            onClick={onUseRefresh}
            disabled={refreshCharges <= 0}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
              refreshCharges > 0
                ? 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20'
                : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed'
            }`}
            title="Refresh: Get 3 brand new pieces"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span className="text-[10px]">{refreshCharges}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Pause */}
          <button
            onClick={onPause}
            className="p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Pause Game (Esc)"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Score and Stats Row */}
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Current Score */}
        <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-cyan-500/30 shadow-lg shadow-blue-950/40">
          <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
            Score
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold font-game text-white tracking-tight tabular-nums">
            {score.toLocaleString()}
          </span>
        </div>

        {/* Crown Progress */}
        <div className="flex flex-col items-center justify-center">
          <CrownMeter score={score} />
          {combo > 1 && (
            <div className="flex items-center gap-1 mt-1 text-xs font-bold text-amber-400 animate-bounce">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{combo}x COMBO!</span>
            </div>
          )}
        </div>

        {/* High Score */}
        <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-amber-500/30 shadow-lg shadow-amber-950/30">
          <div className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-amber-400 uppercase">
            <Trophy className="w-3 h-3" />
            <span>Best</span>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold font-game text-amber-200 tracking-tight tabular-nums">
            {Math.max(score, highScore).toLocaleString()}
          </span>
        </div>
      </div>
    </header>
  );
};
