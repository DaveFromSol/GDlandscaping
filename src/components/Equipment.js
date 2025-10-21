import React, { useState } from 'react';

const Equipment = () => {
  const [equipment, setEquipment] = useState([
    { id: 1, name: 'Commercial Mower', status: 'available', wishlist: false },
    { id: 2, name: 'Hedge Trimmer', status: 'maintenance', wishlist: false },
    { id: 3, name: 'Leaf Blower', status: 'available', wishlist: false },
    { id: 4, name: 'Chainsaw', status: 'in-use', wishlist: false }
  ]);

  const [wishlist, setWishlist] = useState([
    { id: 5, name: 'Industrial Mulcher', price: '$15,000', priority: 'high' },
    { id: 6, name: 'Excavator Attachment', price: '$8,500', priority: 'medium' }
  ]);

  const [newEquipment, setNewEquipment] = useState('');
  const [newWishItem, setNewWishItem] = useState({ name: '', price: '', priority: 'medium' });

  const addEquipment = () => {
    if (newEquipment.trim()) {
      setEquipment([...equipment, {
        id: Date.now(),
        name: newEquipment,
        status: 'available',
        wishlist: false
      }]);
      setNewEquipment('');
    }
  };

  const addToWishlist = () => {
    if (newWishItem.name.trim()) {
      setWishlist([...wishlist, {
        id: Date.now(),
        ...newWishItem
      }]);
      setNewWishItem({ name: '', price: '', priority: 'medium' });
    }
  };

  const updateStatus = (id, newStatus) => {
    setEquipment(equipment.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'available': return 'status-available';
      case 'in-use': return 'status-in-use';
      case 'maintenance': return 'status-maintenance';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className="equipment-content">
      <div className="equipment-section">
        <div className="section-header">
          <h2>Current Equipment</h2>
          <div className="add-equipment">
            <input
              type="text"
              placeholder="Add new equipment..."
              value={newEquipment}
              onChange={(e) => setNewEquipment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addEquipment()}
            />
            <button onClick={addEquipment} className="add-btn">Add</button>
          </div>
        </div>
        
        <div className="equipment-grid">
          {equipment.map(item => (
            <div key={item.id} className="equipment-card">
              <h3>{item.name}</h3>
              <div className={`equipment-status ${getStatusClass(item.status)}`}>
                {item.status.toUpperCase().replace('-', ' ')}
              </div>
              <div className="equipment-actions">
                <select 
                  value={item.status} 
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                  className="status-select"
                >
                  <option value="available">Available</option>
                  <option value="in-use">In Use</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wishlist-section">
        <div className="section-header">
          <h2>Equipment Wishlist</h2>
          <div className="add-wishlist">
            <input
              type="text"
              placeholder="Equipment name..."
              value={newWishItem.name}
              onChange={(e) => setNewWishItem({...newWishItem, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Price..."
              value={newWishItem.price}
              onChange={(e) => setNewWishItem({...newWishItem, price: e.target.value})}
            />
            <select
              value={newWishItem.priority}
              onChange={(e) => setNewWishItem({...newWishItem, priority: e.target.value})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button onClick={addToWishlist} className="add-btn">Add to Wishlist</button>
          </div>
        </div>

        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-card">
              <h3>{item.name}</h3>
              <div className="wishlist-price">{item.price}</div>
              <div className={`wishlist-priority ${getPriorityClass(item.priority)}`}>
                {item.priority.toUpperCase()} PRIORITY
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipment;