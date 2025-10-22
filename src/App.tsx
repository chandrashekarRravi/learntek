import React from "react";
import { Toaster } from "@/Components/global/toaster";
import { Toaster as Sonner } from "@/Components/global/sonner";
import { TooltipProvider } from "@/Components/global/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/Components/Layout/Layout";
import { CoursesTable } from "@/Components/Courses/CoursesTable";
import CourseDetails from "./pages/CourseDetails";
import EditCourseModal from "./Components/Courses/EditCourseModal";
import CreateCourseModal from "./Components/Courses/CreateCourseModal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Home component
const Home = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<any>(null);

  // Mock course data - in a real app, this would come from an API
  const coursesData = [
    {
      id: "MAT101",
      name: "Mathematics",
      schedule: "Mon, Tue, Wed",
      faculty: "Michael Jones",
      students: "Bob Jinks, Alexis Fernandiz",
      planned: 25,
      completed: 12,
    },
    {
      id: "BIO101",
      name: "Biology",
      schedule: "Tue, Thu",
      faculty: "Sarah Smith",
      students: "John Doe",
      planned: 15,
      completed: 10,
    },
    {
      id: "CHE101",
      name: "Chemistry",
      schedule: "Mon, Wed, Fri",
      faculty: "Emily Davis",
      students: "Jane Smith",
      planned: 34,
      completed: 17,
    },
    {
      id: "PHY103",
      name: "Physics",
      schedule: "Tue, Thu",
      faculty: "David Wilson",
      students: "Mike Johnson, Sarah Wilson",
      planned: 59,
      completed: 10,
    },
    {
      id: "CHE102",
      name: "Adv.Chemistry",
      schedule: "Mon, Fri",
      faculty: "Jessica Lee",
      students: "David Brown",
      planned: 60,
      completed: 35,
    },
    {
      id: "LIT101",
      name: "Literature",
      schedule: "Wed, Fri",
      faculty: "Chris Taylor",
      students: "Alice Green, Bob White",
      planned: 15,
      completed: 12,
    },
    {
      id: "HIS102",
      name: "History",
      schedule: "Mon, Thu",
      faculty: "Alex Morgan",
      students: "Charlie Brown",
      planned: 15,
      completed: 1,
    },
  ];

  const handleCourseAction = (courseId: string, action: string) => {
    console.log(`Course action: ${action} for course ${courseId}`);
    if (action === 'edit') {
      const course = coursesData.find(c => c.id === courseId);
      if (course) {
        setSelectedCourse(course);
        setIsEditModalOpen(true);
      }
    }
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleAddCourse = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCourse(null);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSaveCourse = (updatedData: any) => {
    console.log('Course updated:', updatedData);
    // Here you would typically send the data to your API
    alert('Course updated successfully!');
    handleCloseEditModal();
  };

  const handleCreateCourse = (courseData: any) => {
    console.log('Creating course:', courseData);
    // Here you would typically send the data to your API
    alert('Course created successfully!');
    handleCloseCreateModal();
  };

  return (
    <Layout>
      <CoursesTable
        onCourseAction={handleCourseAction}
        onCourseClick={handleCourseClick}
        onAddCourse={handleAddCourse}
      />

      {/* Edit Course Modal */}
      {selectedCourse && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSubmit={handleSaveCourse}
          initialData={{
            name: selectedCourse.name,
            schedule: selectedCourse.schedule,
            faculty: selectedCourse.faculty,
            students: selectedCourse.students,
            startTime: "10:00",
            endTime: "13:00",
            totalHours: selectedCourse.planned,
          }}
        />
      )}

      {/* Create Course Modal */}
      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateCourse}
      />
    </Layout>
  );
};

// Course Details component
const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Layout>
      <CourseDetails courseId={courseId || ''} onBack={handleBack} />
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<CourseDetailsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
