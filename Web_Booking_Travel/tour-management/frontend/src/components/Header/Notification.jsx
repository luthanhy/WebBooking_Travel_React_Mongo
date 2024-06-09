import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';
import { useNotifications } from '../../context/NotificationContext';

const NotificationPanel = ({ show, setShow }) => {
  const { notifications } = useNotifications();
  const navigate = useNavigate();
  const panelRef = useRef(null);

  const handleNotificationClick = (id) => {
    navigate(`/notifications/${id}`);
    setShow(false); // Ẩn bảng thông báo sau khi click vào một thông báo
  };

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [show]);

  return (
    <div ref={panelRef} className={`notification-panel ${show ? 'show' : ''}`}>
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
