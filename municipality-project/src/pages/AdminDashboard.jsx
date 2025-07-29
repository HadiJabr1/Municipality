// src/pages/AdminDashboard.jsx
import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import DashboardMain from '../components/admin/DashboardMain';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <DashboardMain />
    </div>
  );
};

export default AdminDashboard;
