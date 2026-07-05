import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mapYouTubeVideo } from "../../features/units/mapYouTubeVideo";

const initialState = {
  searchQuery: "", //поисковый запрос
  searchResults: [], //результат поиска
  nextPageToken: null, //пагинация
  loading: false,
  error: null,
};

export const searchVideos = createAsyncThunk(
  "search/searchVideos",
  async (_, thunkAPI) => {
    const q = thunkAPI.getState().search.searchQuery;
    const url = "https://www.googleapis.com/youtube/v3/search";
    try {
      const response = await axios.get(url, {
        params: {
          part: "snippet",
          maxResults: 12,
          q: q,
          regionCode: "ru",
          type: "video",
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
      });
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message ||
          "Ошибка при загрузке /searchVideos",
      );
    }
  },
);

export const fetchPopularVideos = createAsyncThunk(
  "search/fetchPopularVideos",
  async (_, thunkAPI) => {
    const url = "https://www.googleapis.com/youtube/v3/videos";
    try {
      const response = await axios.get(url, {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          maxResults: 20,
          regionCode: "ru",
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
      });
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.message ||
          "Ошибка при загрузке /fetchPopularVideos",
      );
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addInputValue: (state, actions) => {
      state.searchQuery = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //searchVideos
      .addCase(searchVideos.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.searchResults = action.payload.map(mapYouTubeVideo);
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetchPopularVideos
      .addCase(fetchPopularVideos.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchPopularVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.searchResults = action.payload.map(mapYouTubeVideo);
      })
      .addCase(fetchPopularVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addInputValue } = searchSlice.actions;
export default searchSlice.reducer;
