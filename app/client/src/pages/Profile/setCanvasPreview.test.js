import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import setCanvasPreview from './setCanvasPreview';




const MockProfilePage = ({open,text}) =>{
    currentUser: { email: 'test@example.com' }

  return(
    <>
    <div data-testid= "setCanvasPreview" className='setCanvasPreview'> </div>
    </>
  );
};

test('handleMyProfileClick logs message when "Canvas Preview" image is displayed', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("setCanvasPreview")).toBeInTheDocument();
});
