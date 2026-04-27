import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDashboardComponent = ({ user }) => {

    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/portfolios/me', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                    
                });
                console.log(localStorage.getItem('token'));
                setPortfolio(res.data);
            } catch (err) {
                console.log(err,"No portfolio yet");
            }finally {
            // This runs whether the 'try' succeeded OR the 'catch' failed
            setLoading(false); 
        }
        };
        fetchPortfolio();
    }, []);




  return (
    <div style={userStyles.container}>
      <h1>🚀 Welcome, {user.username}!</h1>
      <p>Your portfolio builder is ready.</p>
      
      <div style={userStyles.card}>
        <h3>Your Portfolio Status</h3>
        <p>Current Status: <strong>Draft</strong></p>
        <div style={userStyles.btnGroup}>
          <Link to="/builder"><button style={userStyles.btnPrimary}>Continue Building</button></Link>
          <Link to={`/preview/${portfolio?.slug || ''}`}>
  <button style={userStyles.btnSecondary} disabled={!portfolio}>
    Preview Site
  </button>
</Link>
        </div>
      </div>
    </div>
  );
};

const userStyles = {
  container: { padding: '20px' },
  card: { background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginTop: '20px' },
  btnGroup: { display: 'flex', gap: '15px', marginTop: '20px' },
  btnPrimary: { padding: '12px 25px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  btnSecondary: { padding: '12px 25px', backgroundColor: '#eee', color: '#333', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};

export default UserDashboardComponent;