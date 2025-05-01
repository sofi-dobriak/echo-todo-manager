const selectItemAnalytic = state => state.itemAnalytic;

export const selectSsVisibleItemAnalityc = state => selectItemAnalytic(state).isVisibleItemAnalityc;
export const selectCurrentTask = state => selectItemAnalytic(state).currentTask;