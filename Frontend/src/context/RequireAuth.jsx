import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for auth state to load before deciding
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is NOT logged in, redirect to login (but avoid redirect loop)
  if (!user) {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      return children; // Let public routes show without redirect
    }
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return children;
}
