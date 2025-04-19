import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Createprofilepage.css';

const Createprofilepage = () => {
  const { login, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  console.log('Rendering Createprofilepage, user=', user);

  if (user) {
    history.push('/');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    if (!username || username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
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
    setSuccess('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/users/register';
      console.log('Sending request to:', API_URL, 'with data:', formData);
      const response = await axios.post(API_URL, formData);
      console.log('Registration response:', response.data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('username', user.username);
      login({ username: user.username, userId: user.id });
      setSuccess('Profile created successfully! Redirecting to home...');
      setFormData({ username: '', email: '', password: '' });
      setTimeout(() => history.push('/'), 2000);
    } catch (err) {
      console.error('Profile creation error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers,
      });
      const errorMessage = err.response?.data?.message || 'Failed to create profile. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-profile-container">
      <h1 className="create-profile-title">Create Profile</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="create-profile-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter username"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default Createprofilepage;