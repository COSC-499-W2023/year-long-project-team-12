import * as React from 'react';
import { useState, useEffect } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import "./profile.scss";
import {useAuth} from "../../context/authContext";
import {getUserProfileImage, updateProfileImage, getUserById} from "../../services/ClientAPI";
import Modal from './Modal';
import { readFile } from './cropImage';
import ImageCropModalContent from './ImageCropModalContent';
import { useImageCropContext } from './ImageCropProvider';
import EditIcon from '@mui/icons-material/Edit';

const ProfilePicChanger = () => {
    const { currentUser, updateContextCurrentUser } = useAuth();
    const [image, setImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [preview, setPreview] = useState(PersonAddAltIcon);

    const { getProcessedImage, setImage: setImageContext, resetStates } = useImageCropContext();

    const handleDone = async () => {
      const avatar = await getProcessedImage();
      setPreview(window.URL.createObjectURL(avatar));
      resetStates();
      setOpenModal(false);
      try{
        const requestObject = new FormData();
        requestObject.append('image', avatar);

        updateProfileImage(currentUser.userId, requestObject).then(resp => {
          setImageContext(URL.createObjectURL(avatar));

          getUserById(currentUser.userId).then(res => {
            updateContextCurrentUser(res.data)
          })
        });
      } catch  {

      }
    };

    const handleFileChange = async ({ target: { files } }) => {
      const file = files && files[0];
        const imageDataUrl = await readFile(file);
        setImageContext(imageDataUrl);
        setOpenModal(true);
      
    };

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
          id="avatarInput"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      
      <label htmlFor="avatarInput" className="cursor-pointer">
      {image ? (
          <img
            src={image}
            alt="Profile"
            className='img-display-after'
            height={192}
            width={192}
          />
        ) : (
          <PersonAddAltIcon className='img-display-before' />
        )}
      </label>
      
    


    
       
      <Modal open={openModal} handleClose={() => setOpenModal(false)}>
        <ImageCropModalContent handleDone={handleDone} handleClose={() => setOpenModal(false)} />
      </Modal>
      </div>
    );
  };
  
  export default ProfilePicChanger;