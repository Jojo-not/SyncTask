import { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import { useTaskContext } from '../../context/TaskContext';
import TaskCard from '../../components/TaskCard/TaskCard';
import TaskForm from '../../components/TaskForm/TaskForm';
import Modal from '../../components/Modal/Modal';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
  const { tasks, addTask, updateTask, deleteTask, markAsComplete } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const getTasksForDate = (date) => {
    return tasks.filter(task => isSameDay(new Date(task.dueDate), date));
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  const handleTaskSubmit = (taskData) => {
    const taskWithDate = {
      ...taskData,
      dueDate: format(selectedDate, 'yyyy-MM-dd')
    };
    
    if (editingTask) {
      updateTask(editingTask.id, taskWithDate);
    } else {
      addTask(taskWithDate);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayTasks = getTasksForDate(date);
      if (dayTasks.length > 0) {
        return (
          <div className="flex flex-wrap gap-1 mt-1">
            {dayTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-error-500' :
                  task.priority === 'medium' ? 'bg-warning-500' :
                  'bg-accent-500'
                }`}
              />
            ))}
            {dayTasks.length > 2 && (
              <div className="text-xs text-gray-600">+{dayTasks.length - 2}</div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Calendar View
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage your tasks by date.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="calendar-container">
              <style jsx>{`
                .calendar-container :global(.react-calendar) {
                  width: 100%;
                  background: transparent;
                  border: none;
                  font-family: inherit;
                }
                .calendar-container :global(.react-calendar__tile) {
                  background: transparent;
                  border: 1px solid #e5e7eb;
                  color: #374151;
                  padding: 0.75rem 0.5rem;
                  position: relative;
                  height: 80px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: flex-start;
                }
                .calendar-container :global(.react-calendar__tile:hover) {
                  background-color: #f3f4f6;
                }
                .calendar-container :global(.react-calendar__tile--active) {
                  background-color: #3b82f6 !important;
                  color: white;
                }
                .calendar-container :global(.react-calendar__tile--now) {
                  background-color: #fef3c7;
                }
                .dark .calendar-container :global(.react-calendar__tile) {
                  border-color: #4b5563;
                  color: #d1d5db;
                }
                .dark .calendar-container :global(.react-calendar__tile:hover) {
                  background-color: #374151;
                }
                .dark .calendar-container :global(.react-calendar__tile--now) {
                  background-color: #451a03;
                }
                .calendar-container :global(.react-calendar__navigation) {
                  display: flex;
                  height: 44px;
                  margin-bottom: 1em;
                }
                .calendar-container :global(.react-calendar__navigation button) {
                  background: transparent;
                  border: 1px solid #e5e7eb;
                  color: #374151;
                  min-width: 44px;
                  font-size: 16px;
                  font-weight: 500;
                }
                .dark .calendar-container :global(.react-calendar__navigation button) {
                  border-color: #4b5563;
                  color: #d1d5db;
                }
                .calendar-container :global(.react-calendar__navigation button:hover) {
                  background-color: #f3f4f6;
                }
                .dark .calendar-container :global(.react-calendar__navigation button:hover) {
                  background-color: #374151;
                }
              `}</style>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Selected Date Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {format(selectedDate, 'MMMM dd, yyyy')}
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Add Task
              </motion.button>
            </div>

            {selectedDateTasks.length > 0 ? (
              <div className="space-y-4">
                {selectedDateTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={deleteTask}
                    onMarkComplete={markAsComplete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 dark:text-gray-500 text-4xl mb-3">📅</div>
                <p className="text-gray-600 dark:text-gray-400">
                  No tasks scheduled for this date
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                >
                  Add a task for this date
                </motion.button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              This Month
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Tasks</span>
                <span className="font-semibold text-gray-900 dark:text-white">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Completed</span>
                <span className="font-semibold text-success-600">{tasks.filter(t => t.status === 'completed').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Pending</span>
                <span className="font-semibold text-warning-600">{tasks.filter(t => t.status === 'pending').length}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Task Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : `New Task for ${format(selectedDate, 'MMM dd, yyyy')}`}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default CalendarPage;