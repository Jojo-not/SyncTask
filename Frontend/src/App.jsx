import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext';
import { useDarkMode } from './hooks/useDarkMode';
import Navigation from './components/Navigation/Navigation';
import Sidebar from './components/Sidebar/Sidebar';
import Landing from './pages/Landing/Landing';
import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Calendar/Calendar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function AppContent() {
  const [isDarkMode] = useDarkMode();
  
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <AuthProvider>
          <TaskProvider>
            <Router>
              <Navigation />
              <div className="flex">
                <Sidebar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </TaskProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;