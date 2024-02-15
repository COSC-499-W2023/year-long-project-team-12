import React from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import WorkIcon from '@mui/icons-material/Work';
import { useAuth } from "../../context/authContext"
import logo from "./logo.png";
import { useNavigate} from "react-router-dom";
import DarkMode from '../DarkMode/DarkMode';
import "./Navbar.scss";

const Navbar = () => {
    const { isCustomerAuthenticated,currentUser, logOut, isHiring} = useAuth();
    let navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLogout = (event) => {
        logOut()
        navigate("/home");
    };

    const confirmLogout = () => {
        handleLogout();
    }

    const cancelLogout = () => {
        setShowConfirmation(false);
    }
    

  return (
    <div>
        {
    isCustomerAuthenticated() ?
    
    <div className='navbar'>
        <div className="wrapper">
            
                <div className='left'>
                    <Link to="/home">
                    <img src={logo} alt="logo"></img>
                    </Link>
                    <DarkMode/>
                </div>
             
            
            
            <div className='center'>
            
            </div>

            <div className='right'>

                <div className="item">
                    <SwitchAccountIcon />
                    <Link className='link' to="/profile">{currentUser.username}</Link>
                </div>

                {isHiring(currentUser) && (
            <div className="item">
              <AddIcon />
              <Link className='link' to="/admin">Add a Request</Link>
            </div>
          )}

                <div className="item">
                    <WorkIcon />
                    <Link className='link' to="/jobs">Requests</Link>
                </div>
                
        
                <div className="item">
                    <LoginIcon/>
                    
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
               <DarkMode/>
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
                    <LoginIcon/>
                    <Link  className='link' to="/login">Login</Link>
                </div>

            </div>
        </div>
    </div>
}
    </div>
  )
}

export default Navbar;