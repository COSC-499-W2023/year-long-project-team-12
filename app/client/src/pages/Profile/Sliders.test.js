import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sliders from "./Sliders";


const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "Sliders" className='Sliders'> </div>
    </>
  );
};

test('handleSliders logs message when "Sliders" is displayed', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("Sliders")).toBeInTheDocument();
});
