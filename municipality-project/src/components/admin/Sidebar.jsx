import React from 'react';
import './Sidebar.css';
import logo from '../../assets/images/image13.jpg';
import { FaHome, FaNewspaper, FaCalendarAlt, FaHandsHelping, FaBullhorn, FaCog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Municipality Logo" className="sidebar-logo" />
        <h3>Municipality of Barelias</h3>
        <span>Admin</span>
      </div>
      <ul className="sidebar-menu">
        <li className={isActive('/dashboard') ? 'active' : ''}>
          <Link to="dashboard"><FaHome /> Dashboard</Link>
        </li>
        <li className={isActive('/news') ? 'active' : ''}>
          <Link to="news"><FaNewspaper /> News</Link>
        </li>
        <li><FaCalendarAlt /> Events</li>
        <li><FaHandsHelping /> Services</li>
        <li><FaBullhorn /> Complaints</li>
        <li><FaCog /> Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;