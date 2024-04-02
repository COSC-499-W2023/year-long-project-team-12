import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageCropper from './ImageCropper';




const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "imagecropper" className='imagecropper'> </div>
    </>
  );
};

test('handleMyProfileClick logs message when "My Profile pic" image has been cropped', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("imagecropper")).toBeInTheDocument();
});

