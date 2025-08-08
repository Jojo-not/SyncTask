export const PRIORITY_COLORS = {
  low: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
} as const;

export const STATUS_COLORS = {
  'to-do': 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
  'in-progress': 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
  'completed': 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200',
} as const;

export type Priority = keyof typeof PRIORITY_COLORS;
export type Status = keyof typeof STATUS_COLORS;

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}