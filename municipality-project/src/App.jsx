import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import News from './pages/News';
import Contact from './pages/Contact';
import Complaints from './pages/Complaints';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import DashboardMain from './components/admin/DashboardMain';
import AdminNews from './components/admin/News';
import './App.css';
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header shows on all pages except admin */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Header />} />
        </Routes>
        
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<UpcomingEvents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin protected routes - nested under /admin with layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardMain />} />
              <Route path="news" element={<AdminNews />} /> 
              {/* Add more admin routes here as needed */}
            </Route>
            
            {/* Redirects */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer shows on all pages except admin */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;