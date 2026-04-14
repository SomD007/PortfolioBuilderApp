import {useState, useEffect} from 'react'
import axios from 'axios'
import NavigationBar from "./components/Navbar.jsx"
import Homepage from "./pages/Homepage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Builder from "./pages/Builder.jsx";
import Auth from "./pages/Auth.jsx" // Import your Login/Register page
import ColdEmailForm from './pages/ColdEmailForm.jsx';
import PortfolioView from "./pages/PortfolioView.jsx";
// Add these to the top of App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [serverStatus, setServerStatus] = useState("Checking...")

  useEffect(() => {
    //Checking connection to backend
    axios.get('http://localhost:5000/api/status')
    .then(res => setServerStatus(res.data.status))
    .catch(() => setServerStatus("Server Offline"));

  }, [])


  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogout = () => {
    // Clear tokens here later (e.g., localStorage.removeItem('token'))
    setIsLoggedIn(false);
  }

  return (
    // <div style={{ textAlign: 'center', padding: '50px' }}>
    //   <h1>Portfolio Builder 🚀</h1>
    //   <p>Backend Status: <strong>{serverStatus}</strong></p>
    //   <button onClick={() => alert("Ready to build Section 1!")}>Get Started</button>
    // </div>
    <>

    

    <Router>
      {/* Everything inside <Routes> will change based on the URL. 
         Everything outside (like a Navbar) would stay on every page.
      */}
        <NavigationBar />

      <Routes>
        {/* If the URL is '/', show Homepage */}
        <Route path="/" element={<Homepage serverStatus={serverStatus} />} />

        {/* If the URL is '/auth', show the Login/Register form */}
        <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/builder" element={<Builder />} />

        <Route path="/api-check" element={<ColdEmailForm />} />

        <Route path="/preview/:slug" element={<PortfolioView />} />

        {/* If the URL is '/auth', show the Login/Register form */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>


    

        </>
      
  )

}

export default App;
