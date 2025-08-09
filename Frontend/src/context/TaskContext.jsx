import { createContext, useContext } from 'react';
import { useTasks } from '../hooks/useTasks';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const taskOperations = useTasks();

  return (
    <TaskContext.Provider value={taskOperations}>
      {children}
    </TaskContext.Provider>
  );
};