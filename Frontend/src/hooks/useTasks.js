import { useState, useEffect } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('synctask-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Finish the proposal for the new client project',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'high',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Review code changes',
        description: 'Review and approve pending pull requests',
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        priority: 'medium',
        status: 'in-progress',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('synctask-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const markAsComplete = (id) => {
    updateTask(id, { status: 'completed' });
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    markAsComplete,
  };
};