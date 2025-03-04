
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileSetup from "./components/profile/ProfileSetup";
import HormoneTracker from "./components/tracking/HormoneTracker";
import WorkoutTracker from "./components/tracking/WorkoutTracker";
import NutritionTracker from "./pages/NutritionTracker";
import BloodTestAnalysis from "./pages/BloodTestAnalysis";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/" element={<Layout><Outlet /></Layout>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/hormone-tracker" element={<HormoneTracker />} />
            <Route path="/workout-tracker" element={<WorkoutTracker />} />
            <Route path="/nutrition-tracker" element={<NutritionTracker />} />
            <Route path="/nutrition" element={<NutritionTracker />} />
            <Route path="/blood-test-analysis" element={<BloodTestAnalysis />} />
            <Route path="/profile" element={<ProfileSetup />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
