import './QuickAccess.css'
import { FaArrowRight } from 'react-icons/fa'

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="service-card">
      <div className="service-icon">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#" className="service-link">
        Access Service <FaArrowRight />
      </a>
    </div>
  )
}

export default ServiceCard