import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  uid: string | null;
  email: string | null;
  isReady: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  uid: null,
  email: null,
  isReady: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ uid: string; email: string | null }>,
    ) => {
      state.isAuthenticated = true;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.isReady = true;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.uid = null;
      state.email = null;
      state.isReady = true;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
