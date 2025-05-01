import { createSelector } from '@reduxjs/toolkit';
import { selectFilters } from '../filterSlice/selectors';

export const selectTasks = state => state.tasks.tasks;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilters],
  (tasks, filters) => {
    const { status, dateRange, title } = filters;

    return tasks.filter(task => {
      if (status && task.status.toLowerCase() !== status.toLowerCase()) {
        return false;
      }

      if (dateRange.start && dateRange.end) {
        const createDate = new Date(task.createdDate);

        const startDate = new Date(dateRange.start);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999);

        if (createDate < startDate || createDate > endDate) {
          return false;
        }
      }

      if (title && !task.title.toLowerCase().includes(title.toLowerCase())) {
        return false;
      }

      return true;
    });
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
