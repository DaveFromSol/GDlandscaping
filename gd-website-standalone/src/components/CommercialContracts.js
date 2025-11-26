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
import GoogleAddressAutocomplete from './GoogleAddressAutocomplete';

const CommercialContracts = ({ db }) => {
  const [contracts, setContracts] = useState([]);
  const [showAddContract, setShowAddContract] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [newContract, setNewContract] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    contractType: 'seasonal', // seasonal, per-event, per-inch
    contractValue: '',
    priority: 'normal',
    notes: '',
    addresses: []
  });
  const [currentAddress, setCurrentAddress] = useState({
    location: '',
    name: '',
    specialInstructions: ''
  });
  const [expandedContract, setExpandedContract] = useState(null);

  // Real-time listener for commercial contracts
  useEffect(() => {
    if (!db) return;

    const contractsRef = collection(db, 'commercialContracts');
    const q = query(contractsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contractsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContracts(contractsData);
    });

    return () => unsubscribe();
  }, [db]);

  const handleAddAddress = () => {
    if (!currentAddress.location) {
      alert('Please enter an address');
      return;
    }

    if (newContract.addresses.length >= 50) {
      alert('Maximum 50 addresses per contract');
      return;
    }

    setNewContract({
      ...newContract,
      addresses: [...newContract.addresses, { ...currentAddress, id: Date.now() }]
    });

    setCurrentAddress({
      location: '',
      name: '',
      specialInstructions: ''
    });
  };

  const handleRemoveAddress = (addressId) => {
    setNewContract({
      ...newContract,
      addresses: newContract.addresses.filter(addr => addr.id !== addressId)
    });
  };

  const handleSaveContract = async () => {
    if (!db) return;

    if (!newContract.companyName || !newContract.contactPerson) {
      alert('Please fill in company name and contact person');
      return;
    }

    if (newContract.addresses.length === 0) {
      alert('Please add at least one address');
      return;
    }

    try {
      if (editingContract) {
        // Update existing contract
        const contractRef = doc(db, 'commercialContracts', editingContract.id);
        await updateDoc(contractRef, {
          ...newContract,
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new contract
        await addDoc(collection(db, 'commercialContracts'), {
          ...newContract,
          createdAt: serverTimestamp(),
          status: 'active'
        });
      }

      // Reset form
      setNewContract({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        contractType: 'seasonal',
        contractValue: '',
        priority: 'normal',
        notes: '',
        addresses: []
      });
      setShowAddContract(false);
      setEditingContract(null);
    } catch (error) {
      console.error('Error saving contract:', error);
      alert('Error saving contract. Please try again.');
    }
  };

  const handleEditContract = (contract) => {
    setEditingContract(contract);
    setNewContract({
      companyName: contract.companyName,
      contactPerson: contract.contactPerson,
      email: contract.email || '',
      phone: contract.phone || '',
      contractType: contract.contractType || 'seasonal',
      contractValue: contract.contractValue || '',
      priority: contract.priority || 'normal',
      notes: contract.notes || '',
      addresses: contract.addresses || []
    });
    setShowAddContract(true);
  };

  const handleDeleteContract = async (contractId) => {
    if (!window.confirm('Are you sure you want to delete this commercial contract?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'commercialContracts', contractId));
    } catch (error) {
      console.error('Error deleting contract:', error);
      alert('Error deleting contract. Please try again.');
    }
  };

  return (
    <div className="commercial-contracts">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Commercial Snow Removal Contracts</h2>
          <p className="text-gray-600 mt-1">Manage multi-location commercial contracts</p>
        </div>
        <button
          onClick={() => {
            setShowAddContract(!showAddContract);
            setEditingContract(null);
            setNewContract({
              companyName: '',
              contactPerson: '',
              email: '',
              phone: '',
              contractType: 'seasonal',
              contractValue: '',
              priority: 'normal',
              notes: '',
              addresses: []
            });
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
        >
          <span>{showAddContract ? '✕ Cancel' : '+ Add Commercial Contract'}</span>
        </button>
      </div>

      {/* Add/Edit Contract Form */}
      {showAddContract && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-blue-200">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            {editingContract ? 'Edit Commercial Contract' : 'New Commercial Contract'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={newContract.companyName}
                onChange={(e) => setNewContract({ ...newContract, companyName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ABC Corporation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person *
              </label>
              <input
                type="text"
                value={newContract.contactPerson}
                onChange={(e) => setNewContract({ ...newContract, contactPerson: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={newContract.email}
                onChange={(e) => setNewContract({ ...newContract, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={newContract.phone}
                onChange={(e) => setNewContract({ ...newContract, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="(860) 555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Type
              </label>
              <select
                value={newContract.contractType}
                onChange={(e) => setNewContract({ ...newContract, contractType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="seasonal">Seasonal (All Winter)</option>
                <option value="per-event">Per Event</option>
                <option value="per-inch">Per Inch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Value ($)
              </label>
              <input
                type="number"
                value={newContract.contractValue}
                onChange={(e) => setNewContract({ ...newContract, contractValue: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={newContract.priority}
                onChange={(e) => setNewContract({ ...newContract, priority: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contract Notes
            </label>
            <textarea
              value={newContract.notes}
              onChange={(e) => setNewContract({ ...newContract, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Special requirements, billing info, etc."
            />
          </div>

          {/* Add Address Section */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">
              Service Locations ({newContract.addresses.length}/50)
            </h4>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <GoogleAddressAutocomplete
                    value={currentAddress.location}
                    onChange={(address) => setCurrentAddress({ ...currentAddress, location: address })}
                    placeholder="123 Main St, Hartford, CT"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Name
                  </label>
                  <input
                    type="text"
                    value={currentAddress.name}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Main Office"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <input
                  type="text"
                  value={currentAddress.specialInstructions}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, specialInstructions: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Clear loading dock first, salt entrance heavily, etc."
                />
              </div>

              <button
                onClick={handleAddAddress}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                disabled={newContract.addresses.length >= 50}
              >
                + Add Address
              </button>
            </div>

            {/* Address List */}
            {newContract.addresses.length > 0 && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {newContract.addresses.map((addr, index) => (
                  <div key={addr.id} className="flex items-start justify-between bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">#{index + 1}</span>
                        {addr.name && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {addr.name}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mt-1">📍 {addr.location}</p>
                      {addr.specialInstructions && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          ℹ️ {addr.specialInstructions}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveAddress(addr.id)}
                      className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save/Cancel Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleSaveContract}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {editingContract ? 'Update Contract' : 'Save Contract'}
            </button>
            <button
              onClick={() => {
                setShowAddContract(false);
                setEditingContract(null);
                setNewContract({
                  companyName: '',
                  contactPerson: '',
                  email: '',
                  phone: '',
                  contractType: 'seasonal',
                  contractValue: '',
                  priority: 'normal',
                  notes: '',
                  addresses: []
                });
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Contracts List */}
      <div className="grid grid-cols-1 gap-4">
        {contracts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Commercial Contracts</h3>
            <p className="text-gray-600 mb-4">Create your first commercial contract to get started</p>
            <button
              onClick={() => setShowAddContract(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              + Add First Contract
            </button>
          </div>
        ) : (
          contracts.map((contract) => (
            <div key={contract.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{contract.companyName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contract.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        contract.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        contract.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {contract.priority.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {contract.contractType}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Contact:</span> {contract.contactPerson}
                      </div>
                      {contract.phone && (
                        <div>
                          <span className="font-medium">Phone:</span> {contract.phone}
                        </div>
                      )}
                      {contract.email && (
                        <div>
                          <span className="font-medium">Email:</span> {contract.email}
                        </div>
                      )}
                      {contract.contractValue && (
                        <div>
                          <span className="font-medium">Value:</span> ${contract.contractValue}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        📍 {contract.addresses?.length || 0} Location{contract.addresses?.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {contract.notes && (
                      <p className="text-sm text-gray-600 italic mt-2">
                        Note: {contract.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedContract(expandedContract === contract.id ? null : contract.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                    >
                      {expandedContract === contract.id ? 'Hide' : 'View'} Locations
                    </button>
                    <button
                      onClick={() => handleEditContract(contract)}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteContract(contract.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Expanded Addresses */}
                {expandedContract === contract.id && contract.addresses && contract.addresses.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Service Locations:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {contract.addresses.map((addr, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-gray-700">#{index + 1}</span>
                            <div className="flex-1">
                              {addr.name && (
                                <div className="font-medium text-gray-900 mb-1">{addr.name}</div>
                              )}
                              <div className="text-sm text-gray-700">📍 {addr.location}</div>
                              {addr.specialInstructions && (
                                <div className="text-xs text-gray-600 mt-1 italic">
                                  ℹ️ {addr.specialInstructions}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommercialContracts;
