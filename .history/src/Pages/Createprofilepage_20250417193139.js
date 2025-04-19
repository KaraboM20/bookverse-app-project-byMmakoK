import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Createprofilepage = () => {
  const [isLoggedIn] = useState(false); // Mock: Set to true to test redirect
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useH();

  if (isLoggedIn) {
    navigate('/');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', formData);
      setSuccess('Profile created successfully! Please log in.');
      setError(null);
      setFormData({ username: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create profile');
      setSuccess(null);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      <h1>Create Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
          style={{ padding: '10px', fontSize: '1rem' }}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          style={{ padding: '10px', fontSize: '1rem' }}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          style={{ padding: '10px', fontSize: '1rem' }}
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default Createprofilepage;