const selectModals = state => state.modals;

export const selectAddModalOpen = state => selectModals(state).isAddTaskModalOpen;
export const selectConfirmModalOpen = state => selectModals(state).isConfirmDeleteModalOpen;
