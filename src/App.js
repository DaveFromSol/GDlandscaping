import React, { useState, useEffect } from 'react';
import './App.css';
import { useFirebaseData } from './hooks/useFirebaseData';
import Dashboard from './components/Dashboard';
import Equipment from './components/Equipment';
import Schedule from './components/Schedule';
import Clients from './components/Clients';
import Projects from './components/Projects';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import ContactInquiries from './components/ContactInquiries';
import Website from './website/Website';
import { checkAndSeedUsers } from './utils/seedUsers';

function App() {
  const { dashboardData, loading, error } = useFirebaseData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Demo user data for authentication
  const demoUsers = {
    'admin@gdlandscaping.com': {
      id: 1,
      name: 'Admin User',
      email: 'admin@gdlandscaping.com',
      role: 'admin',
      permissions: ['all'],
      status: 'active'
    },
    'manager@gdlandscaping.com': {
      id: 2,
      name: 'Mike Rodriguez',
      email: 'manager@gdlandscaping.com',
      role: 'manager',
      permissions: ['dashboard', 'schedule', 'clients', 'equipment', 'reports'],
      status: 'active'
    },
    'employee@gdlandscaping.com': {
      id: 3,
      name: 'Sarah Johnson',
      email: 'employee@gdlandscaping.com',
      role: 'employee',
      permissions: ['schedule', 'equipment'],
      status: 'active'
    }
  };

  const handleLogin = async (user) => {
    // For demo purposes, check against demo users
    const demoUser = demoUsers[user.email];
    if (demoUser) {
      setCurrentUser(demoUser);
      setIsAuthenticated(true);
      
      // If admin is logging in, check and seed users
      if (demoUser.role === 'admin') {
        try {
          await checkAndSeedUsers();
        } catch (error) {
          console.error('Error seeding users:', error);
        }
      }
    } else {
      // For real Firebase auth, you would use the user object directly
      setCurrentUser({
        id: Date.now(),
        name: user.displayName || user.email,
        email: user.email,
        role: 'employee',
        permissions: ['schedule', 'equipment'],
        status: 'active'
      });
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  const hasPermission = (permission) => {
    if (!currentUser) return false;
    if (currentUser.permissions.includes('all')) return true;
    return currentUser.permissions.includes(permission);
  };

  const [jobs, setJobs] = useState([
    { 
      id: 1, 
      title: 'Smith Residence - Weekly Maintenance', 
      date: '2025-01-02', 
      time: '09:00',
      client: 'John Smith',
      address: '123 Oak Street, Anytown, ST 12345',
      phone: '(555) 123-4567',
      status: 'completed',
      notes: 'Lawn mowing and hedge trimming',
      revenue: 150,
      materialCosts: 25,
      laborAssignments: [
        { employeeId: 1, hours: 3, paidAmount: 75 },
        { employeeId: 3, hours: 2, paidAmount: 40 }
      ]
    },
    { 
      id: 2, 
      title: 'Corporate Office - Landscaping', 
      date: '2025-01-03', 
      time: '14:00',
      client: 'ABC Corp',
      address: '456 Business Park Drive, Corporate City, ST 67890',
      phone: '(555) 987-6543',
      status: 'completed',
      notes: 'New flower bed installation',
      revenue: 800,
      materialCosts: 150,
      laborAssignments: [
        { employeeId: 1, hours: 8, paidAmount: 200 },
        { employeeId: 2, hours: 6, paidAmount: 132 }
      ]
    },
    { 
      id: 3, 
      title: 'Johnson Property - Tree Removal', 
      date: '2025-01-04', 
      time: '08:00',
      client: 'Mary Johnson',
      address: '789 Maple Avenue, Hometown, ST 13579',
      phone: '(555) 555-0123',
      status: 'pending',
      notes: 'Remove damaged oak tree',
      revenue: 500,
      materialCosts: 50,
      laborAssignments: []
    }
  ]);

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error-container">
          <p>Error loading dashboard: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <div>
            <h1 className="company-name">GD Landscaping</h1>
            <p className="tagline">Professional Landscape Solutions</p>
          </div>
          <div className="user-info">
            <span className="welcome-text">Welcome, {currentUser?.name}</span>
            <span className="user-role-badge">{currentUser?.role}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <nav className="navigation">
        <ul className="nav-list">
          {hasPermission('dashboard') && (
            <li><button 
              className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >Dashboard</button></li>
          )}
          {hasPermission('schedule') && (
            <li><button 
              className={`nav-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >Projects</button></li>
          )}
          {hasPermission('clients') && (
            <li><button 
              className={`nav-btn ${activeTab === 'clients' ? 'active' : ''}`}
              onClick={() => setActiveTab('clients')}
            >Clients</button></li>
          )}
          {hasPermission('schedule') && (
            <li><button 
              className={`nav-btn ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >Schedule</button></li>
          )}
          {hasPermission('equipment') && (
            <li><button 
              className={`nav-btn ${activeTab === 'equipment' ? 'active' : ''}`}
              onClick={() => setActiveTab('equipment')}
            >Equipment</button></li>
          )}
          {hasPermission('reports') && (
            <li><button 
              className={`nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >Reports</button></li>
          )}
          {hasPermission('users') && (
            <li><button 
              className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >Users</button></li>
          )}
          {hasPermission('users') && (
            <li><button 
              className={`nav-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('inquiries')}
            >📧 Inquiries</button></li>
          )}
          {hasPermission('settings') && (
            <li><button 
              className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >Settings</button></li>
          )}
          <li><button 
            className={`nav-btn ${activeTab === 'website' ? 'active' : ''}`}
            onClick={() => setActiveTab('website')}
          >🌐 Website</button></li>
        </ul>
      </nav>

      <main className="main-content">
        {activeTab === 'dashboard' && hasPermission('dashboard') && <Dashboard dashboardData={dashboardData} jobs={jobs} />}
        {activeTab === 'projects' && hasPermission('schedule') && <Projects />}
        {activeTab === 'clients' && hasPermission('clients') && <Clients />}
        {activeTab === 'schedule' && hasPermission('schedule') && <Schedule jobs={jobs} setJobs={setJobs} />}
        {activeTab === 'equipment' && hasPermission('equipment') && <Equipment />}
        {activeTab === 'reports' && hasPermission('reports') && <Reports />}
        {activeTab === 'users' && hasPermission('users') && <UserManagement currentUser={currentUser} />}
        {activeTab === 'inquiries' && hasPermission('users') && <ContactInquiries />}
        {activeTab === 'settings' && hasPermission('settings') && <Settings />}
        {activeTab === 'website' && <Website />}
      </main>

      <footer className="footer">
        <p>&copy; 2025 GD Landscaping. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
