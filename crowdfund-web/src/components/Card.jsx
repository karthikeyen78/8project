import React from 'react';
import '../index.css';

const Card = ({ children, className = '', hoverEffect = true }) => {
    const baseStyle = {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    };

    return (
        <div
            className={`glass-panel ${hoverEffect ? 'glow-hover' : ''} ${className}`}
            style={baseStyle}
        >
            {children}
        </div>
    );
};

export default Card;
