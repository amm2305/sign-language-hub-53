import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import AlphabetPage from "./pages/AlphabetPage";
import LessonsPage from "./pages/LessonsPage";
import TranslatorPage from "./pages/TranslatorPage";
import ProgressPage from "./pages/ProgressPage";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Run only once at startup
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setAuthChecked(true);
  }, []);

  // Optional: prevent flicker before auth check completes
  if (!authChecked) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* PUBLIC FEATURE (no login required) */}
              <Route path="/translator" element={<TranslatorPage />} />

              {/* PROTECTED ROUTES (only if logged in) */}
              {isLoggedIn ? (
                <>
                  <Route
                    path="/alphabet"
                    element={<ProtectedRoute><AlphabetPage /></ProtectedRoute>}
                  />
                  <Route
                    path="/lessons"
                    element={<ProtectedRoute><LessonsPage /></ProtectedRoute>}
                  />
                  <Route
                    path="/progress"
                    element={<ProtectedRoute><ProgressPage /></ProtectedRoute>}
                  />
                </>
              ) : (
                // If not logged in, block access to protected pages
                <Route path="*" element={<AuthPage />} />
              )}

              {/* fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;