import { RootState } from '../store.js';

export const selectFilters = (state: RootState) => state.filters;
export const selectFiltersDate = (state: RootState) => state.filters.dateRange;
