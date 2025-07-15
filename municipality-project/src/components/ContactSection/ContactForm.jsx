import './ContactForm.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { submitContactForm } from '../../redux/actions'

const ContactForm = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    acceptedTerms: false
  })
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(submitContactForm(formData))
    alert('Thank you for your message! We will contact you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      acceptedTerms: false
    })
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
     
      
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder='Full Name'
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <input
          type="tel"
          name="phone"
          placeholder='Mobile Number'
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <textarea
          name="message"
          placeholder='Message'
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
      </div>
      
      <div className="form-group terms">
        <input
          type="checkbox"
          name="acceptedTerms"
          checked={formData.acceptedTerms}
          onChange={handleChange}
          required
        />
        <label>Accept Terms And Conditions</label>
      </div>
      
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  )
}

export default ContactForm