import { Chess, Move as ChessMove, Square } from 'chess.js';
import { Move, MoveResult } from '../../utils/chess/moveUtils';
import { DIFFICULTY_LEVELS, DIFFICULTY_SETTINGS } from '../../utils/constants/chessConstants';

export interface GameState {
  fen: string;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  legalMoves: { [key: string]: string[] };
  turn: 'w' | 'b';
  moveNumber: number;
}

export interface GameAnalysis {
  evaluation: number;
  bestMove?: string;
  depth: number;
  timeSpent: number;
}

class ChessEngine {
  private chess: Chess;
  private stockfish: any = null;
  private isStockfishReady = false;

  constructor() {
    this.chess = new Chess();
  }

  // Initialize Stockfish
  async initStockfish(): Promise<void> {
    try {
      // In a real implementation, you would load Stockfish WebAssembly
      // For now, we'll simulate it
      this.isStockfishReady = true;
      console.log('Stockfish initialized');
    } catch (error) {
      console.error('Failed to initialize Stockfish:', error);
      this.isStockfishReady = false;
    }
  }

  // Game State Management
  newGame(): void {
    this.chess = new Chess();
  }

  loadPosition(fen: string): boolean {
    try {
      this.chess = new Chess(fen);
      return true;
    } catch (error) {
      console.error('Invalid FEN position:', error);
      return false;
    }
  }

  getGameState(): GameState {
    const legalMoves: { [key: string]: string[] } = {};
    
    // Get legal moves for each square
    for (let i = 0; i < 64; i++) {
      const rank = Math.floor(i / 8);
      const file = i % 8;
      const square = this.getSquareFromIndex(i);
      const piece = this.chess.get(square as Square);
      
      if (piece) {
        const moves = this.chess.moves({ square: square as Square, verbose: true });
        if (moves.length > 0) {
          legalMoves[square] = moves.map(move => move.to);
        }
      }
    }

    return {
      fen: this.chess.fen(),
      isCheck: this.chess.isCheck(),
      isCheckmate: this.chess.isCheckmate(),
      isStalemate: this.chess.isStalemate(),
      isDraw: this.chess.isDraw(),
      legalMoves,
      turn: this.chess.turn(),
      moveNumber: this.chess.moveNumber()
    };
  }

  // Move Execution
  makeMove(move: Move): MoveResult | null {
    try {
      const chessMove = this.chess.move({
        from: move.from as Square,
        to: move.to as Square,
        promotion: move.promotion
      });

      if (!chessMove) {
        return null;
      }

      return {
        move: {
          from: chessMove.from,
          to: chessMove.to,
          piece: chessMove.piece,
          promotion: chessMove.promotion,
          captured: chessMove.captured,
          san: chessMove.san,
          lan: `${chessMove.from}${chessMove.to}${chessMove.promotion || ''}`
        },
        captured: chessMove.captured,
        isCheck: this.chess.isCheck(),
        isCheckmate: this.chess.isCheckmate(),
        isStalemate: this.chess.isStalemate(),
        isDraw: this.chess.isDraw(),
        fen: this.chess.fen()
      };
    } catch (error) {
      console.error('Invalid move:', error);
      return null;
    }
  }

  makeMoveFromSan(san: string): MoveResult | null {
    try {
      const chessMove = this.chess.move(san);
      
      if (!chessMove) {
        return null;
      }

      return {
        move: {
          from: chessMove.from,
          to: chessMove.to,
          piece: chessMove.piece,
          promotion: chessMove.promotion,
          captured: chessMove.captured,
          san: chessMove.san,
          lan: `${chessMove.from}${chessMove.to}${chessMove.promotion || ''}`
        },
        captured: chessMove.captured,
        isCheck: this.chess.isCheck(),
        isCheckmate: this.chess.isCheckmate(),
        isStalemate: this.chess.isStalemate(),
        isDraw: this.chess.isDraw(),
        fen: this.chess.fen()
      };
    } catch (error) {
      console.error('Invalid SAN move:', error);
      return null;
    }
  }

  // Move Validation
  isLegalMove(from: string, to: string): boolean {
    const moves = this.chess.moves({ square: from as Square, verbose: true });
    return moves.some(move => move.to === to);
  }

