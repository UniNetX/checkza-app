import { PIECE_TYPES, COLORS } from '../constants/chessConstants';

export interface Move {
  from: string;
  to: string;
  piece: string;
  promotion?: string;
  captured?: string;
  san?: string; // Standard Algebraic Notation
  lan?: string; // Long Algebraic Notation
}

export interface MoveResult {
  move: Move;
  captured?: string;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  fen: string;
}

export const getPieceType = (piece: string): string => {
  return piece.toLowerCase();
};

export const getPieceColor = (piece: string): 'w' | 'b' => {
  return piece === piece.toUpperCase() ? 'w' : 'b';
};

export const isValidSquare = (square: string): boolean => {
  if (square.length !== 2) return false;
  const file = square[0];
  const rank = square[1];
  return file >= 'a' && file <= 'h' && rank >= '1' && rank <= '8';
};

export const getSquareColor = (square: string): 'light' | 'dark' => {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
  const rank = parseInt(square[1]) - 1;
  return (file + rank) % 2 === 0 ? 'light' : 'dark';
};

export const getLegalMoves = (fen: string, square: string): string[] => {
  // This is a simplified version - in a real implementation,
  // you would use chess.js or a similar library for accurate move generation
  const legalMoves: string[] = [];
  
  // For now, return empty array - will be implemented with chess.js
  return legalMoves;
};

export const isLegalMove = (fen: string, from: string, to: string): boolean => {
  const legalMoves = getLegalMoves(fen, from);
  return legalMoves.includes(to);
};

export const parseSan = (san: string): Partial<Move> => {
  // Parse Standard Algebraic Notation
  // This is a simplified parser - full implementation would be more complex
  
  const move: Partial<Move> = {};
  
  // Handle special cases
  if (san === 'O-O' || san === '0-0') {
    move.san = 'O-O';
    return move; // Castling
  }
  
  if (san === 'O-O-O' || san === '0-0-0') {
    move.san = 'O-O-O';
    return move; // Queenside castling
  }
  
  // Regular move parsing (simplified)
  const match = san.match(/^([KQRBN]?)([a-h]?)([1-8]?)(x?)([a-h][1-8])(=?[QRBN])?(\+|\#)?$/);
  
  if (match) {
    const [, piece, file, rank, capture, target, promotion, check] = match;
    move.piece = piece || 'P'; // Default to pawn
    move.to = target;
    if (promotion) {
      move.promotion = promotion.slice(1); // Remove '='
    }
  }
  
  return move;
};

export const generateSan = (move: Move, fen: string): string => {
  // Generate Standard Algebraic Notation
  // This is a simplified version - full implementation would be more complex
  
  let san = '';
  
  // Handle castling
  if (move.piece.toLowerCase() === 'k' && 
      (move.from === 'e1' && move.to === 'g1') ||
      (move.from === 'e8' && move.to === 'g8')) {
    return 'O-O';
  }
  
  if (move.piece.toLowerCase() === 'k' && 
      (move.from === 'e1' && move.to === 'c1') ||
      (move.from === 'e8' && move.to === 'c8')) {
    return 'O-O-O';
  }
  
  // Add piece letter (except for pawns)
  if (move.piece.toUpperCase() !== 'P') {
    san += move.piece.toUpperCase();
  }
  
  // Add capture symbol
  if (move.captured) {
    if (move.piece.toUpperCase() === 'P') {
      san += move.from[0]; // File for pawn captures
    }
    san += 'x';
  }
  
  // Add target square
  san += move.to;
  
  // Add promotion
  if (move.promotion) {
    san += `=${move.promotion.toUpperCase()}`;
  }
  
  // Add check/checkmate (simplified)
  // In a real implementation, you'd check the resulting position
  
  return san;
};

export const getMoveType = (move: Move, fen: string): string => {
  // Determine the type of move
  if (move.piece.toLowerCase() === 'k' && 
      Math.abs(move.from.charCodeAt(0) - move.to.charCodeAt(0)) === 2) {
    return 'castle';
  }
  
  if (move.promotion) {
    return 'promotion';
  }
  
  if (move.captured) {
    return 'capture';
  }
  
  return 'normal';
}; 