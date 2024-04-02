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

  const updateAvatar = (imgSrc) => {
    setAvatarUrl(imgSrc);
    // Save the avatar URL to localStorage
    localStorage.setItem('avatarUrl', imgSrc);
  };

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
