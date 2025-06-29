import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './home.css';
import LichessEmbed from '../components/lessons/LichessEmbed';
import LessonProgressTracker from '../components/lessons/LessonProgressTracker';
import EmailSignupForm from '../components/common/EmailSignupForm';
import AnimatedCard from '../components/common/AnimatedCard';
import AdvancedAnimatedCard from '../components/common/AdvancedAnimatedCard';
import { useAnalytics } from '../hooks/useAnalytics';

const defaultTestimonials = [
  {
    name: 'Zara Vance',
    quote: 'Checkza made learning chess fun and structured. I improved my rating by 300 points in 2 months!'
  },
  {
    name: 'Leo Nakamura',
    quote: 'The lesson tracker and interactive puzzles kept me motivated every day. Highly recommended for clubs!'
  },
  {
    name: 'Maya Sterling',
    quote: 'I love the curriculum kit and the easy-to-follow lessons. My students are more engaged than ever.'
  },
  {
    name: 'Finn Harper',
    quote: 'The progress tracker is a game changer. I never lose track of what to learn next!'
  },
  {
    name: 'Sophie Lin',
    quote: 'Checkza\'s resources are top-notch. I finally understand chess openings and tactics.'
  },
  {
    name: 'Jasper Quinn',
    quote: 'The interactive puzzles are addictive and really helped me improve my calculation skills.'
  }
];

