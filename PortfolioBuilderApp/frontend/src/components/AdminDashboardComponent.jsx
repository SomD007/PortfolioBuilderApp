import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './Admin/UserList';
import PortfolioList from './Admin/PortfolioList';
import TemplateControls from './Admin/TemplateControls';
import '../css/AdminDashboard.css';

const AdminDashboardComponent = ({ user }) => {
    const [data, setData] = useState({ users: [], portfolios: [], stats: {}, templates: [] });
    const [loading, setLoading] = useState(true);

    const config = {
        headers: { 'x-auth-token': localStorage.getItem('token') }
    };

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [uRes, pRes, sRes, tRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/users', config),
                    axios.get('http://localhost:5000/api/admin/portfolios', config),
                    axios.get('http://localhost:5000/api/admin/stats', config),
                    axios.get('http://localhost:5000/api/admin/templates', config)
                ]);
                setData({ users: uRes.data, portfolios: pRes.data, stats: sRes.data, templates: tRes.data });
            } catch (err) {
                console.error("Error fetching admin data");
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    const handleDeleteUser = async (id) => {
        if (window.confirm("Delete this user and all their data?")) {
            await axios.delete(`http://localhost:5000/api/admin/user/${id}`, config);
            setData({ ...data, users: data.users.filter(u => u._id !== id) });
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/admin/user/${id}/toggle-status`, {}, config);
            setData({
                ...data,
                users: data.users.map(u => u._id === id ? { ...u, isActive: res.data.isActive } : u)
            });
        } catch (err) {
            console.error("Error toggling user status");
        }
    };

    const handleToggleFeatured = async (id) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/admin/portfolio/${id}/toggle-featured`, {}, config);
            setData({
                ...data,
                portfolios: data.portfolios.map(p => p._id === id ? { ...p, isFeatured: res.data.isFeatured } : p)
            });
        } catch (err) {
            console.error("Error toggling portfolio featured status");
        }
    };

    const handleUpdateTemplate = async (id, updates) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/admin/templates/${id}`, updates, config);
            setData({
                ...data,
                templates: data.templates.map(t => t._id === id ? res.data : t)
            });
        } catch (err) {
            console.error("Error updating template");
        }
    };

    if (loading) return <div>Initializing Admin Console...</div>;

    return (
        <div className="admin-grid">
            <h2>System Overview</h2>
            
            <div className="stats-row">
                <div className="stat-item">
                    <h4>Total Users</h4>
                    <h2>{data.stats.userCount}</h2>
                </div>
                <div className="stat-item">
                    <h4>Portfolios Created</h4>
                    <h2>{data.stats.portfolioCount}</h2>
                </div>
            </div>

            <UserList users={data.users} onDelete={handleDeleteUser} onToggleStatus={handleToggleStatus} />

            <PortfolioList portfolios={data.portfolios} onToggleFeatured={handleToggleFeatured} />

            <TemplateControls templates={data.templates} onUpdateTemplate={handleUpdateTemplate} />

            <div className="admin-card">
                <h3>Global Controls</h3>
                <button className="btn-action btn-view">Update Template Access</button>
                <button className="btn-action btn-view">Push System Notice</button>
            </div>
        </div>
    );
};

export default AdminDashboardComponent;