import React from 'react';
import { ArrowLeft, User, BookOpen, Shield, Edit } from 'lucide-react';
import { Button } from '@/Components/global/button';
import EditStudentModal from './EditStudentModal';
import { EnrolledCoursesTable } from './EnrolledCoursesTable';

interface Student {
  id: string;
  name: string;
  grade: string;
  dateOfBirth: string;
  email: string;
  mobile: string;
  parentName: string;
  parentEmail: string;
  parentMobile: string;
  enrolledCourseIds: string[];
}

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

interface StudentDetailsProps {
    studentId: string;
    onBack: () => void;
}

// Mock student data - in a real app, this would come from an API
const studentsData: Student[] = [
  {
    id: "STU101",
    name: "Alice Smith",
    grade: "10",
    dateOfBirth: "2008-05-15",
    email: "alice.s@example.com",
    mobile: "123-456-7890",
    parentName: "John Smith",
    parentEmail: "john.s@example.com",
    parentMobile: "987-654-3210",
    enrolledCourseIds: ["MAT101", "BIO101", "CHE101"],
  },
  {
    id: "STU102",
    name: "Bob Johnson",
    grade: "11",
    email: "bob.j@example.com",
    dateOfBirth: "2007-09-22",
    mobile: "234-567-8901",
    parentName: "Jane Johnson",
    parentMobile: "876-543-2109",
    parentEmail: "jane.j@example.com",
    enrolledCourseIds: ["PHY103", "LIT101"],
  },
  {
    id: "STU103",
    name: "Charlie Brown",
    grade: "10",
    email: "charlie.b@example.com",
    mobile: "345-678-9012",
    dateOfBirth: "2008-02-10",
    parentName: "Sally Brown",
    parentMobile: "765-432-1098",
    parentEmail: "sally.b@example.com",
    enrolledCourseIds: ["MAT101", "HIS102"],
  },
  {
    id: "STU104",
    name: "Diana Prince",
    grade: "12",
    email: "diana.p@example.com",
    mobile: "456-789-0123",
    dateOfBirth: "2006-11-30",
    parentName: "Queen Hippolyta",
    parentMobile: "654-321-0987",
    parentEmail: "hippolyta@them.com",
    enrolledCourseIds: ["PHY103", "LIT101"],
  },
  {
    id: "STU105",
    name: "Eve Adams",
    grade: "9",
    email: "eve.a@example.com",
    mobile: "567-890-1234",
    dateOfBirth: "2009-07-19",
    parentName: "Adam Adams",
    parentMobile: "543-210-9876",
    parentEmail: "adam.a@example.com",
    enrolledCourseIds: ["BIO101", "LIT101", "HIS102"],
  },
];

const allCoursesData: Course[] = [
  {
    id: "MAT101",
    name: "Mathematics",
    schedule: "Mon, Tue, Wed",
    timeSlot: "08:00-10:00",
    faculty: "Michael Jones",
    students: 2,
    planned: 25,
    completed: 12,
    enrolledOn: "2024-01-15",
  },
  {
    id: "BIO101",
    name: "Biology",
    schedule: "Tue, Thu",
    timeSlot: "10:00-12:00",
    faculty: "Sarah Smith",
    students: 1,
    planned: 15,
    completed: 10,
    enrolledOn: "2024-02-20",
  },
  {
    id: "CHE101",
    name: "Chemistry",
    schedule: "Mon, Wed, Fri",
    timeSlot: "13:00-15:00",
    faculty: "Emily Davis",
    students: 1,
    planned: 34,
    completed: 17,
    enrolledOn: "2024-03-10",
  },
  {
    id: "PHY103",
    name: "Physics",
    schedule: "Tue, Thu",
    timeSlot: "15:00-17:00",
    faculty: "David Wilson",
    students: 2,
    planned: 59,
    completed: 10,
    enrolledOn: "2024-04-01",
  },
  {
    id: "LIT101",
    name: "Literature",
    schedule: "Wed, Fri",
    timeSlot: "11:00-13:00",
    faculty: "Chris Taylor",
    students: 2,
    planned: 15,
    completed: 12,
    enrolledOn: "2024-05-18",
  },
  {
    id: "HIS102",
    name: "History",
    schedule: "Mon, Thu",
    timeSlot: "10:00-12:00",
    faculty: "Alex Morgan",
    students: 1,
    planned: 15,
    completed: 1,
    enrolledOn: "2024-02-28",
  },
];

const StudentDetails: React.FC<StudentDetailsProps> = ({ studentId, onBack }) => {
    const [studentData, setStudentData] = React.useState<Student | undefined>(() => studentsData.find(s => s.id === studentId));
    const [activeTab, setActiveTab] = React.useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdateStudent = (updatedData: Student) => {
        setStudentData(updatedData);
        // In a real app, you'd also send this to your API
        console.log("Updated student data:", updatedData);
        handleCloseEditModal();
    };

    if (!studentData) {
        return <div>Student not found</div>;
    }

    const enrolledCourses = allCoursesData.filter(course => studentData.enrolledCourseIds.includes(course.id));

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'enrolled-courses', label: `Enrolled Courses (${enrolledCourses.length})`, icon: BookOpen },
        { id: 'parent-guardian', label: 'Parent/Guardian', icon: Shield },
    ];

    return (
        <div className="space-y-6">
            {/* Navigation Header */}
            <div className="flex items-center space-x-4">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-baseline space-x-2">
                    <h1 className="text-2xl font-bold text-gray-900">{studentData.name}</h1>
                    <p className="text-sm text-gray-500">- {studentData.id}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content (To be implemented) */}
            <div className="pt-4">
                {activeTab === 'overview' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Basic Details</h2>
                            <Button onClick={handleOpenEditModal} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                                <Edit className="w-4 h-4 mr-2" />
                                EDIT
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {/* Student Details */}
                            <DetailItem label="Name" value={studentData.name} />
                            <DetailItem label="Grade" value={studentData.grade} />
                            <DetailItem label="Date of Birth" value={studentData.dateOfBirth} />
                            <DetailItem label="Student Email" value={studentData.email} />
                            <DetailItem label="Student Mobile" value={studentData.mobile} />
                            
                            {/* The separator line has been removed as requested */}

                            {/* Parent Details */}
                            <DetailItem label="Parent Name" value={studentData.parentName} />
                            <DetailItem label="Parent Email" value={studentData.parentEmail} />
                            <DetailItem label="Parent Mobile" value={studentData.parentMobile} />
                        </div>
                    </div>
                )}
                {activeTab === 'enrolled-courses' && <EnrolledCoursesTable courses={enrolledCourses} studentName={studentData.name} />}
                {activeTab === 'parent-guardian' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Parent Details</h2>
                        </div>

                        <div className="space-y-3">
                            <DetailItem label="Name" value={studentData.parentName} />
                            <DetailItem label="Email" value={studentData.parentEmail} />
                            <DetailItem label="Mobile" value={studentData.parentMobile} />
                        </div>
                    </div>
                )}
            </div>

            {studentData && (
                <EditStudentModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    onSubmit={handleUpdateStudent}
                    student={studentData}
                />
            )}
        </div>
    );
};

interface DetailItemProps {
    label: string;
    value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <div className="flex items-baseline">
        <span className="text-sm font-medium text-gray-500 w-36 shrink-0">{label}:</span>
        <span className="text-base text-gray-900">{value}</span>
    </div>
);

export default StudentDetails;