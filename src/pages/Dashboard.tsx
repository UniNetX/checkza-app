import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import AnimatedCard from '../components/common/AnimatedCard';
import AdvancedAnimatedCard from '../components/common/AdvancedAnimatedCard';
import './dashboard.css';

// Real user data structure that makes sense
interface UserProgress {
  name: string;
  joinDate: string;
  totalLessons: number;
  completedLessons: number;
  totalPuzzles: number;
  solvedPuzzles: number;
  currentStreak: number;
  bestStreak: number;
  favoriteOpening: string;
  lastActive: string;
  achievements: string[];
  currentLesson?: {
    id: string;
    title: string;
    progress: number;
  };
  recentActivity: Array<{
    type: 'lesson' | 'puzzle' | 'opening' | 'endgame';
    title: string;
    date: string;
    result?: 'completed' | 'failed' | 'in-progress';
  }>;
}

// Sample realistic data that connects to actual app features
const sampleUser: UserProgress = {
  name: 'Chess Learner',
  joinDate: '2024-01-15',
  totalLessons: 30,
  completedLessons: 8,
  totalPuzzles: 150,
  solvedPuzzles: 23,
  currentStreak: 3,
  bestStreak: 7,
  favoriteOpening: 'Ruy Lopez',
  lastActive: 'Today',
  achievements: ['First Lesson', 'Puzzle Master', 'Week Warrior'],
  currentLesson: {
    id: 'lesson-9',
    title: 'Lesson 9: Basic Tactics',
    progress: 0.6
  },
  recentActivity: [
    { type: 'lesson', title: 'Lesson 8: Opening Principles', date: 'Today', result: 'completed' },
    { type: 'puzzle', title: 'Tactical Puzzle #45', date: 'Yesterday', result: 'completed' },
    { type: 'opening', title: 'Ruy Lopez Practice', date: '2 days ago', result: 'completed' },
    { type: 'puzzle', title: 'Endgame Puzzle #12', date: '3 days ago', result: 'failed' },
  ]
};

