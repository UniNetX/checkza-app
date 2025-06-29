import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

interface AnalyticsDashboardProps {
  title?: string;
  showUserStats?: boolean;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  title = "Your Progress",
  showUserStats = true 
}) => {
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    puzzlesSolved: 0,
    openingsStudied: 0,
    totalTimeSpent: 0,
    currentStreak: 0,
    bestRating: 0
  });

  const [recentActivity, setRecentActivity] = useState<Array<{
    type: string;
    title: string;
    timestamp: Date;
    success?: boolean;
  }>>([]);

  // Load user stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    const savedActivity = localStorage.getItem('recentActivity');
    if (savedActivity) {
      setRecentActivity(JSON.parse(savedActivity));
    }
  }, []);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return '#43e97b';
    if (percentage >= 60) return '#f093fb';
    if (percentage >= 40) return '#ff6b6b';
    return '#7fa7ff';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'puzzle': return '🧩';
      case 'opening': return '📖';
      case 'game': return '♟️';
      default: return '📊';
    }
  };

  return (
    <div style={{ 
      background: '#23263a', 
      borderRadius: 12, 
      padding: 24, 
      color: '#fff', 
      maxWidth: 800, 
      margin: '2rem auto',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ 
        color: '#7fa7ff', 
        marginBottom: 20, 
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        {title}
      </h3>

      {showUserStats && (
        <div style={{ marginBottom: 32 }}>
          <h4 style={{ color: '#b3b8d0', marginBottom: 16, fontSize: '1.1rem' }}>
            Your Statistics
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: 16 
          }}>
            <div style={{ 
              background: '#1a1d2e', 
              padding: 16, 
              borderRadius: 8, 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📚</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#43e97b' }}>
                {stats.lessonsCompleted}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#b3b8d0' }}>Lessons</div>
            </div>
            
            <div style={{ 
              background: '#1a1d2e', 
              padding: 16, 
              borderRadius: 8, 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🧩</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f093fb' }}>
                {stats.puzzlesSolved}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#b3b8d0' }}>Puzzles</div>
            </div>
            
            <div style={{ 
              background: '#1a1d2e', 
              padding: 16, 
              borderRadius: 8, 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📖</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff6b6b' }}>
                {stats.openingsStudied}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#b3b8d0' }}>Openings</div>
            </div>
            
            <div style={{ 
              background: '#1a1d2e', 
              padding: 16, 
              borderRadius: 8, 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>⏱️</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#7fa7ff' }}>
                {formatTime(stats.totalTimeSpent)}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#b3b8d0' }}>Time Spent</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: 32 }}>
        <h4 style={{ color: '#b3b8d0', marginBottom: 16, fontSize: '1.1rem' }}>
          Platform Overview
        </h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: 12 
        }}>
          <div style={{ 
            background: '#1a1d2e', 
            padding: 12, 
            borderRadius: 8, 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>📖</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>30+</div>
            <div style={{ fontSize: '0.7rem', color: '#b3b8d0' }}>Openings</div>
          </div>
          
          <div style={{ 
            background: '#1a1d2e', 
            padding: 12, 
            borderRadius: 8, 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>🧩</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>∞</div>
            <div style={{ fontSize: '0.7rem', color: '#b3b8d0' }}>Puzzles</div>
          </div>
          
          <div style={{ 
            background: '#1a1d2e', 
            padding: 12, 
            borderRadius: 8, 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>📚</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>100+</div>
            <div style={{ fontSize: '0.7rem', color: '#b3b8d0' }}>Resources</div>
          </div>
          
          <div style={{ 
            background: '#1a1d2e', 
            padding: 12, 
            borderRadius: 8, 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>🎯</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>24/7</div>
            <div style={{ fontSize: '0.7rem', color: '#b3b8d0' }}>Available</div>
          </div>
        </div>
      </div>

      {recentActivity.length > 0 && (
        <div>
          <h4 style={{ color: '#b3b8d0', marginBottom: 16, fontSize: '1.1rem' }}>
            Recent Activity
          </h4>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {recentActivity.slice(0, 5).map((activity, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '8px 0',
                borderBottom: index < 4 ? '1px solid #2d3142' : 'none'
              }}>
                <span style={{ fontSize: '1.2rem', marginRight: 12 }}>
                  {getActivityIcon(activity.type)}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                    {activity.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#b3b8d0' }}>
                    {formatDate(activity.timestamp)}
                  </div>
                </div>
                {activity.success !== undefined && (
                  <span style={{ 
                    fontSize: '0.8rem',
                    color: activity.success ? '#43e97b' : '#ff6b6b',
                    fontWeight: 'bold'
                  }}>
                    {activity.success ? '✓' : '✗'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ 
        marginTop: 24, 
        padding: 16, 
        background: '#1a1d2e', 
        borderRadius: 8, 
        textAlign: 'center' 
      }}>
        <div style={{ fontSize: '0.9rem', color: '#b3b8d0', marginBottom: 8 }}>
          🎯 Ready to improve your chess?
        </div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>
          Track your progress and see your improvement over time
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 