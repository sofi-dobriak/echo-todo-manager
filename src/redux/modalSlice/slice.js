import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddTaskModalOpen: false,
  isConfirmDeleteModalOpen: false,
  isEditModalOpen: false,
  editTaskData: null,
};

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      if (typeof action.payload === 'object' && action.payload.modalKey) {
        state[action.payload.modalKey] = true;
        if (action.payload.taskData) {
          state.editTaskData = action.payload.taskData;
        }
      } else {
        state[action.payload] = true;
      }
    },
    closeModal: (state, action) => {
      state[action.payload] = false;

      if (action.payload === 'isEditModalOpen') {
        state.editTaskData = null;
      }
    },
  },
});

export const { openModal, closeModal } = slice.actions;
export const modalsReducer = slice.reducer;
