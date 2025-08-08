import React, { useState } from "react";
import { Search, Plus, Filter, MoreVertical, Bell, User } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { TaskModal } from "../components/TaskModal";
import { STATUS_COLORS, PRIORITY_COLORS } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";

export function DashboardPage() {
  const { user } = useAuth();
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        setEditingTask(null);
      } else {
        await createTask(taskData);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Custom Dashboard Navbar */}
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
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>

              <div className="flex items-center space-x-2">
                <CheckSquare className="w-8 h-8 text-primary-500" />
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  SyncTask
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:text-white"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="w-5 h-5" />
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {user?.email}
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
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Dashboard
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Welcome back! Here's what's on your plate today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white animate-fade-in">
                  {tasks.length}
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Total Tasks
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <div className="text-2xl font-bold text-primary-500 animate-fade-in">
                  {tasks.filter((t) => t.status === "in-progress").length}
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  In Progress
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <div className="text-2xl font-bold text-secondary-500 animate-fade-in">
                  {tasks.filter((t) => t.status === "completed").length}
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Completed
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <div className="text-2xl font-bold text-red-500 animate-fade-in">
                  {
                    tasks.filter(
                      (t) => t.priority === "high" && t.status !== "completed"
                    ).length
                  }
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  High Priority
                </p>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              {/* Tasks Header */}
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    My Tasks
                  </h2>

                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-700 dark:text-white"
                      />
                    </div>

                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>

                    <Button onClick={() => setIsTaskModalOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tasks Table */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-50 dark:bg-neutral-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Task Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      {filteredTasks.map((task) => (
                        <tr
                          key={task.id}
                          className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-neutral-900 dark:text-white">
                                {task.title}
                              </div>
                              <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate max-w-xs">
                                {task.description}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                STATUS_COLORS[task.status]
                              }`}
                            >
                              {task.status.replace("-", " ")}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                PRIORITY_COLORS[task.priority]
                              }`}
                            >
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditTask(task)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {filteredTasks.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-neutral-500 dark:text-neutral-400">
                    {searchTerm
                      ? "No tasks found matching your search."
                      : "No tasks yet. Create your first task!"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        onSave={handleCreateTask}
        task={editingTask}
      />
    </div>
  );
}
