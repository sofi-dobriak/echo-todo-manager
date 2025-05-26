interface TaskStatuses {
  CREATED: string;
  IN_PROGRESS: string;
  PAUSED: string;
  RESUMED: string;
  COMPLETED: string;
  DELETED: string;
}

export const TASK_STATUSES: TaskStatuses = {
  CREATED: 'Створено',
  IN_PROGRESS: 'В роботі',
  PAUSED: 'Зупинено',
  RESUMED: 'Продовжено',
  COMPLETED: 'Завершено',
  DELETED: 'Видалено',
};
