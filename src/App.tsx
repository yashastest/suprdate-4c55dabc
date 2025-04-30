
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Discover from "./pages/Discover";
import CreateDate from "./pages/CreateDate";
import DateDetail from "./pages/DateDetail";
import Requests from "./pages/Requests";
import Profile from "./pages/Profile";
import { PhoneLogin } from "./components/auth/PhoneLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<PhoneLogin />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/create-date" element={<CreateDate />} />
            <Route path="/date/:id" element={<DateDetail />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
