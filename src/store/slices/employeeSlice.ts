import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  selectedEmployee: any | null;
}

const initialState: EmployeeState = {
  selectedEmployee: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setSelectedEmployee: (state, action: PayloadAction<any>) => {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },
});

export const { setSelectedEmployee, clearSelectedEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
