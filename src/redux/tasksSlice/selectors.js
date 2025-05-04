import { createSelector } from '@reduxjs/toolkit';
import { selectFilters } from '../filterSlice/selectors';

export const selectTasks = state => state.tasks.tasks;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilters],
  (tasks, filters) => {
    const { status, dateRange, title } = filters;

    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;

    if (startDate) startDate.setHours(0, 0, 0, 0);
    if (endDate) endDate.setHours(23, 59, 59, 999);

    const filteredTasks = tasks.filter(task => {
      const taskStatus = task.status.toLowerCase();
      const taskTitle = task.title.toLowerCase();
      const taskCreatedDate = new Date(task.createdDate);

      if (status && taskStatus !== status.toLowerCase()) {
        return false;
      }

      if (startDate && endDate) {
        if (endDate < startDate) return false;
        if (taskCreatedDate < startDate || taskCreatedDate > endDate) {
          return false;
        }
      }

      if (title && !taskTitle.includes(title.toLowerCase())) {
        return false;
      }

      return true;
    });

    return filteredTasks.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  }
);

export const selectTaskStatusCountsWithDateRange = createSelector(
  [selectTasks, selectFilters],
  (tasks, { dateRange }) => {
    const statuses = [
      { key: 'created', value: 'Створено' },
      { key: 'inProgress', value: 'В роботі' },
      { key: 'continued', value: 'Продовжено' },
      { key: 'stopped', value: 'Зупинено' },
      { key: 'completed', value: 'Завершено' },
      { key: 'deleted', value: 'Видалено' },
    ];

    const statusCount = Object.fromEntries(statuses.map(({ key }) => [key, 0]));

    const start = dateRange.start ? new Date(dateRange.start) : null;
    const end = dateRange.end ? new Date(dateRange.end) : null;
    if (end) end.setHours(23, 59, 59, 999);

    const filtered = tasks.filter(task => {
      if (!start || !end) return true;
      const taskDate = new Date(task.createdDate);
      return taskDate >= start && taskDate <= end;
    });

    filtered.forEach(task => {
      const match = statuses.find(status => status.value === task.status);
      if (match) statusCount[match.key]++;
    });

    return statusCount;
  }
);
