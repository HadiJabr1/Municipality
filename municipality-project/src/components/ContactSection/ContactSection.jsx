import './ContactSection.css';
import ContactForm from './ContactForm';


const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>
              <span className="heading-line">Contact us for more</span>
              <span >information</span>
            </h2>
            <p>
              <span className="text-line">Have a question or need assistance? We're here to</span>
              <span className="text-line">help with services, permits, and local info. Contact</span>
              <span className="text-line">us by phone, email, or visit in person. Your input</span>
              <span className="text-line">helps us serve you better.</span>
            </p>
            
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

export default ContactSection