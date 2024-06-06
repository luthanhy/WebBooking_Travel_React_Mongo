import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL } from '../utils/config';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    let parsedUserData = null;
    if (userData) {
      try {
        parsedUserData = JSON.parse(userData);
        fetchNotifications(parsedUserData._id);
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/booking/notifications/${userId}`);
      const result = await res.json();
      if (res.ok) {
        const notificationsWithTime = result.data.map(notification => ({
          ...notification,
          time: new Date(notification.BookAt).toLocaleString() // Convert to local date string
        }));
        setNotifications(notificationsWithTime);
      } else {
        console.error('Error fetching notifications:', result.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
