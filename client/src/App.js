import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ProgressBar from './components/ProgressBar';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function isValidPhone(phone) {
  return /^\d{10,15}$/.test(phone);
}

function App() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [visits, setVisits] = useState(0);

  const handleCheckIn = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!isValidPhone(phone)) {
      setMessage('Please enter a valid phone number (10-15 digits).');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/check-in`, { phone });
      setMessage(response.data.message);
      setPhone('');
      if (typeof response.data.visits === 'number') setVisits(response.data.visits);
    } catch (err) {
      setMessage('Check-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h2>📲 Loyalty Rewards Check-In</h2>
        <form onSubmit={handleCheckIn}>
          <input
            type="tel"
            placeholder="Enter your phone number to check in"
            aria-label="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Checking In...' : 'Check In'}
          </button>
        </form>
        <ProgressBar progress={visits % 10} />
        {message && (
          <p className={message.toLowerCase().includes('reward') ? "reward-message" : "message"}>
            {message}
          </p>
        )}
        {loading && <div className="spinner"></div>}
      </div>
    </div>
  );
}

export default App;

