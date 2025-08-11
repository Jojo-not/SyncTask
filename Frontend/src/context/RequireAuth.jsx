import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for auth state to load before deciding
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is NOT logged in
  if (!user) {
    // Let public routes show without redirect
    if (location.pathname === "/login" || location.pathname === "/signup") {
      return children;
    }
    // Redirect to login, saving the route they came from
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in and tries to access login/signup, redirect to dashboard
  if (
    user &&
    (location.pathname === "/login" || location.pathname === "/signup")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated, render children
  return children;
}
