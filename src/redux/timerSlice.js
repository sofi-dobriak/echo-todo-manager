import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTaskId: null,
  currentTaskId: null,
  currentStatus: null,
  timeLeft: 0,
  isActive: false,
};

const slice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.timeLeft = action.payload;
    },
    decrementTimer: state => {
      if (state.timeLeft > 0) {
        state.timerLeft -= 1;
      }
    },
    startTimer: (state, action) => {
      const { id, status } = action.payload;
      state.activeTaskId = id;
      state.currentTaskId = id;
      state.currentStatus = status || null;
      state.isActive = true;
    },
    stopTimer: state => {
      state.isActive = false;
    },
    resetTimer: () => {
      return initialState;
    },
  },
});

export const { setTimer, decrementTimer, startTimer, stopTimer, resetTimer } = slice.actions;
export const timerReducer = slice.reducer;

const selectTimer = state => state.timer;

export const selectActiveTaskId = state => selectTimer(state).activeTaskId;
export const selectCurrentTaskId = state => selectTimer(state).currentTaskId;
export const currentTaskStatus = state => selectTimer(state).currentStatus;
export const selectTimeLeft = state => selectTimer(state).timeLeft;
export const selectIsActive = state => selectTimer(state).isActive;
