// src/components/Dashboard/Dashboard.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('/api/auth/me', {
          headers: {
            'x-auth-token': token
          }
        });
        setUserData(res.data);
      } catch (err) {
        console.error('Error fetching user data', err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}</h1>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
