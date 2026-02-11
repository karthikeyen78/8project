import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { useStateContext } from '../context';
import '../index.css';

const CampaignDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { donate, getDonators, address } = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [donators, setDonators] = useState([]);

    const fetchDonators = async () => {
        const data = await getDonators(state.pId);
        setDonators(data);
    }

    useEffect(() => {
        if (state) fetchDonators();
    }, [state, address]);

    const handleDonate = async () => {
        setIsLoading(true);
        await donate(state.pId, amount);
        navigate('/');
        setIsLoading(false);
    }

    // Handle case where user navigates directly without state
    if (!state) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading... or Go back to Explore</div>;

    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '3rem' }}>
            <Navbar />

            <div className="container">
                {/* Header */}
                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}>
                    <div style={{
                        width: '100%',
                        height: '400px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <img
                            src={state.image}
                            alt="campaign"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/800x400?text=No+Image" }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, #0a0b1e, transparent)',
                            padding: '2rem',
                            paddingTop: '5rem'
                        }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>{state.title}</h1>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                        {/* Left Column: Story & Donators */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <Card>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Creator</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '50px', height: '50px', borderRadius: '50%',
                                        background: 'var(--color-primary)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        👤
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '600' }}>{state.owner}</h4>
                                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>10 Campaigns</p>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Story</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                                    {state.description}
                                </p>
                            </Card>

                            <Card>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Donators</h3>
                                {donators.length > 0 ? (
                                    <div>List of donators would go here...</div>
                                ) : (
                                    <p style={{ color: 'var(--color-text-secondary)' }}>No donators yet. Be the first!</p>
                                )}
                            </Card>
                        </div>

                        {/* Right Column: Fund & Stats */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <Card>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Funded</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginTop: '0.5rem' }}>
                                    {state.amountCollected} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>of {state.target} ETH</span>
                                </div>
                                <div style={{
                                    height: '8px',
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    marginTop: '1rem'
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${Math.min((parseFloat(state.amountCollected) / parseFloat(state.target)) * 100, 100)}%`,
                                        background: 'var(--color-accent)',
                                        borderRadius: '4px'
                                    }}></div>
                                </div>
                            </Card>

                            <Card>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Fund this campaign</h3>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Amount in ETH"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: '1px solid var(--border-color)',
                                            background: 'var(--color-background)',
                                            color: 'white',
                                            fontSize: '1rem',
                                            marginBottom: '0.5rem'
                                        }}
                                    />
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                        Back it because you believe in it.
                                    </p>
                                </div>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={handleDonate}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Fund Campaign'}
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
