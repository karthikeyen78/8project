import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useStateContext } from '../context';
import '../index.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { connect, address } = useStateContext();

    const navStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 30px rgba(79, 70, 229, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    };

    const logoStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        letterSpacing: '-0.02em',
        color: 'var(--color-text-main)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none'
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>
                <span style={{ fontSize: '1.8rem' }}>🚀</span>
                <span className="gradient-text">CrowdChain</span>
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/explore" style={{ color: 'var(--color-text-secondary)', fontWeight: '500', textDecoration: 'none' }}>Explore</Link>
                <Link to="/create-campaign" style={{ color: 'var(--color-text-secondary)', fontWeight: '500', textDecoration: 'none' }}>Start a Campaign</Link>
                <Link to="/how-it-works" style={{ color: 'var(--color-text-secondary)', fontWeight: '500', textDecoration: 'none' }}>How it Works</Link>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Button
                    variant={address ? "secondary" : "primary"}
                    size="sm"
                    onClick={() => {
                        if (address) navigate('/create-campaign');
                        else connect();
                    }}
                >
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
