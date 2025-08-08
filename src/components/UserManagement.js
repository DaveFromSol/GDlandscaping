import React, { useState, useEffect } from 'react';
import UserService from '../services/userService';

const UserManagement = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingUser, setEditingUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    permissions: [],
    assignedJobs: []
  });

  const roles = [
    { value: 'admin', label: 'Administrator', description: 'Full system access' },
    { value: 'manager', label: 'Manager', description: 'Manage jobs, clients, and employees' },
    { value: 'employee', label: 'Employee', description: 'View assigned jobs and equipment' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access' }
  ];

  const availablePermissions = [
    { key: 'dashboard', label: 'Dashboard', description: 'View financial overview' },
    { key: 'schedule', label: 'Schedule', description: 'Manage jobs and scheduling' },
    { key: 'clients', label: 'Clients', description: 'Manage client database' },
    { key: 'equipment', label: 'Equipment', description: 'Manage equipment and wishlist' },
    { key: 'reports', label: 'Reports', description: 'Generate and view reports' },
    { key: 'settings', label: 'Settings', description: 'Modify system settings' },
    { key: 'users', label: 'User Management', description: 'Add and manage users' }
  ];

  const availableJobs = [
    { id: 1, title: 'Smith Residence - Weekly Maintenance', client: 'John Smith' },
    { id: 2, title: 'Corporate Office - Landscaping', client: 'ABC Corp' },
    { id: 3, title: 'Johnson Property - Tree Removal', client: 'Mary Johnson' }
  ];

  // Load users from Firebase on component mount
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Subscribe to real-time user updates
    const unsubscribe = UserService.subscribeToUsers((firebaseUsers) => {
      setUsers(firebaseUsers);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const addUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await UserService.addUser(newUser);
      
      // Reset form
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'employee',
        permissions: [],
        assignedJobs: []
      });
      setShowAddUser(false);
      
    } catch (error) {
      console.error('Error adding user:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      setError(null);
      await UserService.updateUser(id, updatedUser);
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.message);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        setError(null);
        await UserService.deleteUser(id);
      } catch (error) {
        console.error('Error deleting user:', error);
        setError(error.message);
      }
    }
  };

  const toggleUserStatus = async (id) => {
    try {
      setError(null);
      const user = users.find(u => u.id === id);
      if (user) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        await UserService.toggleUserStatus(id, newStatus);
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      setError(error.message);
    }
  };

  const handlePermissionChange = async (permission, checked, isEditing = false, userId = null) => {
    if (isEditing && userId) {
      try {
        const user = users.find(u => u.id === userId);
        const updatedPermissions = checked 
          ? [...user.permissions, permission]
          : user.permissions.filter(p => p !== permission);
        await updateUser(userId, { permissions: updatedPermissions });
      } catch (error) {
        console.error('Error updating permissions:', error);
        setError(error.message);
      }
    } else {
      setNewUser(prev => ({
        ...prev,
        permissions: checked 
          ? [...prev.permissions, permission]
          : prev.permissions.filter(p => p !== permission)
      }));
    }
  };

  const handleJobAssignment = async (jobId, checked, isEditing = false, userId = null) => {
    if (isEditing && userId) {
      try {
        const user = users.find(u => u.id === userId);
        const updatedJobs = checked 
          ? [...user.assignedJobs, jobId]
          : user.assignedJobs.filter(j => j !== jobId);
        await updateUser(userId, { assignedJobs: updatedJobs });
      } catch (error) {
        console.error('Error updating job assignment:', error);
        setError(error.message);
      }
    } else {
      setNewUser(prev => ({
        ...prev,
        assignedJobs: checked 
          ? [...prev.assignedJobs, jobId]
          : prev.assignedJobs.filter(j => j !== jobId)
      }));
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'role-admin',
      manager: 'role-manager', 
      employee: 'role-employee',
      viewer: 'role-viewer'
    };
    return colors[role] || 'role-default';
  };

  // Show loading state
  if (loading && users.length === 0) {
    return (
      <div className="user-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        <div className="header-actions">
          <button 
            onClick={() => setShowAddUser(true)}
            className="add-user-btn"
            disabled={loading}
          >
            Add New User
          </button>
          {users.length === 0 && !loading && (
            <div className="no-users-message">
              <p>No users found. Add your first user to get started!</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="close-error">×</button>
        </div>
      )}

      {showAddUser && (
        <div className="add-user-form">
          <h3>Add New User</h3>
          <div className="user-form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                placeholder="Enter password"
                minLength="6"
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label} - {role.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="permissions-section">
            <h4>Permissions</h4>
            <div className="permissions-grid">
              {availablePermissions.map(permission => (
                <label key={permission.key} className="permission-item">
                  <input
                    type="checkbox"
                    checked={newUser.permissions.includes(permission.key)}
                    onChange={(e) => handlePermissionChange(permission.key, e.target.checked)}
                  />
                  <span className="permission-label">
                    <strong>{permission.label}</strong>
                    <small>{permission.description}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="job-assignment-section">
            <h4>Job Assignments</h4>
            <div className="jobs-grid">
              {availableJobs.map(job => (
                <label key={job.id} className="job-item">
                  <input
                    type="checkbox"
                    checked={newUser.assignedJobs.includes(job.id)}
                    onChange={(e) => handleJobAssignment(job.id, e.target.checked)}
                  />
                  <span className="job-label">
                    <strong>{job.title}</strong>
                    <small>{job.client}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button onClick={addUser} className="save-btn">Add User</button>
            <button onClick={() => setShowAddUser(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <div className={`user-role ${getRoleColor(user.role)}`}>
                  {roles.find(r => r.value === user.role)?.label}
                </div>
              </div>
              <div className="user-status">
                <span className={`status-badge ${user.status}`}>
                  {user.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="user-details">
              <div className="detail-row">
                <span>Last Login:</span>
                <span>{user.lastLogin}</span>
              </div>
              <div className="detail-row">
                <span>Created:</span>
                <span>{user.createdAt}</span>
              </div>
              <div className="detail-row">
                <span>Assigned Jobs:</span>
                <span>{user.assignedJobs.length} jobs</span>
              </div>
            </div>

            <div className="user-permissions">
              <h4>Permissions:</h4>
              <div className="permission-tags">
                {user.permissions.includes('all') ? (
                  <span className="permission-tag admin">All Permissions</span>
                ) : (
                  user.permissions.map(permission => (
                    <span key={permission} className="permission-tag">
                      {availablePermissions.find(p => p.key === permission)?.label}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="user-actions">
              <button 
                onClick={() => setEditingUser(user.id)}
                className="edit-btn"
              >
                Edit
              </button>
              <button 
                onClick={() => toggleUserStatus(user.id)}
                className={`status-btn ${user.status === 'active' ? 'deactivate' : 'activate'}`}
              >
                {user.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button 
                onClick={() => deleteUser(user.id)}
                className="delete-btn"
                disabled={user.role === 'admin' && user.id === 1}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;