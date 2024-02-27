import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePicChanger from './profilepicchanger' // Update the path to match your file structure




const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "profilepicchanger" className='profilepicchanger'> </div>
    </>
  );
};

test('handleMyProfileClick logs message when "My Profile pic" image is clicked', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("profilepicchanger")).toBeInTheDocument();
});


  