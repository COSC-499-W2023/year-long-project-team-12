import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useAuth} from "../../context/authContext";
import MockJobsAppliedTo from "../../components/JobsApplliedTo/MockJobsAppliedTo";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfilePicChanger from "./profilepicchanger.js";
import Posts from "../../components/Posts/Posts.jsx";


const Profile = () => {

  const [image, setImage] = useState(null);
  const {  currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const[text, setText]  = useState("Show");
  const [notificationCount, setNotificationCount] = useState(0);
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
     // console.log("clicked!!")
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
            <button onClick={handleMyRequestsClick} className="myRequestsButton"> {showRequests ? 'Hide My Requests' : 'Show My Requests'}</button>  
            
             <button onClick={handleRecordedVideosClick} className="recordedVideosButton">Recorded Videos</button>
             <button onClick={handleNotificationsClick} className="notificationsButton">
             <NotificationsIcon fontSize="large"
             className="notificationsButton"/>
            {notificationCount > 0 && (
              <span className="notificationCount">{notificationCount}</span>
            )}
          </button>
           <div class = "dropdown">
              <button onClick= {handleSettingsClick} className="settingsbtn">
                   <SettingsIcon fontSize="large"
                   className="settingsbtn"/> 
              </button>
              <div id="myDropdown" class="dropdown-content">
                <a href="#">Change Profile Name</a>
                <a href="#">Change Background photo</a>
                <a href= "#">Change Password</a>
              </div>
              </div>
          </div>
          
        </div>
      </div>
      
       
          
          {open && (
            <div className="jobsAppliedToContainer">
            <h1>Requests Assigned to you</h1>
            <MockJobsAppliedTo />

            </div>
          )
          }

          {showRequests && (
              <div className="collapsibleContainer">
                <h2>My Requests</h2>
                <div className="collapsibleLists">
                <Posts displayLimit={5} />
                </div>
                <Link to="/jobs"><button  class="myRequestsButton"> Show More</button>  </Link>
  
              </div>
                    )}
        

    </div>
  );
};

export default Profile;