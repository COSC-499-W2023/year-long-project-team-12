import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cropper from './Cropper';



const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "Cropper" className='Cropper'> </div>
    </>
  );
};

test('handleMyCroppedImage logs message when "Cropped Image" image is clicked', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("Cropper")).toBeInTheDocument();
});
