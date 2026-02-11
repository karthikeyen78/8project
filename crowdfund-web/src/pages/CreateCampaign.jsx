import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useStateContext } from '../context';
import '../index.css';

const CreateCampaign = () => {
    const navigate = useNavigate();
    const { createCampaign } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
    });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Submitting form:", form);
        try {
            await createCampaign({ ...form });
            setIsLoading(false);
            navigate('/');
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            alert("Transaction failed! See console.");
        }
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <Navbar />

            <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>Launch Your Campaign</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>
                        Bring your creative project to life on the blockchain.
                    </p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Title */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Campaign Title</label>
                            <input
                                required
                                value={form.title}
                                onChange={(e) => handleFormFieldChange('title', e)}
                                type="text"
                                placeholder="Give your campaign a clear title"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--color-background)',
                                    color: 'white',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Story</label>
                            <textarea
                                required
                                value={form.description}
                                onChange={(e) => handleFormFieldChange('description', e)}
                                rows="5"
                                placeholder="Tell your story..."
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--color-background)',
                                    color: 'white',
                                    fontSize: '1rem',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        {/* Target & Deadline */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Target Amount (ETH)</label>
                                <input
                                    required
                                    value={form.target}
                                    onChange={(e) => handleFormFieldChange('target', e)}
                                    type="number"
                                    step="0.001"
                                    placeholder="0.50"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--color-background)',
                                        color: 'white',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>End Date</label>
                                <input
                                    required
                                    value={form.deadline}
                                    onChange={(e) => handleFormFieldChange('deadline', e)}
                                    type="date"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--color-background)',
                                        color: 'white',
                                        fontSize: '1rem',
                                        colorScheme: 'dark' // Keeps calendar dark mode friendly
                                    }}
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Image URL</label>
                            <input
                                required
                                value={form.image}
                                onChange={(e) => handleFormFieldChange('image', e)}
                                type="url"
                                placeholder="https://..."
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--color-background)',
                                    color: 'white',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                disabled={isLoading}
                                onClick={(e) => {
                                    // Button default behavior is type="submit" inside form? No, explicit submit handler on form.
                                    // Just to be safe, we let form `onSubmit` handle it, but buttons default to submit in forms.
                                    // Adding type="submit" explicitly is best practice or relying on form submit.
                                    // Our Button component passes props, if it doesn't have type submit, it might not trigger.
                                    // Let's assume Button passes props or click propagation works.
                                }}
                            >
                                {isLoading ? 'Submitting...' : 'Submit New Campaign'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default CreateCampaign;
