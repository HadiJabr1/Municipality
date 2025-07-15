import React from 'react';
import './HeroSection.css';
import heroBg from '../../assets/images/hero-bg.png'

const HeroSection = () => {
  return (
    <section 
      className="municipality-hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-content">
        <h2>Municipality of Barellas</h2>
        <p>Your community hub for information, services, and engagement.</p>
        <button className="btn-primary">Explore Services</button>
      </div>
    </section>
  );
};

export default HeroSection;
