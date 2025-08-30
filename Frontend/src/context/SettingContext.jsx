import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getSettings,
  updateEmail,
  updatePassword,
} from "../services/settingService";
import { toast } from "react-hot-toast";
const SettingContext = createContext();
export const SettingProvider = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState(null);
  // Fetch settings from backend
  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const data = await getSettings();
          setSettings(data);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        setError("Failed to load settings");
      }
    })();
  }, [user]);
  // Update email
  const changeEmail = async (emailData) => {
    try {
      const updatedSettings = await updateEmail(emailData);
      setSettings(updatedSettings);
      setError(null);
      toast.success("Email updated successfully");
      return { success: true, settings: updatedSettings };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update email";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };
  // Update password
  const changePassword = async (passwordData) => {
    try {
      const updatedSettings = await updatePassword(passwordData);
      setSettings(updatedSettings);
      setError(null);
      toast.success("Password updated successfully");
      return { success: true, settings: updatedSettings };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update password";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };
  return (
    <SettingContext.Provider
      value={{ settings, error, changeEmail, changePassword }}
    >
      {children}
    </SettingContext.Provider>
  );
};
