import {useState, useEffect} from 'react'
import axios from 'axios'
import React from 'react';
import { Link } from 'react-router-dom';

function homepage(){

    return(
        
        <>
        <h1>Homepage</h1>
        // Inside your Homepage component return:
        <Link to="/auth">
            <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Login / Register
            </button>
        </Link>
        </>
        
    );
}
export default homepage;