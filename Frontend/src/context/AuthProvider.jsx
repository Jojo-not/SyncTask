import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("synctask-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get("http://127.0.0.1:8000/api/user");
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    await axios.post("http://127.0.0.1:8000/api/logout");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
