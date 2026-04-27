import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PortfolioPreview from '../components/PortfolioPreview'; // Adjust path
import '../css/PortfolioView.css'; // New CSS file for the top bar

const PortFolioView = () => {
    const { slug } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchPublicPortfolio = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return alert("Please Login First");

                // Fetch by slug from your public backend route
                const res = await axios.get(`http://localhost:5000/api/portfolios/${slug}`,{
                    headers: { 'x-auth-token': token }
                });
                setPortfolio(res.data);
            } catch (err) {
                console.error("Portfolio not found", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPublicPortfolio();
    }, [slug]);

    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return <div className="loading-screen">Loading...</div>;
    if (!portfolio) return <div className="not-found">Portfolio not found!</div>;

    return (
        <div className="portfolio-view-wrapper">
            {/* Top Bar with Slug and Copy Ability */}
            <div className="slug-banner">
                <div className="slug-info">
                    <span className="live-label">LIVE AT:</span>
                    <code className="slug-text">/{slug}</code>
                </div>
                <button 
                    className={`copy-btn ${copied ? 'copied' : ''}`} 
                    onClick={copyToClipboard}
                >
                    {copied ? "✓ Copied!" : "Copy Link"}
                </button>
            </div>

            {/* The Actual Portfolio - Same as Preview */}
            <div className="full-portfolio-container">
                <PortfolioPreview data={portfolio} />
            </div>
        </div>
    );
};

export default PortFolioView;