import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboardComponent from '../components/AdminDashboardComponent';
import UserDashboardComponent from '../components/UserDashboardComponent';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  // 1. Loading State: Wait for Context to provide user data
  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div style={layoutStyles.wrapper}>
      {/* Universal Navbar for both roles */}
      <nav style={layoutStyles.nav}>
        <div style={layoutStyles.brand}>{(user?.role || "user").toUpperCase()}</div>
        <div style={layoutStyles.navItems}>
          {/* <span style={layoutStyles.userBadge}>{(user?.role || "user").toUpperCase()}</span> */}
          {/* <button onClick={logout} style={layoutStyles.logoutBtn}>Logout</button> */}
        </div>
      </nav>

      <main style={layoutStyles.mainContent}>
        {/* 2. ROLE-BASED RENDERING */}
        {user.role === 'admin' ? (
          <AdminDashboardComponent user={user} />
        ) : (
          <UserDashboardComponent user={user} />
        )}
      </main>
    </div>
  );
};

const layoutStyles = {
  wrapper: { minHeight: '100vh', backgroundColor: '#f4f7f6' },
  nav: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '15px 40px', 
    backgroundColor: '#fff', 
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
  },
  brand: { fontSize: '1.5rem', fontWeight: 'bold', color: '#646cff' },
  navItems: { display: 'flex', alignItems: 'center', gap: '20px' },
  userBadge: { backgroundColor: '#e0e0e0', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#ff4b2b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' },
  mainContent: { maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }
};

export default Dashboard;



















// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import '../css/Dashboard.css';

// const Dashboard = () => {
//     const [portfolio, setPortfolio] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPortfolio = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/api/portfolios/me', {
//                     headers: { 'x-auth-token': localStorage.getItem('token') }
                    
//                 });
//                 console.log(localStorage.getItem('token'));
//                 setPortfolio(res.data);
//             } catch (err) {
//                 console.log(err,"No portfolio yet");
//             }
//             setLoading(false);
//         };
//         fetchPortfolio();
//     }, []);

//     if (loading) return <div>Loading...</div>;

//     return (
//         <div className="dashboard-container">
//             <h1>User Dashboard</h1>
            
//             {!portfolio ? (
//                 // If NO portfolio exists
//                 <div className="empty-state">
//                     <p>You haven't created a portfolio yet.</p>
//                     <Link to="/builder" className="btn-create">🚀 Create Portfolio</Link>
//                 </div>
//             ) : (
//                 // If portfolio EXISTS
//                 <div className="portfolio-card">
//                     <h3>{portfolio?.basics?.name || "User"}'s Portfolio</h3>
//                     <p>Status: Published ✅</p>
                    
//                     <div className="dashboard-buttons">
//                         <Link to="/builder" className="btn-edit">Edit</Link>
//                         <Link to={`/preview/${portfolio.slug}`} className="btn-preview">Preview</Link>
//                         <button className="btn-download" onClick={() => window.print()}>Download PDF</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Dashboard;