import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';




const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "modal" className='modal'> </div>
    </>
  );
};

test('handleMyProfileClick logs message when "Modal" image has been displayed', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("modal")).toBeInTheDocument();
});

