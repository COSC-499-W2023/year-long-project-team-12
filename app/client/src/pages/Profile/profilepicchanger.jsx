import { useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Modal from './Modal';
import { readFile } from './cropImage';
import ImageCropModalContent from './ImageCropModalContent';
import { useImageCropContext } from './ImageCropProvider';

const ImageCrop = () => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(PersonAddAltIcon);

  const { getProcessedImage, setImage, resetStates } = useImageCropContext();

  const handleDone = async () => {
    const avatar = await getProcessedImage();
    setPreview(window.URL.createObjectURL(avatar));
    resetStates();
    setOpenModal(false);
  };

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];
    const imageDataUrl = await readFile(file);
    setImage(imageDataUrl);
    setOpenModal(true);
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="avatarInput"
        accept="image/*"
      />
      <label htmlFor="avatarInput" className="cursor-pointer">
        <img
          src={preview}
          height={192}
          width={192}
          className="object-cover rounded-full h-48 w-48"
          alt=""
        />
      </label>

      <Modal open={openModal} handleClose={() => setOpenModal(false)}>
        <ImageCropModalContent handleDone={handleDone} handleClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};

export default ImageCrop;
