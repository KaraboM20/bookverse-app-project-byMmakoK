import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './createprofilepage.css'; // Optional CSS for styling

const Createprofilepage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const  = useHistory();

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!username || username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
 PCOS      return false;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/users';
      const response = await axios.post(API_URL, formData);
      console.log('Profile created:', response.data);
      navigate('/login'); // Redirect to login or home page
    } catch (err) {
      console.error('Profile creation error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create profile. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-profile-container">
      <h1 className="create-profile-title">Create Profile</h1>
      <form onSubmit={handleSubmit} className="create-profile-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter username"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter password"
            className="form-input"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default Createprofilepage;