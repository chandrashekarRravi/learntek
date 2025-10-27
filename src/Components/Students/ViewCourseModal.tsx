import React from 'react';
import { X } from 'lucide-react';

interface Course {
    id: string;
    name: string;
    schedule: string;
    timeSlot: string;
    faculty: string;
    students: number;
    planned: number;
    completed: number;
    enrolledOn: string;
}

interface ViewCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: Course;
    studentName: string;
}

interface DetailItemProps {
    label: string;
    value: string | number;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <div className="flex items-baseline">
        <p className="text-sm font-medium text-gray-500 w-40 shrink-0">{label}:</p>
        <p className="text-base text-gray-900">{value}</p>
    </div>
);


const ViewCourseModal: React.FC<ViewCourseModalProps> = ({ isOpen, onClose, course, studentName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        View Course - <span className="font-mono">{course.id}</span>
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                    <DetailItem label="Course Name" value={course.name} />
                    <DetailItem label="Schedule" value={course.schedule} />
                    <DetailItem label="Time Slot (24 hrs)" value={course.timeSlot} />
                    <DetailItem label="Assigned Faculty" value={course.faculty} />
                    <DetailItem label="Enrolled Student(s)" value={`${studentName} (+${course.students - 1} others)`} />
                    <DetailItem label="Total Class Hours" value={course.planned} />
                    <DetailItem label="Completed Classes" value={course.completed} />
                    <DetailItem label="Course Enrolled On" value={course.enrolledOn} />
                </div>
            </div>
        </div>
    );
};

export default ViewCourseModal;