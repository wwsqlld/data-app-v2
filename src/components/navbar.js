import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { CgDatabase } from "react-icons/cg";
import {useCookies} from 'react-cookie';

function Navbar() {

    const [cookies] = useCookies(["access_token"]);

  return (
    <div className='navbar'>
        <div className='logo-cont'>
            <CgDatabase size="50px" color='white' style={{ marginLeft: '10px' }} onClick={(e) => window.location.reload()} />
            <p id='logo-txt'>Database</p>
        </div>
        <div className='nav-cont'>
            <Link to="/" className='nav-btn' style={{ textDecoration: 'none'}} ><p>Home</p></Link>
            <Link to="/create" className='nav-btn' style={{ textDecoration: 'none'}} ><p>Create Data</p></Link>
            <Link to="/auth" className='nav-btn' style={{ textDecoration: 'none'}} >
                {cookies.access_token ? (<p>Account</p>) : (<p>Sign In</p>)}
            </Link>
        </div>
    </div>
  )
}

export default Navbar