import React from 'react';
import './ContactUs.css';
// Import council member images
import image36 from '../../assets/images/image36.png';
import image37 from '../../assets/images/image37.png';
import image38 from '../../assets/images/image38.png';
import image39 from '../../assets/images/image39.png';
import image40 from '../../assets/images/image40.png';
import image41 from '../../assets/images/image41.png';
import image42 from '../../assets/images/image42.png';
import image43 from '../../assets/images/image43.png';
import image44 from '../../assets/images/image44.png';
import image45 from '../../assets/images/image45.png';
// Import map image
import image46 from '../../assets/images/image46.png';

const ContactUs = () => {
  return (
    <div className="page-container">
      {/* Contact Us Section - No background */}
      <section className="contact-section-no-bg">
        <h1>Contact Us</h1>
        <p className="contact-subtext">
          We're here to help. Reach out to us with any questions or concerns.
        </p>

        <h2>General Inquiries</h2>
        <p className="contact-info-text">
          For general inquiries, please contact us using the information below:
        </p>

        <div className="contact-details-list">
          <div className="contact-detail-item">
            <h3>Address</h3>
            <p>123 Main Street, Willow</p>
            <p>Creek, CA 91234</p>
          </div>
          <div className="contact-detail-item">
            <h3>Email</h3>
            <p>info@willowcreektown.gov</p>
          </div>
          <div className="contact-detail-item">
            <h3>Phone</h3>
            <p>(555) 123-4567</p>
          </div>
        </div>
      </section>

      {/* Council Members Section */}
      <section className="council-section">
        <h2>Council Members</h2>
        <div className="council-members-grid">
          {[
            { name: "Mayor Olivia Bennett", title: "Mayor", image: image36 },
            { name: "Council Member Ethan Carter", image: image37 },
            { name: "Council Member Sophia Davis", image: image38 },
            { name: "Council Member Liam Foster", image: image39 },
            { name: "Council Member Ava Green", image: image40 },
            { name: "Council Member Noah Harris", image: image41 },
            { name: "Council Member Chloe Clark", image: image42 },
            { name: "Council Member Owen Turner", image: image43 },
            { name: "Council Member Mia Walker", image: image44 },
            { name: "Council Member Jackson Reed", image: image45 },
          ].map((member, index) => (
            <div className="council-member-card" key={index}>
              <img 
                src={member.image} 
                alt={member.name}
                className="council-member-image"
              />
              <h3>{member.name}</h3>
              <p>{member.title || "Council Member"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="visit-section">
        <h2>Visit Us</h2>
        <img
          src={image46}
          alt="Local map showing Springfield College, Forest Park, and Zoo"
          className="location-map"
        />
      </section>

       {/* New Contact Form Section */}
      <section className="contact-form-section">
        <h2>Contact Form</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="Enter the subject"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="form-textarea"
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;