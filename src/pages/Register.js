import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.js';
import {useCookies} from 'react-cookie';

export const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cookies] = useCookies(["access_token"]); 

    const RegisterUser = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            alert("Successful registration!");
            navigate('/auth');
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }


    useEffect(() => {
        if (cookies.access_token) {
            navigate('/')
        }
    }, [])




    return (
        <div className='auth'>
            <div className='auth-container'>
                <div className='auth-cont2'>
                    <input placeholder='Email' className='dat-inp' onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder='Password' className='dat-inp' type='password' onChange={(e) => setPassword(e.target.value)} />
                    <p style={{ color: 'white' }}>Already have an account? <Link to='/auth' style={{ textDecoration: 'none', color: 'darkviolet'}} >Sign In</Link> </p>
                    <button className='sign-btn' onClick={RegisterUser}>Register</button>
                </div>
            </div>
        </div>
    )
}