import React from 'react';
import { Plus } from 'lucide-react';
import { CoursesFilter as FilterBar } from '../Components/CoursesFilter';
import { CoursesTable as CourseTable } from '../Components/CoursesTable';

const Courses: React.FC = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

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
        console.log('Add new course clicked');
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
        </div>
    );
};

export default Courses;
