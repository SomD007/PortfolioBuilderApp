import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

  
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token); // Save Feature #1 JWT
        setToken(res.data.token);
        setUser(res.data.user);
        alert("Login Successful!");
        navigate('/dashboard'); // Go to Feature #2 Dashboard
      } else {
        alert("Registration Successful! Please Login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        
        {!isLogin && (
          <input 
            type="text" placeholder="Username" style={styles.input}
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
          />
        )}
        
        <input 
          type="email" placeholder="Email" style={styles.input} required
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        
        <input 
          type="password" placeholder="Password" style={styles.input} required
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />

        <button type="submit" style={styles.button}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={styles.toggle}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  card: { background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' },
  input: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  toggle: { marginTop: '15px', color: '#646cff', cursor: 'pointer', fontSize: '0.9rem' }
};

export default Auth;