import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Flag,
  CheckCircle,
  Edit3,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

const TaskCard = ({ task, onEdit, onDelete, onMarkComplete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-error-600 bg-error-50 dark:bg-error-900/20";
      case "medium":
        return "text-warning-600 bg-warning-50 dark:bg-warning-900/20";
      case "low":
        return "text-accent-600 bg-accent-50 dark:bg-accent-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-success-600 bg-success-50 dark:bg-success-900/20";
      case "in-progress":
        return "text-primary-600 bg-primary-50 dark:bg-primary-900/20";
      case "pending":
        return "text-warning-600 bg-warning-50 dark:bg-warning-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-700";
    }
  };

  const isOverdue =
    new Date(task.due_date) < new Date() && task.status !== "completed";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 transition-all duration-300 ${
        task.status === "completed"
          ? "border-success-200 dark:border-success-800"
          : isOverdue
          ? "border-error-200 dark:border-error-800"
          : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3
            className={`text-lg font-semibold transition-colors duration-200 ${
              task.status === "completed"
                ? "text-gray-500 dark:text-gray-400 line-through"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {task.title}
          </h3>
          <div className="flex space-x-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>
        </div>

        <p
          className={`text-sm mb-4 ${
            task.status === "completed"
              ? "text-gray-400 dark:text-gray-500"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {task.description}
        </p>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span className={isOverdue ? "text-error-600 font-medium" : ""}>
              {format(new Date(task.due_date), "MMM dd, yyyy")}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Created {format(new Date(task.created_at), "MMM dd")}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 text-sm">
            <Flag className="h-4 w-4" />
            <span className="capitalize">{task.priority} priority</span>
          </div>

          <div className="flex space-x-2">
            {task.status !== "completed" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onMarkComplete(task.id)}
                className="p-2 text-success-600 hover:bg-success-50 dark:hover:bg-success-900/20 rounded-lg transition-colors duration-200"
                title="Mark as complete"
              >
                <CheckCircle className="h-4 w-4" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(task)}
              className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200"
              title="Edit task"
            >
              <Edit3 className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(task.id)}
              className="p-2 text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors duration-200"
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
