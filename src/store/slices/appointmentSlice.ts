import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppointmentState {
  selectedAppointment: any | null;
}

const initialState: AppointmentState = {
  selectedAppointment: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setSelectedAppointment: (state, action: PayloadAction<any>) => {
      state.selectedAppointment = action.payload;
    },
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null;
    },
  },
});

export const { setSelectedAppointment, clearSelectedAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
