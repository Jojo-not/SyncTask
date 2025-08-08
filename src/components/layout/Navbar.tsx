import React from 'react';
import { CheckSquare, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useDarkMode } from '../../hooks/useDarkMode';

interface NavbarProps {
  isLanding?: boolean;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function Navbar({ isLanding = true, isSidebarOpen, onToggleSidebar }: NavbarProps) {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40">
      <div className={`${isLanding ? 'max-w-7xl mx-auto' : ''} px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {!isLanding && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleSidebar}
                className="lg:hidden p-2"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            )}
            
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-neutral-900 dark:text-white">
                SyncTask
              </span>
            </div>
          </div>

          {isLanding && (
            <div className="hidden sm:flex items-center space-x-4">
              <Button variant="outline">Login</Button>
              <Button variant="primary">Sign Up</Button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {isLanding && (
              <div className="sm:hidden">
                <Button variant="primary" size="sm">Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}