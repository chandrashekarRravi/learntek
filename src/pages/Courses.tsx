import React from 'react';
import { Plus } from 'lucide-react';
import { CoursesFilter as FilterBar } from '@/Components/Courses/CoursesFilter';
import { CoursesTable as CourseTable } from '@/Components/Courses/CoursesTable';
import CreateCourseModal from '../Components/Courses/CreateCourseModal';

const Courses: React.FC = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilterByDay = () => {
        console.log('Filter by day clicked');
    };

    const handleFilterByFaculty = () => {
        console.log('Filter by faculty clicked');
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        console.log('Clear filters clicked');
    };

    const handleCourseAction = (courseId: string, action: string) => {
        console.log(`Course action: ${action} for course ${courseId}`);
    };

    const handleAddCourse = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateCourse = (courseData: {
        courseName: string;
        schedule: string;
        faculty: string;
        students: string;
        startTime: string;
        endTime: string;
        totalHours: number;
    }) => {
        console.log('Creating course:', courseData);
        // Here you would typically send the data to your API
        // For now, we'll just log it
        alert('Course created successfully!');
    };

    return (
        <div className="flex-1 bg-gray-50 min-h-screen">
            {/* Filter Bar */}
            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onFilterByDay={handleFilterByDay}
                onFilterByFaculty={handleFilterByFaculty}
                onClearFilters={handleClearFilters}
            />

            {/* Main Content */}
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <CourseTable
                        onCourseAction={handleCourseAction}
                    />
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={handleAddCourse}
                className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-30 group"
                aria-label="Add new course"
            >
                <Plus className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Create Course Modal */}
            <CreateCourseModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateCourse}
            />
        </div>
    );
};

export default Courses;
