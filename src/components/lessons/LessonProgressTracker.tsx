import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

interface Lesson {
  id: string;
  title: string;
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface LessonProgressTrackerProps {
  lessons: Lesson[];
  title?: string;
  showProgressBar?: boolean;
}

const STORAGE_KEY = 'lessonProgress';

const LessonProgressTracker: React.FC<LessonProgressTrackerProps> = ({ 
  lessons, 
  title = "Lesson Progress",
  showProgressBar = true 
}) => {
  const [progress, setProgress] = useState<{ [id: string]: boolean }>({});
  const { trackLessonCompleted } = useAnalytics();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggle = (id: string) => {
    const lesson = lessons.find(l => l.id === id);
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    
    // Track completion event
    if (newProgress[id] && lesson) {
      trackLessonCompleted(id, lesson.title);
    }
  };

  const completed = Object.values(progress).filter(Boolean).length;
  const progressPercentage = lessons.length > 0 ? (completed / lessons.length) * 100 : 0;

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return '#43e97b';
      case 'intermediate': return '#f093fb';
      case 'advanced': return '#ff6b6b';
      default: return '#7fa7ff';
    }
  };

  return (
    <div style={{ 
      background: '#23263a', 
      borderRadius: 12, 
      padding: 24, 
      color: '#fff', 
      maxWidth: 600, 
      margin: '2rem auto',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ color: '#7fa7ff', marginBottom: 16, fontSize: '1.5rem' }}>
        {title}
      </h3>
      
      {showProgressBar && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 8 
          }}>
            <span style={{ fontSize: '0.9rem', color: '#b3b8d0' }}>
              Progress: {completed} / {lessons.length} lessons completed
            </span>
            <span style={{ fontSize: '0.9rem', color: '#43e97b', fontWeight: 'bold' }}>
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div style={{ 
            background: '#1a1d2e', 
            borderRadius: 8, 
            height: 8, 
            overflow: 'hidden' 
          }}>
            <div style={{ 
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              height: '100%', 
              width: `${progressPercentage}%`,
              transition: 'width 0.3s ease',
              borderRadius: 8
            }} />
          </div>
        </div>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {lessons.map((lesson, index) => (
          <li key={lesson.id} style={{ 
            marginBottom: 12, 
            padding: 16,
            background: progress[lesson.id] ? '#1a1d2e' : 'transparent',
            borderRadius: 8,
            border: progress[lesson.id] ? '1px solid #43e97b' : '1px solid #2d3142',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={!!progress[lesson.id]}
                  onChange={() => toggle(lesson.id)}
                  id={`lesson-${lesson.id}`}
                  style={{ 
                    marginRight: 12,
                    width: 18,
                    height: 18,
                    accentColor: '#43e97b'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <label 
                    htmlFor={`lesson-${lesson.id}`}
                    style={{ 
                      cursor: 'pointer',
                      fontWeight: progress[lesson.id] ? 'bold' : 'normal',
                      color: progress[lesson.id] ? '#43e97b' : '#fff',
                      textDecoration: progress[lesson.id] ? 'line-through' : 'none'
                    }}
                  >
                    {lesson.title}
                  </label>
                  {lesson.description && (
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#b3b8d0', 
                      marginTop: 4 
                    }}>
                      {lesson.description}
                    </div>
                  )}
                </div>
              </div>
              {lesson.difficulty && (
                <span style={{ 
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: 12,
                  background: getDifficultyColor(lesson.difficulty) + '20',
                  color: getDifficultyColor(lesson.difficulty),
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {lesson.difficulty}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {completed === lessons.length && lessons.length > 0 && (
        <div style={{ 
          marginTop: 20, 
          padding: 16, 
          background: '#43e97b20', 
          borderRadius: 8, 
          border: '1px solid #43e97b',
          textAlign: 'center'
        }}>
          <span style={{ color: '#43e97b', fontWeight: 'bold' }}>
            🎉 Congratulations! You've completed all lessons!
          </span>
        </div>
      )}
    </div>
  );
};

export default LessonProgressTracker; 