import React, { useState } from 'react';
import { Camera, Save, User, CheckSquare } from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useDarkMode } from '../hooks/useDarkMode';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    weeklyReport: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    // Save to backend
    authAPI.updateNotifications({ [key]: !notifications[key as keyof typeof notifications] })
      .catch(console.error);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Update profile
      const response = await authAPI.updateProfile({
        name: profileData.name,
        email: profileData.email,
      });
      
      updateUser(response.user);
      setMessage('Profile updated successfully!');

      // Change password if provided
      if (profileData.currentPassword && profileData.newPassword) {
        if (profileData.newPassword !== profileData.confirmPassword) {
          setError('New passwords do not match');
          return;
        }

        await authAPI.changePassword({
          current_password: profileData.currentPassword,
          password: profileData.newPassword,
          password_confirmation: profileData.confirmPassword,
        });

        setProfileData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));

        setMessage('Profile and password updated successfully!');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Custom Settings Navbar */}
      <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
              
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-8 h-8 text-primary-500" />
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  SyncTask
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {user?.name || 'User'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-0">
          <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Settings
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="space-y-8">
              {/* Profile Information */}
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                  Profile Information
                </h2>
                
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  {message && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
                      {message}
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>

                  {/* Password Change */}
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-4">
                      Change Password
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        value={profileData.currentPassword}
                        onChange={handleProfileChange}
                        placeholder="Enter current password"
                      />
                      <Input
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={handleProfileChange}
                        placeholder="Enter new password"
                      />
                      <Input
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={handleProfileChange}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Notifications */}
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                  Notifications
                </h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive browser push notifications' },
                    { key: 'taskReminders', label: 'Task Reminders', description: 'Get reminded about upcoming deadlines' },
                    { key: 'weeklyReport', label: 'Weekly Report', description: 'Receive a weekly summary of your tasks' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3">
                      <div>
                        <div className="font-medium text-neutral-900 dark:text-white">
                          {item.label}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {item.description}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={() => handleNotificationChange(item.key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                  Preferences
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-white">
                        Theme
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        Choose your preferred theme
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Light</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={darkMode}
                          onChange={() => setDarkMode(!darkMode)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-primary-500"></div>
                      </label>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Dark</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}