import React, { useState, useEffect } from 'react';

interface LichessEmbedProps {
  url: string;
  width?: number | string;
  height?: number | string;
}

const LichessEmbed: React.FC<LichessEmbedProps> = ({ url, width = '100%', height = 400 }) => {
  const [embedUrl, setEmbedUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError('');

    // Clean and validate the URL
    let cleanUrl = url.trim();
    
    // Handle different Lichess URL formats
    if (cleanUrl.includes('lichess.org/training/')) {
      // Direct puzzle URL - convert to embed format
      const puzzleId = cleanUrl.split('/training/')[1];
      if (puzzleId) {
        setEmbedUrl(`https://lichess.org/training/embed/${puzzleId}`);
      } else {
        setError('Invalid puzzle URL format');
      }
    } else if (cleanUrl.includes('lichess.org/study/')) {
      // Study URL - convert to embed format
      const studyId = cleanUrl.split('/study/')[1];
      if (studyId) {
        setEmbedUrl(`https://lichess.org/study/embed/${studyId}`);
      } else {
        setError('Invalid study URL format');
      }
    } else if (cleanUrl.includes('/embed/')) {
      // Already in embed format
      setEmbedUrl(cleanUrl);
    } else {
      setError('Please provide a valid Lichess puzzle or study URL');
    }

    setIsLoading(false);
  }, [url]);

  if (isLoading) {
    return (
      <div style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(35, 38, 58, 0.8)',
        borderRadius: 8,
        color: '#fff'
      }}>
        Loading puzzle...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(35, 38, 58, 0.8)',
        borderRadius: 8,
        color: '#ff6b6b',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div>
          <p style={{ marginBottom: '10px' }}>⚠️ {error}</p>
          <p style={{ fontSize: '14px', color: '#b8c5d6' }}>
            Try using a direct Lichess puzzle or study URL
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}>
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        title="Lichess Puzzle or Study"
        allowFullScreen
        style={{ 
          border: 'none', 
          width: '100%', 
          minHeight: 300, 
          borderRadius: 8,
          background: '#fff'
        }}
        onError={() => setError('Failed to load puzzle. Please check the URL.')}
      />
    </div>
  );
};

export default LichessEmbed; 