import React from 'react';
import './Notification.css';

interface NotificationMessage {
  id: number;
  message: string;
}

const Notification: React.FC = () => {
  // You can add state and logic here to manage notifications
  const notifications: NotificationMessage[] = []; // Example: empty array

  return (
    <div className="notification-container">
      <h2 className="notification-header">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              {notification.message}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notifications">You have no new notifications.</p>
      )}
    </div>
  );
};

export default Notification;
