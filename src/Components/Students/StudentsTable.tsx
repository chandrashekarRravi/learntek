import { MoreVertical, Plus, Eye, Edit, Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/Components/global/button";
import { Input } from "@/Components/global/input";
import { useState, useEffect, useMemo } from "react";

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

interface StudentsTableProps {
  onStudentAction: (studentId: string, action: string) => void;
  onStudentClick?: (studentId: string) => void;
  onAddStudent?: () => void;
}

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
  },
  {
    id: "STU106",
    name: "Frank White",
    grade: "11",
    email: "frank.w@example.com",
    mobile: "678-901-2345",
    dateOfBirth: "2007-03-25",
    parentName: "Mary White",
    parentMobile: "432-109-8765",
    parentEmail: "mary.w@example.com",
  },
  {
    id: "STU107",
    name: "Grace Green",
    grade: "10",
    email: "grace.g@example.com",
    mobile: "789-012-3456",
    dateOfBirth: "2008-08-08",
    parentName: "Peter Green",
    parentMobile: "321-098-7654",
    parentEmail: "peter.g@example.com",
  },
];

export const StudentsTable = ({ onStudentAction, onStudentClick, onAddStudent }: StudentsTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredStudents = useMemo(() => {
    let currentStudents = studentsData;

    if (searchQuery) {
      currentStudents = currentStudents.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterGrade) {
      currentStudents = currentStudents.filter(student => student.grade === filterGrade);
    }

    return currentStudents;
  }, [searchQuery, filterGrade]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterByGrade = (grade: string) => {
    setFilterGrade(grade);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterGrade("");
  };

  const handleAddStudent = () => {
    if (onAddStudent) {
      onAddStudent();
    }
  };

  const handleStudentRowClick = (studentId: string) => {
    if (onStudentClick) {
      onStudentClick(studentId);
    }
  };

  const handleDropdownToggle = (studentId: string) => {
    setActiveDropdown(activeDropdown === studentId ? null : studentId);
  };

  const handleViewStudent = (studentId: string) => {
    if (onStudentClick) {
      onStudentClick(studentId);
    }
    setActiveDropdown(null);
  };

  const handleEditStudent = (studentId: string) => {
    onStudentAction(studentId, 'edit');
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

  // Pagination logic (simple for now, showing all filtered items)
  const totalItems = filteredStudents.length;
  const currentPage = 1; // Assuming single page for now
  const startIndex = 0;
  const endIndex = Math.min(itemsPerPage, totalItems);
  const displayedStudents = filteredStudents.slice(startIndex, endIndex);

  const availableGrades = useMemo(() => {
    const grades = new Set(studentsData.map(student => student.grade));
    return Array.from(grades).sort();
  }, []);

  return (
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
            placeholder="Search by Name, ID, Email"
            className="pl-9 pr-4"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="relative">
          <select
            value={filterGrade}
            onChange={(e) => handleFilterByGrade(e.target.value)}
            className="px-3 py-1.5 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none pr-8"
          >
            <option value="">Filter by Grade</option>
            {availableGrades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>

        <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[hsl(var(--table-header))] border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Student ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Grade</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Mobile Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Parent Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Parent Mobile</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-border hover:bg-[hsl(var(--table-row-hover))] transition-colors cursor-pointer"
                  onClick={() => handleStudentRowClick(student.id)}
                >
                  <td className="px-6 py-4 text-sm text-foreground">{student.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{student.grade}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{student.mobile}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{student.parentName}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{student.parentMobile}</td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        className="dropdown-trigger p-1 hover:bg-accent/10 rounded transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDropdownToggle(student.id);
                        }}
                      >
                        <MoreVertical className="w-5 h-5 text-foreground" />
                      </button>

                      {activeDropdown === student.id && (
                        <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewStudent(student.id);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4 mr-3 text-gray-500" />
                            View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStudent(student.id);
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
              {displayedStudents.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-muted-foreground">
                    No students found.
                  </td>
                </tr>
              )}
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
            <span className="text-sm text-muted-foreground">{startIndex + 1} - {endIndex} of {totalItems}</span>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-accent/10 rounded transition-colors disabled:opacity-50" disabled={currentPage === 1}>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-1 hover:bg-accent/10 rounded transition-colors disabled:opacity-50" disabled={endIndex >= totalItems}>
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
        onClick={handleAddStudent}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};