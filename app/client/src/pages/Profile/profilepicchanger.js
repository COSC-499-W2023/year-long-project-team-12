import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const Profilepic = () => {
  const [avatarUrl, setAvatarUrl] = useState(() => {
    // Retrieve the avatar URL from localStorage, or use default value if not found
    return localStorage.getItem('avatarUrl') || null;
  });
  const [modalOpen, setModalOpen] = useState(false);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875
  const updateAvatar = (imgSrc) => {
    setAvatarUrl(imgSrc);
    // Save the avatar URL to localStorage
    localStorage.setItem('avatarUrl', imgSrc);
<<<<<<< HEAD
=======
const ProfilePicChanger = () => {
    const { currentUser, updateContextCurrentUser } = useAuth();
    const [image, setImage] = useState(null);
  
    const handleImageChange = (event) => {
      const selectedImage = event.target.files[0];
=======
  };
>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875

  useEffect(() => {
    // Update the avatar URL when the component mounts
    if (avatarUrl) {
      localStorage.setItem('avatarUrl', avatarUrl);
    }
  }, [avatarUrl]);


  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={avatarUrl || <PersonAddAltIcon fontSize="large" className='img-display-before' />}
          alt="Avatar"
          className="img-display-after"

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
<<<<<<< HEAD
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
>>>>>>> cc8a9dd605522ec0a7377d687f92fd0666c1d996
  };
=======
>>>>>>> 2cc080134488e5fcd4bf6aa2a7662abd5e3b3875

        />
        <button
          onClick={() => setModalOpen(true)}
        >
          <EditRoundedIcon/>
        </button>
      </div>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profilepic;
