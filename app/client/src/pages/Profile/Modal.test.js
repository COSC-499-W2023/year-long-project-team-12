import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';



const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "Modal" className='Modal'> </div>
    </>
  );
};

test('handleModal logs message when "Modal" is displayed', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("Modal")).toBeInTheDocument();
});
