import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import '../styles/NotificationDetail.css';

const NotificationDetail = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const ServiceFee = 10;
  const TotalAmount = Number(notification.price) + Number(notification.guestSize) + ServiceFee;

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      try {
        const res = await fetch(`${BASE_URL}/booking/${id}`);
        const result = await res.json();
        if (res.ok) {
          setNotification(result.data);
        } else {
          console.error('Error fetching notification details:', result.message);
        }
      } catch (error) {
        console.error('Error fetching notification details:', error);
      }
    };

    fetchNotificationDetail();
  }, [id]);

  if (!notification) return <p>Loading...</p>;

  return (
    <div className="notification-detail">
      <h2>{notification.tourName}</h2>
      <p><strong>Full Name:</strong> {notification.fullName}</p>
      <p><strong>Phone Number:</strong> {notification.phoneNumber}</p>
      <p><strong>Email:</strong> {notification.userEmail}</p>
      <p><strong>Guest Size:</strong> {notification.guestSize}</p>
      <p><strong>Booked At:</strong> {new Date(notification.BookAt).toLocaleString()}</p>
      <p><strong>Price:</strong>{TotalAmount}</p>
      <p><strong>Status:</strong> {notification.Status_Transaction ? 'Confirmed' : 'Pending'}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default NotificationDetail;
