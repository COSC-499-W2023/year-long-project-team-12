import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import Drawer from '@mui/material/Drawer';
import {useAuth} from "../../context/authContext";
import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfilePicChanger from "./profilepicchanger.jsx";
import Posts from "../../components/Posts/Posts.jsx";
import Videos from "../../components/Videos/Videos.jsx";
import ImageCropProvider from "./ImageCropProvider.jsx";

import NotificationDrawer from "../../components/Notification/NotificationDrawer.jsx";
import { getNotifications, deleteAllNotifications, updateNotifications } from '../../services/ClientAPI';

const Profile = () => {
  const { currentUser } = useAuth();
  const [showRequests, setShowRequests] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [notifications, setMyNotifications] = useState([]);
  const [clearAll, setClear] = useState(false);

  const getMyNotifications = () => {
    getNotifications(currentUser.userId)
      .then((resp) => {
        let sorted = resp.data.sort((a,b) => b.created - a.created)
        .filter((notification) => !notification.viewed);
        setMyNotifications(sorted);
        setNotificationCount(sorted.length);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getMyNotifications();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
    updateNotifications(currentUser.userId);
  };
 
  
  const handleMyRequestsClick = () => {
    setShowRequests(!showRequests);
    setShowVideos(false);
  };

  const handleRecordedVideosClick = () => {
    setShowVideos(!showVideos);
    setShowRequests(false);
  };

  const handleNotificationsClick = () => {
    setNotificationCount(0);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setClear(true);

    deleteAllNotifications(currentUser.userId).then(response => {
      getNotifications(currentUser.userId).then((resp) => {
        setMyNotifications(resp.data);
        setNotificationCount(resp.data.length);
      })
    }).catch((err) => {});
  };

  const dropdownSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Profile background"
          className="cover"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
          <ImageCropProvider>
            <ProfilePicChanger />
          </ImageCropProvider>
          
            
           
          
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
            <button onClick={handleMyRequestsClick} className="myRequestsButton">View My Requests</button>  
            <button onClick={handleRecordedVideosClick} className="recordedVideosButton">Saved Videos</button>
            <button onClick={handleNotificationsClick} className="notificationsButton">
            <NotificationsIcon onClick={toggleDrawer(true)} fontSize="large"
             className="notificationsButton"/>
            {notificationCount > 0 && (
              <span className="notificationCount">{notificationCount}</span>
            )}
            </button>
            <button onClick={dropdownSettings} className="settingsbtn">
              <SettingsIcon fontSize="large" />
            </button>
            {showSettings && (
              <div className="dropdown">
                <div className="dropdown-content">
                  <Link to="/changename">Change Name</Link>
                  <Link to="/changepassword">Change Password</Link>
                  <Link to="/contactUs">Give Feedback</Link>
                </div>
              </div>
            )}
          </div>
        </div>
        {showRequests && <Posts displayLimit={5} />}
        {showVideos && <Videos />}
      </div>

        
        {showRequests && (
              <div className="collapsibleContainer">
                <h2>My Requests</h2>
                <div className="collapsibleLists">
                  <Posts displayLimit={5} />
                </div>
              </div>
        )}

        {showVideos && (
              <div className="collapsibleContainer">
                <h2>My Videos</h2>
                <div className="collapsibleLists">
                  <Videos />
                </div>
              </div>
        )}

        <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)}>
            <div className="notifDrawer"> 
              <div className="headingNotif">
                <h3>Notifications</h3>
                {(notifications.length > 0 && !clearAll) && <h4 onClick={handleClear}>CLEAR ALL</h4>}
              </div>  
                {!clearAll? <NotificationDrawer /> : <>No Notifications!</>}
            </div>
        </Drawer>
    </div>
  );
};

export default Profile;


