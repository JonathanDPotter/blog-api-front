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
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
