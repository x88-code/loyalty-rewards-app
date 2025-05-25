import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.png';


const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/check-in`, { phone });
      setMessage(response.data.message);
      setPhone('');
    } catch (err) {
      console.error(err);
      setMessage('Check-in failed. Please try again.');
    }
  };

  return (
    <div className="app">
      <div className="card">
        <img src={logo} alt="Logo" style={{ width: 80, marginBottom: 16 }} />
        <h2>📲 Loyalty Rewards Check-In</h2>
        <form onSubmit={handleCheckIn}>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Check In</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;