const trustedBy = [
  { name: 'Chess.com', icon: '♛' },
  { name: 'Lichess', icon: '♞' },
  { name: 'Chessable', icon: '♜' },
  { name: 'FIDE', icon: '♚' },
  { name: 'Your Club', icon: '♟️' }
];

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
      {/* HERO SECTION - Refined and Smoother */}
      <section
        style={{
          background: 'linear-gradient(120deg, #23263a 70%, #23263a 100%)',
          padding: '3.5rem 0 2.5rem 0',
          borderRadius: 20,
          boxShadow: '0 4px 32px rgba(67, 233, 123, 0.06)',
          margin: '2rem 0',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 340,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1100,
          width: '100%',
          margin: '0 auto',
          padding: '0 1.5rem',
          gap: 36,
        }}>
          {/* Left: Text Content */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <h1 style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#7fa7ff',
              marginBottom: 14,
              lineHeight: 1.13,
              letterSpacing: '-0.5px',
              textShadow: '0 1px 8px #181c24',
            }}>
              Master Chess, One Lesson at a Time
            </h1>
            <p style={{
              fontSize: '1.13rem',
              color: '#b3b8d0',
              marginBottom: 28,
              maxWidth: 480,
              lineHeight: 1.55,
            }}>
              Checkza is your modern, interactive chess learning platform. Track your progress, solve real puzzles, and join a global community of learners and clubs.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link
                to="/dashboard"
                className="cz-hero-btn primary"
                style={{
                  fontSize: '1.08rem',
                  padding: '0.85rem 2.1rem',
                  borderRadius: 10,
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                  color: '#181c24',
                  boxShadow: '0 2px 12px #43e97b22',
                  border: 'none',
                  transition: 'all 0.18s',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 18px #43e97b44'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 12px #43e97b22'}
              >
                Get Started Free
              </Link>
              <Link
                to="/curriculum-kit"
                className="cz-hero-btn secondary"
                style={{
                  fontSize: '1.08rem',
                  padding: '0.85rem 2.1rem',
                  borderRadius: 10,
                  fontWeight: 700,
                  background: 'transparent',
                  color: '#7fa7ff',
                  border: '2px solid #7fa7ff',
                  boxShadow: 'none',
                  transition: 'all 0.18s',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#232a2e';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#7fa7ff';
                }}
              >
                Explore Curriculum
              </Link>
            </div>
          </div>
          {/* Right: Visual Chessboard Illustration */}
          <div style={{ flex: 1, minWidth: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              background: '#232a2e',
              borderRadius: 14,
              boxShadow: '0 2px 16px rgba(67, 233, 123, 0.08)',
              padding: 16,
              display: 'inline-block',
              border: '1.5px solid #232a2e',
              minWidth: 220,
              minHeight: 220,
              maxWidth: 320,
              maxHeight: 320,
            }}>
              <img
                src="/assets/images/chessboard-demo.png"
                alt="Chessboard demo"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 8,
                  boxShadow: '0 2px 12px #232a2e33',
                  background: '#232a2e',
                  objectFit: 'cover',
                  border: '1.5px solid #232a2e',
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className={`cz-stats-section ${statsVisible ? 'cz-section-fadein' : ''}`} ref={statsRef}>
        <div className="cz-container">
          <div className="cz-section-heading animate-fade-in-up">Platform Stats</div>
          <div className="cz-stats-grid stagger-grid">
            {stats.map((stat, index) => (
              <AdvancedAnimatedCard
                key={index}
                animationType="elasticIn"
                stagger={true}
                staggerIndex={index}
                hoverEffect="magnetic"
                className="cz-stat-card"
                style={{ 
                  '--stat-color': stat.color,
                  boxShadow: '0 2px 12px rgba(67, 233, 123, 0.08)',
                  border: '1.5px solid #232a2e',
                  background: '#23263a',
                  borderRadius: 16
                } as React.CSSProperties}
              >
                <div className="cz-stat-icon icon-animate" style={{ fontSize: '2rem' }}>{stat.icon}</div>
                <div className="cz-stat-number" style={{ fontWeight: 700, fontSize: '1.5rem' }}>{stat.value}</div>
                <div className="cz-stat-label" style={{ color: '#b3b8d0', fontSize: '1rem' }}>{stat.label}</div>
              </AdvancedAnimatedCard>
            ))}
            {/* Extra stats */}
            <AdvancedAnimatedCard
              animationType="elasticIn"
              stagger={true}
              staggerIndex={4}
              hoverEffect="tilt"
              className="cz-stat-card"
              style={{ background: '#1a1d2e', borderRadius: 16, border: '1.5px solid #232a2e', boxShadow: '0 2px 12px rgba(67, 233, 123, 0.08)' }}
            >
              <div className="cz-stat-icon icon-animate" style={{ fontSize: '2rem' }}>🌍</div>
              <div className="cz-stat-number" style={{ fontWeight: 700, fontSize: '1.5rem' }}>20+</div>
              <div className="cz-stat-label" style={{ color: '#b3b8d0', fontSize: '1rem' }}>Countries Reached</div>
            </AdvancedAnimatedCard>
            <AdvancedAnimatedCard
              animationType="elasticIn"
              stagger={true}
              staggerIndex={5}
              hoverEffect="tilt"
              className="cz-stat-card"
              style={{ background: '#1a1d2e', borderRadius: 16, border: '1.5px solid #232a2e', boxShadow: '0 2px 12px rgba(67, 233, 123, 0.08)' }}
            >
              <div className="cz-stat-icon icon-animate" style={{ fontSize: '2rem' }}>👥</div>
              <div className="cz-stat-number" style={{ fontWeight: 700, fontSize: '1.5rem' }}>1,200+</div>
              <div className="cz-stat-label" style={{ color: '#b3b8d0', fontSize: '1rem' }}>Active Learners</div>
            </AdvancedAnimatedCard>
          </div>
        </div>
      </section>
      <section className={`cz-features-section ${featuresVisible ? 'cz-section-fadein' : ''}`} ref={featuresRef}>
        <div className="cz-container">
          <div className="cz-section-heading animate-fade-in-up">Platform Features</div>
          <div className="cz-section-header animate-fade-in-up">
            <p className="cz-section-subtitle animate-fade-in-up">
              Explore the tools and resources that make Checkza unique.
            </p>
          </div>
          <div className="cz-features-grid stagger-grid">
            {features.map((feature, idx) => (
              <AdvancedAnimatedCard
                key={feature.title}
                animationType="zoomIn"
                stagger={true}
                staggerIndex={idx}
                hoverEffect="scale"
                className="cz-feature-card"
              >
                <Link to={feature.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="cz-feature-header">
                    <span className="cz-feature-icon icon-animate" style={{ color: feature.color }}>{feature.icon}</span>
                    <span className="cz-feature-count">{feature.count}</span>
                  </div>
                  <div className="cz-feature-title animate-fade-in-up">{feature.title}</div>
                  <div className="cz-feature-desc animate-fade-in-up">{feature.description}</div>
                  <span className="cz-feature-arrow">→</span>
                </Link>
              </AdvancedAnimatedCard>
            ))}
          </div>
        </div>
      </section>
      <section className={`cz-benefits-section ${benefitsVisible ? 'cz-section-fadein' : ''}`} ref={benefitsRef}>
        <div className="cz-container">
          <div className="cz-section-heading animate-fade-in-up">Why Checkza?</div>
          <div className="cz-section-header animate-fade-in-up">
            <p className="cz-section-subtitle animate-fade-in-up">
              Designed for learners, clubs, and classrooms.
            </p>
          </div>
          <div className="cz-benefits-grid stagger-grid">
            {benefits.map((benefit, idx) => (
              <AdvancedAnimatedCard
                key={benefit.title}
                animationType="bounceIn"
                stagger={true}
                staggerIndex={idx}
                hoverEffect="scale"
                className="cz-benefit-card"
              >
                <span className="cz-benefit-icon icon-animate" style={{ color: benefit.color }}>{benefit.icon}</span>
                <div className="cz-benefit-title animate-fade-in-up">{benefit.title}</div>
                <div className="cz-benefit-desc animate-fade-in-up">{benefit.description}</div>
              </AdvancedAnimatedCard>
            ))}
          </div>
        </div>
      </section>
      <section className={`cz-howitworks-section ${howVisible ? 'cz-section-fadein' : ''}`} ref={howRef}>
        <div className="cz-container">
          <div className="cz-section-heading animate-fade-in-up">How It Works</div>
          <div className="cz-section-header animate-fade-in-up">
            <p className="cz-section-subtitle animate-fade-in-up">
              Get started in three easy steps.
            </p>
          </div>
          <div className="cz-howitworks-grid stagger-grid">
            <AdvancedAnimatedCard
              animationType="elasticIn"
              stagger={true}
              staggerIndex={0}
              hoverEffect="glow"
              className="cz-howitworks-card cz-resource-card"
            >
              <div className="cz-step-header">
                <span className="cz-resource-badge">Resource</span>
                <span className="cz-step-icon icon-animate">🧠</span>
              </div>
              <div className="cz-howitworks-title animate-fade-in-up">Curriculum Kit</div>
              <div className="cz-howitworks-desc animate-fade-in-up">
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
                className="cz-download-btn micro-bounce"
              >
                <span role="img" aria-label="Open">🧠</span> View Curriculum Kit
              </a>
            </AdvancedAnimatedCard>
            {howItWorks.map((step, idx) => (
              <AdvancedAnimatedCard
                key={step.title}
                animationType="slideInUp"
                stagger={true}
                staggerIndex={idx + 1}
                hoverEffect="scale"
                className="cz-howitworks-card"
              >
                <div className="cz-step-header">
                  <span className="cz-step-number">{step.step}</span>
                  <span className="cz-step-icon icon-animate">{step.icon}</span>
                </div>
                <div className="cz-howitworks-title animate-fade-in-up">{step.title}</div>
                <div className="cz-howitworks-desc animate-fade-in-up">{step.description}</div>
              </AdvancedAnimatedCard>
            ))}
          </div>
        </div>
      </section>
      {/* TESTIMONIALS: Infinite Horizontal Scrolling Carousel, No Pictures */}
      <section style={{ margin: '3rem 0', padding: '2rem 0', background: 'none', borderRadius: 0 }}>
        <h2 className="animate-fade-in-up" style={{ color: '#7fa7ff', marginBottom: 24, textAlign: 'center', fontSize: '2rem' }}>What Our Users Say</h2>
        <div style={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          padding: '0 0',
        }}>
          <div
            className="cz-testimonials-marquee"
            style={{
              display: 'flex',
              gap: '2.5rem',
              width: 'max-content',
              animation: 'cz-marquee-scroll 32s linear infinite',
            }}
          >
            {[
              ...defaultTestimonials,
              ...defaultTestimonials,
              ...defaultTestimonials.slice(0, 2)
            ].map((t, idx) => (
              <div
                key={idx}
                className="hover-lift"
                style={{
                  background: '#23263a',
                  borderRadius: 18,
                  padding: '2.2rem 2.1rem',
                  minWidth: 340,
                  maxWidth: 400,
                  boxShadow: '0 2px 12px rgba(67, 233, 123, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 0.5rem',
                  border: '1.5px solid #232a2e',
                  fontSize: '1.13rem',
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: 500,
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <div style={{ fontSize: '1.18rem', fontWeight: 600, marginBottom: 18, color: '#fff', fontStyle: 'italic' }}>
                  "{t.quote}"
                </div>
                <div style={{ color: '#7fa7ff', fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>{t.name}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes cz-marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .cz-testimonials-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
      <section className="animate-fade-in-up" style={{ margin: '3rem 0', padding: '2.5rem 1rem', background: 'linear-gradient(90deg, #43e97b20 60%, #38f9d720 100%)', borderRadius: 20, boxShadow: '0 4px 24px rgba(67, 233, 123, 0.07)', textAlign: 'center' }}>
        <h2 style={{ color: '#43e97b', marginBottom: 16, fontSize: '2rem' }}>Ready to Master Chess?</h2>
        <p style={{ color: '#232a2e', fontSize: '1.1rem', marginBottom: 24 }}>Join thousands of learners and instructors using Checkza to level up their chess skills. Free, modern, and always growing.</p>
        <Link to="/dashboard" className="cz-hero-btn primary micro-bounce" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem', borderRadius: 12 }}>Get Started Free →</Link>
      </section>
      <section className="animate-fade-in-up" style={{ margin: '3rem 0', padding: '2rem', background: '#23263a', borderRadius: 16 }}>
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