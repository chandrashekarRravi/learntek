import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/Components/global/button";
import { useState } from "react";
import { CoursesFilter } from "./CoursesFilter";
import CreateCourseModal from "./CreateCourseModal";

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

export const CoursesTable = ({ onCourseAction }: CoursesTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateCourse = (courseData: any) => {
    console.log('Creating course:', courseData);
    // Here you would typically send the data to your API
    // For now, we'll just log it
    alert('Course created successfully!');
  };

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
                  className="border-b border-border hover:bg-[hsl(var(--table-row-hover))] transition-colors"
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
                    <button className="p-1 hover:bg-accent/10 rounded transition-colors">
                      <MoreVertical className="w-5 h-5 text-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-border">
          <div className="flex items-center gap-2">
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
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">1 - 7 of 7</span>
            <div className="flex gap-1">
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
      </div>

      <Button
        size="lg"
        className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-xl hover:shadow-2xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={handleAddCourse}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Create Course Modal */}
      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateCourse}
      />
    </div>
  );
};
