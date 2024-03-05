import React, { useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from "../../context/authContext"
import logo from "./logo.png";
import { useNavigate} from "react-router-dom";
import DarkMode from '../DarkMode/DarkMode';
import {getUserProfileImage} from "../../services/ClientAPI"
import "./Navbar.scss";

const Navbar = () => {
    const { isCustomerAuthenticated,currentUser, logOut, isHiring} = useAuth();
    let navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLogout = (event) => {
        setShowConfirmation(true);
    };

    const confirmLogout = () => {
        logOut();
        navigate("/home");
    }

    const cancelLogout = () => {
        setShowConfirmation(false);
    }
    
    return (
        <div>
            {isCustomerAuthenticated() ?

                <div className='navbar'>
                    <div className="wrapper">

                        <div className='left'>
                            <div className='goBack'><ArrowBackIcon onClick={()=> navigate(-1)} /><ArrowForwardIcon onClick={()=> navigate(1)} /></div>
                            <Link to="/home">
                                <img src={logo} alt="logo"></img>
                            </Link>
                            <DarkMode />
                        </div>

                        <div className='center'>
                        
                        </div>

                        <div className='right'>
                            <Link className='link' to="/profile">
                                <div className="item" >
                                    {currentUser.profileImageId? 
                                        <img src={getUserProfileImage(currentUser.userId)} alt='profilePic' style={{width:'2em', 
                                        height:'2em', borderRadius:'50%', marginRight:'2px'
                                    }}/>
                                        :
                                        <SwitchAccountIcon />
                                    }
                                    
                                    {currentUser.username}
                                </div>
                            </Link>
                            

                            
                                {isHiring(currentUser) && (
                                    <div className="item">
                                        <AddIcon />
                                        <Link className='link' to="/admin">Add a Request</Link>
                                    </div>
                                )}

                                <div className="item">

                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            
                            

                        </div>
                    </div>
                </div> :

                <div className='navbar'>
                    <div className="wrapper">

                        <div className='left'>
                            <Link to="/home">
                                <img src={logo} alt="logo"></img>
                            </Link>
                            <DarkMode />
                        </div>



                        <div className='center'>
                            <Link className='link' to="/home">EX-ZBT</Link>

                        </div>

                        <div className='right'>

                            <div className="item">
                                <SwitchAccountIcon />
                                <Link className='link' to="/register">Register</Link>
                            </div>

                            <div className="item">
                                <LoginIcon />
                                <Link className='link' to="/login">Login</Link>
                            </div>

                        </div>
                    </div>
                </div>
            }

            {showConfirmation &&
                <div className='modalbackground'>
                    <div className="confirmation-dialog">
                        <p>Are you sure you want to logout?</p>

                        <div className="button-container">
                            <button onClick={confirmLogout}>Yes</button>
                            <button onClick={cancelLogout}>No</button>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Navbar;