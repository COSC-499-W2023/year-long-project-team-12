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

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import handleSave from "./profilepicchanger.js";

 

function Profile() {

import Videos from "../../components/Videos/Videos.jsx";



const Profile = () => {
  const { currentUser } = useAuth();
  const [showRequests, setShowRequests] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [text, setText] = useState("Show");
  const [notificationCount, setNotificationCount] = useState(2);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  //  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);

  const toggle = () => {
    setOpen(!open);
    if (!open) {
      setText("Hide");
    }
    else {
      setText("Show");
    }
  };


  const [notificationCount, setNotificationCount] = useState(2);
 
  const handleMyRequestsClick = () => {
    setShowRequests(!showRequests);
    setShowVideos(false);
  };

  const handleRecordedVideosClick = () => {

    console.log("Recorded Videos button clicked!");

    setShowVideos(!showVideos);
    setShowRequests(false);

  };

  const handleNotificationsClick = () => {
    setNotificationCount(0);
  };

  const handleNewRequest = () => {
    setNotificationCount(notificationCount + 1);
  };


  const handleSettingsClick = () => {
    document.getElementById("myDropdown").classList.toggle("show");
    window.onclick = function (event) {
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
    };
  };


  const dropdownSettings = () => {
    setShowSettings(!showSettings);
  };

  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height);

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setOutput(base64Image);
  };

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover" />
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

            
            <button onClick={handleMyRequestsClick} className="myRequestsButton"> {showRequests ? 'Hide My Requests' : 'View My Requests'} </button>  
            <button onClick={handleRecordedVideosClick} className="recordedVideosButton">{showVideos ? 'Hide My Videos' : "Saved Videos"} </button>

            <button onClick={handleNotificationsClick} className="notificationsButton">
              <NotificationsIcon fontSize="large"
                className="notificationsButton" />
              {notificationCount > 0 && (
                <span className="notificationCount">{notificationCount}</span>
              )}
            </button>
            <button onClick={dropdownSettings} className="settingsbtn">
              <SettingsIcon fontSize="large"
                className="settingsbtn" />
            </button>

            {showSettings &&
              <div className="dropdown">
                <div id="myDropdown" className="dropdown-content">

                  
                  <a href="#">Change Profile Name</a>
      
                  <a href="">Change Background photo</a>
                  <a href="#">Change Password</a>
                </div>
              </div>}

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
            <Link to="/jobs"><button className="myRequestsButton"> Show More</button></Link>

          </div>
        )}
      </div>


      <div className="collapsibleContainer">
                <h2>My Requests</h2>
                <div className="collapsibleLists">
                <Posts displayLimit={5} />
                </div>
                <Link to="/jobs"><button  className="myRequestsButton"> Show More</button></Link>
              </div>
        )}

        {showVideos && (
              <div className="collapsibleContainer">
                <h2>My Videos</h2>
                <div className="collapsibleLists">
                  <Videos />
                </div>
                <Link to="/jobs"><button  className="myRequestsButton"> Show More</button></Link>
              </div>
        )}
      </div>
    </div>
  );
}

export default Profile;