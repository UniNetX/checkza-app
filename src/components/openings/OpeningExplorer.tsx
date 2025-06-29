import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './OpeningExplorer.css';

export interface OpeningVariation {
  name: string;
  moves: string[];
  description: string;
}

export interface Opening {
  id: string;
  name: string;
  eco: string;
  moves: string[];
  description: string;
  statistics: {
    whiteWinRate: number;
    blackWinRate: number;
    drawRate: number;
    totalGames: number;
  };
  variations: OpeningVariation[];
  difficulty: string;
  themes: string[];
}

interface OpeningExplorerProps {
  opening: Opening;
  onMoveChange?: (moves: string[]) => void;
  onBack?: () => void;
}

const OpeningExplorer: React.FC<OpeningExplorerProps> = ({ opening, onMoveChange, onBack }) => {
  const [chess] = useState(() => new Chess());
  const [allMoves, setAllMoves] = useState<string[]>([]);
  const [moveIndex, setMoveIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState<OpeningVariation | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'strategy' | 'traps' | 'games' | 'practice' | 'videos' | 'mistakes' | 'repertoire' | 'quiz' | 'comparison'>('overview');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  useEffect(() => {
    chess.reset();
    setAllMoves(opening.moves);
    setMoveIndex(opening.moves.length);
    setSelectedVariation(null);
    if (onMoveChange) onMoveChange(opening.moves);
  }, [opening]);

  const loadVariation = (variation: OpeningVariation) => {
    chess.reset();
    setAllMoves(variation.moves);
    setMoveIndex(variation.moves.length);
    setSelectedVariation(variation);
    
    // Play the moves on the board
    variation.moves.forEach(move => {
      const from = move.slice(0, 2);
      const to = move.slice(2, 4);
      chess.move({ from, to, promotion: 'q' });
    });
    
    if (onMoveChange) onMoveChange(variation.moves);
  };

  const handleMove = (from: string, to: string): boolean => {
    const move = chess.move({ from, to, promotion: 'q' });
    if (move) {
      const newMoves = [...allMoves.slice(0, moveIndex), from + to];
      setAllMoves(newMoves);
      setMoveIndex(newMoves.length);
      if (onMoveChange) onMoveChange(newMoves);
      return true;
    }
    return false;
  };

  const goToMove = (index: number) => {
    setMoveIndex(index);
  };

  const goBack = () => {
    if (moveIndex > 0) goToMove(moveIndex - 1);
  };

  const goForward = () => {
    if (moveIndex < allMoves.length) goToMove(moveIndex + 1);
  };

  const formatMoveNumber = (index: number) => {
    return Math.floor(index / 2) + 1;
  };

  const formatMove = (move: string, index: number) => {
    const moveNumber = formatMoveNumber(index);
    const isWhiteMove = index % 2 === 0;
    return isWhiteMove ? `${moveNumber}. ${move}` : move;
  };

  // Enhanced content for each opening
  const getOpeningHistory = () => {
    const histories: { [key: string]: string } = {
      'Ruy Lopez': 'The Ruy Lopez, also known as the Spanish Opening, is one of the oldest and most respected openings in chess. Named after the 16th-century Spanish priest Ruy López de Segura, it was first analyzed in his 1561 book "Libro de la invención liberal y arte del juego del axedrez". The opening gained popularity in the 19th century and remains a favorite among top players today.',
      'Sicilian Defense': 'The Sicilian Defense is one of the most popular and complex defenses against 1.e4. It was first mentioned in the 16th century by Italian players, but gained widespread popularity in the 20th century. The opening is known for its sharp, tactical nature and has been extensively analyzed by generations of chess players.',
      'French Defense': 'The French Defense is a solid, strategic opening that was first documented in the 15th century. It gained popularity in the 19th century and was a favorite of many great players including Wilhelm Steinitz and Aron Nimzowitsch. The opening is characterized by its closed nature and emphasis on pawn structure.',
      "Queen's Gambit": "The Queen's Gambit is one of the oldest known openings, with references dating back to the 15th century. It was popularized in the 19th century and remains a cornerstone of modern chess theory. The opening emphasizes control of the center and piece development.",
      "King's Indian Defense": "The King's Indian Defense is a modern opening that gained popularity in the 20th century. It was developed by players seeking a dynamic, counterattacking defense that could lead to complex middlegame positions. The opening is characterized by Black's kingside fianchetto and potential kingside attack."
    };
    return histories[opening.name] || 'This opening has a rich history in chess theory and has been played by generations of chess masters.';
  };

  const getStrategicIdeas = () => {
    const ideas: { [key: string]: string[] } = {
      'Ruy Lopez': [
        'Control the center with pawns and pieces',
        'Develop the light-squared bishop to active squares',
        'Prepare kingside castling for safety',
        'Look for opportunities to create weaknesses in Black\'s kingside',
        'Use the c3-d4 pawn center to restrict Black\'s counterplay'
      ],
      'Sicilian Defense': [
        'Challenge White\'s center control with ...d5',
        'Develop pieces quickly to active squares',
        'Create counterplay on the queenside',
        'Use the semi-open c-file for rook activity',
        'Prepare kingside castling while maintaining flexibility'
      ],
      'French Defense': [
        'Establish a solid pawn structure with ...e6 and ...d5',
        'Control the center with pawns rather than pieces',
        'Prepare ...c5 to challenge White\'s center',
        'Develop the light-squared bishop outside the pawn chain',
        'Use the closed nature to prepare kingside attacks'
      ],
      "Queen's Gambit": [
        'Control the center with pawns and pieces',
        'Develop the light-squared bishop to active squares',
        'Prepare kingside castling for safety',
        'Look for opportunities to create weaknesses in Black\'s kingside',
        'Use the c3-d4 pawn center to restrict Black\'s counterplay'
      ],
      "King's Indian Defense": [
        'Establish a kingside fianchetto with ...g6 and ...Bg7',
        'Prepare kingside expansion with ...f5',
        'Develop pieces to support the kingside attack',
        'Use the closed center to prepare flank attacks',
        'Coordinate pieces for a kingside mating attack'
      ]
    };
    return ideas[opening.name] || [
      'Control the center with pawns and pieces',
      'Develop pieces to active squares',
      'Prepare kingside castling for safety',
      'Look for tactical opportunities',
      'Coordinate your pieces for attack or defense'
    ];
  };

  const getCommonTraps = () => {
    const traps: { [key: string]: { name: string; moves: string; description: string }[] } = {
      'Ruy Lopez': [
        {
          name: 'Noah\'s Ark Trap',
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3 Na5 10.Bc2 c5 11.d4 Qc7 12.Nbd2 cxd4 13.cxd4 Nc6 14.d5 Nb4 15.Bb1 a5 16.a3 Na6 17.Nc4 a4 18.Nfd2 Bd7 19.f4 exf4 20.Bxf4 Qb6 21.e5 dxe5 22.d6 Bxd6 23.Bxd6 Qxd6 24.Nxe5 Qe7 25.Qh5 g6 26.Qxf7+ Qxf7 27.Nxf7 Kxf7',
          description: 'A famous trap where White sacrifices material for a strong attack.'
        }
      ],
      'Sicilian Defense': [
        {
          name: 'Sicilian Dragon Trap',
          moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6 6.Be3 Bg7 7.f3 O-O 8.Qd2 Nc6 9.Bc4 Bd7 10.O-O-O Rc8 11.Bb3 Ne5 12.h4 Nc4 13.Bxc4 Rxc4 14.h5 Nxh5 15.g4 Nf6 16.Nd5 Nxd5 17.exd5 Bf5 18.gxf5 Bxd4 19.fxg6 hxg6 20.Qh6',
          description: 'A tactical sequence that can lead to a quick checkmate if Black is not careful.'
        }
      ]
    };
    return traps[opening.name] || [
      {
        name: 'Common Tactical Pattern',
        moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5',
        description: 'Be aware of tactical opportunities and always calculate carefully before making moves.'
      }
    ];
  };

  const getFamousGames = () => {
    const games: { [key: string]: { player1: string; player2: string; year: string; result: string; description: string }[] } = {
      'Ruy Lopez': [
        {
          player1: 'Magnus Carlsen',
          player2: 'Hikaru Nakamura',
          year: '2015',
          result: '1-0',
          description: 'A brilliant game showcasing modern Ruy Lopez theory and Carlsen\'s positional understanding.'
        },
        {
          player1: 'Garry Kasparov',
          player2: 'Anatoly Karpov',
          year: '1984',
          result: '1-0',
          description: 'A classic game from their World Championship match demonstrating deep opening preparation.'
        }
      ],
      'Sicilian Defense': [
        {
          player1: 'Bobby Fischer',
          player2: 'Boris Spassky',
          year: '1972',
          result: '1-0',
          description: 'Game 6 of the World Championship match, known as the "Game of the Century".'
        }
      ]
    };
    return games[opening.name] || [
      {
        player1: 'Grandmaster A',
        player2: 'Grandmaster B',
        year: '2020',
        result: '1-0',
        description: 'A notable game featuring this opening and demonstrating key strategic ideas.'
      }
    ];
  };

  const getPracticeExercises = () => {
    return [
      {
        type: 'Tactical',
        description: 'Find the best move in this position',
        difficulty: 'Intermediate',
        hint: 'Look for tactical opportunities involving piece coordination.'
      },
      {
        type: 'Positional',
        description: 'Evaluate this position and find the best plan',
        difficulty: 'Advanced',
        hint: 'Consider pawn structure and piece placement.'
      },
      {
        type: 'Endgame',
        description: 'Convert this advantage into a win',
        difficulty: 'Beginner',
        hint: 'Focus on king activity and pawn advancement.'
      }
    ];
  };

  // New content sections
  const getVideoTutorials = () => {
    const videos: { [key: string]: { title: string; url: string; duration: string; instructor: string; description: string }[] } = {
      'Ruy Lopez': [
        {
          title: 'Ruy Lopez Complete Guide',
          url: 'https://www.youtube.com/watch?v=example1',
          duration: '15:30',
          instructor: 'GM Daniel Naroditsky',
          description: 'A comprehensive guide to the Ruy Lopez covering all major variations and strategic ideas.'
        },
        {
          title: 'Ruy Lopez Traps and Tactics',
          url: 'https://www.youtube.com/watch?v=example2',
          duration: '8:45',
          instructor: 'IM Levy Rozman',
          description: 'Learn the most dangerous traps and tactical opportunities in the Ruy Lopez.'
        }
      ],
      'Sicilian Defense': [
        {
          title: 'Sicilian Defense Masterclass',
          url: 'https://www.youtube.com/watch?v=example3',
          duration: '22:15',
          instructor: 'GM Hikaru Nakamura',
          description: 'Deep dive into Sicilian Defense theory with modern analysis and practical tips.'
        }
      ]
    };
    return videos[opening.name] || [
      {
        title: `${opening.name} Tutorial`,
        url: 'https://www.youtube.com/watch?v=example',
        duration: '12:00',
        instructor: 'Chess Master',
        description: 'Learn the fundamentals and advanced concepts of this opening.'
      }
    ];
  };

  const getCommonMistakes = () => {
    const mistakes: { [key: string]: { mistake: string; correction: string; explanation: string; severity: 'Critical' | 'Major' | 'Minor' }[] } = {
      'Ruy Lopez': [
        {
          mistake: '3.Bb5 without preparation',
          correction: '3.Bb5 after proper center control',
          explanation: 'Playing Bb5 too early can allow Black to gain counterplay with ...a6 and ...b5.',
          severity: 'Major'
        },
        {
          mistake: 'Neglecting kingside development',
          correction: 'Castle early and develop kingside pieces',
          explanation: 'Leaving the king in the center can lead to tactical problems.',
          severity: 'Critical'
        }
      ],
      'Sicilian Defense': [
        {
          mistake: 'Playing ...d6 too early',
          correction: 'Develop pieces first, then consider ...d6',
          explanation: 'Early ...d6 can block the light-squared bishop and limit Black\'s options.',
          severity: 'Major'
        }
      ]
    };
    return mistakes[opening.name] || [
      {
        mistake: 'Moving the same piece multiple times',
        correction: 'Develop all pieces before moving any piece twice',
        explanation: 'This violates opening principles and gives your opponent time to develop.',
        severity: 'Major'
      }
    ];
  };

  const getRepertoireSuggestions = () => {
    const repertoires: { [key: string]: { forWhite: string[]; forBlack: string[]; reasoning: string } } = {
      'Ruy Lopez': {
        forWhite: ['Ruy Lopez', 'Italian Game', 'Scotch Game'],
        forBlack: ['Sicilian Defense', 'French Defense', 'Caro-Kann'],
        reasoning: 'The Ruy Lopez fits well with other 1.e4 openings and provides a solid foundation for White.'
      },
      'Sicilian Defense': {
        forWhite: ['Sicilian Defense', 'French Defense', 'Caro-Kann'],
        forBlack: ['Ruy Lopez', 'Italian Game', 'Scotch Game'],
        reasoning: 'The Sicilian Defense is versatile and can be combined with other dynamic defenses.'
      }
    };
    return repertoires[opening.name] || {
      forWhite: ['This Opening', 'Other Popular Openings'],
      forBlack: ['Solid Defenses', 'Dynamic Defenses'],
      reasoning: 'This opening can be part of a well-rounded repertoire.'
    };
  };

  const getQuizQuestions = () => {
    const questions: { [key: string]: { question: string; options: string[]; correct: number; explanation: string }[] } = {
      'Ruy Lopez': [
        {
          question: 'What is the main idea behind 3.Bb5 in the Ruy Lopez?',
          options: [
            'To attack the knight on c6',
            'To control the center',
            'To prepare kingside castling',
            'To develop the bishop actively'
          ],
          correct: 0,
          explanation: 'The main idea is to attack the knight on c6, which defends the e5 pawn.'
        },
        {
          question: 'Which move is considered the main line for Black in the Ruy Lopez?',
          options: ['3...Nf6', '3...a6', '3...d6', '3...Bc5'],
          correct: 1,
          explanation: '3...a6 is the main line, known as the Morphy Defense.'
        }
      ],
      'Sicilian Defense': [
        {
          question: 'What is the key strategic idea for Black in the Sicilian Defense?',
          options: [
            'Control the center with pawns',
            'Attack on the kingside',
            'Create counterplay on the queenside',
            'Develop pieces quickly'
          ],
          correct: 2,
          explanation: 'Black typically creates counterplay on the queenside using the semi-open c-file.'
        }
      ]
    };
    return questions[opening.name] || [
      {
        question: 'What is the most important principle in chess openings?',
        options: [
          'Control the center',
          'Develop pieces quickly',
          'Protect the king',
          'All of the above'
        ],
        correct: 3,
        explanation: 'All of these principles are fundamental to good opening play.'
      }
    ];
  };

  const getComparisons = () => {
    const comparisons: { [key: string]: { opening: string; pros: string[]; cons: string[]; whenToUse: string }[] } = {
      'Ruy Lopez': [
        {
          opening: 'Italian Game',
          pros: ['Simpler to learn', 'Fewer variations', 'Clear plans'],
          cons: ['Less theoretical depth', 'Fewer winning chances', 'Can be drawish'],
          whenToUse: 'Choose Italian Game for beginners or when you want a simpler, more direct approach.'
        },
        {
          opening: 'Scotch Game',
          pros: ['Tactical opportunities', 'Open positions', 'Clear attacking chances'],
          cons: ['More complex', 'Requires precise calculation', 'Can be risky'],
          whenToUse: 'Choose Scotch Game when you want tactical, open positions with attacking chances.'
        }
      ]
    };
    return comparisons[opening.name] || [
      {
        opening: 'Alternative Opening',
        pros: ['Different style', 'Surprise factor', 'Unique positions'],
        cons: ['Less theory', 'May be inferior', 'Harder to find resources'],
        whenToUse: 'Consider alternatives when you want to surprise your opponent or try something different.'
      }
    ];
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex.toString()
    }));
  };

  const calculateQuizScore = () => {
    const questions = getQuizQuestions();
    let correct = 0;
    questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correct.toString()) {
        correct++;
      }
    });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const submitQuiz = () => {
    setShowQuizResults(true);
  };

  // Helper to get FEN for the current moveIndex
  const getFenAtMove = (moveIdx: number) => {
    const tempChess = new Chess();
    allMoves.slice(0, moveIdx).forEach(move => {
      const from = move.slice(0, 2);
      const to = move.slice(2, 4);
      tempChess.move({ from, to, promotion: 'q' });
    });
    return tempChess.fen();
  };

  return (
    <div className="opening-explorer-panel">
      <div className="opening-explorer-header">
        {onBack && (
          <button 
            onClick={onBack}
            className="back-btn hover-bounce"
            style={{ 
              marginRight: '12px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ← Back
          </button>
        )}
        {opening.name} <span className="opening-card-eco">{opening.eco}</span>
      </div>

      {/* Tab Navigation */}
      <div className="opening-tabs">
        {[
          { id: 'overview', label: 'Overview', icon: '📋' },
          { id: 'history', label: 'History', icon: '📚' },
          { id: 'strategy', label: 'Strategy', icon: '🧠' },
          { id: 'traps', label: 'Traps', icon: '⚠️' },
          { id: 'mistakes', label: 'Mistakes', icon: '❌' },
          { id: 'repertoire', label: 'Repertoire', icon: '📖' },
          { id: 'quiz', label: 'Quiz', icon: '🧩' },
          { id: 'comparison', label: 'Compare', icon: '⚖️' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`opening-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="opening-tab-content">
        {activeTab === 'overview' && (
          <>
            <div className="opening-explorer-section">
              <Chessboard
                position={getFenAtMove(moveIndex)}
                onPieceDrop={(from, to) => handleMove(from, to)}
                arePiecesDraggable={true}
                boardWidth={320}
              />
              <div className="opening-explorer-moves">
                {allMoves.map((move, index) => (
                  <span key={index} className={`opening-explorer-move${index === moveIndex - 1 ? ' active' : ''}`}>{formatMove(move, index)}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: '10px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <button
                  className="cz-move-btn"
                  onClick={() => { setAllMoves([]); setMoveIndex(0); chess.reset(); }}
                  disabled={allMoves.length === 0}
                  aria-label="Reset moves"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Reset
                </button>
                <button
                  className="cz-move-btn"
                  onClick={goBack}
                  disabled={moveIndex === 0}
                  aria-label="Go to previous move"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  ← Back
                </button>
                <button
                  className="cz-move-btn"
                  onClick={goForward}
                  disabled={moveIndex >= allMoves.length}
                  aria-label="Go to next move"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Forward →
                </button>
              </div>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                Move Index: {moveIndex} | Total Moves: {allMoves.length}
              </div>
            </div>
            <div className="opening-explorer-section">
              <div className="opening-explorer-description">{opening.description}</div>
            </div>
            <div className="opening-explorer-section">
              <div className="opening-card-themes">
                {opening.themes.map(theme => (
                  <span key={theme} className="opening-theme-chip">{theme}</span>
                ))}
              </div>
            </div>
            <div className="opening-explorer-section">
              <div className="opening-explorer-header" style={{ fontSize: '1.1rem', marginBottom: 6 }}>Variations</div>
              <div className="opening-explorer-variation-list">
                {opening.variations.map(variation => (
                  <div
                    key={variation.name}
                    className="opening-explorer-variation"
                    onClick={() => loadVariation(variation)}
                    style={{ cursor: 'pointer' }}
                  >
                    <b>{variation.name}:</b> {variation.moves.join(', ')}
                  </div>
                ))}
              </div>
            </div>
            <div className="opening-explorer-section">
              <div className="opening-explorer-header" style={{ fontSize: '1.1rem', marginBottom: 6 }}>Statistics</div>
              <div style={{ display: 'flex', gap: 18 }}>
                <div><b>White Wins:</b> {opening.statistics.whiteWinRate}%</div>
                <div><b>Black Wins:</b> {opening.statistics.blackWinRate}%</div>
                <div><b>Draws:</b> {opening.statistics.drawRate}%</div>
                <div><b>Games:</b> {opening.statistics.totalGames}</div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div className="opening-explorer-section">
            <div className="opening-explorer-header" style={{ fontSize: '1.3rem', marginBottom: 1 }}>History & Background</div>
            <div className="opening-explorer-description">
              {getOpeningHistory()}
            </div>
            <div className="opening-history-highlights">
              <h4>Key Historical Points:</h4>
              <ul>
                <li>First documented in the 15th-16th century</li>
                <li>Popularized by famous players throughout history</li>
                <li>Extensively analyzed in modern chess theory</li>
                <li>Remains relevant in contemporary play</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="opening-explorer-section">
            <div className="opening-explorer-header" style={{ fontSize: '1.3rem', marginBottom: 1 }}>Strategic Ideas</div>
            <div className="strategy-ideas">
              {getStrategicIdeas().map((idea, index) => (
                <div key={index} className="strategy-idea">
                  <span className="idea-number">{index + 1}</span>
                  <span className="idea-text">{idea}</span>
                </div>
              ))}
            </div>
            <div className="strategy-tips">
              <h4>Key Principles:</h4>
              <div className="tips-grid">
                <div className="tip-item">
                  <span className="tip-icon">🎯</span>
                  <span>Control the center</span>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">♟️</span>
                  <span>Develop pieces quickly</span>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">🏰</span>
                  <span>Protect your king</span>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">⚡</span>
                  <span>Coordinate your pieces</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'traps' && (
          <div className="opening-explorer-section">
            <div className="opening-explorer-header" style={{ fontSize: '1.3rem', marginBottom: 1 }}>Common Traps & Tactics</div>
            <div className="traps-list">
              {getCommonTraps().map((trap, index) => (
                <div key={index} className="trap-item">
                  <h4>{trap.name}</h4>
                  <div className="trap-moves">{trap.moves}</div>
                  <p>{trap.description}</p>
                </div>
              ))}
            </div>
            <div className="trap-warning">
              <h4>⚠️ Important Notes:</h4>
              <ul>
                <li>Always calculate carefully before making moves</li>
                <li>Be aware of tactical opportunities</li>
                <li>Study these patterns to avoid falling into traps</li>
                <li>Practice these positions to improve your tactical vision</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className="opening-explorer-section">
            <div className="opening-explorer-header" style={{ fontSize: '1.3rem', marginBottom: 1 }}>Common Mistakes</div>
            <div className="mistakes-list">
              {getCommonMistakes().map((mistake, index) => (
                <div key={index} className="mistake-item">
                  <div className="mistake-header">
                    <span className="mistake-severity mistake-severity-${mistake.severity.toLowerCase()}">{mistake.severity}</span>
                  </div>
                  <div className="mistake-content">
                    <div className="mistake-wrong">
                      <span className="mistake-label">❌ Wrong:</span>
                      <span className="mistake-text">{mistake.mistake}</span>
                    </div>
                    <div className="mistake-correct">
                      <span className="mistake-label">✅ Correct:</span>
                      <span className="mistake-text">{mistake.correction}</span>
                    </div>
                    <p className="mistake-explanation">{mistake.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mistakes-tips">
              <h4>💡 Tips to Avoid Mistakes:</h4>
              <ul>
                <li>Study the opening theory thoroughly</li>
                <li>Practice the opening in games</li>
                <li>Analyze your games to identify mistakes</li>
                <li>Learn from stronger players' games</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'repertoire' && (
          <div className="opening-explorer-section">
            <div className="opening-explorer-header" style={{ fontSize: '1.3rem', marginBottom: 1 }}>Repertoire Suggestions</div>
            <div className="repertoire-content">
              <div className="repertoire-section">
                <h4>🎯 For White</h4>
                <div className="repertoire-openings">
                  {getRepertoireSuggestions().forWhite.map((opening, index) => (
                    <span key={index} className="repertoire-opening">{opening}</span>
                  ))}
                </div>
              </div>
              <div className="repertoire-section">
                <h4>⚫ For Black</h4>
                <div className="repertoire-openings">
                  {getRepertoireSuggestions().forBlack.map((opening, index) => (
                    <span key={index} className="repertoire-opening">{opening}</span>
                  ))}
                </div>
              </div>
              <div className="repertoire-reasoning">
                <h4>🤔 Why This Combination?</h4>
                <p>{getRepertoireSuggestions().reasoning}</p>
              </div>
            </div>
            <div className="repertoire-tips">
              <h4>📚 Building Your Repertoire:</h4>
              <ul>
                <li>Choose openings that suit your playing style</li>
                <li>Study the middlegame plans for each opening</li>
                <li>Practice your repertoire regularly</li>
                <li>Keep your repertoire manageable - quality over quantity</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="opening-explorer-section">
            <div className="opening-explorer-header" style={{ fontSize: '1.3rem', marginBottom: 1 }}>Knowledge Quiz</div>
            {!showQuizResults ? (
              <div className="quiz-content">
                {getQuizQuestions().map((question, index) => (
                  <div key={index} className="quiz-question">
                    <h4>Question {index + 1}:</h4>
                    <p className="question-text">{question.question}</p>
                    <div className="quiz-options">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className={`quiz-option ${quizAnswers[index] === optionIndex.toString() ? 'selected' : ''}`}
                          onClick={() => handleQuizAnswer(index, optionIndex)}
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button className="quiz-submit-btn" onClick={submitQuiz}>Submit Quiz</button>
              </div>
            ) : (
              <div className="quiz-results">
                <div className="quiz-score">
                  <h3>Quiz Results</h3>
                  <div className="score-display">
                    <span className="score-number">{calculateQuizScore().correct}</span>
                    <span className="score-separator">/</span>
                    <span className="score-total">{calculateQuizScore().total}</span>
                    <span className="score-percentage">({calculateQuizScore().percentage}%)</span>
                  </div>
                </div>
                <div className="quiz-feedback">
                  {getQuizQuestions().map((question, index) => (
                    <div key={index} className="quiz-feedback-item">
                      <div className="feedback-question">
                        <span className="feedback-number">{index + 1}.</span>
                        <span className="feedback-text">{question.question}</span>
                      </div>
                      <div className="feedback-answer">
                        <span className={`feedback-correct ${quizAnswers[index] === question.correct.toString() ? 'correct' : 'incorrect'}`}>
                          {quizAnswers[index] === question.correct.toString() ? '✅' : '❌'}
                        </span>
                        <span className="feedback-explanation">{question.explanation}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="quiz-retry-btn" onClick={() => { setShowQuizResults(false); setQuizAnswers({}); }}>Try Again</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="opening-explorer-section">
            <div className="opening-explorer-header" style={{ fontSize: '1.3rem', marginBottom: 1 }}>Opening Comparisons</div>
            <div className="comparison-content">
              {getComparisons().map((comparison, index) => (
                <div key={index} className="comparison-item">
                  <h4>vs {comparison.opening}</h4>
                  <div className="comparison-grid">
                    <div className="comparison-pros">
                      <h5>✅ Pros</h5>
                      <ul>
                        {comparison.pros.map((pro, proIndex) => (
                          <li key={proIndex}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="comparison-cons">
                      <h5>❌ Cons</h5>
                      <ul>
                        {comparison.cons.map((con, conIndex) => (
                          <li key={conIndex}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="comparison-when">
                    <h5>🎯 When to Use {comparison.opening}:</h5>
                    <p>{comparison.whenToUse}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpeningExplorer; 