  getLegalMoves(square: string): string[] {
    return this.chess.moves({ square: square as Square, verbose: true }).map(move => move.to);
  }

  // AI Move Generation
  async getBestMove(difficulty: keyof typeof DIFFICULTY_LEVELS): Promise<string | null> {
    if (!this.isStockfishReady) {
      // Fallback to simple random move
      return this.getRandomMove();
    }

    const settings = DIFFICULTY_SETTINGS[DIFFICULTY_LEVELS[difficulty]];
    
    try {
      // In a real implementation, you would use Stockfish to get the best move
      // For now, we'll simulate it with a delay
      await new Promise(resolve => setTimeout(resolve, settings.timeLimit));
      
      // Get all legal moves and return a "smart" one
      const moves = this.chess.moves({ verbose: true });
      if (moves.length === 0) return null;
      
      // Simple heuristic: prefer captures and checks
      const captures = moves.filter(move => move.captured);
      const checks = moves.filter(move => move.san?.includes('+'));
      
      if (captures.length > 0) {
        return captures[Math.floor(Math.random() * captures.length)].san || null;
      }
      
      if (checks.length > 0) {
        return checks[Math.floor(Math.random() * checks.length)].san || null;
      }
      
      return moves[Math.floor(Math.random() * moves.length)].san || null;
    } catch (error) {
      console.error('Error getting best move:', error);
      return this.getRandomMove();
    }
  }

  private getRandomMove(): string | null {
    const moves = this.chess.moves({ verbose: true });
    if (moves.length === 0) return null;
    
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return randomMove.san || null;
  }

  // Position Analysis
  async analyzePosition(depth: number = 15): Promise<GameAnalysis> {
    if (!this.isStockfishReady) {
      return {
        evaluation: 0,
        depth: 0,
        timeSpent: 0
      };
    }

    const startTime = Date.now();
    
    try {
      // In a real implementation, you would use Stockfish to analyze the position
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const timeSpent = Date.now() - startTime;
      
      return {
        evaluation: Math.random() * 2 - 1, // Random evaluation between -1 and 1
        depth,
        timeSpent
      };
    } catch (error) {
      console.error('Error analyzing position:', error);
      return {
        evaluation: 0,
        depth: 0,
        timeSpent: Date.now() - startTime
      };
    }
  }

  // Game History
  getMoveHistory(): Move[] {
    return this.chess.history({ verbose: true }).map(move => ({
      from: move.from,
      to: move.to,
      piece: move.piece,
      promotion: move.promotion,
      captured: move.captured,
      san: move.san,
      lan: `${move.from}${move.to}${move.promotion || ''}`
    }));
  }

  undoMove(): MoveResult | null {
    try {
      const move = this.chess.undo();
      if (!move) return null;

      return {
        move: {
          from: move.from,
          to: move.to,
          piece: move.piece,
          promotion: move.promotion,
          captured: move.captured,
          san: move.san,
          lan: `${move.from}${move.to}${move.promotion || ''}`
        },
        captured: move.captured,
        isCheck: this.chess.isCheck(),
        isCheckmate: this.chess.isCheckmate(),
        isStalemate: this.chess.isStalemate(),
        isDraw: this.chess.isDraw(),
        fen: this.chess.fen()
      };
    } catch (error) {
      console.error('Error undoing move:', error);
      return null;
    }
  }

  // Utility Methods
  private getSquareFromIndex(index: number): string {
    const file = String.fromCharCode(97 + (index % 8)); // 'a' to 'h'
    const rank = 8 - Math.floor(index / 8); // 8 to 1
    return `${file}${rank}`;
  }

  getBoard(): (string | null)[][] {
    const board = this.chess.board();
    return board.map(row => 
      row.map(piece => piece ? piece.color + piece.type : null)
    );
  }

  isGameOver(): boolean {
    return this.chess.isGameOver();
  }

  getWinner(): 'w' | 'b' | null {
    if (this.chess.isCheckmate()) {
      return this.chess.turn() === 'w' ? 'b' : 'w';
    }
    return null;
  }
}

export const chessEngine = new ChessEngine(); 