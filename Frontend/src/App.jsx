import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthProvider";
import { useDarkMode } from "./hooks/useDarkMode";

// Layout
import Layout from "./components/Layout/Layout";

import RequireAuth from "./context/RequireAuth";

// Pages
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar";
import Login from "./pages/Login/Login";
import AuthRedirect from "./context/AuthRedirect";
import Signup from "./pages/Signup/Signup";
import { useEffect } from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Settings from "./pages/Settings/Settings";

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Toaster position="top-center" />
        <AuthProvider>
          <TaskProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route
                  element={
                    <Layout
                      toggleTheme={() => setIsDarkMode((prev) => !prev)}
                    />
                  }
                >
                  <Route path="/" element={<Landing />} />
                  <Route element={<AuthRedirect />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <RequireAuth>
                      <Layout
                        toggleTheme={() => setIsDarkMode((prev) => !prev)}
                      />
                    </RequireAuth>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Routes>
            </Router>
          </TaskProvider>
        </AuthProvider>
      </div>
    </div>
  );
}
export default function App() {
  return <AppContent />;
}
