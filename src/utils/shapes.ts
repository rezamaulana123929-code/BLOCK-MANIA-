import { BlockShape, BoardCell, ColorTheme } from '../types/game';

export const THEME_STYLES: Record<ColorTheme, { bg: string; border: string; glow: string; hex: string }> = {
  gold: {
    bg: 'bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-600',
    border: 'border-amber-200 border-t-amber-100 border-b-amber-700',
    glow: 'shadow-[0_0_15px_rgba(251,191,36,0.6)]',
    hex: '#f59e0b',
  },
  cyan: {
    bg: 'bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-600',
    border: 'border-cyan-200 border-t-cyan-100 border-b-blue-700',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.6)]',
    hex: '#06b6d4',
  },
  purple: {
    bg: 'bg-gradient-to-b from-fuchsia-400 via-purple-500 to-indigo-700',
    border: 'border-purple-200 border-t-fuchsia-200 border-b-indigo-800',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.6)]',
    hex: '#a855f7',
  },
  green: {
    bg: 'bg-gradient-to-b from-lime-300 via-emerald-400 to-green-600',
    border: 'border-emerald-200 border-t-lime-100 border-b-green-700',
    glow: 'shadow-[0_0_15px_rgba(34,197,94,0.6)]',
    hex: '#10b981',
  },
  red: {
    bg: 'bg-gradient-to-b from-orange-400 via-rose-500 to-red-600',
    border: 'border-rose-200 border-t-orange-200 border-b-red-800',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.6)]',
    hex: '#f43f5e',
  },
  blue: {
    bg: 'bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-700',
    border: 'border-sky-200 border-t-sky-100 border-b-indigo-800',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.6)]',
    hex: '#3b82f6',
  },
};

const COLOR_KEYS: ColorTheme[] = ['gold', 'cyan', 'purple', 'green', 'red', 'blue'];

export interface ShapeTemplate {
  name: string;
  matrix: number[][];
  preferredColor?: ColorTheme;
}

export const SHAPE_TEMPLATES: ShapeTemplate[] = [
  // Dot 1x1
  { name: 'Dot 1x1', matrix: [[1]], preferredColor: 'gold' },

  // Lines 2
  { name: 'Line 2H', matrix: [[1, 1]], preferredColor: 'cyan' },
  { name: 'Line 2V', matrix: [[1], [1]], preferredColor: 'cyan' },

  // Lines 3
  { name: 'Line 3H', matrix: [[1, 1, 1]], preferredColor: 'green' },
  { name: 'Line 3V', matrix: [[1], [1], [1]], preferredColor: 'green' },

  // Lines 4
  { name: 'Line 4H', matrix: [[1, 1, 1, 1]], preferredColor: 'blue' },
  { name: 'Line 4V', matrix: [[1], [1], [1], [1]], preferredColor: 'blue' },

  // Lines 5
  { name: 'Line 5H', matrix: [[1, 1, 1, 1, 1]], preferredColor: 'purple' },
  { name: 'Line 5V', matrix: [[1], [1], [1], [1], [1]], preferredColor: 'purple' },

  // Squares
  { name: 'Square 2x2', matrix: [[1, 1], [1, 1]], preferredColor: 'gold' },
  { name: 'Square 3x3', matrix: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], preferredColor: 'red' },

  // Small Corner 2x2
  { name: 'Corner 2x2 TL', matrix: [[1, 1], [1, 0]], preferredColor: 'cyan' },
  { name: 'Corner 2x2 TR', matrix: [[1, 1], [0, 1]], preferredColor: 'cyan' },
  { name: 'Corner 2x2 BL', matrix: [[1, 0], [1, 1]], preferredColor: 'purple' },
  { name: 'Corner 2x2 BR', matrix: [[0, 1], [1, 1]], preferredColor: 'purple' },

  // Large L-shape 3x3
  { name: 'L-Shape 3x3 TL', matrix: [[1, 1, 1], [1, 0, 0], [1, 0, 0]], preferredColor: 'green' },
  { name: 'L-Shape 3x3 TR', matrix: [[1, 1, 1], [0, 0, 1], [0, 0, 1]], preferredColor: 'green' },
  { name: 'L-Shape 3x3 BL', matrix: [[1, 0, 0], [1, 0, 0], [1, 1, 1]], preferredColor: 'red' },
  { name: 'L-Shape 3x3 BR', matrix: [[0, 0, 1], [0, 0, 1], [1, 1, 1]], preferredColor: 'red' },

  // Tetris L & J
  { name: 'L-Tetris', matrix: [[1, 0], [1, 0], [1, 1]], preferredColor: 'gold' },
  { name: 'J-Tetris', matrix: [[0, 1], [0, 1], [1, 1]], preferredColor: 'cyan' },
  { name: 'L-Tetris H', matrix: [[1, 1, 1], [1, 0, 0]], preferredColor: 'blue' },
  { name: 'J-Tetris H', matrix: [[1, 1, 1], [0, 0, 1]], preferredColor: 'blue' },

  // T-Shapes
  { name: 'T-Shape Down', matrix: [[1, 1, 1], [0, 1, 0]], preferredColor: 'purple' },
  { name: 'T-Shape Up', matrix: [[0, 1, 0], [1, 1, 1]], preferredColor: 'purple' },
  { name: 'T-Shape Left', matrix: [[0, 1], [1, 1], [0, 1]], preferredColor: 'green' },
  { name: 'T-Shape Right', matrix: [[1, 0], [1, 1], [1, 0]], preferredColor: 'green' },

  // Z and S shapes
  { name: 'Z-Shape H', matrix: [[1, 1, 0], [0, 1, 1]], preferredColor: 'red' },
  { name: 'S-Shape H', matrix: [[0, 1, 1], [1, 1, 0]], preferredColor: 'green' },
  { name: 'Z-Shape V', matrix: [[1, 0], [1, 1], [0, 1]], preferredColor: 'gold' },
  { name: 'S-Shape V', matrix: [[0, 1], [1, 1], [1, 0]], preferredColor: 'cyan' },
];

