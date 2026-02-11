import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useStateContext } from '../context';
import { daysLeft } from '../utils';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const { address, contract, getCampaigns } = useStateContext();
    const navigate = useNavigate();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        setCampaigns(data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCampaigns();
    }, [address, contract]);

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign });
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <Navbar />

            {/* Hero Section */}
            <section className="container" style={{
                padding: '5rem 1.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Abstract Background Glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(10,11,30,0) 70%)',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}></div>

                <h1 style={{
                    fontSize: 'var(--font-size-hero)',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.03em'
                }}>
                    Fund the Future <br />
                    <span className="gradient-text">On the Blockchain</span>
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                    lineHeight: '1.6'
                }}>
                    Transparency. Security. Global Reach. <br />
                    Launch your campaign or back the projects that matter to you.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button variant="primary" size="lg" onClick={() => navigate('/create-campaign')}>Start a Campaign</Button>
                    {/* <Button variant="secondary" size="lg">Explore Projects</Button> */}
                </div>
            </section>

            {/* Stats Board (Glassmorphism) - Could be dynamic later */}
            <section className="container" style={{ margin: '2rem auto 5rem' }}>
                <div className="glass-panel" style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '2rem',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-main)' }}>{campaigns.length}</div>
                        <div style={{ color: 'var(--color-text-muted)' }}>Active Campaigns</div>
                    </div>
                </div>
            </section>

            {/* Featured Campaigns */}
            <section className="container" style={{ paddingBottom: '5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>All Campaigns ({campaigns.length})</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {isLoading && <p>Loading campaigns...</p>}

                    {!isLoading && campaigns.length === 0 && (
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            No campaigns found. Be the first to start one!
                        </p>
                    )}

                    {!isLoading && campaigns.length > 0 && campaigns.map((camp) => (
                        <Card
                            key={camp.pId}
                            className="campaign-card"
                            onClick={() => handleNavigate(camp)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div style={{
                                height: '180px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                marginBottom: '1rem',
                                background: '#1c1c24'
                            }}>
                                <img
                                    src={camp.image}
                                    alt={camp.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=No+Image" }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', background: '#2c2f32', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                        {camp.category || 'Education'}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {camp.title}
                                </h3>
                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.5',
                                    height: '3em',
                                    overflow: 'hidden',
                                    marginBottom: '1rem'
                                }}>
                                    {camp.description}
                                </p>

                                <div style={{ marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Raised: <span style={{ color: 'var(--color-success)' }}>{camp.amountCollected}</span></span>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Goal: {camp.target}</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div style={{
                                        height: '6px',
                                        width: '100%',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '3px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${Math.min((parseFloat(camp.amountCollected) / parseFloat(camp.target)) * 100, 100)}%`,
                                            background: 'var(--color-accent)',
                                            borderRadius: '3px'
                                        }}></div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                            ⏱ {daysLeft(camp.deadline * 1000)} days left
                                        </span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                                Check it out
                                            </span>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#4b5264', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                                            👤
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                                            by <span style={{ color: 'var(--color-text-main)' }}>{camp.owner}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* How it Works Section */}
            <section className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem' }}>How It Works</h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[
                        { icon: '💼', title: 'Connect Wallet', desc: 'Link your crypto wallet like MetaMask to get started.' },
                        { icon: '🔎', title: 'Choose Campaign', desc: 'Browse verified projects and select one to support.' },
                        { icon: '⛓️', title: 'Track on Chain', desc: 'See exactly how your funds are used with blockchain transparency.' }
                    ].map((item, index) => (
                        <div key={index} style={{ flex: '1 1 300px', maxWidth: '350px' }}>
                            <div style={{
                                width: '80px', height: '80px',
                                background: 'var(--color-surface-hover)',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', margin: '0 auto 1.5rem',
                                border: '1px solid var(--border-color)'
                            }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section style={{
                background: 'linear-gradient(to top, var(--color-surface), transparent)',
                padding: '5rem 1rem',
                textAlign: 'center',
                marginTop: '2rem'
            }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Ready to Launch?</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Join the community and bring your ideas to life on the blockchain.</p>
                <Button variant="primary" size="lg" onClick={() => navigate('/create-campaign')}>Get Started Now</Button>
            </section>
        </div>
    );
};

export default Home;
