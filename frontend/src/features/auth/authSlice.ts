import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  email: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("userEmail"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; email: string }>
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userEmail", action.payload.email);
    },
    logout: (state) => {
      state.token = null;
      state.email = null;

      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;