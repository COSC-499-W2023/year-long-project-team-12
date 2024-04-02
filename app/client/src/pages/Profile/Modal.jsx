
import ImageCropper from "./ImageCropper";
import CloseIcon from '@mui/icons-material/Close';


const Modal = ({ updateAvatar, closeModal }) => {
    const mystyle ={
        display: "inline-block", 
        backgroundColor: "light gray",
        fontSize: "16px",
        textalign: "center"
      };
  return (
    <div>
              <button
                type="button"
                onClick={closeModal}
              >
                <span style={mystyle}>Close menu</span>
                <CloseIcon />
              </button>
              <ImageCropper
                updateAvatar={updateAvatar}
                closeModal={closeModal}
              />
            </div>
       
  );
};
export default Modal;