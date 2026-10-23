import React from 'react';
import { Crown, Sparkles } from 'lucide-react';
import { getCrownInfoForScore } from '../utils/crowns';

interface CrownMeterProps {
  score: number;
}

export const CrownMeter: React.FC<CrownMeterProps> = ({ score }) => {
  const { current, next, progressPct } = getCrownInfoForScore(score);

  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
      <div className={`p-1.5 rounded-xl border ${current.badgeBg} flex items-center justify-center shrink-0`}>
        <Crown className={`w-4 h-4 ${current.iconColor} ${current.tier === 'mania' ? 'animate-bounce' : ''}`} />
      </div>

      <div className="flex flex-col min-w-[100px] sm:min-w-[130px]">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-amber-300 font-game truncate">{current.title}</span>
          <span className="text-slate-400 font-mono text-[10px]">
            {next ? `${score}/${next.minScore}` : 'MAX'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};
