import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddTaskModalOpen: false,
  isConfirmDeleteModalOpen: false,
  isTimerModalOpen: false,
  isTimerActive: false,
  isTimeLeftModalOpen: false,
  isContinueModalOpen: false,

  taskId: null,
  taskStatus: null,
};

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state[action.payload] = true;
    },
    closeModal: (state, action) => {
      state[action.payload] = false;
    },
    toggleModal: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
    resetModals: () => {
      return initialState;
    },
    setModalData: (state, action) => {
      const { id, status } = action.payload;
      state.taskId = id;
      state.taskStatus = status;
    },
    clearModalData: state => {
      state.taskId = null;
      state.taskStatus = null;
    },
  },
});

export const { openModal, closeModal, toggleModal, resetModals, setModalData, clearModalData } =
  slice.actions;
export const modalsReducer = slice.reducer;

const selectModals = state => state.modals;

export const selectAddModalOpen = state => selectModals(state).isAddTaskModalOpen;
export const selectConfirmModalOpen = state => selectModals(state).isConfirmDeleteModalOpen;
export const selectTimerModalOpen = state => selectModals(state).isTimerModalOpen;
export const selectTimerActive = state => selectModals(state).isTimerActive;
export const selectTimeLeftModalOpen = state => selectModals(state).isTimeLeftModalOpen;
export const selectContinueModalOpen = state => selectModals(state).isContinueModalOpen;
export const selectModalTaskId = state => selectModals(state).taskId;
export const selectModalTaskStatus = state => selectModals(state).taskStatus;
