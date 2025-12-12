import { createSlice } from "@reduxjs/toolkit";
import { getAuthStatus, getUserFromLocalStorage } from "../../utils/localStorage";

const savedUser = getUserFromLocalStorage();
const savedAuth = getAuthStatus();

const initialState = {
  isAuthenticated: savedAuth || false,
  name: savedUser?.name || "",
  email: savedUser?.email || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.name = "";
      state.email = "";
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
