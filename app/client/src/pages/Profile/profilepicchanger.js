import * as React from 'react';
import { useState, useEffect } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import "./profile.scss";
import { Input } from '@mui/base/Input';
import {useAuth} from "../../context/authContext";
import {getUserProfileImage, updateProfileImage, getUserById} from "../../services/ClientAPI"
import SettingsIcon from '@mui/icons-material/Settings';


const ProfilePicChanger = () => {
    const { currentUser, updateContextCurrentUser } = useAuth();
    const [image, setImage] = useState(null);
  
    const handleImageChange = (event) => {
      const selectedImage = event.target.files[0];

      try{
        const requestObject = new FormData();
        requestObject.append('image', selectedImage);

        updateProfileImage(currentUser.userId, requestObject).then(resp => {
          setImage(URL.createObjectURL(selectedImage));

          getUserById(currentUser.userId).then(res => {
            updateContextCurrentUser(res.data)
          })
        });
      } catch  {

      }
    };

    const retrieveUserProfileImage = async () => {
      try {
        if(currentUser.profileImageId){
          const imageURL = await getUserProfileImage(currentUser.userId);
          setImage(imageURL);
        }
      } catch (err) {
          console.error('Error fetching profile image:', err);
      }
    };
  
    const handleButtonClick = () => {
      // Trigger click on hidden file input
      document.getElementById('fileInput').click();
    };
  
    useEffect(() => {
      retrieveUserProfileImage();
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