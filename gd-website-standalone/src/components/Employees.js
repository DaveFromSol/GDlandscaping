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

const Employees = ({ db }) => {
  const [employees, setEmployees] = useState([]);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
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

  const handleSaveEmployee = async () => {
    if (!db) return;

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
        await addDoc(collection(db, 'employees'), {
          ...newEmployee,
          createdAt: serverTimestamp()
        });
        alert('Employee added successfully!');
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
      alert('Error saving employee');
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
      {/* Header */}
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
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
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
              ))}
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
