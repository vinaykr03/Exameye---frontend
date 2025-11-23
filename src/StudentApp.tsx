import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentHomepage from "./pages/StudentHomepage";
import StudentRegister from "./pages/StudentRegister";
import StudentVerify from "./pages/StudentVerify";
import StudentExam from "./pages/StudentExam";
import CompatibilityCheck from "./pages/CompatibilityCheck";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const StudentApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Student Homepage */}
          <Route path="/" element={<StudentHomepage />} />
          
          {/* Student Routes */}
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/verify" element={<StudentVerify />} />
          <Route path="/compatibility" element={<CompatibilityCheck />} />
          <Route path="/exam" element={<StudentExam />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default StudentApp;

