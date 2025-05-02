const selectModals = state => state.modals;

export const selectAddModalOpen = state => selectModals(state).isAddTaskModalOpen;
export const selectConfirmModalOpen = state => selectModals(state).isConfirmDeleteModalOpen;
export const selectEditModalOpen = state => selectModals(state).isEditModalOpen;
export const selectEditTaskData = state => selectModals(state).editTaskData;
export const selectMobileWindow = state => selectModals(state).isMobileWindowOpen;
