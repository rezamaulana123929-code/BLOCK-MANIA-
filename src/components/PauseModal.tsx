import React from 'react';
import { Play, RotateCcw, Home, Volume2, VolumeX, Image as ImageIcon, X } from 'lucide-react';

interface PauseModalProps {
  isOpen: boolean;
  isMuted: boolean;
  onResume: () => void;
  onRestart: () => void;
  onHome: () => void;
  onToggleMute: () => void;
  onOpenLogoModal: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  isMuted,
  onResume,
  onRestart,
  onHome,
  onToggleMute,
  onOpenLogoModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xs bg-slate-900 border-2 border-cyan-500/40 rounded-3xl p-6 shadow-2xl shadow-blue-950 text-white text-center">
        <h2 className="text-2xl font-black font-game tracking-wider bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-5">
          GAME PAUSED
        </h2>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={onResume}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black font-game text-base shadow-lg shadow-blue-950/60 btn-3d flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>RESUME</span>
          </button>

          <button
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Level</span>
          </button>

          <button
            onClick={onToggleMute}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <span>{isMuted ? 'Unmute Audio' : 'Mute Audio'}</span>
          </button>

          <button
            onClick={onHome}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Main Menu</span>
          </button>

          <button
            onClick={onOpenLogoModal}
            className="mt-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>1:1 Logo & Asset Specs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
