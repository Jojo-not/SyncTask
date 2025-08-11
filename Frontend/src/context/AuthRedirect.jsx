import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function AuthRedirect({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirect if already logged in
    }
  }, [navigate]);

  return <Outlet />;
}
