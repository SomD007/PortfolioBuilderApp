import {useState, useEffect} from 'react'
import axios from 'axios'
import Homepage from "./components/Homepage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Builder from "./pages/Builder.jsx";
import Auth from "./pages/Auth.jsx" // Import your Login/Register page
// Add these to the top of App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [serverStatus, setServerStatus] = useState("Checking...")

  useEffect(() => {
    //Checking connection to backend
    axios.get('http://localhost:5000/api/status')
    .then(res => setServerStatus(res.data.status))
    .catch(() => setServerStatus("Server Offline"));

  }, [])

  return (
    // <div style={{ textAlign: 'center', padding: '50px' }}>
    //   <h1>Portfolio Builder 🚀</h1>
    //   <p>Backend Status: <strong>{serverStatus}</strong></p>
    //   <button onClick={() => alert("Ready to build Section 1!")}>Get Started</button>
    // </div>
    <Router>
      {/* Everything inside <Routes> will change based on the URL. 
         Everything outside (like a Navbar) would stay on every page.
      */}
      <Routes>
        {/* If the URL is '/', show Homepage */}
        <Route path="/" element={<Homepage serverStatus={serverStatus} />} />

        {/* If the URL is '/auth', show the Login/Register form */}
        <Route path="/auth" element={<Auth />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/builder" element={<Builder />} />

        {/* If the URL is '/auth', show the Login/Register form */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )

}

export default App;
