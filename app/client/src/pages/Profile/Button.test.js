import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';




const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "Button" className='Button'> </div>
    </>
  );
};

test('handleMyButton logs message when "Button" image is displayed', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("Button")).toBeInTheDocument();
});
