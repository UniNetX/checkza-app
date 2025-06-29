import React, { useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

interface EmailSignupFormProps {
  formEndpoint: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
}

const EmailSignupForm: React.FC<EmailSignupFormProps> = ({ 
  formEndpoint,
  title = "Sign Up for Updates",
  subtitle = "Get notified about new lessons, features, and chess tips!",
  placeholder = "Your email address",
  buttonText = "Get Started",
  successMessage = "Thank you! Check your email for a welcome message."
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEmailSignup } = useAnalytics();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(value === '' || validateEmail(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Track the email signup event
      trackEmailSignup(email);
      
      // Simulate form submission (in real implementation, this would be handled by Formspree)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const spinnerStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid currentColor',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  return (
    <div style={{ 
      background: '#23263a', 
      borderRadius: 12, 
      padding: 32, 
      color: '#fff', 
      maxWidth: 500, 
      margin: '2rem auto',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h3 style={{ 
        color: '#7fa7ff', 
        marginBottom: 8, 
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        {title}
      </h3>
      
      {subtitle && (
        <p style={{ 
          color: '#b3b8d0', 
          marginBottom: 24, 
          fontSize: '0.95rem',
          lineHeight: '1.5'
        }}>
          {subtitle}
        </p>
      )}

      {submitted ? (
        <div style={{ 
          color: '#43e97b', 
          fontWeight: 600,
          padding: '20px',
          background: '#43e97b20',
          borderRadius: 8,
          border: '1px solid #43e97b'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎉</div>
          {successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: 16 }}>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder={placeholder}
              disabled={isSubmitting}
              style={{ 
                padding: '12px 16px', 
                borderRadius: 8, 
                border: `2px solid ${isValid ? '#2d3142' : '#ff6b6b'}`, 
                width: '100%', 
                marginBottom: 8,
                background: '#1a1d2e',
                color: '#fff',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
            />
            {!isValid && email && (
              <div style={{ 
                color: '#ff6b6b', 
                fontSize: '0.85rem', 
                marginTop: 4 
              }}>
                Please enter a valid email address
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !email || !isValid}
            style={{ 
              background: isSubmitting || !email || !isValid 
                ? '#2d3142' 
                : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: isSubmitting || !email || !isValid ? '#666' : '#181c24', 
              fontWeight: 700, 
              border: 'none', 
              borderRadius: 8, 
              padding: '12px 24px', 
              cursor: isSubmitting || !email || !isValid ? 'not-allowed' : 'pointer', 
              width: '100%',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isSubmitting ? (
              <>
                <div style={spinnerStyle} />
                Sending...
              </>
            ) : (
              <>
                {buttonText}
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </>
            )}
          </button>
          
          <div style={{ 
            marginTop: 16, 
            fontSize: '0.8rem', 
            color: '#666',
            textAlign: 'center'
          }}>
            We respect your privacy. Unsubscribe at any time.
          </div>
        </form>
      )}
    </div>
  );
};

export default EmailSignupForm; 