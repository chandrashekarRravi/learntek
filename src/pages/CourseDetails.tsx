import React from 'react';
import { ArrowLeft, Edit, Users, Calendar, Clock, GraduationCap } from 'lucide-react';
import { Button } from '@/Components/global/button';
import EditCourseModal from '../Components/Courses/EditCourseModal';

interface CourseDetailsProps {
    courseId: string;
    onBack: () => void;
}

interface Course {
    id: string;
    name: string;
    schedule: string;
    timeSlot: string;
    faculty: string;
    students: string[];
    planned: number;
    completed: number;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ courseId, onBack }) => {
    // Mock course data - in a real app, this would come from an API
    const [courseData, setCourseData] = React.useState<Course>({
        id: "MAT101",
        name: "Mathematics",
        schedule: "Mon, Tue, Wed",
        timeSlot: "08:00 - 10:00",
        faculty: "Michael Jones",
        students: ["Bob Jinks", "Alexis Fernandiz"],
        planned: 25,
        completed: 12,
    });

    const [activeTab, setActiveTab] = React.useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveCourse = (updatedData: {
        name: string;
        schedule: string;
        faculty: string;
        students: string;
        startTime: string;
        endTime: string;
        totalHours: number;
    }) => {
        setCourseData(prev => ({
            ...prev,
            name: updatedData.name,
            schedule: updatedData.schedule,
            faculty: updatedData.faculty,
            students: updatedData.students ? updatedData.students.split(', ') : prev.students,
            planned: updatedData.totalHours,
            timeSlot: `${updatedData.startTime} - ${updatedData.endTime}`,
        }));
        console.log('Course updated:', updatedData);
        // Here you would typically send the data to your API
    };

    return (
        <div className="space-y-6">
            {/* Navigation Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{courseData.name}</h1>
                    <p className="text-sm text-gray-500">{courseData.id}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'overview'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Overview
                    </button>
                    {/*<button
                        onClick={() => setActiveTab('students')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'students'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Students
                    </button>
                    <button
                        onClick={() => setActiveTab('classes')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'classes'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Classes
                    </button>*/}

                </nav>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Basic Details Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Basic Details</h2>
                            <Button
                                onClick={handleEdit}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                EDIT
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <GraduationCap className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Name</p>
                                        <p className="text-lg text-gray-900">{courseData.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <Calendar className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Schedule</p>
                                        <p className="text-lg text-gray-900">{courseData.schedule}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <Clock className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Time Slot</p>
                                        <p className="text-lg text-gray-900">{courseData.timeSlot}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-orange-50 rounded-lg">
                                        <Users className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Assigned Faculty</p>
                                        <p className="text-lg text-gray-900">{courseData.faculty}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg">
                                        <GraduationCap className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Assigned Students</p>
                                        <div className="space-y-1">
                                            {courseData.students.map((student, index) => (
                                                <p key={index} className="text-lg text-gray-900">{student}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-red-50 rounded-lg">
                                        <Calendar className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Classes Planned/Completed</p>
                                        <p className="text-lg text-gray-900">{courseData.completed}/{courseData.planned}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Overview Content 
                     */}
                    {/*
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Completion Rate</span>
                                        <span>{Math.round((courseData.completed / courseData.planned) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(courseData.completed / courseData.planned) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>Classes completed: {courseData.completed}</p>
                                    <p>Classes remaining: {courseData.planned - courseData.completed}</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Students</span>
                                    <span className="font-medium">{courseData.students.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Days per Week</span>
                                    <span className="font-medium">{courseData.schedule.split(',').length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-medium">2 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
*/}

                </div>
            )}
            {/* {activeTab === 'students' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Students</h3>
                    <p className="text-gray-600">Student management functionality will be implemented here.</p>
                </div>
            )}

            {activeTab === 'classes' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Classes</h3>
                    <p className="text-gray-600">Class schedule and management functionality will be implemented here.</p>
                </div>
            )} */}

            {/* Edit Course Modal */}
            <EditCourseModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                onSubmit={handleSaveCourse}
                initialData={{
                    name: courseData.name,
                    schedule: courseData.schedule,
                    faculty: courseData.faculty,
                    students: courseData.students.join(', '),
                    startTime: "10:00",
                    endTime: "13:00",
                    totalHours: courseData.planned,
                }}
            />
        </div>
    );
};

export default CourseDetails;
