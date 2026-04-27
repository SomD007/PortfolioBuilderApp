import {useState, useEffect} from 'react'
import axios from 'axios'
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Homepage.css";
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';

function homepage(){

    return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      
      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>
      
    </div>
  );
    
    
    
    
    
    
    
    
    
    
    // return(
        
    //     <>
    //     <h1>Homepage</h1>
    //     // Inside your Homepage component return:
    //     <Link to="/auth">
    //         <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
    //             Login / Register
    //         </button>
    //     </Link>
    //     </>
        
    // );
}
export default homepage;