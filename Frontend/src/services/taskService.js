import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create task");
  }
};

export const updateTaskById = async (id, taskData) => {
  try {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update task");
  }
};

export const deleteTaskById = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete task");
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update task status"
    );
  }
};

export const getTaskStats = async () => {
  try {
    const response = await api.get("/tasks/stats");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch task statistics"
    );
  }
};

export const searchTasks = async (query) => {
  try {
    const response = await api.get("/tasks/search", { params: { q: query } });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to search tasks");
  }
};

export const getTasksByPriority = async (priority = null) => {
  try {
    const url = priority ? `/tasks/priority/${priority}` : "/tasks/priority";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch tasks by priority"
    );
  }
};

export const getTasksByStatus = async (status = null) => {
  try {
    const url = status ? `/tasks/status/${status}` : "/tasks/status";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch tasks by status"
    );
  }
};

export const getTasksDueToday = async () => {
  try {
    const response = await api.get("/tasks/due-today");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch today's tasks"
    );
  }
};

export const getOverdueTasks = async () => {
  try {
    const response = await api.get("/tasks/overdue");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch overdue tasks"
    );
  }
};
