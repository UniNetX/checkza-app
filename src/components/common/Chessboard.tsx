import React from 'react';
import { Chessboard as ReactChessboard } from 'react-chessboard';

export interface ChessboardProps {
  fen: string;
  onMove?: (from: string, to: string) => void;
  legalMoves?: { [key: string]: string[] };
  selectedSquare?: string | null;
  onSquareSelect?: (square: string) => void;
  orientation?: 'white' | 'black';
  disabled?: boolean;
  className?: string;
}

const Chessboard: React.FC<ChessboardProps> = ({
  fen,
  onMove,
  legalMoves = {},
  selectedSquare = null,
  onSquareSelect,
  orientation = 'white',
  disabled = false,
  className = ''
}) => {
  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    if (disabled) return false;
    if (onMove) {
      onMove(sourceSquare, targetSquare);
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

  try {
    return (
      <div
        className={`chessboard-container ${className}`}
        style={{
          border: '4px solid #7fa7ff',
          borderRadius: '12px',
          background: '#23273a',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          padding: '8px',
          display: 'inline-block',
          minWidth: 320,
          minHeight: 320,
        }}
      >
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
  } catch (e) {
    return (
      <div style={{ color: 'red', padding: '2rem', background: '#23273a', borderRadius: '12px', border: '2px solid #f00' }}>
        Failed to render chessboard. Please check your FEN and component setup.
      </div>
    );
  }
};

export default Chessboard; 