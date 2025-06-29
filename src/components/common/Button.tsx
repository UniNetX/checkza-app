import React from 'react';
import '../../styles/components/button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'pill';
  className?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  iconLeft,
  iconRight,
  style = {},
}) => {
  return (
    <button
      type={type}
      className={`cz-btn cz-btn-${variant}${className ? ' ' + className : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {iconLeft && <span className="cz-btn-icon cz-btn-icon-left">{iconLeft}</span>}
      <span className="cz-btn-text">{children}</span>
      {iconRight && <span className="cz-btn-icon cz-btn-icon-right">{iconRight}</span>}
    </button>
  );
};

export default Button; 