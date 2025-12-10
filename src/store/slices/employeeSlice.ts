import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  selectedEmployee: any | null;
  isEditable: boolean;
}

const initialState: EmployeeState = {
  selectedEmployee: null,
  isEditable: true,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setSelectedEmployee: (state, action: PayloadAction<any>) => {
      state.selectedEmployee = action.payload;
      state.isEditable = false; // Set to non-editable when loading an employee
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
      state.isEditable = true;
    },
    setIsEditable: (state, action: PayloadAction<boolean>) => {
      state.isEditable = action.payload;
    },
  },
});

export const { setSelectedEmployee, clearSelectedEmployee, setIsEditable } =
  employeeSlice.actions;
export default employeeSlice.reducer;
