import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import news_api from "../api/news";
export interface NewsState {
  news: [];
  headlinesNews: [];
  bookmarksScreen: boolean;
  country: string;
  categoryName: string;
  loadingNews: boolean;
  querySearch: boolean;
  word: any;
}

const initialState: NewsState = {
  news: [],
  headlinesNews: [],
  bookmarksScreen: false,
  country: "it",
  categoryName: "",
  loadingNews: true,
  querySearch: false,
  word: "",
};

interface FetchNewsProps {
  country: string;
  categoryName: string;
}

export const fetchTopNews = createAsyncThunk(
  "news/fetchTopNews",
  async ({ country, categoryName }: FetchNewsProps) => {
    try {
      const response = await news_api.get(
        `?country=${country}&category=${categoryName}`,
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

export const fetchTopHeadlines = createAsyncThunk(
  "news/fetchTopHeadlines",
  async (country: string) => {
    try {
      const response = await news_api.get(`?country=${country}`, {
        headers: {
          "x-api-key": process.env.NEWS_APIKEY as string,
        },
      });

      const data = response.data;
      return data.articles;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchNewsWithQuery = createAsyncThunk(
  "news/fetchNewsWithQuery",
  async ({ country, query }: { country: string; query: string }) => {
    try {
      const response = await news_api.get(`?country=${country}&q=${query}`, {
        headers: {
          "x-api-key": process.env.NEWS_APIKEY as string,
        },
      });

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
    resetNews: (state) => {
      state.headlinesNews = [];
    },
    inBookmarksScreen: (state, action: PayloadAction<boolean>) => {
      state.bookmarksScreen = action.payload;
    },
    setQuerySearch: (state, action: PayloadAction<boolean>) => {
      state.querySearch = action.payload;
    },
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopNews.pending, (state) => {
        state.loadingNews = true;
      })
      .addCase(fetchTopNews.fulfilled, (state, action) => {
        state.loadingNews = false;
        state.news = action.payload;
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.headlinesNews = action.payload;
      })
      .addCase(fetchNewsWithQuery.pending, (state) => {
        state.loadingNews = true;
      })
      .addCase(fetchNewsWithQuery.fulfilled, (state, action) => {
        state.loadingNews = false;
        state.news = action.payload;
      });
  },
});
export const {
  setLanguage,
  setCategory,
  resetNews,
  inBookmarksScreen,
  setQuerySearch,
  setSearchWord,
} = newsSlice.actions;
export default newsSlice.reducer;