const Dashboard: React.FC = () => {
  const { trackPageView } = useAnalytics();
  const user = sampleUser; // In a real app, this would come from state/context

  useEffect(() => {
    trackPageView('dashboard');
    // In a real app, you'd fetch user data from your backend here
    // loadUserProgress();
  }, [trackPageView]);

  const progressPercentage = Math.round((user.completedLessons / user.totalLessons) * 100);
  const puzzleSuccessRate = Math.round((user.solvedPuzzles / user.totalPuzzles) * 100);

  const statCards = [
    { 
      label: 'Lessons Completed', 
      value: `${user.completedLessons}/${user.totalLessons}`, 
      icon: '📖', 
      color: '#7fa7ff',
      subtitle: `${progressPercentage}% of curriculum`
    },
    { 
      label: 'Puzzles Solved', 
      value: user.solvedPuzzles, 
      icon: '🧩', 
      color: '#43e97b',
      subtitle: `${puzzleSuccessRate}% success rate`
    },
    { 
      label: 'Current Streak', 
      value: user.currentStreak, 
      icon: '🔥', 
      color: '#f093fb',
      subtitle: `Best: ${user.bestStreak} days`
    },
    { 
      label: 'Favorite Opening', 
      value: user.favoriteOpening, 
      icon: '♟️', 
      color: '#fa709a',
      subtitle: 'Most practiced'
    },
  ];

  const quickActions = [
    {
      title: user.currentLesson ? 'Continue Lesson' : 'Start Learning',
      subtitle: user.currentLesson ? user.currentLesson.title : 'Begin your chess journey',
      icon: '📚',
      link: user.currentLesson ? `/lessons/${user.currentLesson.id}` : '/how-to-play',
      color: '#43e97b',
      primary: true
    },
    {
      title: 'Practice Puzzles',
      subtitle: 'Sharpen your tactical skills',
      icon: '🧩',
      link: '/puzzles',
      color: '#7fa7ff',
      primary: false
    },
    {
      title: 'Study Openings',
      subtitle: 'Master your favorite strategies',
      icon: '♟️',
      link: '/openings',
      color: '#f093fb',
      primary: false
    },
    {
      title: 'Endgame Practice',
      subtitle: 'Perfect your finishing technique',
      icon: '🏁',
      link: '/endgames',
      color: '#fa709a',
      primary: false
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📖';
      case 'puzzle': return '🧩';
      case 'opening': return '♟️';
      case 'endgame': return '🏁';
      default: return '📝';
    }
  };

  const getActivityColor = (result?: string) => {
    switch (result) {
      case 'completed': return '#43e97b';
      case 'failed': return '#fa709a';
      case 'in-progress': return '#7fa7ff';
      default: return '#b3b8d0';
    }
  };

  return (
    <div className="dashboard-modern" style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1rem 2rem 1rem' }}>
      {/* Welcome header */}
      <AnimatedCard animationType="fadeInUp" className="welcome-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <span style={{ fontSize: 36, color: '#43e97b' }}>♟️</span>
          <div>
            <h1 style={{ color: '#7fa7ff', fontWeight: 800, fontSize: '2.1rem', margin: 0 }}>
              Welcome back, {user.name}!
            </h1>
            <p style={{ color: '#b3b8d0', margin: '4px 0 0 0', fontSize: '1rem' }}>
              Member since {new Date(user.joinDate).toLocaleDateString()} • Last active {user.lastActive}
            </p>
          </div>
        </div>
      </AnimatedCard>

      {/* Key stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 22, marginBottom: 32 }}>
        {statCards.map((card, i) => (
          <AdvancedAnimatedCard
            key={i}
            animationType="elasticIn"
            stagger={true}
            staggerIndex={i}
            hoverEffect="magnetic"
            className="stat-card"
            style={{
              background: '#23263a',
              borderRadius: 16,
              boxShadow: '0 2px 16px #232a2e22',
              padding: '1.5rem 1.3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 8,
              minWidth: 0,
            }}
          >
            <span style={{ fontSize: 28, color: card.color }}>{card.icon}</span>
            <span style={{ color: '#b3b8d0', fontWeight: 600, fontSize: '1.01rem' }}>{card.label}</span>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-1px' }}>{card.value}</span>
            <span style={{ color: '#7fa7ff', fontSize: '0.9rem', fontWeight: 500 }}>{card.subtitle}</span>
          </AdvancedAnimatedCard>
        ))}
      </div>

      {/* Progress section */}
      <AnimatedCard animationType="fadeInUp" delay={0.3} className="progress-section">
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#b3b8d0', fontWeight: 600, marginBottom: 6, fontSize: '1.1rem' }}>
            {user.currentLesson ? 'Current Lesson Progress' : 'Overall Curriculum Progress'}
          </div>
          <div style={{ background: '#232a2e', borderRadius: 8, height: 18, width: '100%', boxShadow: '0 1px 6px #232a2e11', overflow: 'hidden' }}>
            <div style={{
              width: `${user.currentLesson ? Math.round(user.currentLesson.progress * 100) : progressPercentage}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #43e97b 0%, #7fa7ff 100%)',
              borderRadius: 8,
              transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: '#181c24',
              fontWeight: 700,
              fontSize: '1.01rem',
              paddingRight: 12,
            }}>
              {user.currentLesson ? Math.round(user.currentLesson.progress * 100) : progressPercentage}%
            </div>
          </div>
          {user.currentLesson && (
            <p style={{ color: '#7fa7ff', fontSize: '0.9rem', margin: '8px 0 0 0' }}>
              {user.currentLesson.title} • {Math.round(user.currentLesson.progress * 100)}% complete
            </p>
          )}
        </div>
      </AnimatedCard>

      {/* Quick actions */}
      <AnimatedCard animationType="fadeInUp" delay={0.4} className="quick-actions">
        <div style={{ marginBottom: 18 }}>
          <div style={{ color: '#b3b8d0', fontWeight: 600, marginBottom: 16, fontSize: '1.1rem' }}>Quick Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {quickActions.map((action, i) => (
              <Link 
                key={i}
                to={action.link} 
                style={{
                  background: action.primary 
                    ? 'linear-gradient(90deg, #43e97b 0%, #7fa7ff 100%)' 
                    : '#232a2e',
                  color: action.primary ? '#181c24' : '#7fa7ff',
                  borderRadius: 12,
                  padding: '1.2rem 1.5rem',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  textDecoration: 'none',
                  boxShadow: action.primary 
                    ? '0 2px 12px #43e97b22' 
                    : '0 2px 12px #232a2e22',
                  border: action.primary ? 'none' : '1.5px solid #31344a',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
                className="micro-bounce"
              >
                <span style={{ fontSize: 24 }}>{action.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>{action.title}</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{action.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Recent activity */}
      <AnimatedCard animationType="fadeInUp" delay={0.5} className="recent-activity">
        <div style={{ marginBottom: 18 }}>
          <div style={{ color: '#b3b8d0', fontWeight: 600, marginBottom: 16, fontSize: '1.1rem' }}>Recent Activity</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {user.recentActivity.map((item, i) => (
              <div key={i} style={{
                background: '#232a2e',
                borderRadius: 12,
                boxShadow: '0 1px 6px #232a2e11',
                padding: '1.1rem 1.3rem',
                color: '#b3b8d0',
                fontWeight: 500,
                fontSize: '1.01rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                border: `2px solid ${getActivityColor(item.result)}20`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{getActivityIcon(item.type)}</span>
                  <span style={{ 
                    color: getActivityColor(item.result), 
                    fontWeight: 700, 
                    fontSize: '0.9rem',
                    textTransform: 'uppercase'
                  }}>
                    {item.type}
                  </span>
                </div>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{item.title}</span>
                <span style={{ fontSize: '0.9rem', color: '#7fa7ff' }}>{item.date}</span>
                {item.result && (
                  <span style={{ 
                    fontSize: '0.8rem', 
                    color: getActivityColor(item.result),
                    fontWeight: 600
                  }}>
                    {item.result === 'completed' ? '✅ Completed' : 
                     item.result === 'failed' ? '❌ Failed' : '🔄 In Progress'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Achievements */}
      <AnimatedCard animationType="fadeInUp" delay={0.6} className="achievements">
        <div style={{ marginBottom: 18 }}>
          <div style={{ color: '#b3b8d0', fontWeight: 600, marginBottom: 16, fontSize: '1.1rem' }}>Achievements</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {user.achievements.map((achievement, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, #43e97b20 0%, #7fa7ff20 100%)',
                borderRadius: 20,
                padding: '0.6rem 1.2rem',
                color: '#43e97b',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: '1px solid #43e97b40',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span>🏆</span>
                {achievement}
              </div>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Tips */}
      <AnimatedCard animationType="fadeInUp" delay={0.7} className="tips">
        <div style={{ 
          color: '#b3b8d0', 
          fontSize: '1.01rem', 
          background: '#232a2e', 
          borderRadius: 12, 
          padding: '1.3rem 1.5rem', 
          boxShadow: '0 1px 6px #232a2e11', 
          maxWidth: 600,
          border: '1px solid #31344a'
        }}>
          <span style={{ fontWeight: 700, color: '#43e97b', marginRight: 8 }}>💡 Tip:</span>
          {user.currentStreak > 0 
            ? `Great job maintaining your ${user.currentStreak}-day streak! Try to solve at least one puzzle today to keep it going.`
            : "Start your learning streak today! Even 10 minutes of chess practice daily can significantly improve your game."
          }
        </div>
      </AnimatedCard>
    </div>
  );
};

export default Dashboard; 