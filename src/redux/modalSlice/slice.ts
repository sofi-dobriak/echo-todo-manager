import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalData {
  id: string;
  title: string;
}

interface ModalState {
  isAddTaskModalOpen: boolean;
  isConfirmDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  isErrorMessageModalOpen: boolean;
  isMobileWindowOpen: boolean;
  isFilterMobileOpen: boolean;

  taskData: ModalData | null;
  modalKey: string | null;
}

export type ModalKey = Exclude<keyof ModalState, 'taskData' | 'modalKey'>;

interface OpenModalData {
  modalKey: ModalKey;
  taskData?: ModalData;
}

const initialState: ModalState = {
  isAddTaskModalOpen: false,
  isConfirmDeleteModalOpen: false,
  isEditModalOpen: false,
  isErrorMessageModalOpen: false,
  isMobileWindowOpen: false,
  isFilterMobileOpen: false,

  taskData: null,
  modalKey: null,
};

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalData | ModalKey>): void => {
      if (typeof action.payload === 'string') {
        state[action.payload] = true;
      } else {
        const { modalKey, taskData } = action.payload;
        state[modalKey] = true;
        if (taskData) {
          state.taskData = taskData;
        }
      }
    },
    closeModal: (state, action: PayloadAction<ModalKey>): void => {
      state[action.payload] = false;

      if (action.payload === 'isEditModalOpen') {
        state.taskData = null;
      }
    },
  },
});

export const { openModal, closeModal } = slice.actions;
export const modalsReducer = slice.reducer;
