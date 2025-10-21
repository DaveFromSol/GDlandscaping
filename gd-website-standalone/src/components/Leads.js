import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';

const Leads = ({ user }) => {
  const { db } = useFirebase();
  const [leads, setLeads] = useState([]);
  const [showAddLead, setShowAddLead] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    source: 'Manual Entry',
    status: 'New Lead',
    priority: 'normal',
    notes: '',
    estimatedValue: '',
    followUpDate: ''
  });

  // Real-time Firebase listener for leads
  useEffect(() => {
    if (!db) return;

    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = [];
      snapshot.forEach((doc) => {
        leadsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
        });
      });
      setLeads(leadsData);
    }, (error) => {
      console.error('Error fetching leads:', error);
      alert('Error connecting to database. Please check your internet connection.');
    });

    return () => unsubscribe();
  }, [db]);

  const addLead = async () => {
    if (!newLead.name || !newLead.phone) {
      alert('Name and phone are required');
      return;
    }

    try {
      const leadData = {
        ...newLead,
        estimatedValue: newLead.estimatedValue ? parseFloat(newLead.estimatedValue) : 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user.email || 'unknown',
        lastContactedAt: null,
        contactCount: 0
      };

      await addDoc(collection(db, 'leads'), leadData);

      resetForm();
      setShowAddLead(false);
    } catch (error) {
      console.error('Error adding lead:', error);
      alert('Error adding lead. Please try again.');
    }
  };

  const updateLead = async () => {
    if (!editingLead) return;

    try {
      const leadRef = doc(db, 'leads', editingLead.id);
      await updateDoc(leadRef, {
        ...newLead,
        estimatedValue: newLead.estimatedValue ? parseFloat(newLead.estimatedValue) : 0,
        updatedAt: serverTimestamp(),
        updatedBy: user.email || 'unknown'
      });

      resetForm();
      setShowAddLead(false);
      setEditingLead(null);
    } catch (error) {
      console.error('Error updating lead:', error);
      alert('Error updating lead. Please try again.');
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      await deleteDoc(doc(db, 'leads', id));
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Error deleting lead. Please try again.');
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    try {
      const leadRef = doc(db, 'leads', id);
      await updateDoc(leadRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
        updatedBy: user.email || 'unknown'
      });
    } catch (error) {
      console.error('Error updating lead status:', error);
      alert('Error updating lead status. Please try again.');
    }
  };

  const markContacted = async (id) => {
    try {
      const lead = leads.find(l => l.id === id);
      const leadRef = doc(db, 'leads', id);
      await updateDoc(leadRef, {
        lastContactedAt: serverTimestamp(),
        contactCount: (lead.contactCount || 0) + 1,
        updatedAt: serverTimestamp(),
        updatedBy: user.email || 'unknown'
      });
      alert('Lead marked as contacted!');
    } catch (error) {
      console.error('Error marking lead as contacted:', error);
      alert('Error marking lead as contacted. Please try again.');
    }
  };

  const editLead = (lead) => {
    setEditingLead(lead);
    setNewLead({
      name: lead.name || '',
      email: lead.email || '',
      phone: lead.phone || '',
      address: lead.address || '',
      service: lead.service || '',
      source: lead.source || 'Manual Entry',
      status: lead.status || 'New Lead',
      priority: lead.priority || 'normal',
      notes: lead.notes || '',
      estimatedValue: lead.estimatedValue || '',
      followUpDate: lead.followUpDate || ''
    });
    setShowAddLead(true);
  };

  const resetForm = () => {
    setNewLead({
      name: '',
      email: '',
      phone: '',
      address: '',
      service: '',
      source: 'Manual Entry',
      status: 'New Lead',
      priority: 'normal',
      notes: '',
      estimatedValue: '',
      followUpDate: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New Lead': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Quote Sent': return 'bg-purple-100 text-purple-800';
      case 'Follow Up': return 'bg-orange-100 text-orange-800';
      case 'Converted': return 'bg-green-100 text-green-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      case 'Not Interested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Filter and sort leads
  const getFilteredAndSortedLeads = () => {
    let filtered = [...leads];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'priority':
          const priorityOrder = { high: 3, normal: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'name':
          return a.name.localeCompare(b.name);
        case 'value':
          return (b.estimatedValue || 0) - (a.estimatedValue || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredLeads = getFilteredAndSortedLeads();

  // Statistics
  const stats = {
    total: leads.length,
    newLeads: leads.filter(l => l.status === 'New Lead').length,
    followUps: leads.filter(l => l.status === 'Follow Up').length,
    quoted: leads.filter(l => l.status === 'Quote Sent').length,
    converted: leads.filter(l => l.status === 'Converted').length,
    totalValue: leads.reduce((sum, lead) => sum + (lead.estimatedValue || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Total Leads</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">New Leads</div>
          <div className="text-2xl font-bold text-blue-600">{stats.newLeads}</div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Follow Ups</div>
          <div className="text-2xl font-bold text-orange-600">{stats.followUps}</div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Quoted</div>
          <div className="text-2xl font-bold text-purple-600">{stats.quoted}</div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Converted</div>
          <div className="text-2xl font-bold text-green-600">{stats.converted}</div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Total Value</div>
          <div className="text-2xl font-bold text-green-600">${stats.totalValue.toLocaleString()}</div>
        </div>
      </div>

      {/* Add/Edit Lead Modal */}
      {showAddLead && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingLead ? 'Edit Lead' : 'Add New Lead'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newLead.name}
                    onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="(860) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="customer@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                  <select
                    value={newLead.service}
                    onChange={(e) => setNewLead({...newLead, service: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select service</option>
                    <option value="Lawn Maintenance">Lawn Maintenance</option>
                    <option value="Landscape Design">Landscape Design</option>
                    <option value="Tree Services">Tree Services</option>
                    <option value="Hardscaping">Hardscaping</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Snow Removal">Snow Removal</option>
                    <option value="Pressure Washing">Pressure Washing</option>
                    <option value="Fall Cleanup">Fall Cleanup</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={newLead.address}
                    onChange={(e) => setNewLead({...newLead, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Property address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
                  <select
                    value={newLead.source}
                    onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Manual Entry">Manual Entry</option>
                    <option value="Website Contact Form">Website Contact Form</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Google">Google</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newLead.status}
                    onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Quote Sent">Quote Sent</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                    <option value="Not Interested">Not Interested</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newLead.priority}
                    onChange={(e) => setNewLead({...newLead, priority: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newLead.estimatedValue}
                    onChange={(e) => setNewLead({...newLead, estimatedValue: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Follow Up Date</label>
                  <input
                    type="date"
                    value={newLead.followUpDate}
                    onChange={(e) => setNewLead({...newLead, followUpDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newLead.notes}
                    onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Additional notes, customer requirements, etc."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddLead(false);
                    setEditingLead(null);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={editingLead ? updateLead : addLead}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {editingLead ? 'Update Lead' : 'Add Lead'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Leads</option>
                <option value="New Lead">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Quote Sent">Quote Sent</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
                <option value="Not Interested">Not Interested</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="priority">Priority</option>
                <option value="name">Name</option>
                <option value="value">Estimated Value</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setShowAddLead(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Add New Lead
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Lead Pipeline ({filteredLeads.length})
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Track and manage your potential customers
          </p>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-500">No leads found. Add your first lead to get started!</p>
            <button
              onClick={() => setShowAddLead(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Add Lead
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getPriorityColor(lead.priority)}`}>
                            {lead.priority}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{lead.source}</div>
                        {lead.followUpDate && (
                          <div className="text-xs text-orange-600 mt-1">
                            Follow up: {new Date(lead.followUpDate).toLocaleDateString()}
                          </div>
                        )}
                        {lead.contactCount > 0 && (
                          <div className="text-xs text-gray-500">
                            Contacted {lead.contactCount}x
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.phone}</div>
                      {lead.email && <div className="text-sm text-gray-500">{lead.email}</div>}
                      {lead.address && <div className="text-xs text-gray-500 mt-1">{lead.address}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.service || 'Not specified'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(lead.status)}`}
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Quote Sent">Quote Sent</option>
                        <option value="Follow Up">Follow Up</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col gap-1">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => markContacted(lead.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Mark as contacted"
                          >
                            Call
                          </button>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Send email"
                            >
                              Email
                            </a>
                          )}
                          <button
                            onClick={() => editLead(lead)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                        {lead.notes && (
                          <div className="text-xs text-gray-500 mt-1" title={lead.notes}>
                            {lead.notes.substring(0, 50)}{lead.notes.length > 50 ? '...' : ''}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leads;
