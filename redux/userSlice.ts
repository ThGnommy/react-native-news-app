import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  user: {};
  isSignedIn: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  user: {},
  isSignedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<object>) => {
      state.isSignedIn = true;
      state.user = action.payload;
    },
    signout: (state) => {
      state.isSignedIn = false;
      // state.user = {};
    },
  },
});
export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
