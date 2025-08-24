// src/context/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTaskById,
  updateTaskStatus,
  deleteTaskById,
} from "../services/taskService";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // Fetch tasks from backend
  useEffect(() => {
    (async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks");
      }
    })();
  }, []);

  // Create task
  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      setError(null);
      return { success: true, task: newTask };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create task";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      // Validate status if it's being updated
      if (
        taskData.status &&
        !["pending", "in_progress", "completed"].includes(taskData.status)
      ) {
        throw new Error("Invalid status value");
      }

      const updatedTask = await updateTaskById(id, taskData);
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      setError(null);
      return { success: true, task: updatedTask };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update task";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update task status
  const updateTaskStatus = async (id, status) => {
    try {
      if (!["pending", "in_progress", "completed"].includes(status)) {
        throw new Error("Invalid status value");
      }

      const updatedTask = await updateTaskStatus(id, { status });
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      setError(null);
      return { success: true, task: updatedTask };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update task status";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await deleteTaskById(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setError(null);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete task";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Mark as complete
  const markAsComplete = async (id) => {
    try {
      const result = await updateTaskStatus(id, "completed");
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    } catch (error) {
      const errorMessage = error.message || "Failed to mark task as complete";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        error,
        addTask,
        updateTask,
        deleteTask,
        markAsComplete,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
