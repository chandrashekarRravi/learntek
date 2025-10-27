import React, { useMemo, useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, MoreVertical, Eye, Edit } from 'lucide-react';
import { Input } from '@/Components/global/input';
import { Button } from '@/Components/global/button';
import ViewCourseModal from './ViewCourseModal';
import EditEnrolledCourseModal from './EditEnrolledCourseModal';

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

interface EnrolledCoursesTableProps {
    courses: Course[];
    studentName: string;
}

export const EnrolledCoursesTable: React.FC<EnrolledCoursesTableProps> = ({ courses, studentName }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDay, setFilterDay] = useState('');
    const [filterFaculty, setFilterFaculty] = useState('');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [allCourses, setAllCourses] = useState<Course[]>(courses);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const filteredCourses = useMemo(() => {
        let currentCourses = allCourses;

        if (searchQuery) {
            currentCourses = currentCourses.filter(course =>
                course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterDay) {
            currentCourses = currentCourses.filter(course => course.schedule.includes(filterDay));
        }

        if (filterFaculty) {
            currentCourses = currentCourses.filter(course => course.faculty === filterFaculty);
        }

        return currentCourses;
    }, [allCourses, searchQuery, filterDay, filterFaculty]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setFilterDay('');
        setFilterFaculty('');
    };

    const availableDays = useMemo(() => {
        const days = new Set<string>();
        courses.forEach(course => {
            course.schedule.split(', ').forEach(day => days.add(day));
        });
        return Array.from(days).sort();
    }, [courses]);

    const availableFaculties = useMemo(() => {
        const faculties = new Set(courses.map(course => course.faculty));
        return Array.from(faculties).sort();
    }, [courses]);

    const handleDropdownToggle = (courseId: string) => {
        setActiveDropdown(activeDropdown === courseId ? null : courseId);
    };

    const handleViewCourse = (courseId: string) => {
        const course = allCourses.find(c => c.id === courseId);
        setSelectedCourse(course || null);
        setActiveDropdown(null);
        setIsViewModalOpen(true);
    };

    const handleEditCourse = (courseId: string) => {
        const course = allCourses.find(c => c.id === courseId);
        setSelectedCourse(course || null);
        setActiveDropdown(null);
        setIsEditModalOpen(true);
    };

    const handleUpdateCourse = (updatedCourse: Course) => {
        setAllCourses(prevCourses =>
            prevCourses.map(c => (c.id === updatedCourse.id ? updatedCourse : c))
        );
        setIsEditModalOpen(false);
        setSelectedCourse(null);
        // In a real app, you would also send this to your API
        console.log("Updated course data:", updatedCourse);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-trigger')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {selectedCourse && (
                <ViewCourseModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} course={selectedCourse} studentName={studentName} />
            )}
            
            {selectedCourse && (
                <EditEnrolledCourseModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSubmit={handleUpdateCourse} course={selectedCourse} />
            )}

        <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg bg-card">
                    <Filter className="w-4 h-4 text-foreground" />
                    <span className="text-sm font-medium text-foreground">Filters</span>
                </div>
                <div className="relative flex-1 min-w-[200px] max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by Name or ID"
                        className="pl-9 pr-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <select
                        value={filterDay}
                        onChange={(e) => setFilterDay(e.target.value)}
                        className="px-3 py-1.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none pr-8"
                    >
                        <option value="">Filter by Day</option>
                        {availableDays.map(day => <option key={day} value={day}>{day}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                <div className="relative">
                    <select
                        value={filterFaculty}
                        onChange={(e) => setFilterFaculty(e.target.value)}
                        className="px-3 py-1.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none pr-8"
                    >
                        <option value="">Filter by Faculty</option>
                        {availableFaculties.map(faculty => <option key={faculty} value={faculty}>{faculty}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={handleClearFilters}>
                    Clear
                </Button>
            </div>

            {/* Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[hsl(var(--table-header))] border-b border-border">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Course ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Course Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Schedule</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Time Slot</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Assigned Faculty</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Classes Completed/Planned</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCourses.map((course) => (
                                <tr key={course.id} className="border-b border-border hover:bg-[hsl(var(--table-row-hover))] transition-colors">
                                    <td className="px-6 py-4 text-sm text-foreground">{course.id}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{course.name}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{course.schedule}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{course.timeSlot}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{course.faculty}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{course.completed}/{course.planned}</td>
                                    <td className="px-6 py-4">
                                        <div className="relative">
                                            <button
                                                className="dropdown-trigger p-1 hover:bg-accent/10 rounded transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDropdownToggle(course.id);
                                                }}
                                            >
                                                <MoreVertical className="w-5 h-5 text-foreground" />
                                            </button>

                                            {activeDropdown === course.id && (
                                                <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleViewCourse(course.id); }}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                    >
                                                        <Eye className="w-4 h-4 mr-3 text-gray-500" />
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleEditCourse(course.id); }}
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                    >
                                                        <Edit className="w-4 h-4 mr-3 text-gray-500" />
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredCourses.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-muted-foreground">
                                        No courses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
};