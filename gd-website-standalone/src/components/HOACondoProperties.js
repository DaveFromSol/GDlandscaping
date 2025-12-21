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

const HOACondoProperties = ({ db }) => {
  const [properties, setProperties] = useState([]);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [newProperty, setNewProperty] = useState({
    propertyName: '',
    propertyType: 'HOA', // HOA or Condo
    contactName: '',
    email: '',
    phone: '',
    priority: 'normal',
    notes: '',
    addresses: []
  });
  const [currentAddress, setCurrentAddress] = useState({
    location: '',
    unitNumber: '',
    specialInstructions: ''
  });
  const [expandedProperty, setExpandedProperty] = useState(null);
  const [bulkAddMode, setBulkAddMode] = useState(false);
  const [bulkAddresses, setBulkAddresses] = useState('');

  // Real-time listener for HOA/Condo properties
  useEffect(() => {
    if (!db) return;

    const propertiesRef = collection(db, 'hoaCondoProperties');
    const q = query(propertiesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const propertiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertiesData);
    });

    return () => unsubscribe();
  }, [db]);

  const handleAddAddress = () => {
    if (!currentAddress.location) {
      alert('Please enter an address');
      return;
    }

    if (newProperty.addresses.length >= 40) {
      alert('Maximum 40 addresses per HOA/Condo property');
      return;
    }

    setNewProperty({
      ...newProperty,
      addresses: [...newProperty.addresses, { ...currentAddress, id: Date.now() }]
    });

    setCurrentAddress({
      location: '',
      unitNumber: '',
      specialInstructions: ''
    });
  };

  const handleRemoveAddress = (addressId) => {
    setNewProperty({
      ...newProperty,
      addresses: newProperty.addresses.filter(addr => addr.id !== addressId)
    });
  };

  const handleBulkAddAddresses = () => {
    if (!bulkAddresses.trim()) {
      alert('Please paste addresses (one per line)');
      return;
    }

    // Split by newlines and filter out empty lines
    const addressLines = bulkAddresses
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (addressLines.length === 0) {
      alert('No valid addresses found');
      return;
    }

    if (newProperty.addresses.length + addressLines.length > 40) {
      alert(`Cannot add ${addressLines.length} addresses. Current: ${newProperty.addresses.length}, Maximum: 40`);
      return;
    }

    // Convert each line to an address object
    const newAddresses = addressLines.map((location, index) => ({
      location: location,
      unitNumber: '',
      specialInstructions: '',
      id: Date.now() + index
    }));

    setNewProperty({
      ...newProperty,
      addresses: [...newProperty.addresses, ...newAddresses]
    });

    // Clear the bulk input and switch back to single mode
    setBulkAddresses('');
    setBulkAddMode(false);
    alert(`Successfully added ${newAddresses.length} address${newAddresses.length > 1 ? 'es' : ''}`);
  };

  const handleSaveProperty = async () => {
    if (!db) return;

    if (!newProperty.propertyName || !newProperty.contactName) {
      alert('Please fill in property name and contact name');
      return;
    }

    if (newProperty.addresses.length === 0) {
      alert('Please add at least one address');
      return;
    }

    try {
      if (editingProperty) {
        // Update existing property
        const propertyRef = doc(db, 'hoaCondoProperties', editingProperty.id);
        await updateDoc(propertyRef, {
          ...newProperty,
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new property
        await addDoc(collection(db, 'hoaCondoProperties'), {
          ...newProperty,
          createdAt: serverTimestamp(),
          status: 'active'
        });
      }

      // Reset form
      setNewProperty({
        propertyName: '',
        propertyType: 'HOA',
        contactName: '',
        email: '',
        phone: '',
        priority: 'normal',
        notes: '',
        addresses: []
      });
      setShowAddProperty(false);
      setEditingProperty(null);
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property. Please try again.');
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setNewProperty({
      propertyName: property.propertyName,
      propertyType: property.propertyType || 'HOA',
      contactName: property.contactName,
      email: property.email || '',
      phone: property.phone || '',
      priority: property.priority || 'normal',
      notes: property.notes || '',
      addresses: property.addresses || []
    });
    setShowAddProperty(true);
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this HOA/Condo property?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'hoaCondoProperties', propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property. Please try again.');
    }
  };

  return (
    <div className="hoa-condo-properties">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">HOA & Condo Snow Removal</h2>
          <p className="text-gray-600 mt-1">Manage multi-unit HOA and Condo properties</p>
        </div>
        <button
          onClick={() => {
            setShowAddProperty(!showAddProperty);
            setEditingProperty(null);
            setNewProperty({
              propertyName: '',
              propertyType: 'HOA',
              contactName: '',
              email: '',
              phone: '',
              priority: 'normal',
              notes: '',
              addresses: []
            });
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
        >
          <span>{showAddProperty ? '✕ Cancel' : '+ Add HOA/Condo Property'}</span>
        </button>
      </div>

      {/* Add/Edit Property Form */}
      {showAddProperty && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-blue-200">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            {editingProperty ? 'Edit HOA/Condo Property' : 'New HOA/Condo Property'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Name *
              </label>
              <input
                type="text"
                value={newProperty.propertyName}
                onChange={(e) => setNewProperty({ ...newProperty, propertyName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Sunset Hills HOA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                value={newProperty.contactName}
                onChange={(e) => setNewProperty({ ...newProperty, contactName: e.target.value })}
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
                value={newProperty.email}
                onChange={(e) => setNewProperty({ ...newProperty, email: e.target.value })}
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
                value={newProperty.phone}
                onChange={(e) => setNewProperty({ ...newProperty, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="(860) 555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={newProperty.propertyType}
                onChange={(e) => setNewProperty({ ...newProperty, propertyType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="HOA">HOA (Homeowners Association)</option>
                <option value="Condo">Condo (Condominium)</option>
                <option value="Townhome">Townhome Complex</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={newProperty.priority}
                onChange={(e) => setNewProperty({ ...newProperty, priority: e.target.value })}
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
              Property Notes
            </label>
            <textarea
              value={newProperty.notes}
              onChange={(e) => setNewProperty({ ...newProperty, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Special requirements, billing info, etc."
            />
          </div>

          {/* Add Address Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Service Locations ({newProperty.addresses.length}/40)
              </h4>
              <button
                onClick={() => setBulkAddMode(!bulkAddMode)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium"
              >
                {bulkAddMode ? '📝 Single Address' : '📋 Bulk Add'}
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              {!bulkAddMode ? (
                // Single Address Mode
                <>
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
                        Unit/Building Name
                      </label>
                      <input
                        type="text"
                        value={currentAddress.unitNumber}
                        onChange={(e) => setCurrentAddress({ ...currentAddress, unitNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Building A, Unit 101, etc."
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
                      placeholder="Clear walkways first, salt all entrances, etc."
                    />
                  </div>

                  <button
                    onClick={handleAddAddress}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    disabled={newProperty.addresses.length >= 40}
                  >
                    + Add Address
                  </button>
                </>
              ) : (
                // Bulk Add Mode
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paste Addresses (one per line)
                  </label>
                  <textarea
                    value={bulkAddresses}
                    onChange={(e) => setBulkAddresses(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="123 Main St, Hartford, CT&#10;456 Elm St, New Haven, CT&#10;789 Oak Ave, Stamford, CT"
                    rows={8}
                  />
                  <p className="text-xs text-gray-500 mt-2 mb-3">
                    💡 Paste each address on a new line. You can add up to {40 - newProperty.addresses.length} more addresses.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleBulkAddAddresses}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                      disabled={newProperty.addresses.length >= 40 || !bulkAddresses.trim()}
                    >
                      ✓ Add All Addresses
                    </button>
                    <button
                      onClick={() => {
                        setBulkAddresses('');
                        setBulkAddMode(false);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Address List */}
            {newProperty.addresses.length > 0 && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {newProperty.addresses.map((addr, index) => (
                  <div key={addr.id} className="flex items-start justify-between bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">#{index + 1}</span>
                        {addr.unitNumber && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {addr.unitNumber}
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
              onClick={handleSaveProperty}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {editingProperty ? 'Update Contract' : 'Save Contract'}
            </button>
            <button
              onClick={() => {
                setShowAddProperty(false);
                setEditingProperty(null);
                setNewProperty({
                  propertyName: '',
                  contactName: '',
                  email: '',
                  phone: '',
                  propertyType: 'seasonal',
                  seasonalRate: '',
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
        {properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Commercial Contracts</h3>
            <p className="text-gray-600 mb-4">Create your first commercial contract to get started</p>
            <button
              onClick={() => setShowAddProperty(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              + Add First Contract
            </button>
          </div>
        ) : (
          properties.map((contract) => (
            <div key={contract.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{contract.propertyName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contract.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        contract.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        contract.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {contract.priority.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {contract.propertyType}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Contact:</span> {contract.contactName}
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
                      {contract.seasonalRate && (
                        <div>
                          <span className="font-medium">Value:</span> ${contract.seasonalRate}
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
                      onClick={() => setExpandedProperty(expandedProperty === contract.id ? null : contract.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                    >
                      {expandedProperty === contract.id ? 'Hide' : 'View'} Locations
                    </button>
                    <button
                      onClick={() => handleEditProperty(contract)}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(contract.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Expanded Addresses */}
                {expandedProperty === contract.id && contract.addresses && contract.addresses.length > 0 && (
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

export default HOACondoProperties;
