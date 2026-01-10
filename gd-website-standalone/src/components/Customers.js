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
import GoogleAddressAutocomplete from './GoogleAddressAutocomplete';

const Customers = ({ user }) => {
  const { db } = useFirebase();
  const [customers, setCustomers] = useState([]);
  const [customerRevenue, setCustomerRevenue] = useState({});
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
    tags: [],
    snowRemoval: false,
    priority: 'Normal',
    addresses: [] // For HOA/Condo with multiple addresses
  });

  const [currentAddress, setCurrentAddress] = useState({
    location: '',
    unitNumber: '',
    specialInstructions: ''
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

  // Calculate actual revenue from jobs for each customer
  useEffect(() => {
    if (!db || customers.length === 0) return;

    const calculateRevenue = async () => {
      // Fetch all jobs
      const jobsRef = collection(db, 'jobs');
      const jobsSnapshot = await onSnapshot(jobsRef, (snapshot) => {
        const tempRevenueMap = {};

        snapshot.forEach((doc) => {
          const job = doc.data();
          const customerName = job.customerName;

          if (customerName && job.status === 'completed') {
            const payment = parseFloat(job.actualPayment) || parseFloat(job.expectedPayment) || 0;

            if (!tempRevenueMap[customerName]) {
              tempRevenueMap[customerName] = 0;
            }
            tempRevenueMap[customerName] += payment;
          }
        });

        setCustomerRevenue(tempRevenueMap);
      });

      return jobsSnapshot;
    };

    const unsubscribe = calculateRevenue();
    return () => {
      if (unsubscribe && typeof unsubscribe.then === 'function') {
        unsubscribe.then(unsub => unsub && unsub());
      }
    };
  }, [db, customers]);

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
      tags: customer.tags || [],
      snowRemoval: customer.snowRemoval || false,
      priority: customer.priority || 'Normal',
      addresses: customer.addresses || []
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
      tags: [],
      snowRemoval: false,
      priority: 'Normal',
      addresses: []
    });
    setCurrentAddress({
      location: '',
      unitNumber: '',
      specialInstructions: ''
    });
  };

  const addAddress = () => {
    if (!currentAddress.location.trim()) {
      alert('Please enter an address');
      return;
    }

    if (newCustomer.addresses.length >= 40) {
      alert('Maximum 40 addresses allowed');
      return;
    }

    setNewCustomer({
      ...newCustomer,
      addresses: [...newCustomer.addresses, { ...currentAddress }]
    });

    setCurrentAddress({
      location: '',
      unitNumber: '',
      specialInstructions: ''
    });
  };

  const removeAddress = (index) => {
    setNewCustomer({
      ...newCustomer,
      addresses: newCustomer.addresses.filter((_, i) => i !== index)
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
    // Add calculated revenue to each customer
    let filtered = customers.map(customer => ({
      ...customer,
      calculatedRevenue: customerRevenue[customer.name] || 0
    }));

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

    // Sort with cancelled customers always at bottom
    filtered.sort((a, b) => {
      // Always put cancelled customers at the bottom
      if (a.status === 'Cancelled' && b.status !== 'Cancelled') return 1;
      if (a.status !== 'Cancelled' && b.status === 'Cancelled') return -1;

      // Then apply regular sorting
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'spent':
          return (b.calculatedRevenue || 0) - (a.calculatedRevenue || 0);
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
    totalRevenue: Object.values(customerRevenue).reduce((sum, revenue) => sum + revenue, 0),
    residential: customers.filter(c => c.customerType === 'Residential').length,
    commercial: customers.filter(c => c.customerType === 'Commercial').length
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden shadow-lg rounded-xl p-6 border-2 border-blue-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">Total Customers</div>
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-blue-900 mb-2">{stats.total}</div>
          <div className="text-xs font-medium text-blue-700">
            {stats.residential} Residential • {stats.commercial} Commercial
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden shadow-lg rounded-xl p-6 border-2 border-green-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wide">Active Customers</div>
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-green-900 mb-2">{stats.active}</div>
          <div className="text-xs font-medium text-green-700">
            {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% of total
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 overflow-hidden shadow-lg rounded-xl p-6 border-2 border-purple-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wide">VIP Customers</div>
            <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-purple-900 mb-2">{stats.vip}</div>
          <div className="text-xs font-medium text-purple-700">
            Premium clients
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 overflow-hidden shadow-lg rounded-xl p-6 border-2 border-emerald-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Total Revenue</div>
            <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-3xl font-bold text-emerald-900 mb-2">${stats.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          <div className="text-xs font-medium text-emerald-700">
            From completed jobs
          </div>
        </div>
      </div>

      {/* Add/Edit Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center pt-10 pb-10">
          <div className="relative mx-auto w-11/12 md:w-3/4 lg:w-2/3 shadow-2xl rounded-2xl bg-white max-h-[calc(100vh-80px)] overflow-hidden my-auto border border-gray-200">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700 border-b border-blue-500">
              <div className="flex items-center gap-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">
                    {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                  </h3>
                  <p className="text-sm text-blue-100 mt-1">
                    {editingCustomer ? 'Update customer information' : 'Fill in the details to create a new customer'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddCustomer(false);
                    setEditingCustomer(null);
                    resetForm();
                  }}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
                  title="Close"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto max-h-[calc(100vh-280px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="(860) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="customer@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Customer Type</label>
                  <select
                    value={newCustomer.customerType}
                    onChange={(e) => setNewCustomer({...newCustomer, customerType: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white cursor-pointer"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="HOA">HOA / Condo</option>
                    <option value="Multi-family">Multi-family</option>
                  </select>
                </div>
                {/* Conditional Address Section */}
                {newCustomer.customerType === 'HOA' ? (
                  /* Multiple Addresses for HOA/Condo */
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Property Addresses
                      <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {newCustomer.addresses.length}/40
                      </span>
                    </label>

                    {/* Add Address Form */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            Address <span className="text-red-500">*</span>
                            <span className="text-gray-500 font-normal ml-1">(Google autocomplete)</span>
                          </label>
                          <GoogleAddressAutocomplete
                            value={currentAddress.location}
                            onChange={(value) => setCurrentAddress({...currentAddress, location: value})}
                            onPlaceSelected={(addressData) => {
                              setCurrentAddress({
                                ...currentAddress,
                                location: addressData.fullAddress
                              });
                            }}
                            placeholder="123 Main St, Berlin, CT 06037"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">Unit/Building #</label>
                          <input
                            type="text"
                            value={currentAddress.unitNumber}
                            onChange={(e) => setCurrentAddress({...currentAddress, unitNumber: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                            placeholder="Unit 101"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-2">Special Instructions</label>
                          <input
                            type="text"
                            value={currentAddress.specialInstructions}
                            onChange={(e) => setCurrentAddress({...currentAddress, specialInstructions: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                            placeholder="Gate code, parking instructions, etc."
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={addAddress}
                            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 font-bold shadow-md hover:shadow-lg transition-all"
                          >
                            + Add Address
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Address List */}
                    {newCustomer.addresses.length > 0 && (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {newCustomer.addresses.map((addr, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-900">{addr.location}</p>
                              {addr.unitNumber && (
                                <p className="text-sm text-gray-600 mt-1">Unit: {addr.unitNumber}</p>
                              )}
                              {addr.specialInstructions && (
                                <p className="text-xs text-gray-500 mt-1">{addr.specialInstructions}</p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAddress(index)}
                              className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Single Address for Residential/Commercial */
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Address
                        <span className="text-xs text-gray-500 font-normal ml-2">(Start typing for suggestions)</span>
                      </label>
                      <GoogleAddressAutocomplete
                        value={newCustomer.address}
                        onChange={(value) => setNewCustomer({...newCustomer, address: value})}
                        onPlaceSelected={(addressData) => {
                          setNewCustomer({
                            ...newCustomer,
                            address: addressData.street || addressData.fullAddress,
                            city: addressData.city,
                            state: addressData.state,
                            zip: addressData.zip
                          });
                        }}
                        placeholder="Start typing your address..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={newCustomer.city}
                        onChange={(e) => setNewCustomer({...newCustomer, city: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Berlin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={newCustomer.state}
                        onChange={(e) => setNewCustomer({...newCustomer, state: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="CT"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={newCustomer.zip}
                        onChange={(e) => setNewCustomer({...newCustomer, zip: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="06037"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                  <select
                    value={newCustomer.status}
                    onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="VIP">VIP</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Property Size (acres)</label>
                  <input
                    type="text"
                    value={newCustomer.propertySize}
                    onChange={(e) => setNewCustomer({...newCustomer, propertySize: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Payment Method</label>
                  <select
                    value={newCustomer.paymentMethod}
                    onChange={(e) => setNewCustomer({...newCustomer, paymentMethod: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white cursor-pointer"
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">Total Spent ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newCustomer.totalSpent}
                    onChange={(e) => setNewCustomer({...newCustomer, totalSpent: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Service Date</label>
                  <input
                    type="date"
                    value={newCustomer.lastServiceDate}
                    onChange={(e) => setNewCustomer({...newCustomer, lastServiceDate: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Snow Removal Priority</label>
                  <select
                    value={newCustomer.priority}
                    onChange={(e) => setNewCustomer({...newCustomer, priority: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white cursor-pointer"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                    <input
                      type="checkbox"
                      id="snowRemoval"
                      checked={newCustomer.snowRemoval}
                      onChange={(e) => setNewCustomer({...newCustomer, snowRemoval: e.target.checked})}
                      className="w-6 h-6 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="snowRemoval" className="text-sm font-bold text-gray-900 cursor-pointer flex-1">
                      Snow Removal Contract
                      <span className="block text-xs font-medium text-gray-600 mt-1">Enable this customer for snow removal operations</span>
                    </label>
                    <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    rows="3"
                    placeholder="Additional notes, preferences, special instructions..."
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 px-8 py-5 bg-gradient-to-r from-gray-50 to-slate-50 border-t-2 border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddCustomer(false);
                  setEditingCustomer(null);
                  resetForm();
                }}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={editingCustomer ? updateCustomer : addCustomer}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
              >
                {editingCustomer ? 'Update Customer' : 'Add Customer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1 min-w-[280px]">
              <label className="block text-sm font-bold text-gray-700 mb-2">Search Customers</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Name, phone, email, address..."
                  className="pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Filter Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all bg-white"
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
              <label className="block text-sm font-bold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all bg-white"
              >
                <option value="name">Name</option>
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="spent">Total Revenue</option>
                <option value="recent-service">Recent Service</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setShowAddCustomer(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
          >
            + Add Customer
          </button>
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-gray-700 to-slate-700 text-white p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Customer Directory
                <span className="ml-2 text-sm font-semibold text-gray-500">({filteredCustomers.length})</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage your customer database and service history
              </p>
            </div>
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-lg font-medium text-gray-500 mb-2">
              {searchTerm || filterStatus !== 'all'
                ? 'No customers found'
                : 'No customers yet'}
            </p>
            <p className="text-sm text-gray-400 mb-6">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your filters or search term'
                : 'Add your first customer to get started'}
            </p>
            <button
              onClick={() => setShowAddCustomer(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              + Add Customer
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Customer Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Revenue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-150 group">
                    <td className="px-6 py-5">
                      <div>
                        <div className="text-sm font-bold text-gray-900 mb-1">{customer.name}</div>
                        {customer.lastServiceDate && (
                          <div className="text-xs text-gray-600 flex items-center gap-1">
                            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Last: {new Date(customer.lastServiceDate).toLocaleDateString()}
                          </div>
                        )}
                        {customer.propertySize && (
                          <div className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {customer.propertySize} acres
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {customer.phone}
                      </div>
                      {customer.email && (
                        <div className="text-sm text-gray-600 flex items-center gap-1.5 mt-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {customer.email}
                        </div>
                      )}
                      {customer.address && (
                        <div className="text-xs text-gray-500 flex items-start gap-1.5 mt-1.5">
                          <svg className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>
                            {customer.address}
                            {customer.city && `, ${customer.city}`}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                        <span className="text-sm font-semibold text-purple-900">{customer.customerType}</span>
                      </div>
                      {customer.paymentMethod && (
                        <div className="text-xs text-gray-600 mt-1.5 flex items-center gap-1">
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          {customer.paymentMethod}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <select
                        value={customer.status}
                        onChange={(e) => updateCustomerStatus(customer.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-2 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getStatusColor(customer.status)}`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="VIP">VIP</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex flex-col items-start px-3 py-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                        <div className="text-base font-bold text-green-700">
                          ${(customer.calculatedRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs font-medium text-green-600">
                          Completed jobs
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {customer.phone && (
                          <a
                            href={`tel:${customer.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-sm hover:shadow-md"
                            title="Call customer"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call
                          </a>
                        )}
                        {customer.email && (
                          <a
                            href={`mailto:${customer.email}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
                            title="Send email"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                          </a>
                        )}
                        <button
                          onClick={() => editCustomer(customer)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-semibold rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all shadow-sm hover:shadow-md"
                          title="Edit customer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCustomer(customer.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-semibold rounded-lg hover:from-red-600 hover:to-rose-700 transition-all shadow-sm hover:shadow-md"
                          title="Delete customer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                      {customer.notes && (
                        <div className="mt-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="text-xs text-amber-800 font-medium flex items-start gap-1.5" title={customer.notes}>
                            <svg className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <span>{customer.notes.substring(0, 50)}{customer.notes.length > 50 ? '...' : ''}</span>
                          </div>
                        </div>
                      )}
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
