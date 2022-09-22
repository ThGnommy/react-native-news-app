import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {};
  isSignedIn: boolean;
}

const initialState: UserState = {
  user: {},
  isSignedIn: false,
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    signin: (state, action: PayloadAction<object>) => {
      state.isSignedIn = true;
      state.user = action.payload;
    },
    signout: (state) => {
      state.isSignedIn = false;
      state.user = {};
    },
  },
});
export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
