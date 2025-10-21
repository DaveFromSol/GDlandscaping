import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    company: {
      name: 'GD Landscaping',
      tagline: 'Professional Landscape Solutions',
      phone: '(555) 123-4567',
      email: 'contact@gdlandscaping.com',
      address: '123 Business St, Your City, ST 12345',
      website: 'www.gdlandscaping.com'
    },
    branding: {
      primaryColor: '#374151',
      secondaryColor: '#10b981',
      accentColor: '#059669',
      logoUrl: ''
    },
    maps: {
      googleMapsApiKey: 'AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c',
      defaultLocation: 'Your City, ST',
      routingEnabled: true
    },
    business: {
      workingHours: {
        monday: { start: '08:00', end: '17:00', enabled: true },
        tuesday: { start: '08:00', end: '17:00', enabled: true },
        wednesday: { start: '08:00', end: '17:00', enabled: true },
        thursday: { start: '08:00', end: '17:00', enabled: true },
        friday: { start: '08:00', end: '17:00', enabled: true },
        saturday: { start: '08:00', end: '15:00', enabled: true },
        sunday: { start: '09:00', end: '15:00', enabled: false }
      },
      taxRate: 8.5,
      currency: 'USD',
      timezone: 'America/New_York'
    }
  });

  const [activeSection, setActiveSection] = useState('company');
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateWorkingHours = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      business: {
        ...prev.business,
        workingHours: {
          ...prev.business.workingHours,
          [day]: {
            ...prev.business.workingHours[day],
            [field]: value
          }
        }
      }
    }));
  };

  const saveSettings = () => {
    // Here you would typically save to Firebase or localStorage
    localStorage.setItem('gdLandscapingSettings', JSON.stringify(settings));
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const loadDefaultSettings = () => {
    // Reset to defaults
    setSettings({
      company: {
        name: 'GD Landscaping',
        tagline: 'Professional Landscape Solutions',
        phone: '(555) 123-4567',
        email: 'contact@gdlandscaping.com',
        address: '123 Business St, Your City, ST 12345',
        website: 'www.gdlandscaping.com'
      },
      branding: {
        primaryColor: '#374151',
        secondaryColor: '#10b981',
        accentColor: '#059669',
        logoUrl: ''
      },
      maps: {
        googleMapsApiKey: 'AIzaSyDiFzxddX5tpdulBf8YMVXFekxFUJ2ys-c',
        defaultLocation: 'Your City, ST',
        routingEnabled: true
      },
      business: {
        workingHours: {
          monday: { start: '08:00', end: '17:00', enabled: true },
          tuesday: { start: '08:00', end: '17:00', enabled: true },
          wednesday: { start: '08:00', end: '17:00', enabled: true },
          thursday: { start: '08:00', end: '17:00', enabled: true },
          friday: { start: '08:00', end: '17:00', enabled: true },
          saturday: { start: '08:00', end: '15:00', enabled: true },
          sunday: { start: '09:00', end: '15:00', enabled: false }
        },
        taxRate: 8.5,
        currency: 'USD',
        timezone: 'America/New_York'
      }
    });
  };

  return (
    <div className="settings-content">
      <div className="settings-header">
        <h2>Dashboard Settings</h2>
        <div className="settings-actions">
          <button onClick={loadDefaultSettings} className="reset-btn">
            Reset to Defaults
          </button>
          <button onClick={saveSettings} className="save-btn">
            Save Settings
          </button>
        </div>
      </div>

      {showSaveMessage && (
        <div className="save-message">
          Settings saved successfully! 
        </div>
      )}

      <div className="settings-layout">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <button 
              className={`settings-nav-btn ${activeSection === 'company' ? 'active' : ''}`}
              onClick={() => setActiveSection('company')}
            >
              Company Info
            </button>
            <button 
              className={`settings-nav-btn ${activeSection === 'branding' ? 'active' : ''}`}
              onClick={() => setActiveSection('branding')}
            >
              Branding
            </button>
            <button 
              className={`settings-nav-btn ${activeSection === 'maps' ? 'active' : ''}`}
              onClick={() => setActiveSection('maps')}
            >
              Maps & Routing
            </button>
            <button 
              className={`settings-nav-btn ${activeSection === 'business' ? 'active' : ''}`}
              onClick={() => setActiveSection('business')}
            >
              Business Hours
            </button>
          </nav>
        </div>

        <div className="settings-main">
          {activeSection === 'company' && (
            <div className="settings-section">
              <h3>Company Information</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={settings.company.name}
                    onChange={(e) => updateSetting('company', 'name', e.target.value)}
                  />
                </div>
                <div className="setting-item">
                  <label>Tagline</label>
                  <input
                    type="text"
                    value={settings.company.tagline}
                    onChange={(e) => updateSetting('company', 'tagline', e.target.value)}
                  />
                </div>
                <div className="setting-item">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={settings.company.phone}
                    onChange={(e) => updateSetting('company', 'phone', e.target.value)}
                  />
                </div>
                <div className="setting-item">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={settings.company.email}
                    onChange={(e) => updateSetting('company', 'email', e.target.value)}
                  />
                </div>
                <div className="setting-item full-width">
                  <label>Business Address</label>
                  <input
                    type="text"
                    value={settings.company.address}
                    onChange={(e) => updateSetting('company', 'address', e.target.value)}
                  />
                </div>
                <div className="setting-item">
                  <label>Website</label>
                  <input
                    type="url"
                    value={settings.company.website}
                    onChange={(e) => updateSetting('company', 'website', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'branding' && (
            <div className="settings-section">
              <h3>Branding & Colors</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Primary Color</label>
                  <div className="color-input">
                    <input
                      type="color"
                      value={settings.branding.primaryColor}
                      onChange={(e) => updateSetting('branding', 'primaryColor', e.target.value)}
                    />
                    <input
                      type="text"
                      value={settings.branding.primaryColor}
                      onChange={(e) => updateSetting('branding', 'primaryColor', e.target.value)}
                    />
                  </div>
                </div>
                <div className="setting-item">
                  <label>Secondary Color</label>
                  <div className="color-input">
                    <input
                      type="color"
                      value={settings.branding.secondaryColor}
                      onChange={(e) => updateSetting('branding', 'secondaryColor', e.target.value)}
                    />
                    <input
                      type="text"
                      value={settings.branding.secondaryColor}
                      onChange={(e) => updateSetting('branding', 'secondaryColor', e.target.value)}
                    />
                  </div>
                </div>
                <div className="setting-item">
                  <label>Accent Color</label>
                  <div className="color-input">
                    <input
                      type="color"
                      value={settings.branding.accentColor}
                      onChange={(e) => updateSetting('branding', 'accentColor', e.target.value)}
                    />
                    <input
                      type="text"
                      value={settings.branding.accentColor}
                      onChange={(e) => updateSetting('branding', 'accentColor', e.target.value)}
                    />
                  </div>
                </div>
                <div className="setting-item full-width">
                  <label>Logo URL</label>
                  <input
                    type="url"
                    value={settings.branding.logoUrl}
                    onChange={(e) => updateSetting('branding', 'logoUrl', e.target.value)}
                    placeholder="https://example.com/your-logo.png"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'maps' && (
            <div className="settings-section">
              <h3>Maps & Routing Configuration</h3>
              <div className="settings-grid">
                <div className="setting-item full-width">
                  <label>Google Maps API Key</label>
                  <input
                    type="password"
                    value={settings.maps.googleMapsApiKey}
                    onChange={(e) => updateSetting('maps', 'googleMapsApiKey', e.target.value)}
                    placeholder="Enter your Google Maps API key"
                  />
                  <small>Get your API key from Google Cloud Console</small>
                </div>
                <div className="setting-item">
                  <label>Default Location</label>
                  <input
                    type="text"
                    value={settings.maps.defaultLocation}
                    onChange={(e) => updateSetting('maps', 'defaultLocation', e.target.value)}
                    placeholder="Your City, State"
                  />
                </div>
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.maps.routingEnabled}
                      onChange={(e) => updateSetting('maps', 'routingEnabled', e.target.checked)}
                    />
                    Enable GPS Routing for Landscapers
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'business' && (
            <div className="settings-section">
              <h3>Business Hours & Settings</h3>
              <div className="working-hours">
                <h4>Working Hours</h4>
                {Object.entries(settings.business.workingHours).map(([day, hours]) => (
                  <div key={day} className="day-hours">
                    <div className="day-name">
                      <label>
                        <input
                          type="checkbox"
                          checked={hours.enabled}
                          onChange={(e) => updateWorkingHours(day, 'enabled', e.target.checked)}
                        />
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </label>
                    </div>
                    {hours.enabled && (
                      <div className="time-inputs">
                        <input
                          type="time"
                          value={hours.start}
                          onChange={(e) => updateWorkingHours(day, 'start', e.target.value)}
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={hours.end}
                          onChange={(e) => updateWorkingHours(day, 'end', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Tax Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.business.taxRate}
                    onChange={(e) => updateSetting('business', 'taxRate', parseFloat(e.target.value))}
                  />
                </div>
                <div className="setting-item">
                  <label>Currency</label>
                  <select
                    value={settings.business.currency}
                    onChange={(e) => updateSetting('business', 'currency', e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;