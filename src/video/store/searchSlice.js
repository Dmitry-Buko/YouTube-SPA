import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mapYouTubeVideo } from "../../features/units/mapYouTubeVideo";
import youtubeApi from "../../features/youtubeApi";

const initialState = {
  searchQuery: "", //поисковый запрос
  searchResults: [], //результат поиска
  nextPageToken: null, //пагинация
  loading: false,
  error: null,
};

export const searchVideos = createAsyncThunk(
  "search/searchVideos",
  async ({ order = "", maxResults = 12 } = {}, thunkAPI) => {
    const q = thunkAPI.getState().search.searchQuery;
    // const { order = '', maxResults = 12 } = thunkAPI.getState().savedQueries;
    if (!q) return [];
    try {
      const response = await youtubeApi.get("/search", {
        params: {
          part: "snippet",
          maxResults,
          order,
          q: q,
          regionCode: "ru",
          type: "video",
        },
      });
      const items = response.data.items;
      const videosId = items
        .map((item) => item.id?.videoId)
        .filter(Boolean)
        .join(",");

      const detailsResponse = await youtubeApi.get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videosId,
        },
      });
      return detailsResponse.data.items;
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
    try {
      const response = await youtubeApi.get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          maxResults: 20,
          regionCode: "ru",
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
        state.error = null;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.searchResults = action.payload.map(mapYouTubeVideo);
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetchPopularVideos
      .addCase(fetchPopularVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
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
