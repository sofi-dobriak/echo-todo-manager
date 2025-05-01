const selectItemAnalytic = state => state.itemAnalytic;

export const selectIsVisibleItemAnalytic = state => selectItemAnalytic(state).isVisibleItemAnalityc;
export const selectCurrentTask = state => selectItemAnalytic(state).currentTask;
