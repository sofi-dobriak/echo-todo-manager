const selectItemAnalytic = state => state.itemAnalytic;

export const selectIsVisibleItemAnalytic = state => selectItemAnalytic(state).isVisibleItemAnalytic;
export const selectCurrentTask = state => selectItemAnalytic(state).currentTask;
