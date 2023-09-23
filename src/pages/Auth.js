import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase.js';
import { useCookies } from 'react-cookie';

export const Auth = () => {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [cookies, setCookies, removeCookie] = useCookies(["access_token"]) 

    const signInWithEmail = () => {
        try {
            signInWithEmailAndPassword(auth, email, password).then((response) => {
                console.log(response)
                setCookies("access_token", response.user.uid);
            });
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    const signInWithGoogle = async () => {
        try {
           const result = await signInWithPopup(auth, provider);
           setCookies("access_token", result.user.uid);
        } catch (err) {
            console.log(err)
        }
        
    }

    const logOut = async () => {
        try {
            await signOut(auth)
            removeCookie("access_token");     
        } catch (err) {
            console.log(err)
        }
    }




    return (
        
        <div className='auth'>
            {cookies.access_token ? (
            <div>
                <button className='logOutButt' onClick={logOut}>Log Out</button>
            </div>
            ) : (
            <div className='auth-container'>
                <div className='auth-cont1'>
                    <div className='google-auth' onClick={signInWithGoogle}>
                        <FcGoogle size='40px' style={{ marginTop: '4px' }} />
                        <p>Sign In With Google</p>
                    </div>
                </div>
                
                <div className='auth-cont2'>
                    <input placeholder='Email' className='dat-inp' onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder='Password' className='dat-inp' type='password' onChange={(e) => setPassword(e.target.value)} />
                    <p style={{ color: 'white' }}>Don't have an account? <Link to='/register' style={{ textDecoration: 'none', color: 'darkviolet'}} >Register</Link> </p>
                    <button className='sign-btn' onClick={signInWithEmail}>Sign In</button>
                </div>
            </div>
            )}
        </div>
        
    )
}