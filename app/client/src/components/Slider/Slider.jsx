import React, { useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import "./Slider.scss"
const Slider = () => {


    const [currentSlide, setCurrentSlide] = useState(0);
    const data = [

    "https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    


    ];
    
    const prevSlide = () =>{
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
    }

  return (
    <div className='slider'>

        <div className='container' style = {{transform: `translateX(-${currentSlide * 100}vw)`}}>
            <img src={data[0]} alt='' />
            <img src={data[1]} alt='' />
            <img src={data[2]} alt='' />
        </div>

        <div className="icons">

            <div className="icon" onClick={prevSlide}>
                <WestIcon/>
            </div>

            <div className="icon" onClick={nextSlide}>
                <EastIcon/>
            </div>

        </div>

    </div>
  );
};

export default Slider;