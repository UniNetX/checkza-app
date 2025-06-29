import React, { useState, useMemo } from 'react';
import './Resources.css';

interface Resource {
  id: string;
  name: string;
  file: string;
  desc: string;
  category: 'openings' | 'endgames' | 'tactics' | 'strategy' | 'tools' | 'guides';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'pdf' | 'video' | 'interactive';
  tags: string[];
  downloads?: number;
  rating?: number;
}

const RESOURCES: Resource[] = [
  // Openings
  {
    id: 'ruy-lopez',
    name: 'Ruy Lopez Masterclass',
    file: 'assets/pdfs/openings/Ruy Lopez Explanation.pdf',
    desc: 'Master the classic opening that has been played for over 500 years. Learn key variations, plans, and strategic ideas.',
    category: 'openings',
    difficulty: 'intermediate',
    type: 'pdf',
    tags: ['classical', 'center control', 'development'],
    downloads: 1247,
    rating: 4.8
  },
  {
    id: 'sicilian-defense',
    name: 'Sicilian Defense Explained',
    file: 'assets/pdfs/openings/Sicilian Defense Explained.pdf',
    desc: 'The most dynamic and complex opening in chess. Learn how to handle the Sicilian as both White and Black.',
    category: 'openings',
    difficulty: 'advanced',
    type: 'pdf',
    tags: ['dynamic', 'counterattack', 'complex'],
    downloads: 2156,
    rating: 4.9
  },
  {
    id: 'french-defense',
    name: 'French Defense Guide',
    file: 'assets/pdfs/openings/French Defense Explained.pdf',
    desc: 'A solid, strategic defense that leads to rich middlegame positions. Perfect for positional players.',
    category: 'openings',
    difficulty: 'intermediate',
    type: 'pdf',
    tags: ['solid', 'strategic', 'positional'],
    downloads: 892,
    rating: 4.6
  },
  {
    id: 'queens-gambit',
    name: "Queen's Gambit Complete",
    file: 'assets/pdfs/openings/Queens Gambit Explained.pdf',
    desc: 'Control the center and open lines for your pieces. A must-know opening for every serious player.',
    category: 'openings',
    difficulty: 'intermediate',
    type: 'pdf',
    tags: ['center control', 'development', 'classical'],
    downloads: 1893,
    rating: 4.7
  },
  {
    id: 'kings-indian',
    name: "King's Indian Defense",
    file: 'assets/pdfs/openings/Kings Indian Defense.pdf',
    desc: 'A flexible, counterattacking setup that leads to exciting kingside attacks.',
    category: 'openings',
    difficulty: 'advanced',
    type: 'pdf',
    tags: ['flexible', 'counterattack', 'kingside attack'],
    downloads: 756,
    rating: 4.5
  },
  
  // Endgames
  {
    id: 'basic-endgames',
    name: 'Essential Endgames',
    file: '/assets/pdfs/endgames/basic-endgames.pdf',
    desc: 'Master the fundamental endgame positions that every player must know.',
    category: 'endgames',
    difficulty: 'beginner',
    type: 'pdf',
    tags: ['fundamentals', 'king activity', 'opposition'],
    downloads: 3421,
    rating: 4.9
  },
  {
    id: 'rook-endgames',
    name: 'Rook Endgames Mastery',
    file: '/assets/pdfs/endgames/rook-endgames.pdf',
    desc: 'The most common endgames in practice. Learn Lucena, Philidor, and other key positions.',
    category: 'endgames',
    difficulty: 'intermediate',
    type: 'pdf',
    tags: ['practical', 'lucena', 'philidor'],
    downloads: 2156,
    rating: 4.8
  },
  
  // Tactics
  {
    id: 'tactics-guide',
    name: 'Tactical Motifs',
    file: '/assets/pdfs/reference/tactics-guide.pdf',
    desc: 'Learn to recognize and execute common tactical patterns like pins, forks, and discovered attacks.',
    category: 'tactics',
    difficulty: 'beginner',
    type: 'pdf',
    tags: ['pins', 'forks', 'discovered attacks'],
    downloads: 2987,
    rating: 4.7
  },
  {
    id: 'checkmate-patterns',
    name: 'Checkmate Patterns',
    file: '/assets/pdfs/reference/checkmate-patterns.pdf',
    desc: 'Classic checkmate ideas that every player should master.',
    category: 'tactics',
    difficulty: 'intermediate',
    type: 'pdf',
    tags: ['checkmate', 'patterns', 'classic'],
    downloads: 1654,
    rating: 4.6
  },
  
  // Strategy
  {
    id: 'strategy-basics',
    name: 'Strategic Fundamentals',
    file: '/assets/pdfs/reference/strategy-basics.pdf',
    desc: 'Long-term planning and positional understanding for serious players.',
    category: 'strategy',
    difficulty: 'intermediate',
    type: 'pdf',
    tags: ['positional', 'planning', 'long-term'],
    downloads: 1234,
    rating: 4.5
  },
  
  // Tools & Guides
  {
    id: 'group-guide',
    name: 'Group Leader Guide',
    file: '/assets/pdfs/reference/checkza-group-guide.pdf',
    desc: 'Comprehensive guide for running successful chess groups and teaching sessions.',
    category: 'guides',
    difficulty: 'beginner',
    type: 'pdf',
    tags: ['teaching', 'group management', 'curriculum'],
    downloads: 567,
    rating: 4.8
  },
  {
    id: 'printable-board',
    name: 'Printable Chessboard',
    file: '/assets/pdfs/reference/chessboard-printable.pdf',
    desc: 'High-quality printable chessboard for over-the-board practice and analysis.',
    category: 'tools',
    difficulty: 'beginner',
    type: 'pdf',
    tags: ['printable', 'practice', 'analysis'],
    downloads: 892,
    rating: 4.4
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Resources', icon: '📚', color: '#667eea' },
  { id: 'openings', name: 'Openings', icon: '♟️', color: '#10b981' },
  { id: 'endgames', name: 'Endgames', icon: '♔', color: '#f59e0b' },
  { id: 'tactics', name: 'Tactics', icon: '⚡', color: '#ef4444' },
  { id: 'strategy', name: 'Strategy', icon: '🧠', color: '#8b5cf6' },
  { id: 'tools', name: 'Tools', icon: '🛠️', color: '#06b6d4' },
  { id: 'guides', name: 'Guides', icon: '📖', color: '#84cc16' }
];

const DIFFICULTIES = [
  { id: 'all', name: 'All Levels', color: '#6b7280' },
  { id: 'beginner', name: 'Beginner', color: '#10b981' },
  { id: 'intermediate', name: 'Intermediate', color: '#f59e0b' },
  { id: 'advanced', name: 'Advanced', color: '#ef4444' }
];

const Resources = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const category = CATEGORIES.find(cat => cat.id === resource.category);
    return (
      <div className="resource-card">
        <div className="resource-card-header">
          <div className="resource-category" style={{ backgroundColor: category?.color + '20', color: category?.color }}>
            <span className="category-icon">{category?.icon}</span>
            <span className="category-name">{category?.name}</span>
          </div>
          <div className="resource-difficulty" style={{ backgroundColor: DIFFICULTIES.find(d => d.id === resource.difficulty)?.color + '20', color: DIFFICULTIES.find(d => d.id === resource.difficulty)?.color }}>
            {DIFFICULTIES.find(d => d.id === resource.difficulty)?.name}
          </div>
        </div>
        <div className="resource-card-content">
          <h3 className="resource-title">{resource.name}</h3>
          <p className="resource-description">{resource.desc}</p>
          <div className="resource-tags">
            {resource.tags.map(tag => (
              <span key={tag} className="resource-tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="resource-card-actions">
          <a 
            href={resource.file} 
            target="_blank" 
            rel="noopener noreferrer" 
            download
            className="download-btn"
          >
            <span className="btn-icon">📥</span>
            Download PDF
          </a>
          <button className="preview-btn" onClick={() => setPreviewUrl(resource.file)}>
            <span className="btn-icon">👁️</span>
            Preview
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="resources-page">
      <div className="resources-container">
        <section className="resources-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">📚</span>
              <span>Chess Resources</span>
            </div>
            <h1 className="hero-title">
              Master Chess with <span className="title-highlight">Premium Resources</span>
            </h1>
            <p className="hero-subtitle">
              Comprehensive guides, study materials, and tools to accelerate your chess improvement journey
            </p>
          </div>
        </section>
        <section className="results-section">
          <div className="resources-grid">
            {RESOURCES.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
        {previewUrl && (
          <div className="cz-modal-overlay" onClick={() => setPreviewUrl(null)}>
            <div className="cz-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: '95vw', height: '90vh', display: 'flex', flexDirection: 'column' }}>
              <button style={{ alignSelf: 'flex-end', marginBottom: 12, background: 'none', border: 'none', color: '#7fa7ff', fontSize: 24, cursor: 'pointer' }} onClick={() => setPreviewUrl(null)} aria-label="Close preview">✖</button>
              <iframe src={previewUrl} title="PDF Preview" style={{ flex: 1, width: '100%', height: '100%', border: 'none', borderRadius: 8, background: '#23263a' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources; 