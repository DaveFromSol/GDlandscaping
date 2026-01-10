import React, { useState, useEffect, useCallback } from 'react';
import Login from '../components/Login';
import SEOHead from '../components/SEOHead';
import Leads from '../components/Leads';
import Customers from '../components/Customers';
import Employees from '../components/Employees';
import SnowRemovalMap from '../components/SnowRemovalMap';
import HOACondoProperties from '../components/HOACondoProperties';
import GoogleAddressAutocomplete from '../components/GoogleAddressAutocomplete';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { signOut, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { useFirebase } from '../contexts/FirebaseContext';

const AdminDashboard = ({ user, onLogout }) => {
  const { db, auth, secondaryAuth } = useFirebase();
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState('admin'); // admin or employee
  const [userPermissions, setUserPermissions] = useState({
    viewSnowRoutes: true,
    markSnowComplete: true,
    viewCustomers: true,
    editCustomers: true
  });
  const [stats, setStats] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    completedJobs: 0,
    totalRevenue: '$0'
  });

  // Bookings state
  const [bookings, setBookings] = useState([]);

  // Quotes management state
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    address: '',
    description: '',
    status: 'Pending'
  });
  const [showAddQuote, setShowAddQuote] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);

  // Route planner state
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewType, setViewType] = useState('day'); // 'day', 'week', 'month'
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]); // For week/month views
  const [newJob, setNewJob] = useState({
    customerName: '',
    address: '',
    serviceType: 'lawn-maintenance',
    estimatedTime: '30',
    notes: '',
    priority: 'normal',
    expectedPayment: '',
    actualPayment: '',
    paymentStatus: 'pending',
    paymentMethod: 'cash'
  });
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recurringModalJob, setRecurringModalJob] = useState(null);
  const [recurringSettings, setRecurringSettings] = useState({
    recurrenceType: 'weekly',
    recurrenceEndDate: ''
  });

  // Customer autocomplete state
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showCustomerAutocomplete, setShowCustomerAutocomplete] = useState(false);

  // User Management state
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [userAccounts, setUserAccounts] = useState([]);
  const [newUserAccount, setNewUserAccount] = useState({
    email: '',
    password: '',
    displayName: '',
    linkedCustomerId: ''
  });

  // HOA/Condo Properties state
  const [hoaCondoProperties, setHOACondoProperties] = useState([]);

  // Fetch employee role and permissions on login
  useEffect(() => {
    if (!db || !user) return;

    const fetchEmployeeData = async () => {
      try {
        const employeesRef = collection(db, 'employees');
        const q = query(employeesRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const employee = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .find(emp => emp.email === user.email);

          if (employee) {
            setUserRole(employee.role || 'employee');
            setUserPermissions(employee.permissions || {
              viewSnowRoutes: true,
              markSnowComplete: true,
              viewCustomers: false,
              editCustomers: false
            });

            // If employee has snow route permissions, default to snow tab
            if (employee.permissions?.viewSnowRoutes && employee.role === 'employee') {
              setActiveTab('snow-removal');
            }
          } else {
            // Not in employees collection, assume admin
            setUserRole('admin');
            setUserPermissions({
              viewSnowRoutes: true,
              markSnowComplete: true,
              viewCustomers: true,
              editCustomers: true
            });
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [db, user]);

  // Real-time Firebase listener for quotes
  useEffect(() => {
    if (!db) return;

    const quotesRef = collection(db, 'quotes');
    const q = query(quotesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const quotesData = [];
      snapshot.forEach((doc) => {
        quotesData.push({
          id: doc.id,
          ...doc.data(),
          date: doc.data().createdAt?.toDate().toISOString().split('T')[0] || new Date().toISOString().split('T')[0]
        });
      });
      setQuotes(quotesData);
    }, (error) => {
      console.error('Error fetching quotes:', error);
      alert('Error connecting to database. Please check your internet connection and try again.');
    });

    return () => unsubscribe();
  }, [db]);

  // Real-time Firebase listener for bookings
  useEffect(() => {
    if (!db) return;

    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = [];
      snapshot.forEach((doc) => {
        bookingsData.push({
          id: doc.id,
          ...doc.data(),
          date: doc.data().createdAt?.toDate().toISOString().split('T')[0] || new Date().toISOString().split('T')[0]
        });
      });
      setBookings(bookingsData);
      console.log('Bookings loaded:', bookingsData.length);
    }, (error) => {
      console.error('Error fetching bookings:', error);
    });

    return () => unsubscribe();
  }, [db]);

  // Real-time Firebase listener for customers
  useEffect(() => {
    if (!db) return;

    const customersRef = collection(db, 'customers');
    const q = query(customersRef, orderBy('name', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const customersData = [];
      snapshot.forEach((doc) => {
        customersData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setCustomers(customersData);
    }, (error) => {
      console.error('Error fetching customers:', error);
    });

    return () => unsubscribe();
  }, [db]);

  // Real-time Firebase listener for HOA/Condo properties
  useEffect(() => {
    if (!db) return;

    const propertiesRef = collection(db, 'hoaCondoProperties');
    const q = query(propertiesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const propertiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHOACondoProperties(propertiesData);
    }, (error) => {
      console.error('Error fetching HOA/Condo properties:', error);
    });

    return () => unsubscribe();
  }, [db]);

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCustomerAutocomplete && !event.target.closest('.customer-autocomplete-container')) {
        setShowCustomerAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCustomerAutocomplete]);

  // Fetch all jobs for stats calculation
  const [allJobsForStats, setAllJobsForStats] = useState([]);

  useEffect(() => {
    if (!db) return;

    const jobsRef = collection(db, 'jobs');
    const unsubscribe = onSnapshot(jobsRef, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllJobsForStats(jobsData);
    }, (error) => {
      console.error('Error fetching jobs for stats:', error);
    });

    return () => unsubscribe();
  }, [db]);

  // Update stats whenever quotes, bookings, or jobs change
  useEffect(() => {
    const completedJobsFromJobs = allJobsForStats.filter(j => j.status === 'completed').length;
    const jobRevenue = allJobsForStats
      .filter(j => j.status === 'completed')
      .reduce((sum, job) => sum + (parseFloat(job.actualPayment) || parseFloat(job.expectedPayment) || 0), 0);

    // Calculate revenue from quotes (if any have prices)
    const quoteRevenue = quotes
      .filter(q => q.status === 'Completed')
      .reduce((sum, quote) => sum + (parseFloat(quote.price) || 0), 0);

    // Combine both revenue sources
    const totalRevenue = quoteRevenue + jobRevenue;

    const updatedStats = {
      totalQuotes: quotes.length,
      pendingQuotes: quotes.filter(q => q.status === 'Pending').length,
      completedJobs: quotes.filter(q => q.status === 'Completed').length + completedJobsFromJobs,
      totalRevenue: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length
    };
    setStats(updatedStats);
  }, [quotes, bookings, allJobsForStats]);

  const addQuote = async () => {
    if (!newQuote.name || !newQuote.service) return;

    try {
      const quoteData = {
        ...newQuote,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user.email || 'unknown'
      };
      await addDoc(collection(db, 'quotes'), quoteData);

      setNewQuote({
        name: '',
        email: '',
        phone: '',
        service: '',
        address: '',
        description: '',
        status: 'Pending'
      });
      setShowAddQuote(false);
    } catch (error) {
      console.error('Error adding quote:', error);
      alert('Error adding quote. Please check your internet connection and try again.');
    }
  };

  const updateQuoteStatus = async (id, newStatus) => {
    try {
      const quoteRef = doc(db, 'quotes', id);
      await updateDoc(quoteRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
        updatedBy: user.email || 'unknown'
      });
    } catch (error) {
      console.error('Error updating quote:', error);
      alert('Error updating quote. Please check your internet connection and try again.');
    }
  };

  const deleteQuote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return;

    try {
      await deleteDoc(doc(db, 'quotes', id));
    } catch (error) {
      console.error('Error deleting quote:', error);
      alert('Error deleting quote. Please check your internet connection and try again.');
    }
  };

  const editQuote = (quote) => {
    setEditingQuote(quote);
    setNewQuote(quote);
    setShowAddQuote(true);
  };

  const saveEditQuote = async () => {
    try {
      const quoteRef = doc(db, 'quotes', editingQuote.id);
      await updateDoc(quoteRef, {
        ...newQuote,
        updatedAt: serverTimestamp(),
        updatedBy: user.email || 'unknown'
      });

      setEditingQuote(null);
      setNewQuote({
        name: '',
        email: '',
        phone: '',
        service: '',
        address: '',
        description: '',
        status: 'Pending'
      });
      setShowAddQuote(false);
    } catch (error) {
      console.error('Error updating quote:', error);
      alert('Error updating quote. Please check your internet connection and try again.');
    }
  };

  const convertQuoteToLead = async (quote) => {
    if (!window.confirm(`Convert "${quote.name}" to a lead in the pipeline?`)) return;

    try {
      const leadData = {
        name: quote.name || '',
        email: quote.email || '',
        phone: quote.phone || '',
        address: quote.address || '',
        service: quote.service || '',
        source: 'From Quote',
        status: 'New Lead',
        priority: 'normal',
        notes: quote.description || '',
        estimatedValue: 0,
        followUpDate: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user.email || 'unknown',
        lastContactedAt: null,
        contactCount: 0,
        originalQuoteId: quote.id
      };

      await addDoc(collection(db, 'leads'), leadData);

      // Update the quote status to indicate it's been converted
      const quoteRef = doc(db, 'quotes', quote.id);
      await updateDoc(quoteRef, {
        status: 'Converted to Lead',
        updatedAt: serverTimestamp(),
        updatedBy: user.email || 'unknown'
      });

      alert(`Successfully added "${quote.name}" to lead pipeline!`);
    } catch (error) {
      console.error('Error converting quote to lead:', error);
      alert('Error converting quote to lead. Please check your internet connection and try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Approved': return 'text-blue-600 bg-blue-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-orange-600 bg-orange-100';
      case 'Converted to Lead': return 'text-purple-600 bg-purple-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Booking management functions
  const updateBookingStatus = async (id, newStatus) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
        updatedBy: user.email || 'unknown'
      });
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Error updating booking. Please check your internet connection and try again.');
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Error deleting booking. Please check your internet connection and try again.');
    }
  };

  // Route planner functions
  const loadJobsForDate = useCallback(async () => {
    if (!db) return;

    try {
      setLoading(true);
      const jobsRef = collection(db, 'jobs');

      // Query for both 'scheduledDate' and 'date' fields to support both job types
      const q1 = query(jobsRef, where('scheduledDate', '==', selectedDate));
      const q2 = query(jobsRef, where('date', '==', selectedDate));

      const [snapshot1, snapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2)
      ]);

      // Merge and deduplicate results
      const jobsMap = new Map();

      snapshot1.docs.forEach(doc => {
        jobsMap.set(doc.id, { id: doc.id, ...doc.data() });
      });

      snapshot2.docs.forEach(doc => {
        jobsMap.set(doc.id, { id: doc.id, ...doc.data() });
      });

      const jobsData = Array.from(jobsMap.values());

      // Sort by priority and creation time
      jobsData.sort((a, b) => {
        const priorityOrder = { high: 3, normal: 2, low: 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(a.createdAt?.toDate()) - new Date(b.createdAt?.toDate());
      });

      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [db, selectedDate]);

  // Load jobs for date range (week/month views)
  const loadJobsForRange = useCallback(async (startDate, endDate) => {
    if (!db) return;

    try {
      setLoading(true);
      const jobsRef = collection(db, 'jobs');
      const snapshot = await getDocs(jobsRef);

      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(job => {
        // Support both 'date' and 'scheduledDate' field names
        const jobDate = job.date || job.scheduledDate;
        if (!jobDate) return false;
        return jobDate >= startDate && jobDate <= endDate;
      });

      // Sort by date and priority
      jobsData.sort((a, b) => {
        const dateA = a.date || a.scheduledDate;
        const dateB = b.date || b.scheduledDate;
        if (dateA !== dateB) {
          return dateA.localeCompare(dateB);
        }
        const priorityOrder = { high: 3, normal: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

      setAllJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs for range:', error);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useEffect(() => {
    if (activeTab === 'routes') {
      if (viewType === 'day') {
        loadJobsForDate();
      } else {
        const { startDate, endDate } = getDateRange(selectedDate, viewType);
        loadJobsForRange(startDate, endDate);
      }
    }
  }, [activeTab, viewType, selectedDate, loadJobsForDate, loadJobsForRange]);

  // Calendar helper functions
  const getDateRange = (date, type) => {
    const currentDate = new Date(date + 'T12:00:00'); // Noon to avoid timezone issues

    if (type === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Sunday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

      return {
        startDate: startOfWeek.toISOString().split('T')[0],
        endDate: endOfWeek.toISOString().split('T')[0]
      };
    } else if (type === 'month') {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      return {
        startDate: startOfMonth.toISOString().split('T')[0],
        endDate: endOfMonth.toISOString().split('T')[0]
      };
    } else if (type === 'year') {
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

      return {
        startDate: startOfYear.toISOString().split('T')[0],
        endDate: endOfYear.toISOString().split('T')[0]
      };
    }

    return { startDate: date, endDate: date };
  };

  const getWeekDays = (date) => {
    const currentDate = new Date(date + 'T12:00:00');
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day.toISOString().split('T')[0]);
    }
    return days;
  };

  const getMonthDays = (date) => {
    const currentDate = new Date(date + 'T12:00:00');
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and what day of week it starts on
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay()); // Start from Sunday

    const days = [];
    const current = new Date(startDate);

    // Generate 6 weeks (42 days) to cover all possible month layouts
    for (let i = 0; i < 42; i++) {
      days.push({
        date: current.toISOString().split('T')[0],
        isCurrentMonth: current.getMonth() === month,
        isToday: current.toDateString() === new Date().toDateString()
      });
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const getJobsForDate = (date) => {
    return allJobs.filter(job => {
      // Support both 'date' and 'scheduledDate' field names
      const jobDate = job.date || job.scheduledDate;
      return jobDate === date;
    });
  };

  // Helper function to create or update customer from job
  const upsertCustomerFromJob = async (jobData, jobDate) => {
    if (!jobData.customerName || !db) return;

    try {
      // Search for existing customer by name
      const customersRef = collection(db, 'customers');
      const q = query(customersRef, where('name', '==', jobData.customerName));
      const snapshot = await getDocs(q);

      const payment = parseFloat(jobData.actualPayment || jobData.expectedPayment || 0);

      if (!snapshot.empty) {
        // Update existing customer
        const customerDoc = snapshot.docs[0];
        const currentData = customerDoc.data();

        await updateDoc(doc(db, 'customers', customerDoc.id), {
          lastServiceDate: jobDate || new Date().toISOString().split('T')[0],
          totalSpent: (currentData.totalSpent || 0) + payment,
          address: jobData.address || currentData.address,
          updatedAt: serverTimestamp()
        });
        console.log('✅ Updated existing customer:', jobData.customerName);
      } else {
        // Create new customer
        const newCustomer = {
          name: jobData.customerName,
          email: '',
          phone: '',
          address: jobData.address || '',
          city: '',
          state: 'CT',
          zip: '',
          customerType: 'Residential',
          status: 'Active',
          paymentMethod: jobData.paymentMethod || 'cash',
          propertySize: '',
          totalSpent: payment,
          lastServiceDate: jobDate || new Date().toISOString().split('T')[0],
          notes: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        await addDoc(collection(db, 'customers'), newCustomer);
        console.log('✅ Created new customer:', jobData.customerName);
      }
    } catch (error) {
      console.error('Error upserting customer:', error);
      // Don't fail the job if customer creation fails
    }
  };

  // Customer autocomplete handlers
  const handleCustomerNameChange = (e) => {
    const value = e.target.value;
    setNewJob({...newJob, customerName: value});

    if (value.trim().length > 0) {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomers(filtered);
      setShowCustomerAutocomplete(true);
    } else {
      // Show all customers when field is empty
      setFilteredCustomers(customers);
      setShowCustomerAutocomplete(customers.length > 0);
    }
  };

  const handleCustomerSelect = (customer) => {
    // Build complete address from customer data
    let fullAddress = customer.address || '';
    if (customer.city || customer.state || customer.zip) {
      const addressParts = [
        customer.address,
        customer.city,
        customer.state,
        customer.zip
      ].filter(part => part && part.trim());
      fullAddress = addressParts.join(', ');
    }

    setNewJob({
      ...newJob,
      customerName: customer.name,
      address: fullAddress
    });
    setShowCustomerAutocomplete(false);
  };

  // User Management Functions
  const loadUserAccounts = async () => {
    if (!db) return;
    try {
      const usersQuery = query(collection(db, 'userAccounts'), orderBy('createdAt', 'desc'));
      const usersSnapshot = await getDocs(usersQuery);
      const users = [];
      usersSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUserAccounts(users);
    } catch (error) {
      console.error('Error loading user accounts:', error);
    }
  };

  const createUserAccount = async () => {
    if (!auth || !db) {
      alert('Authentication not available');
      return;
    }

    if (!newUserAccount.email || !newUserAccount.password) {
      alert('Email and password are required');
      return;
    }

    if (newUserAccount.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      // Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUserAccount.email,
        newUserAccount.password
      );

      // Store user account info in Firestore
      const userAccountData = {
        uid: userCredential.user.uid,
        email: newUserAccount.email,
        displayName: newUserAccount.displayName || '',
        linkedCustomerId: newUserAccount.linkedCustomerId || null,
        role: 'customer',
        source: 'Admin',
        createdAt: serverTimestamp(),
        createdBy: user.email || 'admin'
      };

      await addDoc(collection(db, 'userAccounts'), userAccountData);

      // Update customer if linked
      if (newUserAccount.linkedCustomerId) {
        const customerRef = doc(db, 'customers', newUserAccount.linkedCustomerId);
        await updateDoc(customerRef, {
          linkedUserId: userCredential.user.uid,
          userEmail: newUserAccount.email,
          updatedAt: serverTimestamp()
        });
      }

      alert('✅ User account created successfully!');
      setNewUserAccount({ email: '', password: '', displayName: '', linkedCustomerId: '' });
      loadUserAccounts();
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already in use');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        alert('Password is too weak');
      } else {
        alert('Error creating user account: ' + error.message);
      }
    }
  };

  const linkCustomerToUser = async (customerId, userId, userEmail) => {
    if (!db) return;

    try {
      const customerRef = doc(db, 'customers', customerId);
      await updateDoc(customerRef, {
        linkedUserId: userId,
        userEmail: userEmail,
        updatedAt: serverTimestamp()
      });

      alert('✅ Customer linked to user account!');
      loadUserAccounts();
    } catch (error) {
      console.error('Error linking customer:', error);
      alert('Error linking customer to user');
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!db) {
      alert('Database not available. Please check Firebase setup.');
      return;
    }

    try {
      setIsAddingJob(true);

      const jobData = {
        ...newJob,
        scheduledDate: selectedDate,
        status: 'scheduled',
        createdAt: serverTimestamp(),
        createdBy: 'admin-panel'
      };

      await addDoc(collection(db, 'jobs'), jobData);

      // Automatically create/update customer
      await upsertCustomerFromJob(jobData, selectedDate);

      // Reset form
      setNewJob({
        customerName: '',
        address: '',
        serviceType: 'lawn-maintenance',
        estimatedTime: '30',
        notes: '',
        priority: 'normal',
        expectedPayment: '',
        actualPayment: '',
        paymentStatus: 'pending',
        paymentMethod: 'cash'
      });

      // Reload jobs
      await loadJobsForDate();
      alert('Job added successfully!');

    } catch (error) {
      console.error('Error adding job:', error);
      alert('Error adding job. Please try again.');
    } finally {
      setIsAddingJob(false);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob({
      id: job.id,
      customerName: job.customerName,
      address: job.address,
      serviceType: job.serviceType,
      estimatedTime: job.estimatedTime.toString(),
      notes: job.notes || '',
      priority: job.priority,
      expectedPayment: job.expectedPayment || '',
      actualPayment: job.actualPayment || '',
      paymentStatus: job.paymentStatus || 'pending',
      paymentMethod: job.paymentMethod || 'cash'
    });
  };

  // Generate recurring job instances
  const generateRecurringJobs = async (parentJobId, startDate, jobTemplate) => {
    const { recurrenceType, recurrenceEndDate } = jobTemplate;
    const generatedJobs = [];

    if (!startDate) {
      console.error('❌ Cannot generate recurring jobs without a start date');
      alert('Error: Cannot generate recurring jobs without a start date');
      return [];
    }

    if (!db) {
      console.error('❌ Database not available');
      alert('Error: Database not available');
      return [];
    }

    console.log(`🔄 Starting to generate recurring jobs for parent: ${parentJobId}`);
    console.log(`   Recurrence: ${recurrenceType}, Start: ${startDate}, End: ${recurrenceEndDate || 'auto (1 year)'}`);

    // Calculate end date (default to 1 year if not specified)
    const endDate = recurrenceEndDate
      ? new Date(recurrenceEndDate)
      : new Date(new Date(startDate).setFullYear(new Date(startDate).getFullYear() + 1));

    let currentDate = new Date(startDate);

    // Generate future job instances
    while (currentDate <= endDate) {
      // Move to next occurrence based on recurrence type
      if (recurrenceType === 'weekly') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (recurrenceType === 'biweekly') {
        currentDate.setDate(currentDate.getDate() + 14);
      } else if (recurrenceType === 'monthly') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        break;
      }

      const futureDate = currentDate.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];

      // Don't generate past end date (compare date strings to avoid timezone issues)
      if (futureDate > endDateString) {
        break;
      }

      try {
        // Check if job already exists for this date
        const existingJobsQuery = query(
          collection(db, 'jobs'),
          where('scheduledDate', '==', futureDate),
          where('parentRecurringJobId', '==', parentJobId)
        );
        const existingSnapshot = await getDocs(existingJobsQuery);

        // Skip if already generated
        if (!existingSnapshot.empty) {
          console.log(`   ⏭ Skipping ${futureDate} - already exists`);
          continue;
        }

        // Create the recurring job instance
        const recurringJobData = {
          customerName: jobTemplate.customerName,
          address: jobTemplate.address,
          serviceType: jobTemplate.serviceType,
          estimatedTime: jobTemplate.estimatedTime,
          notes: jobTemplate.notes || '',
          priority: jobTemplate.priority || 'normal',
          expectedPayment: jobTemplate.expectedPayment || 0,
          scheduledDate: futureDate,
          date: futureDate, // Add both for compatibility
          parentRecurringJobId: parentJobId,
          isRecurringInstance: true,
          isRecurring: false, // Instances are not themselves recurring
          recurrenceType: 'none', // Instances don't have their own recurrence
          status: 'scheduled',
          actualPayment: 0,
          paymentStatus: 'pending',
          paymentMethod: jobTemplate.paymentMethod || 'cash',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        console.log(`   ➕ Creating job for ${futureDate}...`);
        const docRef = await addDoc(collection(db, 'jobs'), recurringJobData);
        console.log(`   ✅ Created job ${docRef.id} for ${futureDate}`);
        generatedJobs.push(futureDate);
      } catch (error) {
        console.error(`   ❌ Error creating job for ${futureDate}:`, error);
        // Continue with next date even if one fails
      }
    }

    console.log(`✅ Generated ${generatedJobs.length} recurring job instances`);
    return generatedJobs;
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    if (!db) {
      alert('Database not available. Please check Firebase setup.');
      return;
    }

    try {
      setLoading(true);

      const jobData = {
        customerName: editingJob.customerName,
        address: editingJob.address,
        serviceType: editingJob.serviceType,
        estimatedTime: parseInt(editingJob.estimatedTime),
        notes: editingJob.notes,
        priority: editingJob.priority,
        expectedPayment: editingJob.expectedPayment ? parseFloat(editingJob.expectedPayment) : 0,
        actualPayment: editingJob.actualPayment ? parseFloat(editingJob.actualPayment) : 0,
        paymentStatus: editingJob.paymentStatus,
        paymentMethod: editingJob.paymentMethod,
        recurrenceType: editingJob.recurrenceType || 'none',
        recurrenceEndDate: editingJob.recurrenceEndDate || null,
        isRecurring: !!(editingJob.recurrenceType && editingJob.recurrenceType !== 'none'),
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(db, 'jobs', editingJob.id), jobData);

      // Generate recurring jobs if needed
      if (jobData.recurrenceType && jobData.recurrenceType !== 'none') {
        const startDate = editingJob.scheduledDate || editingJob.date;
        await generateRecurringJobs(editingJob.id, startDate, jobData);
      }

      // Clear editing state
      setEditingJob(null);

      // Reload jobs
      await loadJobsForDate();
      if (viewType !== 'day') {
        await loadJobsForRange();
      }

      alert('Job updated successfully!');

    } catch (error) {
      console.error('Error updating job:', error);
      alert('Error updating job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await deleteDoc(doc(db, 'jobs', jobId));
      await loadJobsForDate();
      if (viewType !== 'day') {
        const { startDate, endDate } = getDateRange(selectedDate, viewType);
        await loadJobsForRange(startDate, endDate);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job.');
    }
  };

  const toggleJobStatus = async (jobId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'scheduled' : 'completed';

      console.log(`Toggling job ${jobId} from ${currentStatus} to ${newStatus}`);

      // First, check if the document exists in Firebase
      const jobRef = doc(db, 'jobs', jobId);
      const jobSnapshot = await getDoc(jobRef);

      if (!jobSnapshot.exists()) {
        console.error(`❌ Job ${jobId} does not exist in Firebase`);
        alert('This job no longer exists in the database. It may have been deleted. Refreshing the view...');

        // Remove from local state
        setJobs(prevJobs => prevJobs.filter(j => j.id !== jobId));
        setAllJobs(prevJobs => prevJobs.filter(j => j.id !== jobId));

        // Reload from Firebase
        await loadJobsForDate();
        if (viewType !== 'day') {
          const { startDate, endDate } = getDateRange(selectedDate, viewType);
          await loadJobsForRange(startDate, endDate);
        }
        return;
      }

      // Optimistically update local state immediately for better UX
      const updateJobInArray = (jobsArray) =>
        jobsArray.map(j =>
          j.id === jobId
            ? { ...j, status: newStatus, completedAt: newStatus === 'completed' ? new Date() : null }
            : j
        );

      setJobs(prevJobs => updateJobInArray(prevJobs));
      setAllJobs(prevJobs => updateJobInArray(prevJobs));

      // Update in Firebase
      await updateDoc(jobRef, {
        status: newStatus,
        completedAt: newStatus === 'completed' ? serverTimestamp() : null,
        updatedAt: serverTimestamp()
      });

      console.log(`✅ Successfully updated job ${jobId} status to ${newStatus}`);

      // If marking as completed, update customer record
      if (newStatus === 'completed') {
        // Find the job to get its details
        const job = jobs.find(j => j.id === jobId) || allJobs.find(j => j.id === jobId);
        if (job) {
          const jobDate = job.scheduledDate || job.date || new Date().toISOString().split('T')[0];
          await upsertCustomerFromJob(job, jobDate);
        }
      }

      // Reload from Firebase to ensure consistency
      await loadJobsForDate();
      if (viewType !== 'day') {
        const { startDate, endDate } = getDateRange(selectedDate, viewType);
        await loadJobsForRange(startDate, endDate);
      }
    } catch (error) {
      console.error('❌ Error updating job status:', error);
      alert(`Error updating job status: ${error.message}`);

      // Reload to revert optimistic update if there was an error
      await loadJobsForDate();
      if (viewType !== 'day') {
        const { startDate, endDate } = getDateRange(selectedDate, viewType);
        await loadJobsForRange(startDate, endDate);
      }
    }
  };

  const handleMakeRecurring = async () => {
    if (!recurringModalJob) return;

    try {
      setLoading(true);

      // Update the original job to mark it as recurring
      const jobRef = doc(db, 'jobs', recurringModalJob.id);
      await updateDoc(jobRef, {
        recurrenceType: recurringSettings.recurrenceType,
        recurrenceEndDate: recurringSettings.recurrenceEndDate || null,
        isRecurring: true,
        updatedAt: serverTimestamp()
      });

      // Generate future recurring job instances
      const jobData = {
        ...recurringModalJob,
        recurrenceType: recurringSettings.recurrenceType,
        recurrenceEndDate: recurringSettings.recurrenceEndDate || null,
        isRecurring: true
      };

      const startDate = recurringModalJob.scheduledDate || recurringModalJob.date;
      await generateRecurringJobs(recurringModalJob.id, startDate, jobData);

      // Close modal and reload
      setRecurringModalJob(null);
      setRecurringSettings({ recurrenceType: 'weekly', recurrenceEndDate: '' });

      await loadJobsForDate();
      if (viewType !== 'day') {
        const { startDate, endDate } = getDateRange(selectedDate, viewType);
        await loadJobsForRange(startDate, endDate);
      }

      alert('Job set to recurring! Future instances have been generated.');
    } catch (error) {
      console.error('Error making job recurring:', error);
      alert('Error making job recurring. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRecurring = async (job) => {
    if (!window.confirm(`Remove recurring status from "${job.customerName}"?\n\nThis will also delete all future scheduled instances of this job.`)) {
      return;
    }

    try {
      setLoading(true);

      // Remove recurring flags from the original job
      const jobRef = doc(db, 'jobs', job.id);
      await updateDoc(jobRef, {
        recurrenceType: 'none',
        recurrenceEndDate: null,
        isRecurring: false,
        updatedAt: serverTimestamp()
      });

      // Delete all future recurring instances
      const futureJobsQuery = query(
        collection(db, 'jobs'),
        where('parentRecurringJobId', '==', job.id),
        where('status', '==', 'scheduled')
      );
      const futureJobsSnapshot = await getDocs(futureJobsQuery);

      const deletePromises = futureJobsSnapshot.docs.map(doc =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);

      console.log(`✅ Removed recurring status and deleted ${futureJobsSnapshot.size} future instances`);

      // Reload calendar
      await loadJobsForDate();
      if (viewType !== 'day') {
        const { startDate, endDate } = getDateRange(selectedDate, viewType);
        await loadJobsForRange(startDate, endDate);
      }

      alert(`Recurring status removed! Deleted ${futureJobsSnapshot.size} future instances.`);
    } catch (error) {
      console.error('Error removing recurring:', error);
      alert('Error removing recurring status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const optimizeRoute = () => {
    if (jobs.length < 2) {
      alert('Need at least 2 jobs to optimize route.');
      return;
    }

    // Create Google Maps URL with multiple destinations
    const origin = encodeURIComponent(jobs[0].address);
    const destinations = jobs.slice(1).map(job => encodeURIComponent(job.address)).join('/');
    const mapsUrl = `https://www.google.com/maps/dir/${origin}/${destinations}`;

    // Open Google Maps in new tab
    window.open(mapsUrl, '_blank');
  };

  const getTotalTime = () => {
    return jobs.reduce((total, job) => total + parseInt(job.estimatedTime), 0);
  };

  const getTotalRevenue = () => {
    return jobs.reduce((total, job) => {
      const payment = job.actualPayment || job.expectedPayment || 0;
      return total + parseFloat(payment);
    }, 0);
  };

  const getAllJobsRevenue = () => {
    return allJobs.reduce((total, job) => {
      const payment = job.actualPayment || job.expectedPayment || 0;
      return total + parseFloat(payment);
    }, 0);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins}min`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}min`;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'normal': return '#3b82f6';
      case 'low': return '#6b7280';
      default: return '#3b82f6';
    }
  };

  const formatDate = (dateString) => {
    // Fix timezone issue by parsing date components locally
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="bg-white shadow-lg rounded-xl mb-6 border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 px-2 sm:px-4 md:px-6 scrollbar-hide">
              {userRole === 'admin' && (
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-3 sm:py-4 px-3 sm:px-4 border-b-3 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'overview'
                      ? 'border-green-600 text-green-700 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  🏠 Overview
                </button>
              )}
              {userPermissions.viewSnowRoutes && (
                <button
                  onClick={() => setActiveTab('snow-removal')}
                  className={`py-3 sm:py-4 px-3 sm:px-4 border-b-3 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'snow-removal'
                      ? 'border-green-600 text-green-700 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  ❄️ Snow
                </button>
              )}
              {userRole === 'admin' && (
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`py-3 sm:py-4 px-3 sm:px-4 border-b-3 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'leads'
                      ? 'border-green-600 text-green-700 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  🎯 Leads
                </button>
              )}
              {userRole === 'admin' && (
                <button
                  onClick={() => setActiveTab('quotes')}
                  className={`py-3 sm:py-4 px-3 sm:px-4 border-b-3 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'quotes'
                      ? 'border-green-600 text-green-700 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  📋 Quotes
                  {stats.pendingBookings > 0 && (
                    <span className="ml-1 sm:ml-2 inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-900 shadow-sm">
                      {stats.pendingBookings}
                    </span>
                  )}
                </button>
              )}
              {(userRole === 'admin' || userPermissions.viewCustomers) && (
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`py-3 sm:py-4 px-3 sm:px-4 border-b-3 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'customers'
                      ? 'border-green-600 text-green-700 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  👥 Customers
                </button>
              )}
              {userRole === 'admin' && (
                <button
                  onClick={() => setActiveTab('employees')}
                  className={`py-3 sm:py-4 px-3 sm:px-4 border-b-3 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'employees'
                      ? 'border-green-600 text-green-700 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  👨‍💼 Employees
                </button>
              )}
              {userRole === 'admin' && (
                <button
                  onClick={() => setActiveTab('routes')}
                  className={`py-3 sm:py-4 px-3 sm:px-4 border-b-3 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === 'routes'
                      ? 'border-green-600 text-green-700 bg-green-50'
                      : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  🗺️ Routes
                </button>
              )}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              borderRadius: '20px',
              padding: '32px',
              color: 'white',
              boxShadow: '0 20px 60px rgba(5, 150, 105, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                right: '100px',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%'
              }}></div>
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                    Welcome back! 👋
                  </h2>
                  <p style={{ fontSize: '16px', opacity: 0.9 }}>
                    Here's what's happening with your business today
                  </p>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-white text-green-700 hover:bg-green-50 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            </div>


            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('routes')}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Schedule Job</div>
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>View Leads</div>
                </button>

                <button
                  onClick={() => setActiveTab('customers')}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Customers</div>
                </button>

                <button
                  onClick={() => setActiveTab('quotes')}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#f59e0b';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Quotes</div>
                </button>

                <button
                  onClick={() => {
                    setShowUserManagement(true);
                    loadUserAccounts();
                  }}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#059669';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔐</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>User Accounts</div>
                </button>

                <button
                  onClick={() => setActiveTab('snow-removal')}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#06b6d4';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>❄️</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Snow Removal</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Jobs */}
              <div className="bg-white rounded-xl shadow-lg p-6" style={{ border: '2px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 className="text-xl font-bold text-gray-900">📅 Today's Schedule</h3>
                  {jobs.length > 0 && (
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      backgroundColor: '#eff6ff',
                      color: '#3b82f6',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}
                    </div>
                  )}
                </div>
                {jobs.length > 0 ? (
                  <div className="space-y-3">
                    {jobs.slice(0, 5).map((job, index) => (
                      <div
                        key={job.id}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          backgroundColor: job.status === 'completed' ? '#f0fdf4' : 'white',
                          border: '2px solid',
                          borderColor: job.status === 'completed' ? '#86efac' : '#e5e7eb',
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onClick={() => setActiveTab('routes')}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(4px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '4px',
                          backgroundColor: job.status === 'completed' ? '#10b981' : '#f59e0b'
                        }}></div>
                        <div className="flex justify-between items-start" style={{ marginLeft: '8px' }}>
                          <div className="flex-1">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: job.status === 'completed' ? '#d1fae5' : '#fef3c7',
                                color: job.status === 'completed' ? '#059669' : '#d97706',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold'
                              }}>
                                {index + 1}
                              </span>
                              <div style={{ fontWeight: '700', color: '#1f2937', fontSize: '15px' }}>
                                {job.customerName}
                              </div>
                            </div>
                            <div style={{ fontSize: '13px', color: '#6b7280', marginLeft: '32px' }}>
                              📍 {job.address?.split(',')[0] || 'No address'}
                            </div>
                            <div style={{ fontSize: '13px', color: '#6b7280', marginLeft: '32px', marginTop: '2px' }}>
                              🛠 {job.serviceType} • ⏱ {job.estimatedTime}min
                            </div>
                            {job.expectedPayment && (
                              <div style={{ fontSize: '13px', color: '#10b981', marginLeft: '32px', marginTop: '4px', fontWeight: '600' }}>
                                💵 ${job.expectedPayment}
                              </div>
                            )}
                          </div>
                          <div style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '700',
                            backgroundColor: job.status === 'completed' ? '#10b981' : '#f59e0b',
                            color: 'white',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {job.status === 'completed' ? '✓ Done' : '⏱ Todo'}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                        Progress Today
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${jobs.length > 0 ? (jobs.filter(j => j.status === 'completed').length / jobs.length) * 100 : 0}%`,
                          height: '100%',
                          backgroundColor: '#10b981',
                          transition: 'width 0.3s'
                        }}></div>
                      </div>
                      <div style={{ fontSize: '13px', color: '#1f2937', marginTop: '6px', fontWeight: '600' }}>
                        {jobs.filter(j => j.status === 'completed').length} of {jobs.length} completed
                      </div>
                    </div>
                    {jobs.length > 5 && (
                      <button
                        onClick={() => setActiveTab('routes')}
                        style={{
                          width: '100%',
                          padding: '14px',
                          marginTop: '12px',
                          color: 'white',
                          backgroundColor: '#3b82f6',
                          fontWeight: '600',
                          fontSize: '14px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          border: 'none',
                          borderRadius: '10px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                      >
                        View all {jobs.length} jobs →
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>No jobs scheduled</div>
                    <div style={{ fontSize: '14px', marginBottom: '20px' }}>Start by adding a job to the route planner</div>
                    <button
                      onClick={() => setActiveTab('routes')}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}
                    >
                      Go to Route Planner
                    </button>
                  </div>
                )}
              </div>

              {/* Recent Bookings */}
              <div className="bg-white rounded-xl shadow-lg p-6" style={{ border: '2px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 className="text-xl font-bold text-gray-900">🔔 Recent Activity</h3>
                  {bookings.length > 0 && (
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      backgroundColor: '#fef3c7',
                      color: '#d97706',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {bookings.length} new
                    </div>
                  )}
                </div>
                {bookings.length > 0 ? (
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking, index) => (
                      <div
                        key={booking.id}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                          border: '2px solid #fbbf24',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onClick={() => setActiveTab('quotes')}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(4px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#ef4444',
                          animation: 'pulse 2s infinite'
                        }}></div>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                              }}>
                                {booking.name?.charAt(0).toUpperCase() || '?'}
                              </span>
                              <div>
                                <div style={{ fontWeight: '700', color: '#78350f', fontSize: '15px' }}>
                                  {booking.name}
                                </div>
                                <div style={{ fontSize: '12px', color: '#92400e', opacity: 0.8 }}>
                                  {booking.email || booking.phone}
                                </div>
                              </div>
                            </div>
                            <div style={{ fontSize: '13px', color: '#92400e', marginLeft: '40px', marginTop: '4px' }}>
                              🛠 {booking.service || (Array.isArray(booking.services) ? booking.services.map(s => s.name).join(', ') : 'Services requested')}
                            </div>
                            {booking.address && (
                              <div style={{ fontSize: '13px', color: '#92400e', marginLeft: '40px', marginTop: '2px' }}>
                                📍 {booking.address}
                              </div>
                            )}
                            {booking.description && (
                              <div style={{
                                fontSize: '12px',
                                color: '#92400e',
                                marginLeft: '40px',
                                marginTop: '4px',
                                padding: '6px 8px',
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                borderRadius: '6px',
                                fontStyle: 'italic'
                              }}>
                                "{booking.description.substring(0, 60)}{booking.description.length > 60 ? '...' : ''}"
                              </div>
                            )}
                          </div>
                          <div style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
                          }}>
                            ⚡ New
                          </div>
                        </div>
                      </div>
                    ))}
                    {bookings.length > 5 && (
                      <button
                        onClick={() => setActiveTab('quotes')}
                        style={{
                          width: '100%',
                          padding: '14px',
                          marginTop: '12px',
                          color: 'white',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          fontWeight: '600',
                          fontSize: '14px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          border: 'none',
                          borderRadius: '10px',
                          transition: 'all 0.2s',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                        }}
                      >
                        View all {bookings.length} bookings →
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }}>🔔</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>No recent bookings</div>
                    <div style={{ fontSize: '14px', marginBottom: '20px' }}>New customer inquiries will appear here</div>
                    <button
                      onClick={() => setActiveTab('quotes')}
                      style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}
                    >
                      View All Quotes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <Leads user={user} />
        )}

        {activeTab === 'customers' && (
          <Customers user={user} />
        )}

        {activeTab === 'employees' && (
          <Employees db={db} auth={auth} secondaryAuth={secondaryAuth} />
        )}


        {activeTab === 'quotes' && (
          <div className="space-y-6">
            {/* Instant Quotes Section (Bookings) */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-5 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-2 rounded-lg">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Instant Quotes</h3>
                    <p className="text-sm text-gray-600 mt-1">From online instant quote system</p>
                  </div>
                  {stats.pendingBookings > 0 && (
                    <span className="ml-auto inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-amber-400 text-amber-900 shadow-md">
                      {stats.pendingBookings} Pending
                    </span>
                  )}
                </div>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-16">
                  <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-gray-500 font-medium">No instant quotes yet</p>
                  <p className="text-sm text-gray-400 mt-1">Bookings from the instant quote system will appear here</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Services</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className={`transition-colors ${booking.status === 'pending' ? 'bg-amber-50 hover:bg-amber-100' : 'hover:bg-gray-50'}`}>
                          <td className="px-6 py-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <div className="text-sm font-bold text-gray-900">{booking.name}</div>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
                                  INSTANT
                                </span>
                              </div>
                              {booking.email && <div className="text-sm text-gray-600">{booking.email}</div>}
                              {booking.phone && <div className="text-sm text-gray-600">{booking.phone}</div>}
                              {booking.preferredDate && (
                                <div className="text-sm text-blue-600 font-medium mt-1">Preferred: {booking.preferredDate}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{booking.address}</div>
                            {booking.propertySize && (
                              <div className="text-sm text-gray-600">
                                {booking.propertySize.acres} acres ({booking.propertySize.sqFt?.toLocaleString()} sq ft)
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              {booking.services?.map((service, idx) => (
                                <div key={idx} className="mb-2">
                                  <span className="font-bold text-gray-900">{service.name}</span>
                                  <span className="text-gray-600"> - {service.frequency}</span>
                                  {service.bushes && (
                                    <div className="text-xs text-gray-500 ml-2 mt-1">
                                      {service.bushes.small > 0 && `Small: ${service.bushes.small} `}
                                      {service.bushes.medium > 0 && `Medium: ${service.bushes.medium} `}
                                      {service.bushes.large > 0 && `Large: ${service.bushes.large} `}
                                      {service.bushes.xlarge > 0 && `XL: ${service.bushes.xlarge}`}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-lg font-bold text-green-600">
                              ${booking.totalPrice?.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                              className={`text-xs px-3 py-1.5 rounded-lg border-0 font-bold ${getStatusColor(booking.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                            {booking.date}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow-md"
                            >
                              DELETE
                            </button>
                            {booking.notes && (
                              <div className="mt-2 text-xs text-gray-600 p-2 bg-blue-50 rounded-lg border border-blue-100 max-w-xs">
                                {booking.notes}
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

            {/* Regular Quotes Section */}
            {/* Add/Edit Quote Modal */}
        {showAddQuote && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[1001] flex items-start justify-center pt-20 pb-10">
            <div className="relative mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white max-h-[calc(100vh-120px)] overflow-y-auto my-auto">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingQuote ? 'Edit Quote' : 'Add New Quote'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={newQuote.name}
                      onChange={(e) => setNewQuote({...newQuote, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Customer name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={newQuote.email}
                      onChange={(e) => setNewQuote({...newQuote, email: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="customer@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newQuote.phone}
                      onChange={(e) => setNewQuote({...newQuote, phone: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="(860) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
                    <select
                      value={newQuote.service}
                      onChange={(e) => setNewQuote({...newQuote, service: e.target.value})}
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
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={newQuote.address}
                      onChange={(e) => setNewQuote({...newQuote, address: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Property address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newQuote.description}
                      onChange={(e) => setNewQuote({...newQuote, description: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="3"
                      placeholder="Project details and notes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newQuote.status}
                      onChange={(e) => setNewQuote({...newQuote, status: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Converted to Lead">Converted to Lead</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddQuote(false);
                      setEditingQuote(null);
                      setNewQuote({
                        name: '',
                        email: '',
                        phone: '',
                        service: '',
                        address: '',
                        description: '',
                        status: 'Pending'
                      });
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingQuote ? saveEditQuote : addQuote}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {editingQuote ? 'Update Quote' : 'Add Quote'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quote Management Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Manual Quotes & Projects</h3>
                <p className="text-sm text-gray-600 mt-1">Manage custom quotes and ongoing projects</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddQuote(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              + Add Quote
            </button>
          </div>

          {quotes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No quotes yet. Add your first customer quote!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quotes.map((quote) => (
                    <tr key={quote.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-gray-900">{quote.name}</div>
                            {quote.source === 'Contact Form' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                🌐 Website
                              </span>
                            )}
                          </div>
                          {quote.email && <div className="text-sm text-gray-500">{quote.email}</div>}
                          {quote.phone && <div className="text-sm text-gray-500">{quote.phone}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{quote.service}</div>
                        {quote.address && <div className="text-sm text-gray-500">{quote.address}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={quote.status}
                          onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(quote.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Converted to Lead">Converted to Lead</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {quote.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col">
                          <div className="flex space-x-2 mb-1">
                            <button
                              onClick={() => convertQuoteToLead(quote)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Convert to lead in pipeline"
                            >
                              → Lead
                            </button>
                            <button
                              onClick={() => editQuote(quote)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteQuote(quote.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                          {quote.updatedBy && (
                            <div className="text-xs text-gray-400">
                              Updated by: {quote.updatedBy.split('@')[0]}
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

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowAddQuote(true)}
                  className="w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  ➕ Add New Quote
                </button>
                <button
                  onClick={() => {
                    const data = JSON.stringify(quotes, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `gd-landscaping-quotes-${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  💾 Export Data
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('This will clear all data. Are you sure?')) {
                      setQuotes([]);
                      localStorage.removeItem('gdlandscaping-quotes');
                      localStorage.removeItem('gdlandscaping-stats');
                    }
                  }}
                  className="w-full text-left px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-red-700"
                >
                  🗑️ Clear All Data
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Data Summary</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Customers:</span>
                  <span className="font-medium">{quotes.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month:</span>
                  <span className="font-medium">
                    {quotes.filter(q => {
                      const quoteDate = new Date(q.date);
                      const now = new Date();
                      return quoteDate.getMonth() === now.getMonth() &&
                             quoteDate.getFullYear() === now.getFullYear();
                    }).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completion Rate:</span>
                  <span className="font-medium">
                    {quotes.length > 0
                      ? Math.round((quotes.filter(q => q.status === 'Completed').length / quotes.length) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/" target="_blank" className="block px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                  🏠 View Website
                </a>
                <a href="/contact" target="_blank" className="block px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                  📞 Contact Page
                </a>
                <a href="/snow-removal" target="_blank" className="block px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                  ❄️ Snow Removal
                </a>
              </div>
            </div>
          </div>
        </div>
          </div>
        )}

        {/* Route Planner Tab */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            {/* Calendar Header and Controls */}
            <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Route Planner</h2>
                  <p className="text-sm text-gray-500">Manage and optimize your daily schedule</p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-3">
                  {/* Previous/Next Navigation */}
                  {(viewType === 'month' || viewType === 'year') && (
                    <button
                      onClick={() => {
                        const date = new Date(selectedDate + 'T12:00:00');
                        if (viewType === 'month') {
                          date.setMonth(date.getMonth() - 1);
                        } else {
                          date.setFullYear(date.getFullYear() - 1);
                        }
                        setSelectedDate(date.toISOString().split('T')[0]);
                      }}
                      className="p-2.5 border-2 border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
                      title={`Previous ${viewType}`}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  <div className="flex bg-gray-50 rounded-xl p-1.5 border border-gray-200">
                    <button
                      onClick={() => setViewType('day')}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        viewType === 'day'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Day
                    </button>
                    <button
                      onClick={() => setViewType('week')}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        viewType === 'week'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setViewType('month')}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        viewType === 'month'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => setViewType('year')}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        viewType === 'year'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Year
                    </button>
                  </div>

                  {(viewType === 'month' || viewType === 'year') && (
                    <button
                      onClick={() => {
                        const date = new Date(selectedDate + 'T12:00:00');
                        if (viewType === 'month') {
                          date.setMonth(date.getMonth() + 1);
                        } else {
                          date.setFullYear(date.getFullYear() + 1);
                        }
                        setSelectedDate(date.toISOString().split('T')[0]);
                      }}
                      className="p-2.5 border-2 border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
                      title={`Next ${viewType}`}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}

                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-medium text-gray-700"
                  />
                </div>
              </div>

              {/* Date Display and Stats */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Showing schedule for</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {viewType === 'day' && formatDate(selectedDate)}
                    {viewType === 'week' && `Week of ${formatDate(getWeekDays(selectedDate)[0])}`}
                    {viewType === 'month' && new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    {viewType === 'year' && new Date(selectedDate + 'T12:00:00').getFullYear()}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">
                      {viewType === 'day' ? jobs.length : allJobs.length}
                    </div>
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mt-1">Total Jobs</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                    <div className="text-2xl font-bold text-green-700">
                      {viewType === 'day'
                        ? jobs.filter(j => j.status === 'completed').length
                        : allJobs.filter(j => j.status === 'completed').length}
                    </div>
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mt-1">Completed</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                    <div className="text-2xl font-bold text-orange-700">
                      {formatTime(viewType === 'day' ? getTotalTime() : allJobs.reduce((total, job) => total + parseInt(job.estimatedTime), 0))}
                    </div>
                    <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mt-1">Total Time</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-700">
                      ${(viewType === 'day' ? getTotalRevenue() : getAllJobsRevenue()).toFixed(2)}
                    </div>
                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mt-1">Revenue</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Views */}
            {viewType === 'day' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Day view content - existing form and job list */}
              {/* Add Job Form */}
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Add New Job</h3>
                    <p className="text-sm text-gray-500 mt-1">Schedule a job for this date</p>
                  </div>
                </div>
                <form onSubmit={handleAddJob}>
                  <div className="space-y-4">
                    <div className="customer-autocomplete-container" style={{ position: 'relative' }}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Name *
                        <span className="text-xs text-gray-500 ml-2 font-normal">(Click to see all customers)</span>
                      </label>
                      <input
                        type="text"
                        value={newJob.customerName}
                        onChange={handleCustomerNameChange}
                        onFocus={() => {
                          // Show all customers or filtered customers when field is focused
                          if (newJob.customerName.trim().length > 0) {
                            const filtered = customers.filter(customer =>
                              customer.name.toLowerCase().includes(newJob.customerName.toLowerCase())
                            );
                            setFilteredCustomers(filtered);
                            setShowCustomerAutocomplete(filtered.length > 0);
                          } else {
                            setFilteredCustomers(customers);
                            setShowCustomerAutocomplete(customers.length > 0);
                          }
                        }}
                        onBlur={() => {
                          // Delay hiding to allow click on dropdown
                          setTimeout(() => setShowCustomerAutocomplete(false), 200);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        autoComplete="off"
                        placeholder="Select or type customer name..."
                      />
                      {showCustomerAutocomplete && filteredCustomers.length > 0 && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          maxHeight: '200px',
                          overflowY: 'auto',
                          backgroundColor: 'white',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          zIndex: 1000,
                          marginTop: '4px'
                        }}>
                          {filteredCustomers.map((customer) => {
                            const fullAddress = [customer.address, customer.city, customer.state, customer.zip]
                              .filter(part => part && part.trim())
                              .join(', ');

                            return (
                              <div
                                key={customer.id}
                                onClick={() => handleCustomerSelect(customer)}
                                style={{
                                  padding: '10px 12px',
                                  cursor: 'pointer',
                                  borderBottom: '1px solid #f3f4f6',
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                              >
                                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '2px' }}>
                                  {customer.name}
                                </div>
                                {fullAddress && (
                                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '2px' }}>
                                    📍 {fullAddress}
                                  </div>
                                )}
                                {customer.phone && (
                                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                    📞 {customer.phone}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                        <span className="text-xs text-gray-500 ml-2">(Start typing for suggestions)</span>
                      </label>
                      <GoogleAddressAutocomplete
                        value={newJob.address}
                        onChange={(value) => setNewJob({...newJob, address: value})}
                        onPlaceSelected={(addressData) => {
                          setNewJob({
                            ...newJob,
                            address: addressData.fullAddress
                          });
                        }}
                        placeholder="Start typing the job address..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Service Type
                        </label>
                        <select
                          value={newJob.serviceType}
                          onChange={(e) => setNewJob({...newJob, serviceType: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="lawn-maintenance">Lawn Maintenance</option>
                          <option value="leaf-cleanup">Leaf Cleanup</option>
                          <option value="snow-removal">Snow Removal</option>
                          <option value="landscaping">Landscaping</option>
                          <option value="tree-service">Tree Service</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Estimated Time
                        </label>
                        <select
                          value={newJob.estimatedTime}
                          onChange={(e) => setNewJob({...newJob, estimatedTime: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="15">15min</option>
                          <option value="30">30min</option>
                          <option value="45">45min</option>
                          <option value="60">1h</option>
                          <option value="90">1h 30min</option>
                          <option value="120">2h</option>
                          <option value="150">2h 30min</option>
                          <option value="180">3h</option>
                          <option value="240">4h</option>
                          <option value="300">5h</option>
                          <option value="360">6h</option>
                          <option value="480">8h</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={newJob.priority}
                        onChange={(e) => setNewJob({...newJob, priority: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low Priority</option>
                        <option value="normal">Normal Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={newJob.notes}
                        onChange={(e) => setNewJob({...newJob, notes: e.target.value})}
                        rows="3"
                        placeholder="Special instructions, equipment needed, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Payment Section */}
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">💰 Payment Information</h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expected Payment ($)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={newJob.expectedPayment}
                            onChange={(e) => setNewJob({...newJob, expectedPayment: e.target.value})}
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Payment Method
                          </label>
                          <select
                            value={newJob.paymentMethod}
                            onChange={(e) => setNewJob({...newJob, paymentMethod: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="cash">Cash</option>
                            <option value="check">Check</option>
                            <option value="venmo">Venmo</option>
                            <option value="zelle">Zelle</option>
                            <option value="card">Credit Card</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isAddingJob}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAddingJob ? 'Adding Job...' : 'Add Job to Schedule'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Edit Job Form */}
              {editingJob && (
                <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">✏️ Edit Job</h3>
                    <button
                      onClick={() => setEditingJob(null)}
                      className="text-gray-500 hover:text-gray-700"
                      title="Cancel edit"
                    >
                      ✕
                    </button>
                  </div>
                  <form onSubmit={handleUpdateJob}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Customer Name *
                        </label>
                        <input
                          type="text"
                          value={editingJob.customerName}
                          onChange={(e) => setEditingJob({...editingJob, customerName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address *
                        </label>
                        <input
                          type="text"
                          value={editingJob.address}
                          onChange={(e) => setEditingJob({...editingJob, address: e.target.value})}
                          placeholder="123 Main St, Berlin, CT 06037"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Service Type
                          </label>
                          <select
                            value={editingJob.serviceType}
                            onChange={(e) => setEditingJob({...editingJob, serviceType: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="lawn-maintenance">Lawn Maintenance</option>
                            <option value="leaf-cleanup">Leaf Cleanup</option>
                            <option value="snow-removal">Snow Removal</option>
                            <option value="landscaping">Landscaping</option>
                            <option value="tree-service">Tree Service</option>
                            <option value="hardscaping">Hardscaping</option>
                            <option value="pressure-washing">Pressure Washing</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estimated Time (minutes)
                          </label>
                          <input
                            type="number"
                            min="15"
                            max="480"
                            step="15"
                            value={editingJob.estimatedTime}
                            onChange={(e) => setEditingJob({...editingJob, estimatedTime: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Priority
                        </label>
                        <select
                          value={editingJob.priority}
                          onChange={(e) => setEditingJob({...editingJob, priority: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="low">Low Priority</option>
                          <option value="normal">Normal Priority</option>
                          <option value="high">High Priority</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notes
                        </label>
                        <textarea
                          value={editingJob.notes}
                          onChange={(e) => setEditingJob({...editingJob, notes: e.target.value})}
                          placeholder="Special instructions, equipment needed, etc."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="2"
                        ></textarea>
                      </div>

                      {/* Payment Section */}
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">💰 Payment Information</h4>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expected Payment ($)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={editingJob.expectedPayment}
                              onChange={(e) => setEditingJob({...editingJob, expectedPayment: e.target.value})}
                              placeholder="0.00"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Actual Payment ($)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={editingJob.actualPayment}
                              onChange={(e) => setEditingJob({...editingJob, actualPayment: e.target.value})}
                              placeholder="0.00"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Payment Status
                            </label>
                            <select
                              value={editingJob.paymentStatus}
                              onChange={(e) => setEditingJob({...editingJob, paymentStatus: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="partial">Partial</option>
                              <option value="overdue">Overdue</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Payment Method
                            </label>
                            <select
                              value={editingJob.paymentMethod}
                              onChange={(e) => setEditingJob({...editingJob, paymentMethod: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="cash">Cash</option>
                              <option value="check">Check</option>
                              <option value="venmo">Venmo</option>
                              <option value="zelle">Zelle</option>
                              <option value="card">Credit Card</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Recurrence Section */}
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">🔄 Recurring Schedule</h4>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Repeat Frequency
                            </label>
                            <select
                              value={editingJob.recurrenceType || 'none'}
                              onChange={(e) => setEditingJob({...editingJob, recurrenceType: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="none">One-time Job</option>
                              <option value="weekly">Weekly (Every 7 days)</option>
                              <option value="biweekly">Bi-weekly (Every 14 days)</option>
                              <option value="monthly">Monthly (Same date)</option>
                            </select>
                          </div>

                          {editingJob.recurrenceType && editingJob.recurrenceType !== 'none' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Generate Until
                              </label>
                              <input
                                type="date"
                                value={editingJob.recurrenceEndDate || ''}
                                onChange={(e) => setEditingJob({...editingJob, recurrenceEndDate: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min={selectedDate}
                              />
                              <p className="text-xs text-gray-500 mt-1">Leave blank to repeat indefinitely</p>
                            </div>
                          )}
                        </div>

                        {editingJob.recurrenceType && editingJob.recurrenceType !== 'none' && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-sm text-blue-800">
                              <strong>ℹ️ Recurring Job:</strong> This job will automatically appear on your schedule
                              {editingJob.recurrenceType === 'weekly' && ' every week'}
                              {editingJob.recurrenceType === 'biweekly' && ' every 2 weeks'}
                              {editingJob.recurrenceType === 'monthly' && ' every month'}
                              {editingJob.recurrenceEndDate && ` until ${new Date(editingJob.recurrenceEndDate).toLocaleDateString()}`}.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Updating Job...' : 'Update Job'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingJob(null)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Make Recurring Modal */}
              {recurringModalJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[1001] flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <h3 className="text-lg font-semibold mb-4">🔄 Make Job Recurring</h3>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Set up a recurring schedule for <strong>{recurringModalJob.customerName}</strong>
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Repeat Frequency
                          </label>
                          <select
                            value={recurringSettings.recurrenceType}
                            onChange={(e) => setRecurringSettings({...recurringSettings, recurrenceType: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="weekly">Weekly (Every 7 days)</option>
                            <option value="biweekly">Bi-weekly (Every 14 days)</option>
                            <option value="monthly">Monthly (Same date)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Generate Until (Optional)
                          </label>
                          <input
                            type="date"
                            value={recurringSettings.recurrenceEndDate}
                            onChange={(e) => setRecurringSettings({...recurringSettings, recurrenceEndDate: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            min={new Date().toISOString().split('T')[0]}
                          />
                          <p className="text-xs text-gray-500 mt-1">Leave blank to generate for 1 year</p>
                        </div>

                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                          <p className="text-sm text-purple-800">
                            <strong>ℹ️ This will create:</strong>
                            {recurringSettings.recurrenceType === 'weekly' && ' A new job every week'}
                            {recurringSettings.recurrenceType === 'biweekly' && ' A new job every 2 weeks'}
                            {recurringSettings.recurrenceType === 'monthly' && ' A new job monthly'}
                            {recurringSettings.recurrenceEndDate
                              ? ` until ${new Date(recurringSettings.recurrenceEndDate).toLocaleDateString()}`
                              : ' for the next year'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setRecurringModalJob(null)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleMakeRecurring}
                        className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? 'Creating...' : '🔄 Make Recurring'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Job List */}
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Today's Jobs</h3>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(selectedDate)}</p>
                  </div>
                  {jobs.length >= 2 && (
                    <button
                      onClick={optimizeRoute}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      Open in Maps
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    Loading jobs...
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium">No jobs scheduled</p>
                    <p className="text-sm mt-1">Add a job to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {jobs.map((job, index) => (
                      <div key={job.id} className={`border-2 rounded-xl p-5 transition-all hover:shadow-md ${
                        job.status === 'completed'
                          ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'
                          : 'border-gray-200 bg-white hover:border-green-300'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3 flex-1">
                            <button
                              onClick={() => toggleJobStatus(job.id, job.status)}
                              className={`mt-1 flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                                job.status === 'completed'
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 text-white shadow-md'
                                  : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                              }`}
                              title={job.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                            >
                              {job.status === 'completed' && (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-gray-600 bg-gray-100">#{index + 1}</span>
                                <span
                                  className="px-3 py-1 rounded-lg text-xs font-bold text-white shadow-sm"
                                  style={{ backgroundColor: getPriorityColor(job.priority) }}
                                >
                                  {job.priority.toUpperCase()}
                                </span>
                                {job.isRecurring && (
                                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-700 border-2 border-purple-200" title="Recurring job">
                                    {job.recurrenceType === 'weekly' ? 'WEEKLY' : job.recurrenceType === 'biweekly' ? 'BI-WEEKLY' : 'MONTHLY'}
                                  </span>
                                )}
                                <span className="text-sm font-semibold text-gray-500">{formatTime(parseInt(job.estimatedTime))}</span>
                              </div>

                              <h4 className={`text-lg font-bold mb-1 ${job.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                {job.customerName}
                              </h4>
                              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.address}
                              </p>
                              <p className="text-sm font-medium text-emerald-600 capitalize">{job.serviceType.replace('-', ' ')}</p>

                            {/* Payment Info */}
                            {(job.expectedPayment || job.actualPayment) && (
                              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                                {job.actualPayment ? (
                                  <span className="text-sm text-green-700 font-bold flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                    </svg>
                                    Paid ${parseFloat(job.actualPayment).toFixed(2)}
                                  </span>
                                ) : job.expectedPayment ? (
                                  <span className="text-sm text-orange-600 font-semibold">
                                    Expected: ${parseFloat(job.expectedPayment).toFixed(2)}
                                  </span>
                                ) : null}
                                {job.paymentStatus && job.paymentStatus !== 'pending' && (
                                  <span className={`text-xs px-3 py-1 rounded-lg font-bold uppercase ${
                                    job.paymentStatus === 'paid' ? 'bg-green-100 text-green-700 border border-green-200' :
                                    job.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                    job.paymentStatus === 'overdue' ? 'bg-red-100 text-red-700 border border-red-200' :
                                    'bg-gray-100 text-gray-600 border border-gray-200'
                                  }`}>
                                    {job.paymentStatus}
                                  </span>
                                )}
                              </div>
                            )}

                              {job.notes && (
                                <p className="text-sm text-gray-600 mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                  {job.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            {job.status === 'completed' && !job.isRecurring && (
                              <button
                                onClick={() => {
                                  setRecurringModalJob(job);
                                  setRecurringSettings({ recurrenceType: 'weekly', recurrenceEndDate: '' });
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                                title="Make this job recurring"
                              >
                                REPEAT
                              </button>
                            )}
                            {job.isRecurring && (
                              <button
                                onClick={() => handleRemoveRecurring(job)}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                                title="Remove recurring status"
                              >
                                STOP
                              </button>
                            )}
                            <button
                              onClick={() => handleEditJob(job)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow-md"
                              title="Edit job"
                            >
                              EDIT
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow-md"
                              title="Delete job"
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {jobs.length >= 2 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                      <button
                        onClick={optimizeRoute}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        🗺️ Open Route in Google Maps
                      </button>

                      <button
                        onClick={() => {
                          const addresses = jobs.map(job => job.address).join('\n');
                          navigator.clipboard.writeText(addresses);
                          alert('Addresses copied to clipboard!');
                        }}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
                        title="Copy all addresses"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            )}

            {/* Week View */}
            {viewType === 'week' && (
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Week View</h3>
                    <p className="text-sm text-gray-500 mt-1">Click a day to select, double-click to view details</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsAddingJob(true);
                      setViewType('day');
                    }}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    + Add Job
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {/* Week headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-medium text-gray-600 p-2 text-sm">
                      {day}
                    </div>
                  ))}

                  {/* Week days */}
                  {getWeekDays(selectedDate).map(date => {
                    const dayJobs = getJobsForDate(date);
                    const isToday = date === new Date().toISOString().split('T')[0];
                    const isSelected = date === selectedDate;

                    return (
                      <div
                        key={date}
                        className={`min-h-24 p-2 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                          isSelected
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100'
                            : isToday
                            ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                        onClick={() => setSelectedDate(date)}
                        onDoubleClick={() => {
                          setSelectedDate(date);
                          setViewType('day');
                        }}
                        title="Double-click to view day details"
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? 'text-green-700' : isSelected ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {new Date(date + 'T12:00:00').getDate()}
                        </div>

                        <div className="space-y-1">
                          {dayJobs.slice(0, 3).map(job => (
                            <div
                              key={job.id}
                              className={`text-xs p-1 rounded text-white truncate flex items-center justify-between ${
                                job.status === 'completed' ? 'opacity-60 line-through' : ''
                              }`}
                              style={{ backgroundColor: getPriorityColor(job.priority) }}
                              title={`${job.customerName} - ${job.serviceType}${job.status === 'completed' ? ' (DONE)' : ''}`}
                            >
                              <span className="truncate">{job.customerName}</span>
                              {job.status === 'completed' && <span>✓</span>}
                            </div>
                          ))}
                          {dayJobs.length > 3 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{dayJobs.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Jobs for {formatDate(selectedDate)} ({getJobsForDate(selectedDate).length})
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {getJobsForDate(selectedDate).map(job => (
                        <div key={job.id} className={`flex items-center justify-between p-3 rounded-lg ${
                          job.status === 'completed' ? 'bg-green-50 border-green-200 border' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() => toggleJobStatus(job.id, job.status)}
                              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                job.status === 'completed'
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                              title={job.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                            >
                              {job.status === 'completed' && '✓'}
                            </button>
                            <span
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: getPriorityColor(job.priority) }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className={`font-medium truncate ${job.status === 'completed' ? 'text-gray-600 line-through' : 'text-gray-900'}`}>
                                {job.customerName}
                              </div>
                              <div className="text-sm text-gray-600 truncate">{job.address}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="text-sm text-gray-500">{formatTime(parseInt(job.estimatedTime))}</div>
                            {job.status === 'completed' && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                DONE
                              </span>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditJob(job)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit job"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete job"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Month View */}
            {viewType === 'month' && (
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Month View</h3>
                    <p className="text-sm text-gray-500 mt-1">Click a day to select, double-click to view details</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsAddingJob(true);
                      setViewType('day');
                    }}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    + Add Job
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {/* Month headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-medium text-gray-600 p-2 text-sm">
                      {day}
                    </div>
                  ))}

                  {/* Month days */}
                  {getMonthDays(selectedDate).map(({ date, isCurrentMonth, isToday }) => {
                    const dayJobs = getJobsForDate(date);
                    const isSelected = date === selectedDate;

                    return (
                      <div
                        key={date}
                        className={`min-h-20 p-1 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                          !isCurrentMonth
                            ? 'bg-gray-50 text-gray-400 border-gray-100'
                            : isSelected
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100'
                            : isToday
                            ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                        onClick={() => setSelectedDate(date)}
                        onDoubleClick={() => {
                          setSelectedDate(date);
                          setViewType('day');
                        }}
                        title="Double-click to view day details"
                      >
                        <div className={`text-xs font-medium mb-1 ${
                          !isCurrentMonth
                            ? 'text-gray-400'
                            : isToday
                            ? 'text-green-700'
                            : isSelected
                            ? 'text-blue-700'
                            : 'text-gray-900'
                        }`}>
                          {new Date(date + 'T12:00:00').getDate()}
                        </div>

                        <div className="space-y-0.5">
                          {dayJobs.slice(0, 2).map(job => (
                            <div
                              key={job.id}
                              className={`text-xs px-1 py-0.5 rounded text-white truncate flex items-center justify-between ${
                                job.status === 'completed' ? 'opacity-70 line-through' : ''
                              }`}
                              style={{ backgroundColor: getPriorityColor(job.priority) }}
                              title={`${job.customerName} - ${job.serviceType}${job.status === 'completed' ? ' (DONE)' : ''}`}
                            >
                              <span className="truncate">{job.customerName.split(' ')[0]}</span>
                              {job.status === 'completed' && <span className="text-xs">✓</span>}
                            </div>
                          ))}
                          {dayJobs.length > 2 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{dayJobs.length - 2}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Jobs for {formatDate(selectedDate)} ({getJobsForDate(selectedDate).length})
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {getJobsForDate(selectedDate).map(job => (
                        <div key={job.id} className={`flex items-center justify-between p-3 rounded-lg ${
                          job.status === 'completed' ? 'bg-green-50 border-green-200 border' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() => toggleJobStatus(job.id, job.status)}
                              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                job.status === 'completed'
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                              title={job.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                            >
                              {job.status === 'completed' && '✓'}
                            </button>
                            <span
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: getPriorityColor(job.priority) }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className={`font-medium truncate ${job.status === 'completed' ? 'text-gray-600 line-through' : 'text-gray-900'}`}>
                                {job.customerName}
                              </div>
                              <div className="text-sm text-gray-600 truncate">{job.address}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="text-sm text-gray-500">{formatTime(parseInt(job.estimatedTime))}</div>
                            {job.status === 'completed' && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                DONE
                              </span>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditJob(job)}
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit job"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete job"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Year View */}
            {viewType === 'year' && (
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Year View</h3>
                    <p className="text-sm text-gray-500 mt-1">Click a month to view details</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }, (_, monthIndex) => {
                    const year = new Date(selectedDate + 'T12:00:00').getFullYear();
                    const monthDate = new Date(year, monthIndex, 1);
                    const monthName = monthDate.toLocaleDateString('en-US', { month: 'long' });
                    const monthStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;

                    // Count jobs for this month
                    const monthJobs = allJobs.filter(job => {
                      const jobDate = job.date || job.scheduledDate;
                      return jobDate && jobDate.startsWith(monthStr);
                    });

                    const completedCount = monthJobs.filter(j => j.status === 'completed').length;
                    const currentMonth = new Date().getMonth() === monthIndex && new Date().getFullYear() === year;

                    return (
                      <div
                        key={monthIndex}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                          currentMonth
                            ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50'
                            : 'border-gray-200 hover:border-green-300 bg-white'
                        }`}
                        onClick={() => {
                          setSelectedDate(`${year}-${String(monthIndex + 1).padStart(2, '0')}-01`);
                          setViewType('month');
                        }}
                      >
                        <div className="text-center">
                          <div className={`text-lg font-bold mb-2 ${currentMonth ? 'text-green-700' : 'text-gray-900'}`}>
                            {monthName}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2">
                              <div className="text-2xl font-bold text-blue-600">
                                {monthJobs.length}
                              </div>
                              <div className="text-xs text-gray-600">
                                {monthJobs.length === 1 ? 'job' : 'jobs'}
                              </div>
                            </div>
                            {completedCount > 0 && (
                              <div className="text-sm text-green-600 font-medium">
                                {completedCount} completed
                              </div>
                            )}
                            {monthJobs.length > 0 && (
                              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                                  style={{ width: `${(completedCount / monthJobs.length) * 100}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Year Summary */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4">Year Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">{allJobs.length}</div>
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mt-1">Total Jobs</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-700">
                        {allJobs.filter(j => j.status === 'completed').length}
                      </div>
                      <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mt-1">Completed</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                      <div className="text-2xl font-bold text-orange-700">
                        {formatTime(allJobs.reduce((total, job) => total + parseInt(job.estimatedTime), 0))}
                      </div>
                      <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mt-1">Total Time</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                      <div className="text-2xl font-bold text-emerald-700">
                        ${getAllJobsRevenue().toFixed(2)}
                      </div>
                      <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mt-1">Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Snow Removal Tab */}
        {activeTab === 'snow-removal' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">❄️ Snow Removal Operations</h2>
                  <p className="text-blue-100">Manage contracts, teams, and routes for efficient snow removal</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{customers.filter(c => c.snowRemoval).length}</div>
                  <div className="text-sm text-blue-100">Active Contracts</div>
                </div>
              </div>
            </div>

            {/* Contract List & Route Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contract List */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Snow Removal Contracts</h3>
                    <p className="text-sm text-gray-500 mt-1">Active contracts for the season</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('customers')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    + Add Contract
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search contracts..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {customers.filter(c => c.snowRemoval).length > 0 ? (
                      customers
                        .filter(c => c.snowRemoval)
                        .map((customer) => (
                          <div key={customer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-900">{customer.name}</h4>
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                    Priority {customer.priority || 'Normal'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                  📍 {customer.address}
                                </p>
                                <p className="text-sm text-gray-500">
                                  📞 {customer.phone || 'No phone'}
                                </p>
                                {customer.notes && (
                                  <p className="text-xs text-gray-500 mt-2 italic">
                                    Note: {customer.notes}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col gap-2">
                                <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200">
                                  Assign Team
                                </button>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-5xl mb-4">❄️</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No snow removal contracts</h3>
                        <p className="text-sm text-gray-500 mb-4">Add customers with snow removal service to see them here</p>
                        <button
                          onClick={() => setActiveTab('customers')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                        >
                          Add First Contract
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Route Map */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Route Map</h3>
                  <p className="text-sm text-gray-500 mt-1">Optimized routes for today's operations</p>
                </div>
                <div className="p-6">
                  <SnowRemovalMap
                    contracts={customers.filter(c => c.snowRemoval)}
                    hoaCondoProperties={hoaCondoProperties}
                    db={db}
                    userPermissions={userPermissions}
                  />
                </div>
              </div>
            </div>

            {/* Team Assignments */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Team Assignments</h3>
                <p className="text-sm text-gray-500 mt-1">Assign contracts to teams for today's snow removal</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Team 1 */}
                  <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          A
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Team Alpha</h4>
                          <p className="text-xs text-gray-500">Lead: John D.</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600">Assigned: </span>
                        <span className="font-semibold text-gray-900">0 contracts</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Est. Time: </span>
                        <span className="font-semibold text-gray-900">0h</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                      Assign Contracts
                    </button>
                  </div>

                  {/* Team 2 */}
                  <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                          B
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Team Bravo</h4>
                          <p className="text-xs text-gray-500">Lead: Mike S.</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600">Assigned: </span>
                        <span className="font-semibold text-gray-900">0 contracts</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Est. Time: </span>
                        <span className="font-semibold text-gray-900">0h</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                      Assign Contracts
                    </button>
                  </div>

                  {/* Team 3 */}
                  <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          C
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Team Charlie</h4>
                          <p className="text-xs text-gray-500">Lead: Dave P.</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-600">Assigned: </span>
                        <span className="font-semibold text-gray-900">0 contracts</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Est. Time: </span>
                        <span className="font-semibold text-gray-900">0h</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
                      Assign Contracts
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* HOA/Condo Properties Section */}
            <div className="mt-8">
              <HOACondoProperties db={db} />
            </div>
          </div>
        )}

        {/* User Management Modal */}
        {showUserManagement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[1001] flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto my-8">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-green-700 to-emerald-800 px-6 py-4 rounded-t-xl z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span>🔐</span> User Account Management
                  </h2>
                  <button
                    onClick={() => {
                      setShowUserManagement(false);
                      setNewUserAccount({ email: '', password: '', displayName: '', linkedCustomerId: '' });
                    }}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                  >
                    <span className="text-2xl">✕</span>
                  </button>
                </div>
                <p className="text-green-100 text-sm mt-1">Create customer accounts and manage access</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Create New User Account */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                    <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                      <span>➕</span> Create New User Account
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={newUserAccount.email}
                          onChange={(e) => setNewUserAccount({...newUserAccount, email: e.target.value})}
                          placeholder="customer@example.com"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">This will be used to log in</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={newUserAccount.password}
                          onChange={(e) => setNewUserAccount({...newUserAccount, password: e.target.value})}
                          placeholder="Min. 6 characters"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={newUserAccount.displayName}
                          onChange={(e) => setNewUserAccount({...newUserAccount, displayName: e.target.value})}
                          placeholder="Customer's full name"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Link to Existing Customer (Optional)
                        </label>
                        <select
                          value={newUserAccount.linkedCustomerId}
                          onChange={(e) => setNewUserAccount({...newUserAccount, linkedCustomerId: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        >
                          <option value="">-- Select a customer --</option>
                          {customers.filter(c => !c.linkedUserId).map(customer => (
                            <option key={customer.id} value={customer.id}>
                              {customer.name} - {customer.email || customer.phone}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Link this login to an existing customer record</p>
                      </div>

                      <button
                        onClick={createUserAccount}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>✓</span> Create User Account
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Existing User Accounts */}
                  <div className="bg-white rounded-xl border-2 border-gray-200">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 rounded-t-xl border-b-2 border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span>👥</span> Existing User Accounts
                        <span className="ml-auto bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {userAccounts.length}
                        </span>
                      </h3>
                    </div>

                    <div className="p-4 max-h-[500px] overflow-y-auto">
                      {userAccounts.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">👤</div>
                          <p className="text-gray-500 font-medium">No user accounts yet</p>
                          <p className="text-sm text-gray-400 mt-1">Create your first user account to get started</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {userAccounts.map((account) => {
                            const linkedCustomer = customers.find(c => c.linkedUserId === account.uid);
                            return (
                              <div key={account.id} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-green-300 transition-all">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <h4 className="font-semibold text-gray-900">
                                        {account.displayName || account.email}
                                      </h4>
                                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                        {account.role || 'customer'}
                                      </span>
                                      {account.source && (
                                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                                          account.source === 'Instant Quote'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                          {account.source === 'Instant Quote' ? '⚡ Auto-Created' : '👤 Admin'}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600">{account.email}</p>
                                    {account.phone && (
                                      <p className="text-sm text-gray-500">📱 {account.phone}</p>
                                    )}
                                    {account.createdAt && (
                                      <p className="text-xs text-gray-400 mt-1">
                                        Created: {new Date(account.createdAt?.seconds * 1000).toLocaleDateString()}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {linkedCustomer ? (
                                  <div className="mt-3 bg-green-50 border-2 border-green-200 rounded-lg p-3">
                                    <p className="text-xs font-semibold text-green-700 mb-1">LINKED CUSTOMER</p>
                                    <p className="font-medium text-green-900">{linkedCustomer.name}</p>
                                    <p className="text-sm text-green-700">{linkedCustomer.address}</p>
                                    {linkedCustomer.phone && (
                                      <p className="text-sm text-green-600">{linkedCustomer.phone}</p>
                                    )}
                                  </div>
                                ) : (
                                  <div className="mt-3">
                                    <p className="text-xs text-gray-500 mb-2 font-medium">Link to customer:</p>
                                    <div className="flex gap-2">
                                      <select
                                        onChange={(e) => {
                                          if (e.target.value) {
                                            linkCustomerToUser(e.target.value, account.uid, account.email);
                                            e.target.value = '';
                                          }
                                        }}
                                        className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                      >
                                        <option value="">-- Select customer --</option>
                                        {customers.filter(c => !c.linkedUserId).map(customer => (
                                          <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Link Existing Customer to Existing User Section */}
                <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <span>🔗</span> Link Existing Customer to Existing User
                  </h3>
                  <p className="text-sm text-blue-700 mb-4">
                    Connect an existing customer record to an existing user account for portal access
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Customer
                      </label>
                      <select
                        id="linkExistingCustomer"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="">-- Choose customer --</option>
                        {customers.filter(c => !c.linkedUserId).map(customer => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name} - {customer.email || customer.phone}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select User Account
                      </label>
                      <select
                        id="linkExistingUser"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="">-- Choose user --</option>
                        {[...userAccounts]
                          .sort((a, b) => {
                            // Sort by creation date - oldest first (base accounts first)
                            const dateA = a.createdAt?.seconds || 0;
                            const dateB = b.createdAt?.seconds || 0;
                            return dateA - dateB;
                          })
                          .map(account => (
                            <option key={account.id} value={`${account.uid}|${account.email}`}>
                              {account.displayName || account.email}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const customerId = document.getElementById('linkExistingCustomer').value;
                      const userValue = document.getElementById('linkExistingUser').value;
                      if (customerId && userValue) {
                        const [userId, userEmail] = userValue.split('|');
                        linkCustomerToUser(customerId, userId, userEmail);
                        document.getElementById('linkExistingCustomer').value = '';
                        document.getElementById('linkExistingUser').value = '';
                      } else {
                        alert('Please select both a customer and a user account');
                      }
                    }}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>🔗</span> Link Customer to User
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminPage = () => {
  const { auth, user, loading } = useFirebase();

  const handleLogin = (userData) => {
    // Firebase context handles login automatically
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Admin Panel - GD Landscaping"
        description="GD Landscaping Admin Dashboard"
        canonicalUrl="https://www.gdlandscapingllc.com/admin"
      />

      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <AdminDashboard user={user} onLogout={handleLogout} />
      )}
    </>
  );
};

export default AdminPage;