import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useStateContext } from '../context';
import '../index.css';

const Explore = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const { getCampaigns, contract } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        setCampaigns(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [contract]);

    const filteredCampaigns = campaigns.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <Navbar />

            <div className="container" style={{ padding: '3rem 1.5rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '2rem' }}>Explore Campaigns</h1>

                {/* Search */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap'
                }}>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '1rem 1.5rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--color-surface)',
                            color: 'white',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Loading State */}
                {isLoading && <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading blockchain data...</p>}
                {!isLoading && campaigns.length === 0 && <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>No campaigns found. Be the first to launch one!</p>}

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredCampaigns.map((camp) => (
                        <Card key={camp.pId} className="campaign-card">
                            <div style={{
                                height: '180px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                background: `var(--color-surface-hover)`,
                                marginBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={camp.image}
                                    alt="campaign"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x180?text=No+Image" }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{camp.title}</h3>
                            </div>

                            <p style={{
                                color: 'var(--color-text-secondary)',
                                fontSize: '0.9rem',
                                lineHeight: '1.5',
                                flex: 1,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {camp.description}
                            </p>

                            <div style={{ marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Raised: <span style={{ color: 'var(--color-success)' }}>{camp.amountCollected} ETH</span></span>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Goal: {camp.target} ETH</span>
                                </div>
                                <div style={{
                                    height: '6px',
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '3px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${(parseFloat(camp.amountCollected) / parseFloat(camp.target)) * 100}%`,
                                        background: 'var(--color-accent)',
                                        borderRadius: '3px'
                                    }}></div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', alignItems: 'center' }}>
                                    {/* Logic to calculate days left */}
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                        {(() => {
                                            const diff = camp.deadline * 1000 - Date.now();
                                            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                                            return days > 0 ? `⏱ ${days} days left` : 'Finished';
                                        })()}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        fullWidth={false}
                                        onClick={() => navigate(`/campaign-details/${camp.title.replace(/\s+/g, '-').toLowerCase()}`, { state: camp })}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;
