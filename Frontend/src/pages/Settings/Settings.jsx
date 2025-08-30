import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Save, AlertCircle } from "lucide-react";
import { SettingProvider } from "../../context/SettingContext";

export default function Settings() {
  const [formData, setFormData] = useState({
    email: "",
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { changeEmail, changePassword } = useContext(SettingProvider);

  const [loading, setLoading] = useState({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [notification, setNotification] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, email: true }));
    const response = await changeEmail({ email: formData.newEmail });
    if (response.success) {
      setNotification({
        type: "success",
        message: "Email updated successfully!",
      });
      setFormData((prev) => ({
        ...prev,
        email: response.settings.email,
        newEmail: "",
      }));
    } else {
      setNotification({ type: "error", message: response.error });
    }
    setLoading((prev) => ({ ...prev, email: false }));
  };
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setNotification({
        type: "error",
        message: "New passwords do not match!",
      });
      return;
    }
    setLoading((prev) => ({ ...prev, password: true }));
    const response = await changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
    if (response.success) {
      setNotification({
        type: "success",
        message: "Password updated successfully!",
      });
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } else {
      setNotification({ type: "error", message: response.error });
    }
    setLoading((prev) => ({ ...prev, password: false }));
  };

  useEffect(() => {
    // Clear notifications after 5 seconds
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: null, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Account Settings
      </h1>

      {notification.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">{notification.message}</p>
        </motion.div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {/* Email Update Form */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Mail className="h-6 w-6 text-primary-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Update Email
            </h2>
          </div>

          <form onSubmit={handleEmailUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 border-gray-300 dark:border-gray-600`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Email
              </label>
              <input
                type="email"
                placeholder="you@synctask.app"
                value={formData.newEmail}
                onChange={handleInputChange}
                name="newEmail"
                className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 border-gray-300 dark:border-gray-600`}
              />
            </div>

            <button
              type="submit"
              disabled={loading.email}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
                loading.password ? "opacity-60" : "hover:shadow"
              }`}
            >
              {loading.email ? "Saving..." : "Save Email"}
            </button>
          </form>
        </motion.div>

        {/* Password Update Form */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="h-6 w-6 text-primary-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Change Password
            </h2>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  name="currentPassword"
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 border-gray-300 dark:border-gray-600`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword.current ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  name="newPassword"
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 border-gray-300 dark:border-gray-600`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      new: !prev.new,
                    }))
                  }
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword.new ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder="Repeat new password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  name="confirmPassword"
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 border-gray-300 dark:border-gray-600`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword.confirm ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading.password}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
                loading.password ? "opacity-60" : "hover:shadow"
              }`}
            >
              {loading.password ? "Saving..." : "Save Password"}
            </button>
          </form>
        </motion.div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>SyncTask • Account Settings • {new Date().getFullYear()}</p>
      </footer>
    </motion.div>
  );
}
