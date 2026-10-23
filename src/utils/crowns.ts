import { CrownInfo, CrownTier } from '../types/game';

export const CROWN_TIERS: CrownInfo[] = [
  {
    tier: 'bronze',
    title: 'Bronze Novice',
    minScore: 0,
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-950/80 border-amber-600/60 text-amber-300',
  },
  {
    tier: 'silver',
    title: 'Silver Striker',
    minScore: 800,
    iconColor: 'text-slate-300',
    badgeBg: 'bg-slate-800/80 border-slate-400/60 text-slate-100',
  },
  {
    tier: 'gold',
    title: 'Golden Master',
    minScore: 2000,
    iconColor: 'text-yellow-400',
    badgeBg: 'bg-amber-500/20 border-yellow-400 text-yellow-300',
  },
  {
    tier: 'diamond',
    title: 'Diamond Legend',
    minScore: 4500,
    iconColor: 'text-cyan-300',
    badgeBg: 'bg-cyan-500/20 border-cyan-400 text-cyan-200',
  },
  {
    tier: 'mania',
    title: 'BLOCK MANIA EMPEROR',
    minScore: 8000,
    iconColor: 'text-purple-300',
    badgeBg: 'bg-gradient-to-r from-purple-600/30 to-amber-500/30 border-yellow-300 text-amber-200',
  },
];

export function getCrownInfoForScore(score: number): { current: CrownInfo; next?: CrownInfo; progressPct: number } {
  let current = CROWN_TIERS[0];
  let next: CrownInfo | undefined = CROWN_TIERS[1];

  for (let i = 0; i < CROWN_TIERS.length; i++) {
    if (score >= CROWN_TIERS[i].minScore) {
      current = CROWN_TIERS[i];
      next = CROWN_TIERS[i + 1];
    } else {
      break;
    }
  }

  if (!next) {
    return { current, next: undefined, progressPct: 100 };
  }

  const range = next.minScore - current.minScore;
  const earned = score - current.minScore;
  const progressPct = Math.min(100, Math.max(0, Math.round((earned / range) * 100)));

  return { current, next, progressPct };
}
