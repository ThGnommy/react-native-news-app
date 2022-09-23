import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface NewsState {
  news: [];
  bookmarked: {};
  language: string;
}

const initialState: NewsState = {
  news: [],
  bookmarked: {},
  language: "en",
};

export const fetchTopNews = createAsyncThunk("news/fetchTopNews", async () => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=it",
      {
        headers: {
          "x-api-key": process.env.NEWS_APIKEY as string,
        },
      }
    );

    const data = response.data;
    return data.articles;
  } catch (error) {
    console.log(error);
  }
});

export const newsSlice = createSlice({
  name: "news",

  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopNews.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload);
      state.news = action.payload;
    });
  },
});
export const { setLanguage } = newsSlice.actions;
export default newsSlice.reducer;
