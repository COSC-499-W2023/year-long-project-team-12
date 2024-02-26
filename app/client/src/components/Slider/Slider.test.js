import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from './Slider';

test('renders Slider component', () => {
    render(<Slider />);
    

    const firstImage = screen.getByAltText('Slide 1');
    expect(firstImage).toBeInTheDocument();

    const eastIcon = screen.getByTestId('eastIcon');
    expect(eastIcon).toBeInTheDocument();

    const westIcon = screen.getByTestId('westIcon');
    expect(westIcon).toBeInTheDocument();
    fireEvent.click(eastIcon);

    const secondImage = screen.getByAltText('Slide 2');
    expect(secondImage).toBeInTheDocument();
});


