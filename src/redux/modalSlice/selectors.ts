import { RootState } from '../store';

const selectModals = (state: RootState) => state.modals;

export const selectAddModalOpen = (state: RootState) => selectModals(state).isAddTaskModalOpen;
export const selectConfirmModalOpen = (state: RootState) =>
  selectModals(state).isConfirmDeleteModalOpen;
export const selectEditModalOpen = (state: RootState) => selectModals(state).isEditModalOpen;
export const selectEditTaskData = (state: RootState) => selectModals(state).editTaskData;
export const selectMobileWindow = (state: RootState) => selectModals(state).isMobileWindowOpen;
export const selectFilterMobileWindow = (state: RootState) =>
  selectModals(state).isFilterMobileOpen;
export const selectErrorMessageModalWindow = (state: RootState) =>
  selectModals(state).isErrorMessageModalOpen;
