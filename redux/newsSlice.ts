import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface NewsState {
  news: [];
  bookmarked: {};
  country: string;
  categoryName: string;
  loadingNews: boolean;
}

const initialState: NewsState = {
  news: [],
  bookmarked: {},
  country: "it",
  categoryName: "",
  loadingNews: true,
};

interface FetchNewsProps {
  country: string;
  categoryName: string;
}

export const fetchTopNews = createAsyncThunk(
  "news/fetchTopNews",
  async ({ country, categoryName }: FetchNewsProps) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${categoryName}`,
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

// export const fetchTopHeadlines = createAsyncThunk(
//   "news/fetchTopHeadlines",
//   async (country: string) => {
//     try {
//       const response = await axios.get(
//         `https://newsapi.org/v2/top-headlines?country=${country}`,
//         {
//           headers: {
//             "x-api-key": process.env.NEWS_APIKEY as string,
//           },
//         }
//       );

//       const data = response.data;
//       return data.articles;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const setCategoryAsync = createAsyncThunk(
  "news/setCategoryAsync",
  async (category: string) => {
    return category;
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
    builder
      .addCase(fetchTopNews.pending, (state) => {
        state.loadingNews = true;
      })
      .addCase(fetchTopNews.fulfilled, (state, action) => {
        state.loadingNews = false;
        state.news = action.payload;
      });
    // .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
    //   state.news = action.payload;
    // })
    // .addCase(setCategoryAsync.fulfilled, (state, action) => {
    //   state.categoryName = action.payload;
    // });
  },
});
export const { setLanguage, setCategory } = newsSlice.actions;
export default newsSlice.reducer;
