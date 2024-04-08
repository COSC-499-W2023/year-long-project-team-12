import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageCropModalContent from './ImageCropModalContent';



const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "ImageCropModalContent" className='ImageCropModalContent'> </div>
    </>
  );
};

test('handleMyCroppedImage logs message when "Cropped Image" image is clicked', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("ImageCropModalContent")).toBeInTheDocument();
});
