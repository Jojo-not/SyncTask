import React from 'react';
import { Calendar, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Task, PRIORITY_COLORS } from '../utils/constants';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onEdit, onDelete, isDragging = false }: TaskCardProps) {
  const priorityColor = PRIORITY_COLORS[task.priority];

  return (
    <div
      className={`bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${
        isDragging ? 'rotate-3 scale-105' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
          {task.title}
        </h3>
        <div className="flex items-center space-x-1">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColor}`}>
            {task.priority}
          </span>
          <button className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 rounded">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
        
        <div className="flex items-center space-x-1">
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-1 text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 rounded transition-colors"
            >
              <Edit className="w-3 h-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}