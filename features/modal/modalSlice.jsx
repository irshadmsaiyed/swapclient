/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  isCofirmDialogOpen: false,
  isAlertOpen: false,
  alertMessage: '',
  alertType: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openCofirmDialog: (state) => {
      state.isCofirmDialogOpen = true;
    },
    closeCofirmDialog: (state) => {
      state.isCofirmDialogOpen = false;
    },
    openAlert: (state, { payload }) => {
      state.isAlertOpen = true;
      state.alertMessage = payload.alertMessage;
      state.alertType = payload.alertType;
    },
    closeAlert: (state) => {
      state.isAlertOpen = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  openCofirmDialog,
  closeCofirmDialog,
  openAlert,
  closeAlert,
} = modalSlice.actions;
export default modalSlice.reducer;
