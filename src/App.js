import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/GD.png" alt="GD Landscaping" style={{height: '100px', marginBottom: '20px'}} />
        <h1>GD Landscaping</h1>
        <p>Professional Landscaping Services in Berlin CT</p>
        <div className="services">
          <h2>Our Services</h2>
          <ul>
            <li>Lawn Maintenance</li>
            <li>Landscape Design</li>
            <li>Tree Services</li>
            <li>Hardscaping</li>
          </ul>
        </div>
        <div className="contact">
          <h2>Contact Us</h2>
          <p>Phone: (555) 123-4567</p>
          <p>Email: contact@gdlandscaping.com</p>
        </div>
      </header>
    </div>
  );
}

export default App;