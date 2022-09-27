import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface NewsState {
  news: [];
  bookmarked: {};
  country: string;
  categoryName: string;
}

const initialState: NewsState = {
  news: [],
  bookmarked: {},
  country: "it",
  categoryName: "",
};

export const fetchTopNews = createAsyncThunk(
  "news/fetchTopNews",
  async ({
    country,
    categoryName,
  }: {
    country: string;
    categoryName: string;
  }) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}` +
          `${categoryName.length !== 0 ? `&category=${categoryName}` : ""}`,
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
  }
);

export const newsSlice = createSlice({
  name: "news",

  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.categoryName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
  },
});
export const { setLanguage, setCategory } = newsSlice.actions;
export default newsSlice.reducer;
