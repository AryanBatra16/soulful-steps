import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Tracker from "./pages/Tracker";
import Quotes from "./pages/Quotes";
import Challenges from "./pages/Challenges";
import Tasks from "./pages/Tasks";
import Community from "./pages/Community";
import Moods from "./pages/Moods";
import Growth from "./pages/Growth";
import Settings from "./pages/Settings";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page without layout */}
          <Route path="/" element={<Index />} />
          
          {/* Auth pages without layout */}
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/forgot" element={<ForgotPassword />} />
          
          {/* App pages with layout */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/chat" element={<Layout><Chat /></Layout>} />
          <Route path="/tracker" element={<Layout><Tracker /></Layout>} />
          <Route path="/quotes" element={<Layout><Quotes /></Layout>} />
          <Route path="/challenges" element={<Layout><Challenges /></Layout>} />
          <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
          <Route path="/community" element={<Layout><Community /></Layout>} />
          <Route path="/moods" element={<Layout><Moods /></Layout>} />
          <Route path="/growth" element={<Layout><Growth /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
