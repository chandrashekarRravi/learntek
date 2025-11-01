import React from "react";

// Define a type for a notification
type UserRole = "tutor" | "student" | "admin" | "group";

interface NotificationDetail {
  id: string;
  senderName: string;
  senderRole: UserRole;
  senderId: string;
  receiverName: string;
  receiverRole: UserRole;
  message: string;
  timestamp: string; // e.g., "2 hours ago"
}

// Mock data - in a real app, this would come from an API
const unreadNotifications: NotificationDetail[] = [
  { id: 'n1', senderName: 'Michael Jones', senderRole: 'tutor', senderId: 'MAT101', receiverName: 'Alice Smith', receiverRole: 'student', message: 'Please submit your assignment by tomorrow.', timestamp: '5 minutes ago' },
  { id: 'n2', senderName: 'Bob Johnson', senderRole: 'student', senderId: 'STU102', receiverName: 'Sarah Smith', receiverRole: 'tutor', message: 'I have a question about the last lecture.', timestamp: '1 hour ago' },
  { id: 'n3', senderName: 'Emily Davis', senderRole: 'tutor', senderId: 'CHE101', receiverName: 'Charlie Brown', receiverRole: 'student', message: 'Your project proposal has been approved. Great work!', timestamp: '3 hours ago' },
];

const olderNotifications: NotificationDetail[] = [
  { id: 'n4', senderName: 'Alice Smith', senderRole: 'student', senderId: 'STU101', receiverName: 'Michael Jones', receiverRole: 'tutor', message: 'Thank you for the extension on the assignment.', timestamp: '1 day ago' },
  { id: 'n5', senderName: 'David Wilson', senderRole: 'tutor', senderId: 'PHY103', receiverName: 'Diana Prince', receiverRole: 'student', message: 'Reminder: The midterm exam is next week.', timestamp: '3 days ago' },
  { id: 'n6', senderName: 'System Admin', senderRole: 'admin', senderId: 'SYS-01', receiverName: 'All Tutors', receiverRole: 'group', message: 'System maintenance is scheduled for this weekend.', timestamp: '1 week ago' },
];

// Helper function to get initials from a name
const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Array of pastel colors for avatars
const pastelColors = [
  { bg: 'bg-pink-200', text: 'text-pink-800' },
  { bg: 'bg-purple-200', text: 'text-purple-800' },
  { bg: 'bg-indigo-200', text: 'text-indigo-800' },
  { bg: 'bg-blue-200', text: 'text-blue-800' },
  { bg: 'bg-green-200', text: 'text-green-800' },
  { bg: 'bg-yellow-200', text: 'text-yellow-800' },
  { bg: 'bg-red-200', text: 'text-red-800' },
  { bg: 'bg-teal-200', text: 'text-teal-800' },
];

const getColorForName = (name: string) => {
  const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  return pastelColors[Math.abs(hash % pastelColors.length)];
};

// A reusable component for rendering a single notification
const NotificationItem: React.FC<{ notification: NotificationDetail, isUnread?: boolean }> = ({ notification, isUnread = false }) => {
  const baseClasses = "flex items-start p-4";
  const unreadClasses = "bg-blue-50 border-l-4 border-blue-500 rounded-r-lg";
  const olderClasses = "border-b border-gray-100 last:border-b-0";
  const color = getColorForName(notification.senderName);

  return (
    <div key={notification.id} className={`${baseClasses} ${isUnread ? unreadClasses : olderClasses}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${color.bg} flex items-center justify-center mr-4`}>
        <span className={`text-sm font-bold ${color.text}`}>{getInitials(notification.senderName)}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{notification.senderName}</span>
          <span className="text-gray-800 text-sm capitalize font-semibold"> ({notification.senderRole})</span> messaged to <span className="font-semibold">{notification.receiverName}</span>
          <span className="text-gray-800 text-sm capitalize font-semibold"> ({notification.receiverRole})</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {notification.timestamp} | ID: {notification.senderId}
        </p>
        <p className="text-sm text-gray-700 mt-2">{notification.message}</p>
      </div>
    </div>
  );
};

const NotificationsPage: React.FC = () => {
  return (
    <div className="w-full p-4 md:p-8 space-y-8">
      <h1 className="text-2xl font-bold text-center">NOTIFICATIONS</h1>

      {/* Unread Notifications Box */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Unread Notifications ({unreadNotifications.length})
        </h2>
        <div className="space-y-4">
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification) => <NotificationItem key={notification.id} notification={notification} isUnread />)
          ) : (
            <p className="text-sm text-gray-500">No unread notifications.</p>
          )}
        </div>
      </div>

      {/* Older Notifications Box */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Older Notifications
        </h2>
        <div className="space-y-4">
          {olderNotifications.map((notification) => <NotificationItem key={notification.id} notification={notification} />)}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;