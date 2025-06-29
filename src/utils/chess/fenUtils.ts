import { INITIAL_FEN } from '../constants/chessConstants';

export interface FenPosition {
  board: string[][];
  turn: 'w' | 'b';
  castling: string;
  enPassant: string;
  halfMoveClock: number;
  fullMoveNumber: number;
}

export const parseFen = (fen: string): FenPosition => {
  const parts = fen.split(' ');
  
  if (parts.length !== 6) {
    throw new Error('Invalid FEN string');
  }

  const [boardStr, turn, castling, enPassant, halfMoveClock, fullMoveNumber] = parts;

  // Parse board
  const board: string[][] = [];
  const ranks = boardStr.split('/');
  
  for (let rank = 0; rank < 8; rank++) {
    const row: string[] = [];
    let file = 0;
    
    for (const char of ranks[rank]) {
      if (/\d/.test(char)) {
        // Empty squares
        const count = parseInt(char);
        for (let i = 0; i < count; i++) {
          row.push('');
        }
        file += count;
      } else {
        // Piece
        row.push(char);
        file++;
      }
    }
    
    board.push(row);
  }

  return {
    board,
    turn: turn as 'w' | 'b',
    castling,
    enPassant,
    halfMoveClock: parseInt(halfMoveClock),
    fullMoveNumber: parseInt(fullMoveNumber)
  };
};

export const generateFen = (position: FenPosition): string => {
  const { board, turn, castling, enPassant, halfMoveClock, fullMoveNumber } = position;
  
  // Generate board string
  const ranks: string[] = [];
  
  for (const row of board) {
    let rankStr = '';
    let emptyCount = 0;
    
    for (const square of row) {
      if (square === '') {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          rankStr += emptyCount.toString();
          emptyCount = 0;
        }
        rankStr += square;
      }
    }
    
    if (emptyCount > 0) {
      rankStr += emptyCount.toString();
    }
    
    ranks.push(rankStr);
  }
  
  const boardStr = ranks.join('/');
  
  return `${boardStr} ${turn} ${castling} ${enPassant} ${halfMoveClock} ${fullMoveNumber}`;
};

export const isValidFen = (fen: string): boolean => {
  try {
    parseFen(fen);
    return true;
  } catch {
    return false;
  }
};

export const getInitialPosition = (): FenPosition => {
  return parseFen(INITIAL_FEN);
};

export const getSquareFromCoords = (rank: number, file: number): string => {
  const files = 'abcdefgh';
  const ranks = '87654321';
  return `${files[file]}${ranks[rank]}`;
};

export const getCoordsFromSquare = (square: string): { rank: number; file: number } => {
  const files = 'abcdefgh';
  const ranks = '87654321';
  const file = files.indexOf(square[0]);
  const rank = ranks.indexOf(square[1]);
  return { rank, file };
}; 