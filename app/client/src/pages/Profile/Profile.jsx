import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import {useAuth} from "../../context/authContext";
import { useState } from "react";
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfilePicChanger from "./profilepicchanger.js";
import Posts from "../../components/Posts/Posts.jsx";





const Profile = () => {
  

  const [image, setImage] = useState(null);
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [text, setText]  = useState("Show");
  const [notificationCount, setNotificationCount] = useState(2);
  const [showModal, setShowModal] = useState(false);
  
  const toggle = () => {
    setOpen(!open);
    if (!open){
      setText("Hide")
    }
    else{
      setText("Show")
    }
  };


 
   

  const handleMyRequestsClick = () => {
    setShowRequests(!showRequests);
  };

  const handleRecordedVideosClick = () => {
     console.log("Recorded Videos button clicked!");
  };

  const handleNotificationsClick = () => {
    console.log("Notifications button clicked!");
    setNotificationCount(0);
  };

  const handleNewRequest = () => {
    setNotificationCount(notificationCount + 1);
  };

  const handleSettingsClick = () => {
    document.getElementById("myDropdown").classList.toggle("show");
    window.onclick = function(event){
      if (!event.target.matches('.settingsbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
     }
  }

  const dropdownSettings = () => {
    setShowSettings(!showSettings);
  }
  
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">          
          <div className="center">
            
            <ProfilePicChanger />
          
            <span>{currentUser.firstname} {currentUser.lastname}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{currentUser.role}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{currentUser.email}</span>
              </div>
            </div>
            
            <button onClick={handleMyRequestsClick} className="myRequestsButton"> {showRequests ? 'Hide My Requests' : 'Show My Requests'} </button>  
            <button onClick={handleRecordedVideosClick} className="recordedVideosButton">Recorded Videos</button>
            <button onClick={handleNotificationsClick} className="notificationsButton">
            <NotificationsIcon fontSize="large"
             className="notificationsButton"/>
            {notificationCount > 0 && (
              <span className="notificationCount">{notificationCount}</span>
            )}
            </button>
          <button onClick={dropdownSettings} className="settingsbtn">
                   <SettingsIcon fontSize="large"
                   className="settingsbtn"/> 
          </button>

          {showSettings && 
            <div className = "dropdown">
                <div id="myDropdown" className="dropdown-content">
                  <Link to="/changename">Change Name</Link>
                  <a href="#">Change Background photo</a>
                  <Link to="/changepassword">Change Password</Link>
                </div>
            </div>
          }
      

          </div>
        </div>

        
        {showRequests && (
              <div className="collapsibleContainer">
                <h2>My Requests</h2>
                <div className="collapsibleLists">
                <Posts displayLimit={5} />
                </div>
                <Link to="/jobs"><button  className="myRequestsButton"> Show More</button></Link>
  
              </div>
        )}
      </div>
      

        

    </div>
  );
};

export default Profile;