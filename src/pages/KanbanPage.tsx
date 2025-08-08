import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import { TaskCard } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';
import { Button } from '../components/ui/Button';
import { Status } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';

export function KanbanPage() {
  const { user } = useAuth();
  const { tasks, isLoading, createTask, updateTask, deleteTask, updateTaskStatus } = useTasks();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(undefined);
  const [draggedTask, setDraggedTask] = useState(null);

  const columns: { id: Status; title: string; color: string }[] = [
    { id: 'to-do', title: 'To Do', color: 'bg-neutral-100 dark:bg-neutral-800' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-primary-50 dark:bg-primary-900/20' },
    { id: 'completed', title: 'Completed', color: 'bg-secondary-50 dark:bg-secondary-900/20' },
  ];

  const getTasksByStatus = (status: Status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleCreateTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        setEditingTask(undefined);
      } else {
        await createTask(taskData);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(undefined);
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    
    if (draggedTask && draggedTask.status !== newStatus) {
      try {
        await updateTaskStatus(draggedTask.id, newStatus);
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
    
    setDraggedTask(null);
  };
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Custom Kanban Navbar */}
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
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  Kanban Board
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Drag and drop tasks to update their status
                </p>
              </div>
              
              <Button onClick={() => setIsTaskModalOpen(true)} className="mt-4 sm:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {columns.map((column) => {
                const columnTasks = getTasksByStatus(column.id);
                
                return (
                  <div key={column.id} className="flex flex-col">
                    {/* Column Header */}
                    <div className={`${column.color} rounded-t-lg border border-neutral-200 dark:border-neutral-700 p-4`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {column.title}
                        </h3>
                        <span className="bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium px-2 py-1 rounded-full">
                          {columnTasks.length}
                        </span>
                      </div>
                    </div>

                    {/* Column Content */}
                    <div 
                      className="bg-white dark:bg-neutral-800 rounded-b-lg border-l border-r border-b border-neutral-200 dark:border-neutral-700 p-4 min-h-96 space-y-3"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column.id)}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center h-32">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                        </div>
                      ) : (
                        <>
                      {columnTasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task)}
                          className="cursor-move"
                        >
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            isDragging={draggedTask?.id === task.id}
                          />
                        </div>
                      ))}
                      
                      {columnTasks.length === 0 && (
                        <div className="flex items-center justify-center h-32 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg">
                          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                            No tasks in {column.title.toLowerCase()}
                          </p>
                        </div>
                      )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
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