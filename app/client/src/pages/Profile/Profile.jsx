import React, { useState } from 'react';
import './profile.scss';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import ProfilePicChanger from './profilepicchanger.js';
import Posts from '../../components/Posts/Posts.jsx';
import Videos from '../../components/Videos/Videos.jsx';

const Profile = () => {
  const { currentUser } = useAuth();
  const [showRequests, setShowRequests] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  const [notificationSidebarVisible, setNotificationSidebarVisible] = useState(false);

  const notifications = [
    'Notification 1',
    'Notification 2',
    'Notification 3',
    // ... additional notifications as needed
  ];

  const handleMyRequestsClick = () => {
    setShowRequests(!showRequests);
    setShowVideos(false);
  };

  const handleRecordedVideosClick = () => {
    setShowVideos(!showVideos);
    setShowRequests(false);
  };

  const handleNotificationsClick = () => {
    setNotificationSidebarVisible(!notificationSidebarVisible);
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
            <button onClick={handleMyRequestsClick} className="myRequestsButton">View My Requests</button>  
            <button onClick={handleRecordedVideosClick} className="recordedVideosButton">Saved Videos</button>
            <button onClick={handleNotificationsClick} className="notificationsButton">
              <NotificationsIcon fontSize="large" />
              {notificationCount > 0 && <span className="notificationCount">{notificationCount}</span>}
            </button>
            <button onClick={dropdownSettings} className="settingsbtn">
              <SettingsIcon fontSize="large" />
            </button>
            {showSettings && (
              <div className="dropdown">
                <div className="dropdown-content">
                  <Link to="/changename">Change Name</Link>
                  <a href="#">Change Background photo</a>
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

      {/* Notification Sidebar! */}
      <div className={`notificationSidebar ${notificationSidebarVisible ? 'visible' : ''}`}>
        {notifications.map((notification, index) => (
          <div key={index} className="notificationItem">{notification}</div>
        ))}
      </div>
    </div>
  );
};

export default Profile;


