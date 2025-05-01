import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddTaskModalOpen: false,
  isConfirmDeleteModalOpen: false,
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
  },
});

export const { openModal, closeModal } = slice.actions;
export const modalsReducer = slice.reducer;
