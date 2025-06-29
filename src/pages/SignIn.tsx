import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Logo from '../logo.svg';

const whyCheckza = [
  { icon: '♟️', text: 'Track your chess progress' },
  { icon: '📈', text: 'Personalized lesson plans' },
  { icon: '🧩', text: 'Interactive puzzles & analysis' },
  { icon: '🏆', text: 'Unlock achievements & compete' },
];

const SignIn: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!email || !password) {
        setError('Please enter both email and password.');
        setLoading(false);
        return;
      }
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }
        navigate('/dashboard');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      padding: '2rem 0',
    }}>
      <div style={{
        background: '#23263a',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(67, 233, 123, 0.10)',
        padding: '2.5rem 2rem',
        minWidth: 320,
        maxWidth: 370,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img src={Logo} alt="Checkza logo" style={{ width: 44, height: 44, marginBottom: 10, borderRadius: 8 }} />
        <h2 style={{ color: '#7fa7ff', fontWeight: 800, fontSize: '1.7rem', marginBottom: 6, letterSpacing: '-1px', textAlign: 'center' }}>
          {isSignUp ? 'Create your account' : 'Sign in to Checkza'}
        </h2>
        <div style={{ color: '#b3b8d0', fontSize: '1.05rem', marginBottom: 18, textAlign: 'center' }}>
          {isSignUp ? 'Join the chess learning community.' : 'Welcome back! Log in to continue.'}
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: 8,
              border: '1.5px solid #31344a',
              background: '#232a2e',
              color: '#fff',
              fontSize: '1.05rem',
              marginBottom: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: 8,
              border: '1.5px solid #31344a',
              background: '#232a2e',
              color: '#fff',
              fontSize: '1.05rem',
              marginBottom: 10,
              outline: 'none',
              boxSizing: 'border-box',
            }}
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            required
          />
          {error && <div style={{ color: '#ff6b6b', marginBottom: 10, fontSize: '0.98rem', textAlign: 'center' }}>{error}</div>}
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
              color: '#181c24',
              border: 'none',
              borderRadius: 8,
              padding: '0.9rem',
              fontWeight: 700,
              fontSize: '1.08rem',
              marginTop: 8,
              marginBottom: 8,
              boxShadow: '0 2px 12px #43e97b22',
              cursor: 'pointer',
              transition: 'all 0.18s',
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? (isSignUp ? 'Signing up...' : 'Signing in...') : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>
        <div style={{ color: '#b3b8d0', fontSize: '0.98rem', marginTop: 10, textAlign: 'center' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              border: 'none',
              color: '#7fa7ff',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '0.98rem',
              padding: 0,
            }}
            type="button"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
        <div style={{ marginTop: 18, color: '#b3b8d0', fontSize: '0.93rem', textAlign: 'center' }}>
          <span style={{ fontSize: 18, marginRight: 6 }}>♟️</span>
          <span>Chess made simple. Your progress, your journey.</span>
        </div>
        <div style={{ marginTop: 10, color: '#b3b8d0', fontSize: '0.93rem', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#7fa7ff', textDecoration: 'underline' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 