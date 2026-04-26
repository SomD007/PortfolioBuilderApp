import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PortfolioForm from '../components/PortfolioForm';
import PortfolioPreview from '../components/PortfolioPreview';
import '../css/Builder.css';

const Builder = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Initial state updated to include textColor
    const [portfolioData, setPortfolioData] = useState({
        personalInfo: { fullname: '', bio: '', contactEmail: '', location: '' },
        education: [],
        skills: [],
        projects: [],
        settings: { 
            theme: 'minimal', 
            primaryColor: '#3b3bf7', 
            textColor: '#333333', // Default text color
            darkmode: false 
        }
    });

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return setLoading(false);

                const res = await axios.get('http://localhost:5000/api/portfolios/me', {
                    headers: { 'x-auth-token': token }
                });

                if (res.data) {
                    setPortfolioData(res.data);
                }
            } catch (err) {
                console.log("No previous portfolio found, starting fresh.");
            } finally {
                setLoading(false);
            }
        };
        loadPortfolio();
    }, []);

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value }
        }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return alert("Please Login First");

            const slug = portfolioData.slug || portfolioData.personalInfo.fullname
                .toLowerCase()
                .split(' ')
                .join('-') + '-' + Date.now();
            
            const payload = { ...portfolioData, slug };

            const res = await axios.post('http://localhost:5000/api/portfolios', payload, {
                headers: { 'x-auth-token': token }
            });

            alert("Portfolio Saved Permanently! 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error("Save Error:", err.response?.data || err.message);
            alert(err.response?.data?.msg || "Failed to save portfolio");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading your data...</div>;

    return (
        <div className="builder-layout">
            <button className="btn-save-floating" onClick={handleSave}>
                💾 Save Portfolio
            </button>
            
            <div className="form-column">
                {/* ThemeSelector is now a stable component called from outside */}
                <ThemeSelector data={portfolioData} setData={setPortfolioData} />

                <PortfolioForm 
                    data={portfolioData} 
                    setData={setPortfolioData} 
                    handleInfoChange={handleInfoChange} 
                />
            </div>

            <div className="preview-column">
                <div className="sticky-preview">
                    <PortfolioPreview data={portfolioData} />
                </div>
            </div>
        </div>
    );
};

/**
 * THEME SELECTOR COMPONENT
 * Defined outside Builder to prevent re-rendering/focus loss issues with color pickers
 */
const ThemeSelector = ({ data, setData }) => {
    const [availableTemplates, setAvailableTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                // Fetch the list of templates marked as isAvailable: true
                const res = await axios.get('http://localhost:5000/api/portfolios/templates');
                setAvailableTemplates(res.data);
            } catch (err) {
                console.error("Error fetching templates:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTemplates();
    }, []);

    const allThemes = [
        { id: 'dark', label: 'Dark Sidebar', accent: '#e94560' },
        { id: 'glass', label: 'Glassmorphism', accent: '#764ba2' },
        { id: 'minimal', label: 'Minimal Editorial', accent: '#3b3bf7' },
        { id: 'cyber', label: 'Cyberpunk', accent: '#00ff41' },
        { id: 'professional', label: 'Professional', accent: '#2c3e50' },
        { id: 'neumorphic', label: 'Soft Neumorphic', accent: '#4facfe' },
        { id: 'modern', label: 'Modern Dark', accent: '#2c3e50' }, // Added modern as it was in our seed
    ];

    // Filter themes: Only show those that exist in the backend AND are available
    // If the list is empty (loading or error), we show nothing to be safe
    const themesToShow = allThemes.filter(t => availableTemplates.some(at => at.name === t.id));

    // Helper to update settings object without wiping other data
    const updateSettings = (updates) => {
        setData(prev => ({
            ...prev,
            settings: { ...prev.settings, ...updates }
        }));
    };

    if (loading) return <div style={{ padding: '20px', color: '#888' }}>Checking available themes...</div>;
    
    // If no templates are available, show a warning
    if (themesToShow.length === 0 && !loading) {
        return (
            <div style={{ padding: '20px', background: '#fff5f5', color: '#c53030', borderRadius: '12px' }}>
                <p>⚠️ No templates are currently available. Please check back later.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#888', display: 'block', marginBottom: '10px' }}>Select Theme</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {themesToShow.map(t => (
                    <button
                        key={t.id}
                        onClick={() => updateSettings({ theme: t.id, primaryColor: t.accent })}
                        style={{
                            padding: '8px 12px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
                            border: data.settings.theme === t.id ? `2px solid ${data.settings.primaryColor}` : '1.5px solid #ddd',
                            background: data.settings.theme === t.id ? `${data.settings.primaryColor}15` : '#fff',
                            color: data.settings.theme === t.id ? data.settings.primaryColor : '#555',
                            transition: 'all 0.2s'
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                {/* Accent Color Picker */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '11px', color: '#888' }}>Accent Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            type="color"
                            value={data.settings.primaryColor || '#3b3bf7'}
                            onChange={e => updateSettings({ primaryColor: e.target.value })}
                            style={{ width: '40px', height: '30px', border: 'none', cursor: 'pointer', background: 'none' }}
                        />
                        <span style={{ fontSize: '11px', color: '#aaa', fontFamily: 'monospace' }}>{data.settings.primaryColor}</span>
                    </div>
                </div>

                {/* Text Color Picker */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '11px', color: '#888' }}>Text Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            type="color"
                            value={data.settings.textColor || '#333333'}
                            onChange={e => updateSettings({ textColor: e.target.value })}
                            style={{ width: '40px', height: '30px', border: 'none', cursor: 'pointer', background: 'none' }}
                        />
                        <span style={{ fontSize: '11px', color: '#aaa', fontFamily: 'monospace' }}>{data.settings.textColor}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Builder;