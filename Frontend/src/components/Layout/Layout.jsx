import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ requireAuth = false }) => {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Redirect to login if the route needs auth but user is not logged in
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Always render navbar */}
      <Navigation />

      <div className="flex flex-1">
        {/* Show sidebar for authenticated users */}
        {isAuthenticated && <Sidebar />}

        <main className="flex-1 pt-16 transition-all duration-300">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
