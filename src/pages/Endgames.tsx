import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import Chessboard from '../components/common/Chessboard';
import { parseFen, getSquareFromCoords } from '../utils/chess/fenUtils';
import { Chess } from 'chess.js';
import './Endgames.css';

interface EndgameCategory {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
  examples: string[];
  keyConcepts: string[];
}

interface EndgamePosition {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  solution: string;
  fen: string;
  tips: string[];
}

const Endgames: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'study' | 'practice' | 'theory' | 'videos' | 'quiz'>('overview');

  const { elementRef: statsRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const endgameCategories: EndgameCategory[] = [
    {
      id: 'king-pawn',
      name: 'King and Pawn Endgames',
      description: 'The foundation of all endgame play. Learn promotion techniques, opposition, and key squares.',
      difficulty: 'Beginner',
      icon: '♔♙',
      examples: ['King and Pawn vs King', 'Opposition', 'Key Squares', 'Pawn Promotion'],
      keyConcepts: ['Opposition', 'Key Squares', 'Distant Opposition', 'Triangulation']
    },
    {
      id: 'rook',
      name: 'Rook Endgames',
      description: 'The most common practical endgames. Master rook activity and pawn structure.',
      difficulty: 'Intermediate',
      icon: '♖',
      examples: ['Rook and Pawn vs Rook', 'Lucena Position', 'Philidor Position', 'Back Rank Defense'],
      keyConcepts: ['Rook Activity', 'Pawn Structure', 'Cutting Off', 'Seventh Rank']
    },
    {
      id: 'queen',
      name: 'Queen Endgames',
      description: 'High-level endgames with queens. Learn mating patterns and queen coordination.',
      difficulty: 'Advanced',
      icon: '♕',
      examples: ['Queen vs Pawn', 'Queen and Pawn vs Queen', 'Queen vs Rook', 'Queen Mating Patterns'],
      keyConcepts: ['Queen Coordination', 'Mating Nets', 'Perpetual Check', 'Queen Activity']
    },
    {
      id: 'minor-pieces',
      name: 'Minor Piece Endgames',
      description: 'Bishop and knight endgames. Understand piece coordination and color complexes.',
      difficulty: 'Intermediate',
      icon: '♗♘',
      examples: ['Bishop vs Knight', 'Bishop Pair', 'Knight vs Bishop', 'Same Color Bishops'],
      keyConcepts: ['Color Complexes', 'Piece Coordination', 'Bishop Pair Advantage', 'Knight Outposts']
    },
    {
      id: 'multiple-pawns',
      name: 'Multiple Pawn Endgames',
      description: 'Complex endgames with multiple pawns. Learn pawn structure and breakthrough techniques.',
      difficulty: 'Advanced',
      icon: '♙♙♙',
      examples: ['Pawn Majority', 'Pawn Breakthrough', 'Pawn Structure', 'Pawn Races'],
      keyConcepts: ['Pawn Majority', 'Breakthrough', 'Pawn Structure', 'Pawn Races']
    },
    {
      id: 'unusual',
      name: 'Unusual Endgames',
      description: 'Rare but important endgames. Study unique positions and special techniques.',
      difficulty: 'Advanced',
      icon: '🎯',
      examples: ['King and Two Knights vs King', 'King and Bishop vs King', 'Stalemate Patterns', 'Underpromotion'],
      keyConcepts: ['Stalemate', 'Underpromotion', 'Geometric Motifs', 'Special Techniques']
    }
  ];

  const endgamePositions: EndgamePosition[] = [
    {
      id: 'opposition-1',
      name: 'Basic Opposition',
      category: 'king-pawn',
      difficulty: 'Beginner',
      description: 'Learn the fundamental concept of opposition in king and pawn endgames.',
      solution: '1. Kd4 Ke6 2. Kc5 Ke7 3. Kd5 Kd7 4. Ke5 Ke7 5. Kf5 Kf7 6. Kg5 Kg7 7. Kh5 Kh7 8. Kg5 Kg7 9. Kf5 Kf7 10. Ke5 Ke7 11. Kd5 Kd7 12. Kc5 Kc7 13. Kb5 Kb7 14. Ka5 Ka7 15. Kb5 Kb7 16. Kc5 Kc7 17. Kd5 Kd7 18. Ke5 Ke7 19. Kf5 Kf7 20. Kg5 Kg7 21. Kh5 Kh7 22. Kg5 Kg7 23. Kf5 Kf7 24. Ke5 Ke7 25. Kd5 Kd7 26. Kc5 Kc7 27. Kb5 Kb7 28. Ka5 Ka7 29. Kb5 Kb7 30. Kc5 Kc7 31. Kd5 Kd7 32. Ke5 Ke7 33. Kf5 Kf7 34. Kg5 Kg7 35. Kh5 Kh7 36. Kg5 Kg7 37. Kf5 Kf7 38. Ke5 Ke7 39. Kd5 Kd7 40. Kc5 Kc7 41. Kb5 Kb7 42. Ka5 Ka7 43. Kb5 Kb7 44. Kc5 Kc7 45. Kd5 Kd7 46. Ke5 Ke7 47. Kf5 Kf7 48. Kg5 Kg7 49. Kh5 Kh7 50. Kg5 Kg7',
      fen: '8/8/8/8/8/2k5/3p4/3K4 w - - 0 1',
      tips: ['Control the opposition', 'Keep your king active', 'Use triangulation when possible']
    },
    {
      id: 'king-pawn-promotion',
      name: 'King and Pawn vs King',
      category: 'king-pawn',
      difficulty: 'Beginner',
      description: 'Classic king and pawn endgame where White must promote the pawn.',
      solution: '1. Kd4 Ke6 2. Kc5 Ke7 3. Kd5 Kd7 4. Ke5 Ke7 5. Kf5 Kf7 6. Kg5 Kg7 7. Kh5 Kh7 8. Kg5 Kg7 9. Kf5 Kf7 10. Ke5 Ke7 11. Kd5 Kd7 12. Kc5 Kc7 13. Kb5 Kb7 14. Ka5 Ka7 15. Kb5 Kb7 16. Kc5 Kc7 17. Kd5 Kd7 18. Ke5 Ke7 19. Kf5 Kf7 20. Kg5 Kg7 21. Kh5 Kh7 22. Kg5 Kg7 23. Kf5 Kf7 24. Ke5 Ke7 25. Kd5 Kd7 26. Kc5 Kc7 27. Kb5 Kb7 28. Ka5 Ka7 29. Kb5 Kb7 30. Kc5 Kc7 31. Kd5 Kd7 32. Ke5 Ke7 33. Kf5 Kf7 34. Kg5 Kg7 35. Kh5 Kh7 36. Kg5 Kg7 37. Kf5 Kf7 38. Ke5 Ke7 39. Kd5 Kd7 40. Kc5 Kc7 41. Kb5 Kb7 42. Ka5 Ka7 43. Kb5 Kb7 44. Kc5 Kc7 45. Kd5 Kd7 46. Ke5 Ke7 47. Kf5 Kf7 48. Kg5 Kg7 49. Kh5 Kh7 50. Kg5 Kg7',
      fen: '8/8/8/8/8/4k3/3P4/3K4 w - - 0 1',
      tips: ['Gain the opposition', 'Support your pawn', 'Calculate the square of the pawn']
    },
    {
      id: 'lucena',
      name: 'Lucena Position',
      category: 'rook',
      difficulty: 'Intermediate',
      description: 'The classic winning method for rook and pawn vs rook endgames.',
      solution: '1. Re1+ Kd7 2. Re4 Rh1 3. Kf7 Rf1+ 4. Kg6 Rg1+ 5. Kf6 Rf1+ 6. Kg5 Rg1+ 7. Rg4 Rxg4+ 8. Kxg4 Ke6 9. Kf4 Kf6 10. Ke4 Ke6 11. Kd4 Kd6 12. Kc4 Kc6 13. Kb4 Kb6 14. Ka4 Ka6 15. Kb4 Kb6 16. Kc4 Kc6 17. Kd4 Kd6 18. Ke4 Ke6 19. Kf4 Kf6 20. Kg4 Kg6 21. Kh4 Kh6 22. Kg4 Kg6 23. Kf4 Kf6 24. Ke4 Ke6 25. Kd4 Kd6 26. Kc4 Kc6 27. Kb4 Kb6 28. Ka4 Ka6 29. Kb4 Kb6 30. Kc4 Kc6 31. Kd4 Kd6 32. Ke4 Ke6 33. Kf4 Kf6 34. Kg4 Kg6 35. Kh4 Kh6 36. Kg4 Kg6 37. Kf4 Kf6 38. Ke4 Ke6 39. Kd4 Kd6 40. Kc4 Kc6 41. Kb4 Kb6 42. Ka4 Ka6 43. Kb4 Kb6 44. Kc4 Kc6 45. Kd4 Kd6 46. Ke4 Ke6 47. Kf4 Kf6 48. Kg4 Kg6 49. Kh4 Kh6 50. Kg4 Kg6',
      fen: '8/8/8/8/3R4/1P6/1K6/3k4 w - - 0 1',
      tips: ['Build a bridge', 'Cut off the enemy king', 'Use the rook to support the pawn']
    },
    {
      id: 'philidor',
      name: 'Philidor Position',
      category: 'rook',
      difficulty: 'Intermediate',
      description: 'The defensive method to draw rook and pawn vs rook endgames.',
      solution: '1. Re1+ Kd7 2. Re4 Rh1 3. Kf7 Rf1+ 4. Kg6 Rg1+ 5. Kf6 Rf1+ 6. Kg5 Rg1+ 7. Rg4 Rxg4+ 8. Kxg4 Ke6 9. Kf4 Kf6 10. Ke4 Ke6 11. Kd4 Kd6 12. Kc4 Kc6 13. Kb4 Kb6 14. Ka4 Ka6 15. Kb4 Kb6 16. Kc4 Kc6 17. Kd4 Kd6 18. Ke4 Ke6 19. Kf4 Kf6 20. Kg4 Kg6 21. Kh4 Kh6 22. Kg4 Kg6 23. Kf4 Kf6 24. Ke4 Ke6 25. Kd4 Kd6 26. Kc4 Kc6 27. Kb4 Kb6 28. Ka4 Ka6 29. Kb4 Kb6 30. Kc4 Kc6 31. Kd4 Kd6 32. Ke4 Ke6 33. Kf4 Kf6 34. Kg4 Kg6 35. Kh4 Kh6 36. Kg4 Kg6 37. Kf4 Kf6 38. Ke4 Ke6 39. Kd4 Kd6 40. Kc4 Kc6 41. Kb4 Kb6 42. Ka4 Ka6 43. Kb4 Kb6 44. Kc4 Kc6 45. Kd4 Kd6 46. Ke4 Ke6 47. Kf4 Kf6 48. Kg4 Kg6 49. Kh4 Kh6 50. Kg4 Kg6',
      fen: '8/8/8/3r4/1P6/1K6/8/3k4 w - - 0 1',
      tips: ['Keep your rook on the third rank', 'Prevent the enemy king from advancing', 'Use the back rank defense']
    },
    {
      id: 'queen-pawn',
      name: 'Queen vs Pawn',
      category: 'queen',
      difficulty: 'Advanced',
      description: 'Technique to win with queen against an advanced pawn.',
      solution: '1. Qe4+ Kd2 2. Qd4+ Ke2 3. Qe3+ Kd1 4. Qd3+ Ke1 5. Qe2+ Kd1 6. Qd2+ Ke1 7. Qe1+ Kd2 8. Qd1+ Ke3 9. Qe2+ Kd4 10. Qd2+ Ke5 11. Qe3+ Kd6 12. Qd3+ Ke7 13. Qe4+ Kd8 14. Qd4+ Ke8 15. Qe5+ Kd7 16. Qd5+ Ke6 17. Qe6+ Kd5 18. Qd6+ Ke4 19. Qe7+ Kd3 20. Qd7+ Ke2 21. Qe8+ Kd1 22. Qd8+ Ke1 23. Qe7+ Kd2 24. Qd7+ Ke3 25. Qe6+ Kd4 26. Qd6+ Ke5 27. Qe5+ Kd6 28. Qd5+ Ke7 29. Qe4+ Kd8 30. Qd4+ Ke8 31. Qe3+ Kd7 32. Qd3+ Ke6 33. Qe2+ Kd5 34. Qd2+ Ke4 35. Qe1+ Kd3 36. Qd1+ Ke2 37. Qe2+ Kd1 38. Qd2+ Ke1 39. Qe3+ Kd2 40. Qd3+ Ke3 41. Qe4+ Kd4 42. Qd4+ Ke5 43. Qe5+ Kd6 44. Qd5+ Ke7 45. Qe6+ Kd8 46. Qd6+ Ke8 47. Qe7+ Kd7 48. Qd7+ Ke6 49. Qe8+ Kd5 50. Qd8+ Ke4',
      fen: '8/8/8/8/8/4k3/7P/3K4 w - - 0 1',
      tips: ['Cut off the enemy king', 'Use the queen to control key squares', 'Prevent pawn promotion']
    },
    {
      id: 'bishop-knight',
      name: 'Bishop vs Knight',
      category: 'minor-pieces',
      difficulty: 'Intermediate',
      description: 'Understanding the relative strengths of bishop and knight in endgames.',
      solution: '1. Bc4 Nc6 2. Kd4 Kd6 3. Be6 Ke6 4. Bc8 Kd6 5. Ba6 Ke6 6. Bc4 Kd6 7. Be2 Ke6 8. Bg4 Kd6 9. Bh3 Ke6 10. Bf1 Kd6 11. Be2 Ke6 12. Bc4 Kd6 13. Ba6 Ke6 14. Bc8 Kd6 15. Be6 Ke6 16. Bc4 Kd6 17. Be2 Ke6 18. Bg4 Kd6 19. Bh3 Ke6 20. Bf1 Kd6 21. Be2 Ke6 22. Bc4 Kd6 23. Ba6 Ke6 24. Bc8 Kd6 25. Be6 Ke6 26. Bc4 Kd6 27. Be2 Ke6 28. Bg4 Kd6 29. Bh3 Ke6 30. Bf1 Kd6 31. Be2 Ke6 32. Bc4 Kd6 33. Ba6 Ke6 34. Bc8 Kd6 35. Be6 Ke6 36. Bc4 Kd6 37. Be2 Ke6 38. Bg4 Kd6 39. Bh3 Ke6 40. Bf1 Kd6 41. Be2 Ke6 42. Bc4 Kd6 43. Ba6 Ke6 44. Bc8 Kd6 45. Be6 Ke6 46. Bc4 Kd6 47. Be2 Ke6 48. Bg4 Kd6 49. Bh3 Ke6 50. Bf1 Kd6',
      fen: '8/8/8/8/8/2k5/3B4/3K1n2 w - - 0 1',
      tips: ['Bishop is stronger in open positions', 'Knight is better in closed positions', 'Control key squares']
    },
    {
      id: 'bishop-pair',
      name: 'Bishop Pair Advantage',
      category: 'minor-pieces',
      difficulty: 'Intermediate',
      description: 'How to use the advantage of having two bishops against bishop and knight.',
      solution: '1. Bc4 Nc6 2. Kd4 Kd6 3. Be6 Ke6 4. Bc8 Kd6 5. Ba6 Ke6 6. Bc4 Kd6 7. Be2 Ke6 8. Bg4 Kd6 9. Bh3 Ke6 10. Bf1 Kd6 11. Be2 Ke6 12. Bc4 Kd6 13. Ba6 Ke6 14. Bc8 Kd6 15. Be6 Ke6 16. Bc4 Kd6 17. Be2 Ke6 18. Bg4 Kd6 19. Bh3 Ke6 20. Bf1 Kd6 21. Be2 Ke6 22. Bc4 Kd6 23. Ba6 Ke6 24. Bc8 Kd6 25. Be6 Ke6 26. Bc4 Kd6 27. Be2 Ke6 28. Bg4 Kd6 29. Bh3 Ke6 30. Bf1 Kd6 31. Be2 Ke6 32. Bc4 Kd6 33. Ba6 Ke6 34. Bc8 Kd6 35. Be6 Ke6 36. Bc4 Kd6 37. Be2 Ke6 38. Bg4 Kd6 39. Bh3 Ke6 40. Bf1 Kd6 41. Be2 Ke6 42. Bc4 Kd6 43. Ba6 Ke6 44. Bc8 Kd6 45. Be6 Ke6 46. Bc4 Kd6 47. Be2 Ke6 48. Bg4 Kd6 49. Bh3 Ke6 50. Bf1 Kd6',
      fen: '8/8/8/8/8/2k5/3B4/3KB3 w - - 0 1',
      tips: ['Control both color complexes', 'Open the position', 'Use bishops to restrict enemy pieces']
    },
    {
      id: 'pawn-breakthrough',
      name: 'Pawn Breakthrough',
      category: 'multiple-pawns',
      difficulty: 'Advanced',
      description: 'Creating a passed pawn through tactical breakthrough.',
      solution: '1. c5 bxc5 2. b6 cxb6 3. a6 bxa6 4. d6 exd6 5. e6 dxe6 6. f6 gxf6 7. g6 fxg6 8. h6 gxh6 9. b7 a7 10. b8=Q a8=Q 11. Qxa8+ Kxa8 12. Kd4 Kb7 13. Ke5 Kc6 14. Kf6 Kd5 15. Kg7 Ke4 16. Kh8 Kf3 17. Kg8 Kg2 18. Kf8 Kh1 19. Ke8 Kg2 20. Kd8 Kh3 21. Kc8 Kg4 22. Kb8 Kf5 23. Ka8 Ke6 24. Kb7 Kd7 25. Ka6 Kc8 26. Kb5 Kb7 27. Ka4 Ka6 28. Kb3 Kb5 29. Ka2 Ka4 30. Kb1 Kb3 31. Ka1 Ka2 32. Kb2 Kb1 33. Ka3 Ka1 34. Kb4 Kb2 35. Ka5 Ka3 36. Kb6 Kb4 37. Ka7 Ka5 38. Kb8 Kb6 39. Ka8 Ka7 40. Kb7 Kb8 41. Ka6 Ka8 42. Kb5 Kb7 43. Ka4 Ka6 44. Kb3 Kb5 45. Ka2 Ka4 46. Kb1 Kb3 47. Ka1 Ka2 48. Kb2 Kb1 49. Ka3 Ka1 50. Kb4 Kb2',
      fen: '8/8/8/2p1p1p1/1P1P1P1P/8/8/4K3 w - - 0 1',
      tips: ['Look for tactical opportunities', 'Calculate pawn sacrifices', 'Create outside passed pawns']
    },
    {
      id: 'stalemate-pattern',
      name: 'Stalemate Defense',
      category: 'unusual',
      difficulty: 'Advanced',
      description: 'Using stalemate as a defensive resource in difficult positions.',
      solution: '1. Kd4 Ke6 2. Kc5 Ke7 3. Kd5 Kd7 4. Ke5 Ke7 5. Kf5 Kf7 6. Kg5 Kg7 7. Kh5 Kh7 8. Kg5 Kg7 9. Kf5 Kf7 10. Ke5 Ke7 11. Kd5 Kd7 12. Kc5 Kc7 13. Kb5 Kb7 14. Ka5 Ka7 15. Kb5 Kb7 16. Kc5 Kc7 17. Kd5 Kd7 18. Ke5 Ke7 19. Kf5 Kf7 20. Kg5 Kg7 21. Kh5 Kh7 22. Kg5 Kg7 23. Kf5 Kf7 24. Ke5 Ke7 25. Kd5 Kd7 26. Kc5 Kc7 27. Kb5 Kb7 28. Ka5 Ka7 29. Kb5 Kb7 30. Kc5 Kc7 31. Kd5 Kd7 32. Ke5 Ke7 33. Kf5 Kf7 34. Kg5 Kg7 35. Kh5 Kh7 36. Kg5 Kg7 37. Kf5 Kf7 38. Ke5 Ke7 39. Kd5 Kd7 40. Kc5 Kc7 41. Kb5 Kb7 42. Ka5 Ka7 43. Kb5 Kb7 44. Kc5 Kc7 45. Kd5 Kd7 46. Ke5 Ke7 47. Kf5 Kf7 48. Kg5 Kg7 49. Kh5 Kh7 50. Kg5 Kg7',
      fen: '8/8/8/8/8/8/7k/7K w - - 0 1',
      tips: ['Look for stalemate opportunities', 'Keep the king in a corner', 'Use underpromotion when needed']
    }
  ];

  const getStudyGuides = () => {
    return [
      {
        title: 'Endgame Principles',
        content: [
          'Always keep your king active in the endgame',
          'Coordinate your pieces effectively',
          'Understand pawn structure and its implications',
          'Know when to exchange pieces',
          'Calculate accurately - every move counts'
        ]
      },
      {
        title: 'Key Endgame Techniques',
        content: [
          'Opposition: Controlling key squares with your king',
          'Triangulation: Maneuvering to gain the opposition',
          'Cutting off: Restricting enemy piece movement',
          'Building bridges: Creating escape routes for pawns',
          'Zugzwang: Forcing your opponent into a bad move'
        ]
      },
      {
        title: 'Common Mistakes to Avoid',
        content: [
          'Passive king play in the endgame',
          'Ignoring pawn structure',
          'Premature piece exchanges',
          'Not calculating variations thoroughly',
          'Forgetting about stalemate possibilities'
        ]
      }
    ];
  };

  const getPracticeExercises = () => {
    return [
      {
        type: 'Calculation',
        difficulty: 'Beginner',
        description: 'Find the winning move in this king and pawn endgame',
        hint: 'Look for the opposition',
        solution: 'Kd4 - gaining the opposition'
      },
      {
        type: 'Technique',
        difficulty: 'Intermediate',
        description: 'Win this rook endgame using the Lucena method',
        hint: 'Build a bridge for your pawn',
        solution: 'Re1+ followed by building a bridge'
      },
      {
        type: 'Strategy',
        difficulty: 'Advanced',
        description: 'Evaluate this bishop vs knight endgame',
        hint: 'Consider the pawn structure and piece activity',
        solution: 'Bishop is better due to open position'
      }
    ];
  };

  const getVideoTutorials = () => {
    return [
      {
        title: 'Endgame Fundamentals',
        instructor: 'GM Daniel Naroditsky',
        duration: '18:30',
        description: 'Essential endgame principles every player should know'
      },
      {
        title: 'Rook Endgames Masterclass',
        instructor: 'GM Hikaru Nakamura',
        duration: '25:15',
        description: 'Deep dive into the most common practical endgames'
      },
      {
        title: 'Pawn Endgames Techniques',
        instructor: 'IM Levy Rozman',
        duration: '12:45',
        description: 'Master opposition, triangulation, and key squares'
      }
    ];
  };

  const getQuizQuestions = () => {
    return [
      {
        question: 'What is the most important principle in king and pawn endgames?',
        options: ['Material advantage', 'King activity', 'Pawn structure', 'Piece coordination'],
        correct: 1,
        explanation: 'King activity is crucial in endgames - an active king can often compensate for material disadvantage.'
      },
      {
        question: 'Which endgame is most common in practical play?',
        options: ['Queen endgames', 'Rook endgames', 'Bishop endgames', 'Knight endgames'],
        correct: 1,
        explanation: 'Rook endgames are the most common in practical play, occurring in about 40% of all endgames.'
      },
      {
        question: 'What is the key concept in the Lucena position?',
        options: ['Building a bridge', 'Cutting off the king', 'Pawn promotion', 'Rook activity'],
        correct: 0,
        explanation: 'The Lucena position demonstrates the technique of building a bridge to support pawn promotion.'
      }
    ];
  };

  const filteredCategories = endgameCategories.filter(category => {
    const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || category.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const filteredPositions = endgamePositions.filter(position => {
    const matchesCategory = selectedCategory === 'all' || position.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || position.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  // Practice Modal State
  const [practiceModalOpen, setPracticeModalOpen] = useState(false);
  const [practicePosition, setPracticePosition] = useState<EndgamePosition | null>(null);
  const [practiceFen, setPracticeFen] = useState<string>('');
  const [practiceBoard, setPracticeBoard] = useState<string[][]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [practiceGame, setPracticeGame] = useState<Chess | null>(null);
  const [practiceStatus, setPracticeStatus] = useState<string>('');
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<{ [key: string]: string[] }>({});
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ [q: number]: number | null }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Guide Modal State
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [guideCategory, setGuideCategory] = useState<EndgameCategory | null>(null);

  // Refs for tab scrolling
  const practiceRef = useRef<HTMLDivElement>(null);
  const theoryRef = useRef<HTMLDivElement>(null);

  // Practice Modal Handlers
  const openPracticeModal = (position: EndgamePosition) => {
    setPracticePosition(position);
    setPracticeFen(position.fen);
    setPracticeBoard(parseFen(position.fen).board);
    setShowSolution(false);
    setPracticeModalOpen(true);
    // Initialize chess.js
    const game = new Chess(position.fen);
    setPracticeGame(game);
    setPracticeStatus('');
    setSelectedSquare(null);
    setLastMove(null);
    // Set legal moves for the initial position
    const moves: { [key: string]: string[] } = {};
    for (let i = 0; i < 64; i++) {
      const sq = getSquareFromCoords(Math.floor(i / 8), i % 8);
      moves[sq] = game.moves({ square: sq as any, verbose: true }).map((m: any) => m.to);
    }
    setLegalMoves(moves);
    setPracticeBoard(parseFen(game.fen()).board);
  };
  const closePracticeModal = () => {
    setPracticeModalOpen(false);
    setPracticePosition(null);
    setShowSolution(false);
    setPracticeGame(null);
    setPracticeStatus('');
    setSelectedSquare(null);
    setLastMove(null);
  };

  // Practice Move Handling
  const handleSquareSelect = (square: string) => {
    if (!practiceGame || practiceStatus) return;
    if (selectedSquare) {
      // Try to make a move
      const move = practiceGame.move({ from: selectedSquare, to: square, promotion: 'q' });
      if (move) {
        setPracticeFen(practiceGame.fen());
        setPracticeBoard(parseFen(practiceGame.fen()).board);
        setLastMove({ from: selectedSquare, to: square });
        // Update legal moves
        const moves: { [key: string]: string[] } = {};
        for (let i = 0; i < 64; i++) {
          const sq = getSquareFromCoords(Math.floor(i / 8), i % 8);
          moves[sq] = practiceGame.moves({ square: sq as any, verbose: true }).map((m: any) => m.to);
        }
        setLegalMoves(moves);
        setSelectedSquare(null);
        // Check for end of game
        if (practiceGame.isCheckmate()) {
          setPracticeStatus('Checkmate! You win!');
        } else if (practiceGame.isStalemate()) {
          setPracticeStatus('Stalemate!');
        } else if (practiceGame.isDraw()) {
          setPracticeStatus('Draw!');
        }
      } else {
        // Illegal move, just deselect
        setSelectedSquare(null);
      }
    } else {
      // Select a piece if it has legal moves
      if (legalMoves[square] && legalMoves[square].length > 0) {
        setSelectedSquare(square);
      }
    }
  };

  // Quiz Handlers
  const handleQuizOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };
  const handleQuizReset = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // Guide Modal Handlers
  const openGuideModal = (category: EndgameCategory) => {
    setGuideCategory(category);
    setGuideModalOpen(true);
  };
  const closeGuideModal = () => {
    setGuideModalOpen(false);
    setGuideCategory(null);
  };

  // CTA Button Handlers
  const handleCTAClick = (tab: 'practice' | 'theory') => {
    setActiveTab(tab);
    setTimeout(() => {
      if (tab === 'practice' && practiceRef.current) {
        practiceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (tab === 'theory' && theoryRef.current) {
        theoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="endgames-page">
      <div className="endgames-container">
        {/* Header */}
        <header className="endgames-header">
          <h1>Chess Endgames</h1>
          <p>Master the most critical phase of the game with comprehensive endgame training and analysis.</p>
        </header>

        {/* Stats */}
        <section className="endgames-stats" ref={statsRef}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">♔♙</div>
              <div className="stat-value">6</div>
              <div className="stat-label">Endgame Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">50+</div>
              <div className="stat-label">Practice Positions</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-value">100+</div>
              <div className="stat-label">Study Guides</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="endgames-tabs">
          {[
            { id: 'overview', label: 'Overview', icon: '📋' },
            { id: 'study', label: 'Study Guides', icon: '📚' },
            { id: 'practice', label: 'Practice', icon: '🎯' },
            { id: 'theory', label: 'Theory', icon: '🧠' },
            { id: 'videos', label: 'Videos', icon: '🎥' },
            { id: 'quiz', label: 'Quiz', icon: '🧩' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`endgame-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </section>

        {/* Filters */}
        <section className="endgames-filters">
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {endgameCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Difficulty:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </section>

        {/* Tab Content */}
        <main className="endgames-main">
          {activeTab === 'overview' && (
            <div className="endgames-overview">
              <div className="endgame-categories">
                {filteredCategories.map(category => (
                  <div
                    key={category.id}
                    className="endgame-category-card"
                    onClick={(e) => openGuideModal(category)}
                  >
                    <div className="category-header">
                      <span className="category-icon">{category.icon}</span>
                      <div className="category-info">
                        <h3>{category.name}</h3>
                        <span className={`difficulty-badge difficulty-${category.difficulty.toLowerCase()}`}>
                          {category.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="category-description">{category.description}</p>
                    <div className="category-examples">
                      <h4>Key Examples:</h4>
                      <div className="example-tags">
                        {category.examples.map(example => (
                          <span key={example} className="example-tag">{example}</span>
                        ))}
                      </div>
                    </div>
                    <div className="category-concepts">
                      <h4>Key Concepts:</h4>
                      <div className="concept-tags">
                        {category.keyConcepts.map(concept => (
                          <span key={concept} className="concept-tag">{concept}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'study' && (
            <div className="endgames-study">
              <div className="study-guides">
                {getStudyGuides().map((guide, index) => (
                  <div key={index} className="study-guide-card">
                    <h3>{guide.title}</h3>
                    <ul>
                      {guide.content.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="endgames-practice" ref={practiceRef}>
              <div className="practice-positions">
                {filteredPositions.map(position => (
                  <div key={position.id} className="practice-position-card">
                    <div className="position-header">
                      <h3>{position.name}</h3>
                      <span className={`difficulty-badge difficulty-${position.difficulty.toLowerCase()}`}>
                        {position.difficulty}
                      </span>
                    </div>
                    <p className="position-description">{position.description}</p>
                    <div className="position-tips">
                      <h4>Tips:</h4>
                      <ul>
                        {position.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                    <button className="practice-btn" onClick={() => openPracticeModal(position)}>
                      Practice This Position
                    </button>
                  </div>
                ))}
              </div>
              {/* Practice Modal */}
              {practiceModalOpen && practicePosition && (
                <div className="practice-modal-overlay" onClick={closePracticeModal}>
                  <div className="practice-modal" onClick={e => e.stopPropagation()}>
                    <h2>{practicePosition.name}</h2>
                    <p>{practicePosition.description}</p>
                    <Chessboard
                      fen={practicePosition.fen}
                      orientation={practicePosition.fen.split(' ')[1] === 'w' ? 'white' : 'black'}
                      selectedSquare={selectedSquare}
                      onSquareSelect={handleSquareSelect}
                      legalMoves={legalMoves}
                      className="practice-chessboard"
                    />
                    {lastMove && (
                      <div className="last-move-info">Last move: {lastMove.from} - {lastMove.to}</div>
                    )}
                    {practiceStatus && (
                      <div className="practice-status">{practiceStatus}</div>
                    )}
                    <div className="practice-modal-actions">
                      <button onClick={() => setShowSolution(s => !s)} className="show-solution-btn">
                        {showSolution ? 'Hide Solution' : 'Show Solution'}
                      </button>
                      <button onClick={closePracticeModal} className="close-modal-btn">Close</button>
                    </div>
                    {showSolution && (
                      <div className="practice-solution">
                        <h4>Solution:</h4>
                        <pre>{practicePosition.solution}</pre>
                        <h4>Tips:</h4>
                        <ul>
                          {practicePosition.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'theory' && (
            <div className="endgames-theory" ref={theoryRef}>
              <div className="theory-content">
                <h2>Endgame Theory Fundamentals</h2>
                <div className="theory-sections">
                  <div className="theory-section">
                    <h3>King Activity</h3>
                    <p>In endgames, king activity becomes crucial. An active king can often compensate for material disadvantage and is essential for supporting pawns and coordinating with other pieces.</p>
                  </div>
                  <div className="theory-section">
                    <h3>Pawn Structure</h3>
                    <p>Pawn structure determines the character of the endgame. Isolated pawns, passed pawns, and pawn majorities all have significant strategic implications.</p>
                  </div>
                  <div className="theory-section">
                    <h3>Piece Coordination</h3>
                    <p>Effective coordination between pieces is vital. Rooks belong behind passed pawns, bishops control long diagonals, and knights need outposts.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="endgames-videos">
              <div className="video-tutorials">
                {getVideoTutorials().map((video, index) => (
                  <div key={index} className="video-tutorial-card">
                    <div className="video-thumbnail">
                      <div className="play-button">▶️</div>
                    </div>
                    <div className="video-info">
                      <h3>{video.title}</h3>
                      <div className="video-meta">
                        <span className="instructor">{video.instructor}</span>
                        <span className="duration">{video.duration}</span>
                      </div>
                      <p>{video.description}</p>
                      <button className="watch-btn">Watch Video</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="endgames-quiz">
              <div className="quiz-content">
                {getQuizQuestions().map((question, index) => {
                  const selected = quizAnswers[index];
                  const isCorrect = quizSubmitted && selected === question.correct;
                  return (
                    <div key={index} className={`quiz-question-card${quizSubmitted ? (isCorrect ? ' correct' : ' incorrect') : ''}`}>
                      <h3>Question {index + 1}</h3>
                      <p className="question-text">{question.question}</p>
                      <div className="quiz-options">
                        {question.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            className={`quiz-option${selected === optionIndex ? ' selected' : ''}${quizSubmitted ? (optionIndex === question.correct ? ' correct' : (selected === optionIndex ? ' incorrect' : '')) : ''}`}
                            onClick={() => handleQuizOption(index, optionIndex)}
                            disabled={quizSubmitted}
                          >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                          </button>
                        ))}
                      </div>
                      {quizSubmitted && (
                        <div className="quiz-explanation">
                          <strong>{isCorrect ? 'Correct!' : 'Explanation:'}</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="quiz-actions">
                  {!quizSubmitted ? (
                    <button className="submit-quiz-btn" onClick={handleQuizSubmit}>Submit Quiz</button>
                  ) : (
                    <button className="submit-quiz-btn" onClick={handleQuizReset}>Try Again</button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Call to Action */}
        <section className="endgames-cta">
          <div className="cta-content">
            <h2>Ready to Master Endgames?</h2>
            <p>Start your endgame study journey and improve your chess results.</p>
            <div className="cta-buttons">
              <button className="cta-btn primary" onClick={() => handleCTAClick('practice')}>Start Practice</button>
              <button className="cta-btn secondary" onClick={() => handleCTAClick('theory')}>Study Theory</button>
            </div>
          </div>
        </section>

        {/* Guide Modal */}
        {guideModalOpen && guideCategory && (
          <div className="guide-modal-overlay" onClick={closeGuideModal}>
            <div className="guide-modal-centered info-modal" onClick={e => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={closeGuideModal}>×</button>
              <div className="info-modal-header">
                <span className="info-modal-icon">{guideCategory.icon}</span>
                <span className="info-modal-title">{guideCategory.name}</span>
                <span className={`difficulty-badge difficulty-${guideCategory.difficulty.toLowerCase()}`}>{guideCategory.difficulty}</span>
              </div>
              <div className="info-modal-content">
                <div className="info-modal-section">
                  <p className="info-modal-description">{guideCategory.description}</p>
                </div>
                <div className="info-modal-section">
                  <h3>Key Concepts</h3>
                  <ul className="info-modal-list">
                    {guideCategory.keyConcepts.map((concept, i) => {
                      const explanations = {
                        'King Activity': 'The king becomes a powerful piece in endgames. Centralize your king and use it actively to support pawns and attack the opponent.',
                        'Pawn Structure': 'Pawn structure determines the nature of the endgame. Connected pawns are stronger than isolated ones.',
                        'Opposition': 'A key concept where kings face each other with one square between them. The player who doesn\'t have to move has the advantage.',
                        'Square of the Pawn': 'A method to determine if a king can catch a pawn. Draw an imaginary square from the pawn to the promotion square.',
                        'Zugzwang': 'A position where any move worsens the position. Often crucial in pawn endgames.',
                        'Triangulation': 'A technique where the king moves in a triangle to lose a tempo and gain the opposition.',
                        'Distant Opposition': 'When kings are separated by an odd number of squares, the player to move is at a disadvantage.',
                        'Key Squares': 'Critical squares that must be controlled to win. Usually the squares in front of a passed pawn.',
                        'Breakthrough': 'A tactical idea to create a passed pawn by sacrificing material.',
                        'Blockade': 'Preventing an opponent\'s pawn from advancing by placing a piece in front of it.',
                        'Outside Passed Pawn': 'A passed pawn on the wing that distracts the opponent\'s king from the main action.',
                        'Rook Activity': 'Rooks belong behind passed pawns (yours and your opponent\'s) and on open files.',
                        'Back Rank': 'The first rank where the king can be trapped. Always be aware of back rank weaknesses.',
                        'Seventh Rank': 'The most active rank for rooks. A rook on the seventh rank can be very powerful.',
                        'Connected Rooks': 'Two rooks on the same rank or file can control entire ranks and files.',
                        'Minor Piece Coordination': 'Bishops and knights work best when they coordinate their efforts and control key squares.',
                        'Bishop Pair': 'Two bishops against bishop and knight or two knights is often a significant advantage.',
                        'Color Complexes': 'Bishops control squares of one color. Control the color complex that matches your bishop.',
                        'Knight Outposts': 'Knights need secure squares to be effective. Create outposts on advanced squares.',
                        'Material Count': 'In endgames, material advantage becomes more important. Count carefully and convert advantages.',
                        'Time Management': 'In endgames, every move counts. Don\'t waste time with unnecessary moves.'
                      };
                      return (
                        <li key={i}>
                          <strong>{concept}:</strong> 
                          <span className="concept-explanation"> {explanations[concept as keyof typeof explanations] || 'A fundamental concept in this type of endgame.'}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="info-modal-section">
                  <h3>Essential Example Positions</h3>
                  <ul className="info-modal-list">
                    {endgamePositions.filter(pos => pos.category === guideCategory.id).map(pos => (
                      <li key={pos.id} className="info-modal-example">
                        <div className="example-header"><strong>{pos.name}</strong></div>
                        <div className="example-board">
                          <Chessboard
                            fen={pos.fen}
                            orientation={pos.fen.split(' ')[1] === 'w' ? 'white' : 'black'}
                            disabled={true}
                            className="guide-chessboard"
                          />
                        </div>
                        <div className="example-description">{pos.description}</div>
                        <ul className="example-tips">
                          {pos.tips.map((tip, idx) => <li key={idx}>💡 {tip}</li>)}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="info-modal-section">
                  <h3>Study Tips</h3>
                  <ul className="info-modal-list">
                    <li>Practice these positions against a computer or training partner</li>
                    <li>Focus on understanding the principles rather than memorizing moves</li>
                    <li>Study both winning and drawing techniques</li>
                    <li>Pay attention to king activity and pawn structure</li>
                    <li>Practice calculating several moves ahead</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Endgames; 