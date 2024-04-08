import React, { useState } from 'react';
import Slider from '../../components/Slider/Slider';
import './Home.scss';

const Home = () => {
    const [hovered, setHovered] = useState(null);
  
    const handleHover = (index) => {
      setHovered(index);
    };
  
    const handleLeave = () => {
      setHovered(null);
    };

    const messages = [
      {
        title: 'About Us',
        content:
          'Exzbt is a platform where users can request and fulfill video requests. Whether you need a personalized message, a tutorial, or a promotional video, Exzbt connects you with creators who can bring your ideas to life.',
      },
      {
        title: 'Our Mission',
        content:
          'Our mission is to provide a seamless experience for users to request and fulfill video requests. We strive to connect talented creators with individuals and businesses looking for high-quality video content.',
      },
      {
        title: 'Why Choose Us?',
        content:
          'Exzbt offers a diverse range of video services, including personalized messages and profiles, notifications, and requests. With our user-friendly platform, you can trust us to deliver exceptional results every time.',
      },
      {
        title: 'Meet the Team',
        content:
          'Meet the owners of Exzbt: Hameed Karim, Oluwayemisi Ogungbemi, Tyler Rant, Jusnoor Kaur, and Philip Okorie. They are members of the Capstone 499 project.',
      },
    ];
  

  return (
    <div className="home">
      <div className="slider-background">
        <Slider />
      </div>
      <div className="landing-page">
      <header>
        <h1>Welcome to EX-ZBT</h1>
        <p>A place to request and fulfill video requests</p>
      </header>
      <main>
        <div className="bubbles-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`bubble ${hovered === index ? 'hovered' : ''}`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <h2>{message.title}</h2>
              {hovered === index && <p>{message.content}</p>}
            </div>
          ))}
        </div>
      </main>
     
    </div>
    </div>
  );
};

export default Home;
