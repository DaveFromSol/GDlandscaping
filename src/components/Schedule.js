import React, { useState } from 'react';
import MapRoute from './MapRoute';

const Schedule = ({ jobs, setJobs }) => {
  const [employees] = useState([
    { id: 1, name: 'Mike Rodriguez', hourlyRate: 25 },
    { id: 2, name: 'Sarah Johnson', hourlyRate: 22 },
    { id: 3, name: 'Tom Wilson', hourlyRate: 20 },
    { id: 4, name: 'Lisa Chen', hourlyRate: 28 }
  ]);

  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    date: '',
    time: '',
    client: '',
    address: '',
    phone: '',
    status: 'scheduled',
    notes: '',
    revenue: 0,
    materialCosts: 0,
    laborAssignments: []
  });

  const [editingLabor, setEditingLabor] = useState(null);
  const [showMapRoute, setShowMapRoute] = useState(null);

  const addJob = () => {
    if (newJob.title && newJob.date && newJob.time) {
      setJobs([...jobs, {
        ...newJob,
        id: Date.now()
      }]);
      setNewJob({
        title: '',
        date: '',
        time: '',
        client: '',
        address: '',
        phone: '',
        status: 'scheduled',
        notes: '',
        revenue: 0,
        materialCosts: 0,
        laborAssignments: []
      });
    }
  };

  const updateJob = (id, updatedJob) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, ...updatedJob } : job
    ));
    setEditingJob(null);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'scheduled': return 'status-scheduled';
      case 'pending': return 'status-pending';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateJobProfit = (job) => {
    const totalLaborCosts = job.laborAssignments.reduce((sum, labor) => sum + labor.paidAmount, 0);
    return job.revenue - job.materialCosts - totalLaborCosts;
  };

  const addLaborAssignment = (jobId, employeeId, hours, paidAmount) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          laborAssignments: [...job.laborAssignments, {
            employeeId: parseInt(employeeId),
            hours: parseFloat(hours),
            paidAmount: parseFloat(paidAmount)
          }]
        };
      }
      return job;
    }));
  };

  const removeLaborAssignment = (jobId, index) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          laborAssignments: job.laborAssignments.filter((_, i) => i !== index)
        };
      }
      return job;
    }));
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  return (
    <div className="schedule-content">
      <div className="schedule-header">
        <h2>Schedule Management</h2>
        <button 
          className="add-job-btn"
          onClick={() => setEditingJob('new')}
        >
          Add New Job
        </button>
      </div>

      {editingJob === 'new' && (
        <div className="job-form">
          <h3>Add New Job</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                placeholder="Enter job title..."
                value={newJob.title}
                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={newJob.date}
                onChange={(e) => setNewJob({...newJob, date: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Time *</label>
              <input
                type="time"
                value={newJob.time}
                onChange={(e) => setNewJob({...newJob, time: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Client Name</label>
              <input
                type="text"
                placeholder="Enter client name..."
                value={newJob.client}
                onChange={(e) => setNewJob({...newJob, client: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Client Address</label>
              <input
                type="text"
                placeholder="Enter client address..."
                value={newJob.address}
                onChange={(e) => setNewJob({...newJob, address: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Client Phone</label>
              <input
                type="tel"
                placeholder="Enter client phone..."
                value={newJob.phone}
                onChange={(e) => setNewJob({...newJob, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={newJob.status}
                onChange={(e) => setNewJob({...newJob, status: e.target.value})}
              >
                <option value="pending">Pending</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Revenue ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newJob.revenue || ''}
                onChange={(e) => setNewJob({...newJob, revenue: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div className="form-group">
              <label>Material Costs ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newJob.materialCosts || ''}
                onChange={(e) => setNewJob({...newJob, materialCosts: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div className="form-group full-width">
              <label>Job Notes</label>
              <textarea
                placeholder="Enter job notes..."
                value={newJob.notes}
                onChange={(e) => setNewJob({...newJob, notes: e.target.value})}
                rows="3"
              />
            </div>
          </div>
          <div className="form-actions">
            <button onClick={addJob} className="save-btn">Save Job</button>
            <button onClick={() => setEditingJob(null)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      <div className="schedule-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            {editingJob === job.id ? (
              <div className="job-edit-form">
                <div className="edit-form-grid">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      value={job.title}
                      onChange={(e) => updateJob(job.id, {title: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={job.date}
                      onChange={(e) => updateJob(job.id, {date: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input
                      type="time"
                      value={job.time}
                      onChange={(e) => updateJob(job.id, {time: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Client Name</label>
                    <input
                      type="text"
                      value={job.client || ''}
                      onChange={(e) => updateJob(job.id, {client: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={job.address || ''}
                      onChange={(e) => updateJob(job.id, {address: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={job.phone || ''}
                      onChange={(e) => updateJob(job.id, {phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={job.status}
                      onChange={(e) => updateJob(job.id, {status: e.target.value})}
                    >
                      <option value="pending">Pending</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Revenue ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={job.revenue || ''}
                      onChange={(e) => updateJob(job.id, {revenue: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Material Costs ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={job.materialCosts || ''}
                      onChange={(e) => updateJob(job.id, {materialCosts: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Notes</label>
                    <textarea
                      value={job.notes || ''}
                      onChange={(e) => updateJob(job.id, {notes: e.target.value})}
                      rows="3"
                    />
                  </div>
                </div>
                <div className="edit-actions">
                  <button onClick={() => setEditingJob(null)} className="save-btn">Save Changes</button>
                  <button onClick={() => setEditingJob(null)} className="cancel-btn">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <div className={`job-status ${getStatusClass(job.status)}`}>
                    {job.status.toUpperCase()}
                  </div>
                </div>
                <div className="job-details">
                  <div className="job-date">{formatDate(job.date)} at {job.time}</div>
                  <div className="job-client">Client: {job.client}</div>
                  {job.address && <div className="job-address">📍 {job.address}</div>}
                  {job.phone && <div className="job-phone">📞 {job.phone}</div>}
                  <div className="job-notes">{job.notes}</div>
                  
                  <div className="job-financials">
                    <div className="financial-row">
                      <span className="financial-label">Revenue:</span>
                      <span className="financial-value revenue">${job.revenue.toLocaleString()}</span>
                    </div>
                    <div className="financial-row">
                      <span className="financial-label">Materials:</span>
                      <span className="financial-value cost">${job.materialCosts.toLocaleString()}</span>
                    </div>
                    <div className="financial-row">
                      <span className="financial-label">Labor:</span>
                      <span className="financial-value cost">
                        ${job.laborAssignments.reduce((sum, labor) => sum + labor.paidAmount, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="financial-row profit-row">
                      <span className="financial-label">Profit:</span>
                      <span className={`financial-value ${calculateJobProfit(job) >= 0 ? 'profit' : 'loss'}`}>
                        ${calculateJobProfit(job).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {job.laborAssignments.length > 0 && (
                    <div className="labor-assignments">
                      <h4>Labor Assignments:</h4>
                      {job.laborAssignments.map((labor, index) => (
                        <div key={index} className="labor-item">
                          <span>{getEmployeeName(labor.employeeId)} - {labor.hours}h - ${labor.paidAmount}</span>
                          <button 
                            onClick={() => removeLaborAssignment(job.id, index)}
                            className="remove-labor-btn"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="job-actions">
                  <button 
                    onClick={() => setEditingJob(job.id)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setEditingLabor(editingLabor === job.id ? null : job.id)}
                    className="labor-btn"
                  >
                    {editingLabor === job.id ? 'Cancel Labor' : 'Add Labor'}
                  </button>
                  {job.address && (
                    <button 
                      onClick={() => setShowMapRoute(job)}
                      className="route-btn"
                    >
                      🗺️ Get Route
                    </button>
                  )}
                  <button 
                    onClick={() => deleteJob(job.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>

                {editingLabor === job.id && (
                  <div className="labor-form">
                    <h4>Add Labor Assignment</h4>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      addLaborAssignment(
                        job.id,
                        formData.get('employeeId'),
                        formData.get('hours'),
                        formData.get('paidAmount')
                      );
                      e.target.reset();
                      setEditingLabor(null);
                    }}>
                      <div className="labor-form-grid">
                        <select name="employeeId" required>
                          <option value="">Select Employee</option>
                          {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                              {emp.name} (${emp.hourlyRate}/hr)
                            </option>
                          ))}
                        </select>
                        <input
                          name="hours"
                          type="number"
                          step="0.5"
                          placeholder="Hours worked"
                          required
                        />
                        <input
                          name="paidAmount"
                          type="number"
                          step="0.01"
                          placeholder="Amount paid ($)"
                          required
                        />
                        <button type="submit" className="add-labor-btn">Add</button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {showMapRoute && (
        <MapRoute 
          job={showMapRoute} 
          onClose={() => setShowMapRoute(null)}
        />
      )}
    </div>
  );
};

export default Schedule;