import { Toaster } from "@/Components/global/toaster";
import { Toaster as Sonner } from "@/Components/global/sonner";
import { TooltipProvider } from "@/Components/global/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/Components/Layout/Layout";
import { CoursesTable } from "@/Components/Courses/CoursesTable";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Home component
const Home = () => {
  const handleCourseAction = (courseId: string, action: string) => {
    console.log(`Course action: ${action} for course ${courseId}`);
  };

  return (
    <Layout>
      <CoursesTable onCourseAction={handleCourseAction} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
