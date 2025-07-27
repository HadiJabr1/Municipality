import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import News from './pages/News'
import Contact from './pages/Contact'
import './App.css'
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents'


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<UpcomingEvents />} />
            <Route path='/contact' element={<Contact/>}/>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App