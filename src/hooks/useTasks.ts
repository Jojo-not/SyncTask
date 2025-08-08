import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { Task } from '../utils/constants';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await taskAPI.getTasks();
      setTasks(response.data || response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await taskAPI.createTask(taskData);
      const newTask = response.data || response;
      
      // Optimistic update
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      // Optimistic update
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, ...taskData } : task
      ));

      const response = await taskAPI.updateTask(id, taskData);
      const updatedTask = response.data || response;
      
      // Update with server response
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      
      return updatedTask;
    } catch (err: any) {
      // Revert optimistic update on error
      await fetchTasks();
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      // Optimistic update
      setTasks(prev => prev.filter(task => task.id !== id));
      
      await taskAPI.deleteTask(id);
    } catch (err: any) {
      // Revert optimistic update on error
      await fetchTasks();
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    }
  };

  const updateTaskStatus = async (id: string, status: string) => {
    try {
      // Optimistic update
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, status } : task
      ));

      const response = await taskAPI.updateTaskStatus(id, status);
      const updatedTask = response.data || response;
      
      // Update with server response
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      
      return updatedTask;
    } catch (err: any) {
      // Revert optimistic update on error
      await fetchTasks();
      setError(err.response?.data?.message || 'Failed to update task status');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
};