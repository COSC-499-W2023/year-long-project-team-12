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
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import handleSave from "./profilepicchanger.js";

 

function Profile() {

<<<<<<< HEAD
  const [image, setImage] = useState(null);
=======
import Videos from "../../components/Videos/Videos.jsx";


const Profile = () => {
>>>>>>> cc8a9dd605522ec0a7377d687f92fd0666c1d996
=======
import Videos from "../../components/Videos/Videos.jsx";



const Profile = () => {
>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
  const { currentUser } = useAuth();
  const [showRequests, setShowRequests] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
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


<<<<<<< HEAD
=======
  const [notificationCount, setNotificationCount] = useState(2);
  
>>>>>>> cc8a9dd605522ec0a7377d687f92fd0666c1d996
=======
  const [notificationCount, setNotificationCount] = useState(2);
 
>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
  const handleMyRequestsClick = () => {
    setShowRequests(!showRequests);
    setShowVideos(false);
  };

  const handleRecordedVideosClick = () => {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log("Recorded Videos button clicked!");
=======
    setShowVideos(!showVideos);
    setShowRequests(false);
>>>>>>> cc8a9dd605522ec0a7377d687f92fd0666c1d996
=======

    console.log("Recorded Videos button clicked!");

    setShowVideos(!showVideos);
    setShowRequests(false);

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
  };

  const handleNotificationsClick = () => {
    setNotificationCount(0);
  };

  const handleNewRequest = () => {
    setNotificationCount(notificationCount + 1);
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
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

<<<<<<< HEAD
=======
>>>>>>> cc8a9dd605522ec0a7377d687f92fd0666c1d996
=======

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
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
<<<<<<< HEAD
<<<<<<< HEAD

            <button onClick={handleMyRequestsClick} className="myRequestsButton"> {showRequests ? 'Hide My Requests' : 'Show My Requests'} </button>
            <button onClick={handleRecordedVideosClick} className="recordedVideosButton">Recorded Videos</button>
=======
            
            <button onClick={handleMyRequestsClick} className="myRequestsButton"> {showRequests ? 'Hide My Requests' : 'View My Requests'} </button>  
            <button onClick={handleRecordedVideosClick} className="recordedVideosButton">{showVideos ? 'Hide My Videos' : "Saved Videos"} </button>
>>>>>>> cc8a9dd605522ec0a7377d687f92fd0666c1d996
=======


            <button onClick={handleMyRequestsClick} className="myRequestsButton"> {showRequests ? 'Hide My Requests' : 'Show My Requests'} </button>
            <button onClick={handleRecordedVideosClick} className="recordedVideosButton">Recorded Videos</button>

            
            <button onClick={handleMyRequestsClick} className="myRequestsButton"> {showRequests ? 'Hide My Requests' : 'View My Requests'} </button>  
            <button onClick={handleRecordedVideosClick} className="recordedVideosButton">{showVideos ? 'Hide My Videos' : "Saved Videos"} </button>

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
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
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
                  
                  <a href="#">Change Profile Name</a>
      
                  <a href="">Change Background photo</a>
                  <a href="#">Change Password</a>
                </div>
              </div>}
<<<<<<< HEAD
=======
=======

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
                  <Link to="/changename">Change Name</Link>
                  <a href="#">Change Background photo</a>
                  <Link to="/changepassword">Change Password</Link>
                </div>
            </div>
          }
<<<<<<< HEAD
      
>>>>>>> cc8a9dd605522ec0a7377d687f92fd0666c1d996
=======

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875

          </div>
        </div>


        {showRequests && (
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
          <div className="collapsibleContainer">
            <h2>My Requests</h2>
            <div className="collapsibleLists">
              <Posts displayLimit={5} />
            </div>
            <Link to="/jobs"><button className="myRequestsButton"> Show More</button></Link>

          </div>
        )}
      </div>


<<<<<<< HEAD


=======
              <div className="collapsibleContainer">
=======
      <div className="collapsibleContainer">
>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
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
<<<<<<< HEAD
>>>>>>> cc8a9dd605522ec0a7377d687f92fd0666c1d996
=======
>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
    </div>
  );
}

export default Profile;