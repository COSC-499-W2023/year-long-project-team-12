import * as React from 'react';
import { useRef, useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import "./profile.scss";
import { Input } from '@mui/base/Input';
import {useAuth} from "../../context/authContext";
import SettingsIcon from '@mui/icons-material/Settings';


const ProfilePicChanger = () => {
    const {  currentUser } = useAuth();
    const [image, setImage] = useState(null);
    const localStorageKey = `profileImage_${currentUser.email}`; // Dynamic key based on user ID
  
  
    const handleImageChange = (event) => {
      const selectedImage = event.target.files[0];
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage(imageUrl);
      localStorage.setItem(localStorageKey, imageUrl); // Save image URL to local storage
    };
  
    const handleButtonClick = () => {
      // Trigger click on hidden file input
      document.getElementById('fileInput').click();
    };
  
    // Retrieve profile image URL from local storage on component mount
    useState(() => {
      const storedImage = localStorage.getItem(localStorageKey);
      if (storedImage) {
        setImage(storedImage);
      }
    }, []);
  
    return (
      <div className='profilepicchanger'>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div onClick={handleButtonClick}>
          {image ? (
            <img src={image} alt="Profile" className='img-display-after'  />
          ) : (
            <PersonAddAltIcon fontSize="large" className='img-display-before' />
          )}
        </div>
      </div>
    );
  };
  
  export default ProfilePicChanger;