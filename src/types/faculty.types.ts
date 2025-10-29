export interface Faculty {
  id: string;
  firstName: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  email?: string;
  mobile: string;
  subject: string;
  availability: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  days: string[];
  startTime: string;
  endTime: string;
}

export interface Notification {
  id: string;
  from: string;
  fromRole: string;
  to: string;
  toRole: string;
  message: string;
  timestamp: string;
  courseCode: string;
  isRead: boolean;
}
