import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewsState {
  news: object;
  bookmarked: {};
  language: string;
}

const initialState: NewsState = {
  news: {},
  bookmarked: {},
  language: "en",
};

export const newsSlice = createSlice({
  name: "news",

  initialState,
  reducers: {
    // signin: (state, action: PayloadAction<object>) => {
    //   state.isSignedIn = true;
    //   state.user = action.payload;
    // },
    // signout: (state) => {
    //   state.isSignedIn = false;
    //   state.user = {};
    // },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});
export const { setLanguage } = newsSlice.actions;
export default newsSlice.reducer;
