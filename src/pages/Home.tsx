import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './home.css';
import LichessEmbed from '../components/lessons/LichessEmbed';
import LessonProgressTracker from '../components/lessons/LessonProgressTracker';
import EmailSignupForm from '../components/common/EmailSignupForm';
import { useAnalytics } from '../hooks/useAnalytics';

const Home: React.FC = () => {
  const { trackPageView } = useAnalytics();
  
  // Track page view on component mount
  useEffect(() => {
    trackPageView('home');
  }, [trackPageView]);

  const { elementRef: statsRef, isVisible: statsVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  const { elementRef: featuresRef, isVisible: featuresVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  const { elementRef: benefitsRef, isVisible: benefitsVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  const { elementRef: howRef, isVisible: howVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const features = [
    {
      icon: '♟️',
      title: 'Openings',
      description: 'Master chess openings with comprehensive guides and analysis.',
      path: '/openings',
      color: '#667eea',
      count: '30+'
    },
    {
      icon: '🏁',
      title: 'Endgames',
      description: 'Perfect your endgame technique with specialized training.',
      path: '/endgames',
      color: '#f093fb',
      count: '50+'
    },
    {
      icon: '🔍',
      title: 'Analysis',
      description: 'Analyze games with advanced tools and insights.',
      path: '/analysis',
      color: '#4facfe',
      count: 'Advanced'
    },
    {
      icon: '📚',
      title: 'Resources',
      description: 'Access comprehensive chess learning materials and references.',
      path: '/resources',
      color: '#43e97b',
      count: '100+'
    },
    {
      icon: '🎓',
      title: 'How to Play',
      description: 'Learn chess fundamentals and improve your game.',
      path: '/how-to-play',
      color: '#fa709a',
      count: 'Complete'
    }
  ];

  const benefits = [
    {
      icon: '📈',
      title: 'Progressive Learning',
      description: 'Structured curriculum that adapts to different skill levels and learning paces.',
      color: '#667eea'
    },
    {
      icon: '🎯',
      title: 'Targeted Training',
      description: 'Focused exercises to improve specific aspects of chess play.',
      color: '#f093fb'
    },
    {
      icon: '📊',
      title: 'Comprehensive Analysis',
      description: 'Detailed insights and statistics for game improvement.',
      color: '#4facfe'
    },
    {
      icon: '⚡',
      title: 'Interactive Experience',
      description: 'Engage with dynamic lessons and real-time feedback.',
      color: '#43e97b'
    }
  ];

  const curriculumKit = {
    title: 'Curriculum Kit',
    description: 'Beginner Chess Curriculum: 12 Lessons from a 4-Year Lead Instructor — free PDF/Slides online',
    icon: '🧠',
    link: '/assets/pdfs/chessboard setup.pdf'
  };
  const howItWorks = [
    {
      step: '1',
      title: 'Choose Your Focus',
      description: 'Select from openings, endgames, analysis, or learning resources based on current needs.',
      icon: '🎯'
    },
    {
      step: '2',
      title: 'Engage & Practice',
      description: 'Engage with interactive lessons and practice exercises to reinforce learning.',
      icon: '💪'
    },
    {
      step: '3',
      title: 'Analyze & Improve',
      description: 'Use analysis tools and insights to understand and improve chess play.',
      icon: '📊'
    }
  ];

  const stats = [
    { icon: '📖', value: '30+', label: 'Openings', color: '#667eea' },
    { icon: '🏁', value: '50+', label: 'Endgames', color: '#f093fb' },
    { icon: '📚', value: '100+', label: 'Resources', color: '#4facfe' },
    { icon: '🎯', value: '24/7', label: 'Available', color: '#43e97b' }
  ];

  // Demo state for Lichess embed
  const [lichessUrl, setLichessUrl] = React.useState('https://lichess.org/study/embed/4FvLwQpB');
  // Enhanced sample lessons for progress tracker
  const sampleLessons = [
    { 
      id: 'lesson1', 
      title: 'Lesson 1: Chessboard & Pieces',
      description: 'Learn the basics of the chessboard and how pieces are arranged',
      difficulty: 'beginner' as const
    },
    { 
      id: 'lesson2', 
      title: 'Lesson 2: Piece Movement',
      description: 'Master how each piece moves across the board',
      difficulty: 'beginner' as const
    },
    { 
      id: 'lesson3', 
      title: 'Lesson 3: Check & Checkmate',
      description: 'Understand the concepts of check and checkmate',
      difficulty: 'beginner' as const
    },
    { 
      id: 'lesson4', 
      title: 'Lesson 4: Basic Openings',
      description: 'Learn fundamental opening principles and strategies',
      difficulty: 'intermediate' as const
    },
    { 
      id: 'lesson5', 
      title: 'Lesson 5: Tactical Combinations',
      description: 'Master tactical patterns and combinations',
      difficulty: 'intermediate' as const
    }
  ];

  return (
    <div className="cz-home">
      {/* Hero Section */}
      <section className="cz-hero">
        <div className="cz-hero-content">
          <div className="cz-hero-left cz-section-fadein">
            <div className="cz-hero-badge">
              <span className="cz-badge-icon">♟️</span>
              Master Chess Strategy
            </div>
            <h1 className="cz-hero-title">
              Master Chess with
              <span className="cz-hero-highlight"> Checkza</span>
            </h1>
            <p className="cz-hero-subtitle">
              A comprehensive chess training platform designed for players of all levels. 
              From beginners to advanced players, unlock your potential with structured learning, 
              interactive analysis, and expert insights.
            </p>
            <div className="cz-hero-actions">
              <Link to="/openings" className="cz-hero-btn primary">
                <span>Start Learning</span>
                <span className="cz-btn-icon">→</span>
              </Link>
              <Link to="/how-to-play" className="cz-hero-btn secondary">
                <span>Learn Basics</span>
                <span className="cz-btn-icon">📚</span>
              </Link>
            </div>
            <div className="cz-hero-features">
              <div className="cz-feature">
                <span className="cz-feature-icon">✓</span>
                <span>Free Access</span>
              </div>
              <div className="cz-feature">
                <span className="cz-feature-icon">✓</span>
                <span>No Registration</span>
              </div>
              <div className="cz-feature">
                <span className="cz-feature-icon">✓</span>
                <span>Mobile Friendly</span>
              </div>
            </div>
          </div>
          <div className="cz-hero-right">
            <div className="cz-hero-visual">
              <div className="cz-chess-board">
                <img src="/assets/images/chessboard-demo.png" alt="Chessboard demo" className="cz-chess-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`cz-stats-section ${statsVisible ? 'cz-section-fadein' : ''}`} ref={statsRef}>
        <div className="cz-container">
          <div className="cz-section-heading">Platform Stats</div>
          <div className="cz-stats-grid cz-animate-stagger">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="cz-stat-card cz-animate-fadeinup"
                style={{ 
                  '--stat-color': stat.color,
                  animationDelay: `${0.1 + index * 0.1}s`
                } as React.CSSProperties}
              >
                <div className="cz-stat-icon">{stat.icon}</div>
                <div className="cz-stat-number">{stat.value}</div>
                <div className="cz-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`cz-features-section ${featuresVisible ? 'cz-section-fadein' : ''}`} ref={featuresRef}>
        <div className="cz-container">
          <div className="cz-section-heading">Platform Features</div>
          <div className="cz-section-header cz-animate-fadeinup">
            <p className="cz-section-subtitle cz-animate-fadeinup">
              Explore the tools and resources that make Checkza unique.
            </p>
          </div>
          <div className="cz-features-grid cz-animate-stagger">
            {features.map((feature, idx) => (
              <Link to={feature.path} className="cz-feature-card cz-animate-fadeinup" key={feature.title} style={{ animationDelay: `${0.1 + idx * 0.1}s` }}>
                <div className="cz-feature-header">
                  <span className="cz-feature-icon" style={{ color: feature.color }}>{feature.icon}</span>
                  <span className="cz-feature-count">{feature.count}</span>
                </div>
                <div className="cz-feature-title cz-animate-fadeinup">{feature.title}</div>
                <div className="cz-feature-desc cz-animate-fadeinup">{feature.description}</div>
                <span className="cz-feature-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={`cz-benefits-section ${benefitsVisible ? 'cz-section-fadein' : ''}`} ref={benefitsRef}>
        <div className="cz-container">
          <div className="cz-section-heading">Why Checkza?</div>
          <div className="cz-section-header cz-animate-fadeinup">
            <p className="cz-section-subtitle cz-animate-fadeinup">
              Designed for learners, clubs, and classrooms.
            </p>
          </div>
          <div className="cz-benefits-grid cz-animate-stagger">
            {benefits.map((benefit, idx) => (
              <div className="cz-benefit-card cz-animate-fadeinup" key={benefit.title} style={{ animationDelay: `${0.1 + idx * 0.1}s` }}>
                <span className="cz-benefit-icon" style={{ color: benefit.color }}>{benefit.icon}</span>
                <div className="cz-benefit-title cz-animate-fadeinup">{benefit.title}</div>
                <div className="cz-benefit-desc cz-animate-fadeinup">{benefit.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`cz-howitworks-section ${howVisible ? 'cz-section-fadein' : ''}`} ref={howRef}>
        <div className="cz-container">
          <div className="cz-section-heading">How It Works</div>
          <div className="cz-section-header cz-animate-fadeinup">
            <p className="cz-section-subtitle cz-animate-fadeinup">
              Get started in three easy steps.
            </p>
          </div>
          <div className="cz-howitworks-grid cz-animate-stagger">
            <div className="cz-howitworks-card cz-animate-fadeinup cz-resource-card" style={{ animationDelay: '0.1s' }}>
              <div className="cz-step-header cz-animate-stagger">
                <span className="cz-resource-badge">Resource</span>
                <span className="cz-step-icon">🧠</span>
              </div>
              <div className="cz-howitworks-title cz-animate-fadeinup">Curriculum Kit</div>
              <div className="cz-howitworks-desc cz-animate-fadeinup">
                <b>Beginner Chess Curriculum:</b> 12 Lessons from a 4-Year Lead Instructor.<br/>
                <span style={{ color: '#7fa7ff' }}>Free PDF/Slides online for teachers, clubs, and self-learners.</span>
              </div>
              <ul style={{ color: '#b3b8d0', fontSize: '1rem', margin: '1rem 0 0.5rem 1.2rem', padding: 0 }}>
                <li>Step-by-step lesson plans</li>
                <li>Objectives, activities, and assessments</li>
                <li>Printable worksheets and diagrams</li>
                <li>Tips for instructors and parents</li>
                <li>Motivational content for beginners</li>
              </ul>
              <a
                href={curriculumKit.link}
                className="cz-download-btn"
              >
                <span role="img" aria-label="Open">🧠</span> View Curriculum Kit
              </a>
            </div>
            {howItWorks.map((step, idx) => (
              <div
                className="cz-howitworks-card cz-animate-fadeinup"
                key={step.title}
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <div className="cz-step-header cz-animate-stagger">
                  <span className="cz-step-number">{step.step}</span>
                  <span className="cz-step-icon">{step.icon}</span>
                </div>
                <div className="cz-howitworks-title cz-animate-fadeinup">{step.title}</div>
                <div className="cz-howitworks-desc cz-animate-fadeinup">{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ margin: '3rem 0', padding: '2rem', background: '#23263a', borderRadius: 16 }}>
        <h2 style={{ color: '#7fa7ff', marginBottom: 16 }}>Try a Lichess Puzzle</h2>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            value={lichessUrl}
            onChange={e => setLichessUrl(e.target.value)}
            placeholder="Paste a Lichess study or puzzle embed URL"
            style={{ width: '100%', maxWidth: 500, padding: 8, borderRadius: 6, border: '1px solid #444', marginBottom: 8 }}
          />
        </div>
        <LichessEmbed url={lichessUrl} />
      </section>
      <section style={{ margin: '3rem 0', padding: '2rem', background: '#23263a', borderRadius: 16 }}>
        <h2 style={{ color: '#7fa7ff', marginBottom: 16 }}>Track Your Lesson Progress</h2>
        <LessonProgressTracker 
          lessons={sampleLessons} 
          title="Your Learning Journey"
          showProgressBar={true}
        />
      </section>
      <section style={{ margin: '3rem 0', padding: '2rem', background: '#23263a', borderRadius: 16 }}>
        <h2 style={{ color: '#7fa7ff', marginBottom: 16 }}>Stay Updated</h2>
        <EmailSignupForm 
          formEndpoint="https://formspree.io/f/mblywjkn"
          title="Get Chess Tips & Updates"
          subtitle="Join our community and receive exclusive chess lessons, opening strategies, and tactical puzzles directly to your inbox!"
          placeholder="Enter your email address"
          buttonText="Join the Community"
          successMessage="Welcome to Checkza! You'll receive your first chess tip within 24 hours."
        />
      </section>
    </div>
  );
};

export default Home; 