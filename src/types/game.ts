export type ColorTheme = 'gold' | 'cyan' | 'purple' | 'green' | 'red' | 'blue';

export interface BlockShape {
  id: string;
  name: string;
  matrix: number[][]; // 2D array of 0s and 1s
  color: ColorTheme;
  colorClass: string;
  borderClass: string;
  glowClass: string;
}

export interface BoardCell {
  filled: boolean;
  color?: ColorTheme;
  colorClass?: string;
  isClearing?: boolean;
  bombCountdown?: number; // For Bomb mode
  isBomb?: boolean;
  isJewel?: boolean; // For Puzzle / Adventure mode
}

export type GameMode = 'classic' | 'bomb' | 'adventure';

export type CrownTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'mania';

export interface CrownInfo {
  tier: CrownTier;
  title: string;
  minScore: number;
  iconColor: string;
  badgeBg: string;
}

export interface GameStats {
  score: number;
  highScore: number;
  linesCleared: number;
  highestCombo: number;
  currentCombo: number;
  blocksPlaced: number;
  crownTier: CrownTier;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}
