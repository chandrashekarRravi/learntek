import { MoreVertical, Plus, Eye, Edit } from "lucide-react";
import Button from "@/Components/mui/Button";
import { Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { CoursesFilter } from "./CoursesFilter";

interface Course {
  id: string;
  name: string;
  schedule: string;
  timeSlot: string;
  faculty: string;
  students: number;
  planned: number;
  completed: number;
}

interface CoursesTableProps {
  onCourseAction: (courseId: string, action: string) => void;
  onCourseClick?: (courseId: string) => void;
  onAddCourse?: () => void;
}

const coursesData: Course[] = [
  {
    id: "MAT101",
    name: "Mathematics",
    schedule: "Mon, Tue, Wed",
    timeSlot: "08:00-10:00",
    faculty: "Michael Jones",
    students: 2,
    planned: 25,
    completed: 12,
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
  },
  {
    id: "CHE102",
    name: "Adv.Chemistry",
    schedule: "Mon, Fri",
    timeSlot: "09:00-11:00",
    faculty: "Jessica Lee",
    students: 1,
    planned: 60,
    completed: 35,
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
  },
];

export const CoursesTable = ({ onCourseAction, onCourseClick, onAddCourse }: CoursesTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Add your search logic here
  };

  const handleFilterByDay = () => {
    // Add your filter by day logic
  };

  const handleFilterByFaculty = () => {
    // Add your filter by faculty logic
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    // Add your clear filters logic
  };

  const handleAddCourse = () => {
    if (onAddCourse) {
      onAddCourse();
    }
  };

  const handleCourseRowClick = (courseId: string) => {
    if (onCourseClick) {
      onCourseClick(courseId);
    }
  };

  const handleDropdownToggle = (courseId: string) => {
    setActiveDropdown(activeDropdown === courseId ? null : courseId);
  };

  const handleViewCourse = (courseId: string) => {
    if (onCourseClick) {
      onCourseClick(courseId);
    }
    setActiveDropdown(null);
  };

  const handleEditCourse = (courseId: string) => {
    onCourseAction(courseId, 'edit');
    setActiveDropdown(null);
  };

  const handleCloseDropdown = () => {
    setActiveDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-trigger')) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <div className="space-y-4">
      <CoursesFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onFilterByDay={handleFilterByDay}
        onFilterByFaculty={handleFilterByFaculty}
        onClearFilters={handleClearFilters}
      />

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
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Assigned Students</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Classes Planned/ Completed</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr
                  key={course.id}
                  className="border-b border-border hover:bg-[hsl(var(--table-row-hover))] transition-colors cursor-pointer"
                  onClick={() => handleCourseRowClick(course.id)}
                >
                  <td className="px-6 py-4 text-sm text-foreground">{course.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{course.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{course.schedule}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{course.timeSlot}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{course.faculty}</td>
                  <td className="px-6 py-4 text-sm text-foreground text-center">{course.students}</td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {course.completed}/{course.planned}
                  </td>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewCourse(course.id);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4 mr-3 text-gray-500" />
                            View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCourse(course.id);
                            }}
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
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
          <div className="flex items-center gap-15">
            <span className="text-sm text-muted-foreground">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1 border border-input rounded bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value={7}>07</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span className="text-sm text-muted-foreground">1 - 7 of 7</span>
          </div>

          <div className="flex gap-15">
            <button className="p-1 hover:bg-accent/10 rounded transition-colors disabled:opacity-50" disabled>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-1 hover:bg-accent/10 rounded transition-colors disabled:opacity-50" disabled>
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Fab
        color="primary"
        size="large"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          transition: 'all 0.3s ease',
        }}
        onClick={handleAddCourse}
      >
        <Plus className="w-6 h-6" />
      </Fab>
    </div>
  );
};
