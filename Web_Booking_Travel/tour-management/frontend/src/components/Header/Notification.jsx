import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';
import { useNotifications } from '../../context/NotificationContext';

const NotificationPanel = ({ show }) => {
  const { notifications } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (id) => {
    navigate(`/notifications/${id}`);
  };

  return (
    <div className={`notification-panel ${show ? 'show' : ''}`}>
      <h4>Notifications</h4>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="notification-item"
            onClick={() => handleNotificationClick(notification._id)}
          >
            <p>{notification.tourName}</p>
            <small>{notification.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
