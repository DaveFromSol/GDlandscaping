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

const Customers = ({ user }) => {
  const { db } = useFirebase();
  const [customers, setCustomers] = useState([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'CT',
    zip: '',
    customerType: 'Residential',
    status: 'Active',
    preferredServices: [],
    paymentMethod: 'Cash',
    propertySize: '',
    notes: '',
    totalSpent: 0,
    lastServiceDate: '',
    tags: []
  });

  // Real-time Firebase listener for customers
  useEffect(() => {
    if (!db) return;

    const customersRef = collection(db, 'customers');
    const q = query(customersRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const customersData = [];
      snapshot.forEach((doc) => {
        customersData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
        });
      });
      setCustomers(customersData);
    }, (error) => {
      console.error('Error fetching customers:', error);
      alert('Error connecting to database. Please check your internet connection.');
    });

    return () => unsubscribe();
  }, [db]);

  const addCustomer = async () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert('Name and phone are required');
      return;
    }

    try {
      const customerData = {
        ...newCustomer,
        totalSpent: newCustomer.totalSpent ? parseFloat(newCustomer.totalSpent) : 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user.email || 'unknown',
        serviceCount: 0
      };

      await addDoc(collection(db, 'customers'), customerData);

      resetForm();
      setShowAddCustomer(false);
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Error adding customer. Please try again.');
    }
  };

  const updateCustomer = async () => {
    if (!editingCustomer) return;

    try {
      const customerRef = doc(db, 'customers', editingCustomer.id);
      await updateDoc(customerRef, {
        ...newCustomer,
        totalSpent: newCustomer.totalSpent ? parseFloat(newCustomer.totalSpent) : 0,
        updatedAt: serverTimestamp(),
        updatedBy: user.email || 'unknown'
      });

      resetForm();
      setShowAddCustomer(false);
      setEditingCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Error updating customer. Please try again.');
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;

    try {
      await deleteDoc(doc(db, 'customers', id));
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Error deleting customer. Please try again.');
    }
  };

  const updateCustomerStatus = async (id, newStatus) => {
    try {
      const customerRef = doc(db, 'customers', id);
      await updateDoc(customerRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
        updatedBy: user.email || 'unknown'
      });
    } catch (error) {
      console.error('Error updating customer status:', error);
      alert('Error updating customer status. Please try again.');
    }
  };

  const editCustomer = (customer) => {
    setEditingCustomer(customer);
    setNewCustomer({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      city: customer.city || '',
      state: customer.state || 'CT',
      zip: customer.zip || '',
      customerType: customer.customerType || 'Residential',
      status: customer.status || 'Active',
      preferredServices: customer.preferredServices || [],
      paymentMethod: customer.paymentMethod || 'Cash',
      propertySize: customer.propertySize || '',
      notes: customer.notes || '',
      totalSpent: customer.totalSpent || 0,
      lastServiceDate: customer.lastServiceDate || '',
      tags: customer.tags || []
    });
    setShowAddCustomer(true);
  };

  const resetForm = () => {
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: 'CT',
      zip: '',
      customerType: 'Residential',
      status: 'Active',
      preferredServices: [],
      paymentMethod: 'Cash',
      propertySize: '',
      notes: '',
      totalSpent: 0,
      lastServiceDate: '',
      tags: []
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and sort customers
  const getFilteredAndSortedCustomers = () => {
    let filtered = [...customers];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(customer => customer.status === filterStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'spent':
          return (b.totalSpent || 0) - (a.totalSpent || 0);
        case 'recent-service':
          if (!a.lastServiceDate) return 1;
          if (!b.lastServiceDate) return -1;
          return new Date(b.lastServiceDate) - new Date(a.lastServiceDate);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredCustomers = getFilteredAndSortedCustomers();

  // Statistics
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    vip: customers.filter(c => c.status === 'VIP').length,
    inactive: customers.filter(c => c.status === 'Inactive').length,
    totalRevenue: customers.reduce((sum, customer) => sum + (customer.totalSpent || 0), 0),
    residential: customers.filter(c => c.customerType === 'Residential').length,
    commercial: customers.filter(c => c.customerType === 'Commercial').length
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Total Customers</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.residential} Residential • {stats.commercial} Commercial
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Active Customers</div>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-xs text-gray-500 mt-1">
            {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% of total
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">VIP Customers</div>
          <div className="text-2xl font-bold text-purple-600">{stats.vip}</div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* Add/Edit Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="(860) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="customer@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
                  <select
                    value={newCustomer.customerType}
                    onChange={(e) => setNewCustomer({...newCustomer, customerType: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="HOA">HOA / Condo</option>
                    <option value="Multi-family">Multi-family</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={newCustomer.city}
                    onChange={(e) => setNewCustomer({...newCustomer, city: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Berlin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={newCustomer.state}
                    onChange={(e) => setNewCustomer({...newCustomer, state: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="CT"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={newCustomer.zip}
                    onChange={(e) => setNewCustomer({...newCustomer, zip: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="06037"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="VIP">VIP</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Size (acres)</label>
                  <input
                    type="text"
                    value={newCustomer.propertySize}
                    onChange={(e) => setNewCustomer({...newCustomer, propertySize: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    value={newCustomer.paymentMethod}
                    onChange={(e) => setNewCustomer({...newCustomer, paymentMethod: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Check">Check</option>
                    <option value="Venmo">Venmo</option>
                    <option value="Zelle">Zelle</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Spent ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newCustomer.totalSpent}
                    onChange={(e) => setNewCustomer({...newCustomer, totalSpent: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Service Date</label>
                  <input
                    type="date"
                    value={newCustomer.lastServiceDate}
                    onChange={(e) => setNewCustomer({...newCustomer, lastServiceDate: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Additional notes, preferences, special instructions..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddCustomer(false);
                    setEditingCustomer(null);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCustomer ? updateCustomer : addCustomer}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {editingCustomer ? 'Update Customer' : 'Add Customer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name, phone, email, address..."
                className="px-3 py-2 border border-gray-300 rounded-md w-64"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Customers</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="VIP">VIP</option>
                <option value="On Hold">On Hold</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="name">Name</option>
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="spent">Total Spent</option>
                <option value="recent-service">Recent Service</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setShowAddCustomer(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Add New Customer
          </button>
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Customer Directory ({filteredCustomers.length})
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your customer database and service history
          </p>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all'
                ? 'No customers found matching your filters.'
                : 'No customers yet. Add your first customer to get started!'}
            </p>
            <button
              onClick={() => setShowAddCustomer(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Add Customer
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        {customer.lastServiceDate && (
                          <div className="text-xs text-gray-500">
                            Last service: {new Date(customer.lastServiceDate).toLocaleDateString()}
                          </div>
                        )}
                        {customer.propertySize && (
                          <div className="text-xs text-gray-500">
                            {customer.propertySize} acres
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.phone}</div>
                      {customer.email && <div className="text-sm text-gray-500">{customer.email}</div>}
                      {customer.address && (
                        <div className="text-xs text-gray-500 mt-1">
                          {customer.address}
                          {customer.city && `, ${customer.city}`}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.customerType}</div>
                      {customer.paymentMethod && (
                        <div className="text-xs text-gray-500">{customer.paymentMethod}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={customer.status}
                        onChange={(e) => updateCustomerStatus(customer.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(customer.status)}`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="VIP">VIP</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        ${(customer.totalSpent || 0).toLocaleString()}
                      </div>
                      {customer.serviceCount > 0 && (
                        <div className="text-xs text-gray-500">
                          {customer.serviceCount} services
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col gap-1">
                        <div className="flex space-x-2">
                          {customer.phone && (
                            <a
                              href={`tel:${customer.phone}`}
                              className="text-green-600 hover:text-green-900"
                              title="Call customer"
                            >
                              Call
                            </a>
                          )}
                          {customer.email && (
                            <a
                              href={`mailto:${customer.email}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Send email"
                            >
                              Email
                            </a>
                          )}
                          <button
                            onClick={() => editCustomer(customer)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCustomer(customer.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                        {customer.notes && (
                          <div className="text-xs text-gray-500 mt-1" title={customer.notes}>
                            {customer.notes.substring(0, 50)}{customer.notes.length > 50 ? '...' : ''}
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

export default Customers;
