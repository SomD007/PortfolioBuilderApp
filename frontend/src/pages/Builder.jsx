import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PortfolioForm from '../components/PortfolioForm';
import PortfolioPreview from '../components/PortfolioPreview';
import '../css/Builder.css';

const Builder = () => {
    const navigate = useNavigate();

    const [portfolioData, setPortfolioData] = useState({
        personalInfo: { fullname: '', bio: '', contactEmail: '', location: '' },
        education: [],
        skills: [],
        projects: [],
        settings: { theme: 'minimal', primaryColor: '#007bff', darkmode: false }
    });

    // Handler for Nested personalInfo fields
    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value }
        }));
    };

    // Permanent Save to MongoDB
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return alert("Please Login First");

            // Generate slug from name
            const slug = portfolioData.personalInfo.fullname
                .toLowerCase()
                .split(' ')
                .join('-') + '-' + Date.now();
            
            const payload = { ...portfolioData, slug };

            // Ensure your backend URL is correct
            const res = await axios.post('http://localhost:5000/api/portfolios', payload, {
                headers: { 'x-auth-token': token }
            });

            alert("Portfolio Saved Permanently! 🚀");
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || "Failed to save portfolio");
        }
    };

    return (
        <div className="builder-layout">
            <button className="btn-save-floating" onClick={handleSave}>
                💾 Save Portfolio
            </button>
            
            <div className="form-column">
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

export default Builder;