export function createBlockShape(template: ShapeTemplate, forceColor?: ColorTheme): BlockShape {
  const color = forceColor || template.preferredColor || COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)];
  const style = THEME_STYLES[color];

  return {
    id: `${template.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: template.name,
    matrix: template.matrix,
    color,
    colorClass: style.bg,
    borderClass: style.border,
    glowClass: style.glow,
  };
}

// Generate 3 balanced shapes for the tray
export function generatePieceTray(board: BoardCell[][]): BlockShape[] {
  // Check board density to favor easier pieces if board is filling up
  let filledCount = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]?.filled) filledCount++;
    }
  }
  const fillRatio = filledCount / 64;

  const result: BlockShape[] = [];

  // Guarantee at least one smaller/adaptable piece if the board is getting crowded (>50% full)
  let guaranteedFit = false;

  for (let i = 0; i < 3; i++) {
    let pool = SHAPE_TEMPLATES;

    if (fillRatio > 0.6 && !guaranteedFit) {
      // Pick from smaller, flexible shapes
      pool = SHAPE_TEMPLATES.filter((t) => {
        const rows = t.matrix.length;
        const cols = t.matrix[0].length;
        return rows <= 2 && cols <= 2;
      });
      guaranteedFit = true;
    }

    const template = pool[Math.floor(Math.random() * pool.length)];
    const color = COLOR_KEYS[(i * 2 + Math.floor(Math.random() * COLOR_KEYS.length)) % COLOR_KEYS.length];
    result.push(createBlockShape(template, color));
  }

  // Ensure that at least one of the 3 pieces can fit on the current board
  const anyFit = result.some((p) => canPlaceAnywhere(board, p));
  if (!anyFit) {
    // Replace the first piece with a 1x1 or 1x2 that fits
    const dotTemplate = SHAPE_TEMPLATES[0]; // 1x1
    result[0] = createBlockShape(dotTemplate, 'gold');
  }

  return result;
}

// Check if a piece can be placed at a specific (startRow, startCol)
export function canPlaceAt(board: BoardCell[][], shape: BlockShape, startRow: number, startCol: number): boolean {
  const shapeRows = shape.matrix.length;
  const shapeCols = shape.matrix[0].length;

  if (startRow < 0 || startCol < 0 || startRow + shapeRows > 8 || startCol + shapeCols > 8) {
    return false;
  }

  for (let r = 0; r < shapeRows; r++) {
    for (let c = 0; c < shapeCols; c++) {
      if (shape.matrix[r][c] === 1) {
        if (board[startRow + r][startCol + c].filled) {
          return false;
        }
      }
    }
  }

  return true;
}

// Check if a piece can be placed anywhere on the 8x8 board
export function canPlaceAnywhere(board: BoardCell[][], shape: BlockShape): boolean {
  const shapeRows = shape.matrix.length;
  const shapeCols = shape.matrix[0].length;

  for (let r = 0; r <= 8 - shapeRows; r++) {
    for (let c = 0; c <= 8 - shapeCols; c++) {
      if (canPlaceAt(board, shape, r, c)) {
        return true;
      }
    }
  }

  return false;
}

// Detect which rows and columns would be cleared if a piece was placed at (startRow, startCol)
export function getSimulatedClears(
  board: BoardCell[][],
  shape: BlockShape,
  startRow: number,
  startCol: number
): { rows: number[]; cols: number[] } {
  const shapeRows = shape.matrix.length;
  const shapeCols = shape.matrix[0].length;

  // Create temporary grid
  const tempGrid: boolean[][] = Array.from({ length: 8 }, (_, r) =>
    Array.from({ length: 8 }, (_, c) => board[r][c].filled)
  );

  // Overlay piece
  for (let r = 0; r < shapeRows; r++) {
    for (let c = 0; c < shapeCols; c++) {
      if (shape.matrix[r][c] === 1) {
        tempGrid[startRow + r][startCol + c] = true;
      }
    }
  }

  const rows: number[] = [];
  const cols: number[] = [];

  // Check full rows
  for (let r = 0; r < 8; r++) {
    let full = true;
    for (let c = 0; c < 8; c++) {
      if (!tempGrid[r][c]) {
        full = false;
        break;
      }
    }
    if (full) rows.push(r);
  }

  // Check full columns
  for (let c = 0; c < 8; c++) {
    let full = true;
    for (let r = 0; r < 8; r++) {
      if (!tempGrid[r][c]) {
        full = false;
        break;
      }
    }
    if (full) cols.push(c);
  }

  return { rows, cols };
}
