import React from 'react';
import '../index.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  disabled = false,
  fullWidth = false 
}) => {
  const baseStyles = {
    padding: size === 'sm' ? '0.5rem 1rem' : size === 'lg' ? '1rem 2rem' : '0.75rem 1.5rem',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    overflow: 'hidden',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
      color: 'white',
      boxShadow: '0 4px 15px var(--color-primary-glow)',
      border: 'none',
    },
    secondary: {
      background: 'var(--color-surface-hover)',
      color: 'white',
      border: '1px solid var(--border-color)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: 'none',
    }
  };

  const style = {
    ...baseStyles,
    ...variants[variant],
  };

  // Inline styles for hover effects would typically be handled in CSS, 
  // but for this component, we'll rely on classNames or internal state if needed for complex animations.
  // For now, simpler CSS classes in index.css or simple inline styles.
  // We'll add a 'btn' class for potential global overrides.

  return (
    <button 
      className={`btn ${className} ${!disabled ? 'glow-hover' : ''}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
