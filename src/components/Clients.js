import React, { useState } from 'react';

const Clients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      address: '123 Oak Street, Anytown, ST 12345',
      type: 'residential',
      status: 'active',
      lastService: '2024-12-28',
      totalJobs: 15
    },
    {
      id: 2,
      name: 'ABC Corporation',
      email: 'facilities@abccorp.com',
      phone: '(555) 987-6543',
      address: '456 Business Park Drive, Corporate City, ST 67890',
      type: 'commercial',
      status: 'active',
      lastService: '2024-12-30',
      totalJobs: 8
    },
    {
      id: 3,
      name: 'Mary Johnson',
      email: 'mary.johnson@email.com',
      phone: '(555) 555-0123',
      address: '789 Maple Avenue, Hometown, ST 13579',
      type: 'residential',
      status: 'inactive',
      lastService: '2024-11-15',
      totalJobs: 3
    }
  ]);

  const [editingClient, setEditingClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'residential',
    status: 'active'
  });

  const addClient = () => {
    if (newClient.name && newClient.email && newClient.phone) {
      setClients([...clients, {
        ...newClient,
        id: Date.now(),
        lastService: new Date().toISOString().split('T')[0],
        totalJobs: 0
      }]);
      setNewClient({
        name: '',
        email: '',
        phone: '',
        address: '',
        type: 'residential',
        status: 'active'
      });
    }
  };

  const updateClient = (id, updatedClient) => {
    setClients(clients.map(client => 
      client.id === id ? { ...client, ...updatedClient } : client
    ));
    setEditingClient(null);
  };

  const deleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  const getStatusClass = (status) => {
    return status === 'active' ? 'status-active' : 'status-inactive';
  };

  const getTypeClass = (type) => {
    return type === 'commercial' ? 'type-commercial' : 'type-residential';
  };

  return (
    <div className="clients-content">
      <div className="clients-header">
        <h2>Client Management</h2>
        <button 
          className="add-client-btn"
          onClick={() => setEditingClient('new')}
        >
          Add New Client
        </button>
      </div>

      {editingClient === 'new' && (
        <div className="client-form">
          <h3>Add New Client</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Client name..."
              value={newClient.name}
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email address..."
              value={newClient.email}
              onChange={(e) => setNewClient({...newClient, email: e.target.value})}
            />
            <input
              type="tel"
              placeholder="Phone number..."
              value={newClient.phone}
              onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
            />
            <input
              type="text"
              placeholder="Address..."
              value={newClient.address}
              onChange={(e) => setNewClient({...newClient, address: e.target.value})}
            />
            <select
              value={newClient.type}
              onChange={(e) => setNewClient({...newClient, type: e.target.value})}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
            <select
              value={newClient.status}
              onChange={(e) => setNewClient({...newClient, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="form-actions">
            <button onClick={addClient} className="save-btn">Save Client</button>
            <button onClick={() => setEditingClient(null)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      <div className="clients-grid">
        {clients.map(client => (
          <div key={client.id} className="client-card">
            {editingClient === client.id ? (
              <div className="client-edit-form">
                <input
                  type="text"
                  value={client.name}
                  onChange={(e) => updateClient(client.id, {name: e.target.value})}
                />
                <input
                  type="email"
                  value={client.email}
                  onChange={(e) => updateClient(client.id, {email: e.target.value})}
                />
                <input
                  type="tel"
                  value={client.phone}
                  onChange={(e) => updateClient(client.id, {phone: e.target.value})}
                />
                <div className="edit-actions">
                  <button onClick={() => setEditingClient(null)} className="save-btn">Save</button>
                  <button onClick={() => setEditingClient(null)} className="cancel-btn">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="client-header">
                  <h3>{client.name}</h3>
                  <div className="client-badges">
                    <div className={`client-type ${getTypeClass(client.type)}`}>
                      {client.type.toUpperCase()}
                    </div>
                    <div className={`client-status ${getStatusClass(client.status)}`}>
                      {client.status.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="client-details">
                  <div className="client-contact">
                    <div>{client.email}</div>
                    <div>{client.phone}</div>
                  </div>
                  <div className="client-address">{client.address}</div>
                  <div className="client-stats">
                    <span>Last Service: {new Date(client.lastService).toLocaleDateString()}</span>
                    <span>Total Jobs: {client.totalJobs}</span>
                  </div>
                </div>
                <div className="client-actions">
                  <button 
                    onClick={() => setEditingClient(client.id)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteClient(client.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;