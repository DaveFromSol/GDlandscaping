import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const Employees = ({ db, auth, secondaryAuth }) => {
  const [employees, setEmployees] = useState([]);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [clockEntries, setClockEntries] = useState([]);
  const [now, setNow] = useState(new Date());
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'employee', // employee or admin
    permissions: {
      viewSnowRoutes: true,
      markSnowComplete: true,
      viewCustomers: false,
      editCustomers: false
    }
  });

  // Real-time listener for employees
  useEffect(() => {
    if (!db) return;

    const employeesRef = collection(db, 'employees');
    const q = query(employeesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const employeesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(employeesData);
    });

    return () => unsubscribe();
  }, [db]);

  // Real-time listener for today's clock entries
  useEffect(() => {
    if (!db) return;
    const today = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, 'clockEntries'),
      where('date', '==', today)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClockEntries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, [db]);

  // Tick every second so elapsed time updates live
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toDate = (ts) => ts?.toDate ? ts.toDate() : ts ? new Date(ts) : null;

  const getActiveEntry = (employeeId) =>
    clockEntries.find(e => e.employeeId === employeeId && !e.clockOut);

  const getTodayEntries = (employeeId) =>
    clockEntries.filter(e => e.employeeId === employeeId);

  const getElapsed = (entry) => {
    if (!entry) return null;
    const start = toDate(entry.clockIn);
    if (!start) return null;
    const end = entry.clockOut ? toDate(entry.clockOut) : now;
    const ms = Math.max(0, end - start);
    const hrs = Math.floor(ms / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const getTotalHours = (employeeId) => {
    const entries = getTodayEntries(employeeId);
    const ms = entries.reduce((sum, e) => {
      const start = toDate(e.clockIn);
      const end = e.clockOut ? toDate(e.clockOut) : now;
      return sum + Math.max(0, end - start);
    }, 0);
    const hrs = Math.floor(ms / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    return hrs > 0 ? `${hrs}h ${mins}m` : mins > 0 ? `${mins}m` : '0m';
  };

  const handleClockToggle = async (employee) => {
    if (!db) return;
    const active = getActiveEntry(employee.id);
    if (active) {
      await updateDoc(doc(db, 'clockEntries', active.id), { clockOut: serverTimestamp() });
    } else {
      await addDoc(collection(db, 'clockEntries'), {
        employeeId: employee.id,
        employeeName: employee.name,
        date: new Date().toISOString().split('T')[0],
        clockIn: serverTimestamp(),
        clockOut: null
      });
    }
  };

  const formatTime = (ts) => {
    const d = toDate(ts);
    if (!d) return '';
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };


  const handleSaveEmployee = async () => {
    if (!db || !secondaryAuth) return;

    if (!newEmployee.name || !newEmployee.email) {
      alert('Please fill in name and email');
      return;
    }

    try {
      if (editingEmployee) {
        // Update existing employee
        const employeeRef = doc(db, 'employees', editingEmployee.id);
        const updateData = {
          name: newEmployee.name,
          email: newEmployee.email,
          phone: newEmployee.phone,
          role: newEmployee.role,
          permissions: newEmployee.permissions,
          updatedAt: serverTimestamp()
        };
        // Only update password if changed
        if (newEmployee.password) {
          updateData.password = newEmployee.password;
        }
        await updateDoc(employeeRef, updateData);
        alert('Employee updated successfully!');
      } else {
        // Add new employee
        if (!newEmployee.password) {
          alert('Password is required for new employees');
          return;
        }

        // Create Firebase Auth user using secondary auth instance
        // This won't affect the current admin session
        const userCredential = await createUserWithEmailAndPassword(
          secondaryAuth,
          newEmployee.email,
          newEmployee.password
        );

        // Save employee details to Firestore
        await addDoc(collection(db, 'employees'), {
          name: newEmployee.name,
          email: newEmployee.email,
          phone: newEmployee.phone,
          role: newEmployee.role,
          permissions: newEmployee.permissions,
          uid: userCredential.user.uid,
          createdAt: serverTimestamp()
        });

        // Sign out the newly created user from secondary auth
        await signOut(secondaryAuth);

        alert('Employee added successfully! They can now login with their email and password.');
      }

      // Reset form
      setNewEmployee({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'employee',
        permissions: {
          viewSnowRoutes: true,
          markSnowComplete: true,
          viewCustomers: false,
          editCustomers: false
        }
      });
      setShowAddEmployee(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error saving employee:', error);

      // Provide user-friendly error messages
      let errorMessage = 'Error saving employee';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address. Please check and try again.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password must be at least 6 characters long.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    }
  };

  const handleEditEmployee = (employee) => {
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      password: '', // Don't show existing password
      phone: employee.phone || '',
      role: employee.role || 'employee',
      permissions: employee.permissions || {
        viewSnowRoutes: true,
        markSnowComplete: true,
        viewCustomers: false,
        editCustomers: false
      }
    });
    setEditingEmployee(employee);
    setShowAddEmployee(true);
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'employees', employeeId));
      alert('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee');
    }
  };

  return (
    <div className="space-y-6">

      {/* ── Clock In / Out Panel ── */}
      <div className="bg-white rounded-2xl shadow border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">🕐 Time Clock</h2>
            <p className="text-xs text-gray-500 mt-0.5">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-3 text-xs font-semibold">
            <span className="text-green-600">{employees.filter(e => getActiveEntry(e.id)).length} clocked in</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">{employees.length} total</span>
          </div>
        </div>

        {employees.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-400 text-sm">No employees yet — add one below.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {employees.map(employee => {
              const active = getActiveEntry(employee.id);
              const todayEntries = getTodayEntries(employee.id);
              const totalHours = todayEntries.length > 0 ? getTotalHours(employee.id) : null;
              const elapsed = active ? getElapsed(active) : null;

              return (
                <div
                  key={employee.id}
                  className={`rounded-xl border-2 p-4 flex flex-col gap-3 transition-all ${
                    active
                      ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {/* Name + status */}
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${active ? 'bg-green-500 shadow-sm shadow-green-300' : 'bg-gray-300'}`}></span>
                    <span className="font-bold text-gray-900 text-sm truncate">{employee.name}</span>
                    {active && (
                      <span className="ml-auto text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">IN</span>
                    )}
                  </div>

                  {/* Elapsed timer */}
                  <div className="text-center py-1">
                    {active ? (
                      <>
                        <div className="text-2xl font-mono font-bold text-green-700 tracking-tight">{elapsed}</div>
                        <div className="text-xs text-green-600 mt-0.5">Since {formatTime(active.clockIn)}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-mono font-bold text-gray-300">--:--</div>
                        {totalHours && (
                          <div className="text-xs text-gray-500 mt-0.5">Today: {totalHours}</div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Single toggle button */}
                  <button
                    onClick={() => handleClockToggle(employee)}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 ${
                      active
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                    }`}
                  >
                    {active ? '⏹ Clock Out' : '▶ Clock In'}
                  </button>

                  {/* Today's punch history */}
                  {todayEntries.length > 0 && (
                    <div className="space-y-1 border-t border-gray-100 pt-2">
                      {todayEntries.map((entry, i) => (
                        <div key={entry.id} className="flex justify-between text-[11px] text-gray-500">
                          <span>#{i + 1} In {formatTime(entry.clockIn)}</span>
                          <span>{entry.clockOut ? `Out ${formatTime(entry.clockOut)}` : <span className="text-green-600 font-semibold">working…</span>}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Employee Management ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage employee accounts and permissions</p>
        </div>
        <button
          onClick={() => {
            setShowAddEmployee(true);
            setEditingEmployee(null);
            setNewEmployee({
              name: '',
              email: '',
              password: '',
              phone: '',
              role: 'employee',
              permissions: {
                viewSnowRoutes: true,
                markSnowComplete: true,
                viewCustomers: false,
                editCustomers: false
              }
            });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          + Add Employee
        </button>
      </div>

      {/* Add/Edit Employee Form */}
      {showAddEmployee && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">
            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password {!editingEmployee && '*'}
              </label>
              <input
                type="password"
                value={newEmployee.password}
                onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={editingEmployee ? 'Leave blank to keep current' : 'Enter password'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Permissions
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newEmployee.permissions.viewSnowRoutes}
                  onChange={(e) => setNewEmployee({
                    ...newEmployee,
                    permissions: { ...newEmployee.permissions, viewSnowRoutes: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">View Snow Removal Routes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newEmployee.permissions.markSnowComplete}
                  onChange={(e) => setNewEmployee({
                    ...newEmployee,
                    permissions: { ...newEmployee.permissions, markSnowComplete: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Mark Snow Stops Complete</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newEmployee.permissions.viewCustomers}
                  onChange={(e) => setNewEmployee({
                    ...newEmployee,
                    permissions: { ...newEmployee.permissions, viewCustomers: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">View Customers</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newEmployee.permissions.editCustomers}
                  onChange={(e) => setNewEmployee({
                    ...newEmployee,
                    permissions: { ...newEmployee.permissions, editCustomers: e.target.checked }
                  })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Edit Customers</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveEmployee}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              {editingEmployee ? 'Update Employee' : 'Add Employee'}
            </button>
            <button
              onClick={() => {
                setShowAddEmployee(false);
                setEditingEmployee(null);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Employees List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Employees ({employees.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => {
                const active = getActiveEntry(employee.id);
                return (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{employee.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{employee.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        employee.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {employee.role || 'employee'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No employees yet. Click "Add Employee" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Employees;
