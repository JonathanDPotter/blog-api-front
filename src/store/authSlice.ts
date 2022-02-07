import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IauthSlicestate {
  token: string | null;
  user: string | null;
}

const initialState = { token: null, user: null } as IauthSlicestate;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setToken, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
