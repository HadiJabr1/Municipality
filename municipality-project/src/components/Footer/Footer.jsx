import './Footer.css'
import image13 from '../../assets/images/image13.jpg'
import facebookIcon from '../../assets/images/Facebook.png'
import instagramIcon from '../../assets/images/Instagram.png'
const Footer = () => {
  return (
    <footer >
     <div className="header-container1">
             <div className="logo-container1">
               <img 
                 src={image13} 
                 alt="Municipality Logo1" 
                 className="municipality-logo1"
               />
               
             </div>
             
             <nav className="main-nav1">
               <ul>
                 <li><a href="/">Home</a></li>
                 <li><a href="/services">Services</a></li>
                 <li><a href="#">News</a></li>
                 <li><a href="#">Events</a></li>
                 <li><a href="#">Report Issue</a></li>
                 <li><a href="#">Contact</a></li>
                
               </ul>
             </nav>


          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
          </div>


           </div>
      
    </footer>
  )
}

export default Footer