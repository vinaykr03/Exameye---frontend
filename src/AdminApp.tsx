import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHomepage from "./pages/AdminHomepage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMonitor from "./pages/AdminMonitor";
import NotFound from "./pages/NotFound";
import ExamTemplateUpload from "./pages/ExamTemplateUpload";
import StudentReport from "./pages/StudentReport";
import ExamAnalytics from "./pages/ExamAnalytics";
import AdminSubjects from "./pages/AdminSubjects";

const queryClient = new QueryClient();

const AdminApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Homepage */}
          <Route path="/" element={<AdminHomepage />} />
          
          {/* Admin Routes */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/subjects" element={<AdminSubjects />} />
          <Route path="/monitor" element={<AdminMonitor />} />
          <Route path="/upload-template" element={<ExamTemplateUpload />} />
          <Route path="/student-report" element={<StudentReport />} />
          <Route path="/analytics" element={<ExamAnalytics />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AdminApp;

