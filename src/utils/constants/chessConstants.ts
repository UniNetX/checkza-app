export const PIECE_TYPES = {
  PAWN: 'p',
  KNIGHT: 'n',
  BISHOP: 'b',
  ROOK: 'r',
  QUEEN: 'q',
  KING: 'k'
} as const;

export const COLORS = {
  WHITE: 'w',
  BLACK: 'b'
} as const;

export const GAME_STATES = {
  PLAYING: 'playing',
  CHECK: 'check',
  CHECKMATE: 'checkmate',
  STALEMATE: 'stalemate',
  DRAW: 'draw'
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
} as const;

export const DIFFICULTY_SETTINGS = {
  [DIFFICULTY_LEVELS.EASY]: { depth: 10, timeLimit: 2000 },
  [DIFFICULTY_LEVELS.MEDIUM]: { depth: 15, timeLimit: 5000 },
  [DIFFICULTY_LEVELS.HARD]: { depth: 20, timeLimit: 10000 }
} as const;

export const PIECE_SYMBOLS = {
  [PIECE_TYPES.PAWN]: '♟',
  [PIECE_TYPES.KNIGHT]: '♞',
  [PIECE_TYPES.BISHOP]: '♝',
  [PIECE_TYPES.ROOK]: '♜',
  [PIECE_TYPES.QUEEN]: '♛',
  [PIECE_TYPES.KING]: '♚'
} as const;

export const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; 