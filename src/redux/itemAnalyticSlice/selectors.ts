import { RootState } from '../store';

const selectItemAnalytic = (state: RootState) => state.itemAnalytic;

export const selectIsVisibleItemAnalytic = (state: RootState) =>
  selectItemAnalytic(state).isVisibleItemAnalytic;
export const selectCurrentTask = (state: RootState) => selectItemAnalytic(state).currentTask;
