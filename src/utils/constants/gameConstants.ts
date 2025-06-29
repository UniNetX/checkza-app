export const BOARD_SIZE = 8;
export const SQUARE_SIZE = 60; // pixels

export const GAME_MODES = {
  PLAYER_VS_AI: 'player_vs_ai',
  PUZZLE: 'puzzle',
  LESSON: 'lesson'
} as const;

export const MOVE_TYPES = {
  NORMAL: 'normal',
  CAPTURE: 'capture',
  CASTLE: 'castle',
  EN_PASSANT: 'en_passant',
  PROMOTION: 'promotion'
} as const;

export const THEMES = {
  CLASSIC: 'classic',
  MODERN: 'modern',
  DARK: 'dark'
} as const;

export const SOUND_EFFECTS = {
  MOVE: 'move',
  CAPTURE: 'capture',
  CHECK: 'check',
  CHECKMATE: 'checkmate',
  DRAW: 'draw'
} as const;

export const ANIMATION_DURATION = 300; // milliseconds

export const MAX_MOVES_HISTORY = 100;

export const PUZZLE_CATEGORIES = {
  TACTICS: 'tactics',
  ENDGAME: 'endgame',
  CHECKMATE: 'checkmate'
} as const;

export const LESSON_TYPES = {
  OPENING: 'opening',
  MIDDLEGAME: 'middlegame',
  ENDGAME: 'endgame'
} as const; 