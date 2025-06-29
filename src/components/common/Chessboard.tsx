import React from 'react';
import { Chessboard as ReactChessboard } from 'react-chessboard';

export interface ChessboardProps {
  position: (string | null)[][];
  onMove?: (from: string, to: string) => void;
  legalMoves?: { [key: string]: string[] };
  selectedSquare?: string | null;
  onSquareSelect?: (square: string) => void;
  orientation?: 'white' | 'black';
  disabled?: boolean;
  className?: string;
}

const Chessboard: React.FC<ChessboardProps> = ({
  position,
  onMove,
  legalMoves = {},
  selectedSquare = null,
  onSquareSelect,
  orientation = 'white',
  disabled = false,
  className = ''
}) => {
  // Convert position array to FEN string
  const convertPositionToFen = (pos: (string | null)[][]): string => {
    let fen = '';
    let emptyCount = 0;
    
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = pos[rank][file];
        if (piece === null) {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            fen += emptyCount;
            emptyCount = 0;
          }
          fen += piece;
        }
      }
      if (emptyCount > 0) {
        fen += emptyCount;
        emptyCount = 0;
      }
      if (rank < 7) fen += '/';
    }
    
    return fen + ' w KQkq - 0 1';
  };

  const fen = convertPositionToFen(position);

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    if (disabled) return false;
    
    // Check if move is legal
    if (legalMoves[sourceSquare]?.includes(targetSquare)) {
      if (onMove) {
        onMove(sourceSquare, targetSquare);
      }
      return true;
    }
    
    return false;
  };

  const handleSquareClick = (square: string) => {
    if (disabled) return;
    
    if (onSquareSelect) {
      onSquareSelect(square);
    }
  };

  return (
    <div className={`chessboard-container ${className}`}>
      <ReactChessboard
        position={fen}
        onPieceDrop={handlePieceDrop}
        onSquareClick={handleSquareClick}
        boardOrientation={orientation}
        areArrowsAllowed={false}
        arePiecesDraggable={!disabled}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
        customDarkSquareStyle={{
          backgroundColor: '#5a4632'
        }}
        customLightSquareStyle={{
          backgroundColor: '#bfa97a'
        }}
      />
    </div>
  );
};

export default Chessboard; 