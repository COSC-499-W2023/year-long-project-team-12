import React from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import logo from "./logo.png";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="wrapper">
            
            <div className='left'>
               <img src={logo} alt="logo"></img>
            </div>
            
            <div className='center'>
                <Link className='link' to="/">EX-ZBT</Link>
            </div>

            <div className='right'>

                <div className="item">
                    <SwitchAccountIcon />
                    <Link className='link' to="/register">Register</Link>
                </div>

                <div className="item">
                    <LoginIcon/>
                    <Link  className='link' to="/login">Login</Link>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar