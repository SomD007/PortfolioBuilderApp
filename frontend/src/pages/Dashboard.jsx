import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Dashboard.css';

const Dashboard = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/portfolios/me', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setPortfolio(res.data);
            } catch (err) {
                console.log("No portfolio yet");
            }
            setLoading(false);
        };
        fetchPortfolio();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <h1>User Dashboard</h1>
            
            {!portfolio ? (
                // If NO portfolio exists
                <div className="empty-state">
                    <p>You haven't created a portfolio yet.</p>
                    <Link to="/builder" className="btn-create">🚀 Create Portfolio</Link>
                </div>
            ) : (
                // If portfolio EXISTS
                <div className="portfolio-card">
                    <h3>{portfolio?.basics?.name || "User"}'s Portfolio</h3>
                    <p>Status: Published ✅</p>
                    
                    <div className="dashboard-buttons">
                        <Link to="/builder" className="btn-edit">Edit</Link>
                        <Link to={`/preview/${portfolio.slug}`} className="btn-preview">Preview</Link>
                        <button className="btn-download" onClick={() => window.print()}>Download PDF</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;