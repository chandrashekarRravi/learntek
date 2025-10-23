import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Search, MoreVertical, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Faculty } from "@/types/faculty.types";
import { facultyService } from "@/services/facultyService";
import { CreateFacultyDialog } from "./CreateFacultyDialog";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Literature",
  "Art",
];

export const FacultyList = () => {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState<Faculty[]>(
    facultyService.getAllFaculties()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredFaculties = facultyService.searchFaculties(
    searchQuery,
    selectedSubjects
  );

  const totalPages = Math.ceil(filteredFaculties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaculties = filteredFaculties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSubjects([]);
    setCurrentPage(1);
  };

  const refreshFaculties = () => {
    setFaculties(facultyService.getAllFaculties());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <span className="font-semibold">Filters</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Name"
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                Filter by subject
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <div className="space-y-3">
                <h4 className="font-semibold">Select Subjects</h4>
                {subjects.map((subject) => (
                  <div key={subject} className="flex items-center gap-2">
                    <Checkbox
                      id={subject}
                      checked={selectedSubjects.includes(subject)}
                      onCheckedChange={() => handleSubjectToggle(subject)}
                    />
                    <Label htmlFor={subject} className="cursor-pointer">
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="link" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Faculty ID</TableHead>
              <TableHead>Faculty Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Faculty Mobile</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFaculties.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell className="font-medium">{faculty.id}</TableCell>
                <TableCell>
                  {faculty.firstName} {faculty.lastName}
                </TableCell>
                <TableCell>{faculty.subject}</TableCell>
                <TableCell>{faculty.email || "-"}</TableCell>
                <TableCell>{faculty.mobile}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card">
                      <DropdownMenuItem
                        onClick={() => navigate(`/faculty/${faculty.id}`)}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`/faculty/${faculty.id}`)}
                      >
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Items per page:
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">07</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredFaculties.length)} of{" "}
              {filteredFaculties.length}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <ChevronLeft className="h-4 w-4 -ml-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <ChevronRight className="h-4 w-4 -ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg"
        size="icon"
        onClick={() => setShowCreateDialog(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <CreateFacultyDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSuccess={refreshFaculties}
      />
    </div>
  );
};
