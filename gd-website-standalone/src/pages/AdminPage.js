import React, { useState, useEffect, useCallback } from 'react';
import Login from '../components/Login';
import SEOHead from '../components/SEOHead';
import Leads from '../components/Leads';
import Customers from '../components/Customers';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useFirebase } from '../contexts/FirebaseContext';

const AdminDashboard = ({ user, onLogout }) => {
  const { db } = useFirebase();
  const [activeTab, setActiveTab] = useState('leads');
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

    const updatedStats = {
      totalQuotes: quotes.length,
      pendingQuotes: quotes.filter(q => q.status === 'Pending').length,
      completedJobs: quotes.filter(q => q.status === 'Completed').length + completedJobsFromJobs,
      totalRevenue: calculateRevenue(quotes) + ` (+$${jobRevenue.toFixed(2)} from jobs)`,
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length
    };
    setStats(updatedStats);
  }, [quotes, bookings, allJobsForStats]);

  const calculateRevenue = (quotes) => {
    // Basic revenue calculation - you can customize this
    const completedJobs = quotes.filter(q => q.status === 'Completed').length;
    const avgJobValue = 450; // Average job value - adjust as needed
    return `$${(completedJobs * avgJobValue).toLocaleString()}`;
  };

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
      const q = query(jobsRef, where('scheduledDate', '==', selectedDate));
      const snapshot = await getDocs(q);

      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

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
        if (!job.scheduledDate) return false;
        return job.scheduledDate >= startDate && job.scheduledDate <= endDate;
      });

      // Sort by date and priority
      jobsData.sort((a, b) => {
        if (a.scheduledDate !== b.scheduledDate) {
          return a.scheduledDate.localeCompare(b.scheduledDate);
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
    return allJobs.filter(job => job.scheduledDate === date);
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
      }

      // Don't generate past end date
      if (currentDate > endDate) break;

      const futureDate = currentDate.toISOString().split('T')[0];

      // Check if job already exists for this date
      const existingJobsQuery = query(
        collection(db, 'jobs'),
        where('date', '==', futureDate),
        where('parentRecurringJobId', '==', parentJobId)
      );
      const existingSnapshot = await getDocs(existingJobsQuery);

      // Skip if already generated
      if (!existingSnapshot.empty) continue;

      // Create the recurring job instance
      const recurringJobData = {
        ...jobTemplate,
        date: futureDate,
        parentRecurringJobId: parentJobId,
        isRecurringInstance: true,
        status: 'scheduled',
        actualPayment: 0,
        paymentStatus: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'jobs'), recurringJobData);
      generatedJobs.push(futureDate);
    }

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
        isRecurring: editingJob.recurrenceType && editingJob.recurrenceType !== 'none',
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(db, 'jobs', editingJob.id), jobData);

      // Generate recurring jobs if needed
      if (jobData.recurrenceType && jobData.recurrenceType !== 'none') {
        await generateRecurringJobs(editingJob.id, editingJob.date, jobData);
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
      const jobRef = doc(db, 'jobs', jobId);
      await updateDoc(jobRef, {
        status: newStatus,
        completedAt: newStatus === 'completed' ? serverTimestamp() : null,
        updatedAt: serverTimestamp()
      });

      await loadJobsForDate();
      if (viewType !== 'day') {
        const { startDate, endDate } = getDateRange(selectedDate, viewType);
        await loadJobsForRange(startDate, endDate);
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Error updating job status.');
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.displayName || user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📋</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Quotes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalQuotes}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⏰</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Quotes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.pendingQuotes}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Completed Jobs
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.completedJobs}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Revenue
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalRevenue}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'leads'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🎯 Lead Pipeline
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📅 Bookings
                {stats.pendingBookings > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {stats.pendingBookings}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('quotes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quotes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📋 Quotes Management
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'customers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                👥 Customers
              </button>
              <button
                onClick={() => setActiveTab('routes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'routes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🗺️ Route Planner
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'leads' && (
          <Leads user={user} />
        )}

        {activeTab === 'customers' && (
          <Customers user={user} />
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Customer Bookings
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage all instant quote bookings from your website
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No bookings yet. Bookings from the instant quote system will appear here!</p>
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
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Services
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
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
                    {bookings.map((booking) => (
                      <tr key={booking.id} className={booking.status === 'pending' ? 'bg-yellow-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                              {booking.source === 'Instant Quote' && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  ⚡ Instant
                                </span>
                              )}
                            </div>
                            {booking.email && <div className="text-sm text-gray-500">{booking.email}</div>}
                            {booking.phone && <div className="text-sm text-gray-500">{booking.phone}</div>}
                            {booking.preferredDate && (
                              <div className="text-sm text-blue-600">📅 {booking.preferredDate}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{booking.address}</div>
                          {booking.propertySize && (
                            <div className="text-sm text-gray-500">
                              {booking.propertySize.acres} acres ({booking.propertySize.sqFt?.toLocaleString()} sq ft)
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {booking.services?.map((service, idx) => (
                              <div key={idx} className="mb-1">
                                <span className="font-medium">{service.name}</span>
                                <span className="text-gray-500"> - {service.frequency}</span>
                                {service.bushes && (
                                  <div className="text-xs text-gray-500 ml-2">
                                    {service.bushes.small > 0 && `Small: ${service.bushes.small}, `}
                                    {service.bushes.medium > 0 && `Medium: ${service.bushes.medium}, `}
                                    {service.bushes.large > 0 && `Large: ${service.bushes.large}, `}
                                    {service.bushes.xlarge > 0 && `XL: ${service.bushes.xlarge}`}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-green-600">
                            ${booking.totalPrice?.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(booking.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col">
                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                            {booking.notes && (
                              <div className="mt-2 text-xs text-gray-500 max-w-xs">
                                📝 {booking.notes}
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
        )}

        {activeTab === 'quotes' && (
          <>
            {/* Add/Edit Quote Modal */}
        {showAddQuote && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
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
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Customer Quotes & Projects
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage all customer inquiries and project status
              </p>
            </div>
            <button
              onClick={() => setShowAddQuote(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
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
          </>
        )}

        {/* Route Planner Tab */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            {/* Calendar Header and Controls */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <h2 className="text-lg font-semibold mb-4 lg:mb-0">🗓️ Schedule Planner</h2>

                {/* View Toggle */}
                <div className="flex items-center gap-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewType('day')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewType === 'day'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Day
                    </button>
                    <button
                      onClick={() => setViewType('week')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewType === 'week'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setViewType('month')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewType === 'month'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Month
                    </button>
                  </div>

                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Date Display and Stats */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xl font-medium text-gray-900">
                    {viewType === 'day' && formatDate(selectedDate)}
                    {viewType === 'week' && `Week of ${formatDate(getWeekDays(selectedDate)[0])}`}
                    {viewType === 'month' && new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-4 lg:mt-0">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">
                      {viewType === 'day' ? jobs.length : allJobs.length}
                    </div>
                    <div className="text-sm text-blue-600">Total Jobs</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-green-600">
                      {viewType === 'day'
                        ? jobs.filter(j => j.status === 'completed').length
                        : allJobs.filter(j => j.status === 'completed').length}
                    </div>
                    <div className="text-sm text-green-600">Completed</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">
                      {formatTime(viewType === 'day' ? getTotalTime() : allJobs.reduce((total, job) => total + parseInt(job.estimatedTime), 0))}
                    </div>
                    <div className="text-sm text-orange-600">Total Time</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">
                      ${(viewType === 'day' ? getTotalRevenue() : getAllJobsRevenue()).toFixed(2)}
                    </div>
                    <div className="text-sm text-yellow-600">Revenue</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Views */}
            {viewType === 'day' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Day view content - existing form and job list */}
              {/* Add Job Form */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">➕ Add New Job</h3>
                <form onSubmit={handleAddJob}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Name *
                      </label>
                      <input
                        type="text"
                        value={newJob.customerName}
                        onChange={(e) => setNewJob({...newJob, customerName: e.target.value})}
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
                        value={newJob.address}
                        onChange={(e) => setNewJob({...newJob, address: e.target.value})}
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

              {/* Job List */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">📋 Jobs for {formatDate(selectedDate)}</h3>
                  {jobs.length >= 2 && (
                    <button
                      onClick={optimizeRoute}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
                    >
                      🗺️ Open Route
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    Loading jobs...
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📅</div>
                    No jobs scheduled for this date
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {jobs.map((job, index) => (
                      <div key={job.id} className={`border rounded-lg p-4 transition-all ${
                        job.status === 'completed'
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 bg-white'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3 flex-1">
                            <button
                              onClick={() => toggleJobStatus(job.id, job.status)}
                              className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                job.status === 'completed'
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                              title={job.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                            >
                              {job.status === 'completed' && '✓'}
                            </button>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                                <span
                                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                                  style={{ backgroundColor: getPriorityColor(job.priority) }}
                                >
                                  {job.priority.toUpperCase()}
                                </span>
                                {job.isRecurring && (
                                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-300" title="Recurring job">
                                    🔄 {job.recurrenceType === 'weekly' ? 'Weekly' : job.recurrenceType === 'biweekly' ? 'Bi-weekly' : 'Monthly'}
                                  </span>
                                )}
                                <span className="text-sm text-gray-500">{formatTime(parseInt(job.estimatedTime))}</span>
                                {job.status === 'completed' && (
                                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    COMPLETED
                                  </span>
                                )}
                              </div>

                              <h4 className={`font-semibold ${job.status === 'completed' ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                                {job.customerName}
                              </h4>
                              <p className="text-sm text-gray-600 mb-1">{job.address}</p>
                              <p className="text-sm text-blue-600 capitalize">{job.serviceType.replace('-', ' ')}</p>

                            {/* Payment Info */}
                            {(job.expectedPayment || job.actualPayment) && (
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-green-600">💰</span>
                                {job.actualPayment ? (
                                  <span className="text-sm text-green-600 font-medium">
                                    Paid: ${parseFloat(job.actualPayment).toFixed(2)}
                                  </span>
                                ) : job.expectedPayment ? (
                                  <span className="text-sm text-orange-600">
                                    Expected: ${parseFloat(job.expectedPayment).toFixed(2)}
                                  </span>
                                ) : null}
                                {job.paymentStatus && job.paymentStatus !== 'pending' && (
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    job.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                                    job.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                                    job.paymentStatus === 'overdue' ? 'bg-red-100 text-red-700' :
                                    'bg-gray-100 text-gray-600'
                                  }`}>
                                    {job.paymentStatus}
                                  </span>
                                )}
                              </div>
                            )}

                              {job.notes && (
                                <p className="text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded">
                                  📝 {job.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
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
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">📅 Week View</h3>
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
                        className={`min-h-24 p-2 border rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : isToday
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
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
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">🗓️ Month View</h3>
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
                        className={`min-h-20 p-1 border rounded cursor-pointer transition-colors ${
                          !isCurrentMonth
                            ? 'bg-gray-50 text-gray-400'
                            : isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : isToday
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
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