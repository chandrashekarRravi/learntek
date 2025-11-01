import React from "react";
import { Drawer } from "vaul";
import { Bell, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../global/badge";

// NOTE: The types and mock data below are copied from NotificationsPage.tsx.
// In a larger application, it would be best to move these to a shared file.

type UserRole = "tutor" | "student" | "admin" | "group";

interface NotificationDetail {
  id: string;
  senderName: string;
  senderRole: UserRole;
  senderId: string;
  receiverName:string;
  receiverRole: UserRole;
  message: string;
  timestamp: string;
}

const unreadNotifications: NotificationDetail[] = [
    { id: 'n1', senderName: 'Michael Jones', senderRole: 'tutor', senderId: 'MAT101', receiverName: 'Alice Smith', receiverRole: 'student', message: 'Please submit your assignment by tomorrow.', timestamp: '5 minutes ago' },
    { id: 'n2', senderName: 'Bob Johnson', senderRole: 'student', senderId: 'STU102', receiverName: 'Sarah Smith', receiverRole: 'tutor', message: 'I have a question about the last lecture.', timestamp: '1 hour ago' },
    { id: 'n3', senderName: 'Emily Davis', senderRole: 'tutor', senderId: 'CHE101', receiverName: 'Charlie Brown', receiverRole: 'student', message: 'Your project proposal has been approved. Great work!', timestamp: '3 hours ago' },
];

const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const pastelColors = [
  { bg: 'bg-pink-200', text: 'text-pink-800' }, { bg: 'bg-purple-200', text: 'text-purple-800' },
  { bg: 'bg-indigo-200', text: 'text-indigo-800' }, { bg: 'bg-blue-200', text: 'text-blue-800' },
  { bg: 'bg-green-200', text: 'text-green-800' }, { bg: 'bg-yellow-200', text: 'text-yellow-800' },
  { bg: 'bg-red-200', text: 'text-red-800' }, { bg: 'bg-teal-200', text: 'text-teal-800' },
];

const getColorForName = (name: string) => {
  const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  return pastelColors[Math.abs(hash % pastelColors.length)];
};

const NotificationItem: React.FC<{ notification: NotificationDetail }> = ({ notification }) => {
    const color = getColorForName(notification.senderName);
    return (
        <div key={notification.id} className="flex items-start p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${color.bg} flex items-center justify-center mr-4`}>
                <span className={`text-sm font-bold ${color.text}`}>{getInitials(notification.senderName)}</span>
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-800">
                    <span className="font-semibold">{notification.senderName}</span>
                    <span className="text-gray-800 text-sm capitalize font-semibold"> ({notification.senderRole})</span> messaged to <span className="font-semibold">{notification.receiverName}</span>
                    <span className="text-gray-800 text-sm capitalize font-semibold"> ({notification.receiverRole})</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.timestamp} | ID: {notification.senderId}</p>
                <p className="text-sm text-gray-700 mt-2 truncate">{notification.message}</p>
            </div>
        </div>
    );
};

export const NotificationDrawer: React.FC = () => {
  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="w-5 h-5 text-foreground" />
          {unreadNotifications.length > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">{unreadNotifications.length}</Badge>
          )}
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-l-xl h-full w-[400px] mt-24 fixed bottom-0 right-0">
          <div className="p-4 bg-gray-50 border-b rounded-tl-xl flex items-center justify-between">
            <h2 className="text-lg font-semibold">Unread Notifications</h2>
            <Drawer.Close asChild>
                <button className="p-1 rounded-full hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </Drawer.Close>
          </div>
          <div className="flex-1 overflow-y-auto">
            {unreadNotifications.map((notification) => <NotificationItem key={notification.id} notification={notification} />)}
          </div>
          <div className="p-4 border-t">
            <Drawer.Close asChild>
              <Link to="/notifications" className="w-full text-center block text-sm font-medium text-blue-600 hover:underline">View all notifications</Link>
            </Drawer.Close>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};