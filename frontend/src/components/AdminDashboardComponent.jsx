import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './Admin/UserList';
import '../css/AdminDashboard.css';

const AdminDashboardComponent = ({ user }) => {
    const [data, setData] = useState({ users: [], portfolios: [], stats: {} });
    const [loading, setLoading] = useState(true);

    const config = {
        headers: { 'x-auth-token': localStorage.getItem('token') }
    };

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [uRes, pRes, sRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/users', config),
                    axios.get('http://localhost:5000/api/admin/portfolios', config),
                    axios.get('http://localhost:5000/api/admin/stats', config)
                ]);
                setData({ users: uRes.data, portfolios: pRes.data, stats: sRes.data });
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

            <UserList users={data.users} onDelete={handleDeleteUser} />

            <div className="admin-card">
                <h3>Global Controls</h3>
                <button className="btn-action btn-view">Update Template Access</button>
                <button className="btn-action btn-view">Push System Notice</button>
            </div>
        </div>
    );
};

export default AdminDashboardComponent;