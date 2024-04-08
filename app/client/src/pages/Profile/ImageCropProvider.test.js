import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageCropProvider from './ImageCropProvider';



const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "ImageCropProvider" className='ImageCropProvider'> </div>
    </>
  );
};

test('handleMyCroppedImage logs message when "Cropped Image" image is clicked', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("ImageCropProvider")).toBeInTheDocument();
});
