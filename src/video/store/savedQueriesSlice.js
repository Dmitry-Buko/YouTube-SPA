import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserEmail,
  loadSavedQueries,
  saveSavedQueries,
} from "../../features/units/localStorage";

const initialState = {
  queries: [], //originalQuery, name, sortBy, maxResults + id
  loading: false,
  error: null,
};

//сохраненные запросы
export const loadQueries = createAsyncThunk(
  "savedQueries/loadQueries",
  async () => {
    const email = getCurrentUserEmail();
    return loadSavedQueries(email);
  },
);

const savedQueriesSlice = createSlice({
  name: "savedQueries",
  initialState,
  reducers: {
    addQuery: (state, action) => {
      const email = getCurrentUserEmail();
      const newQuery = {
        ...action.payload,
        id: Date.now(),
      };
      state.queries.unshift(newQuery);
      saveSavedQueries(email, state.queries);
    },
    updateQuery: (state, action) => {
      const email = getCurrentUserEmail();
      const index = state.queries.findIndex((q) => q.id === action.payload);
      if (index !== -1) {
        state.queries[index] = {
          ...state.queries[index],
          query: action.payload,
        };
      }
      saveSavedQueries(email, state.queries);
    },
    deleteQuery: (state, action) => {
      //принимает id
      const email = getCurrentUserEmail();
      state.queries = state.queries.filter((q) => q.id !== action.payload);
      saveSavedQueries(email, state.queries);
    },
    setQuery: (state, action) => {
      const email = getCurrentUserEmail();
      state.queries = action.payload;
      saveSavedQueries(email, state.queries);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadQueries.fulfilled, (state, action) => {
      state.queries = action.payload;
    });
  },
});

export const { addQuery, updateQuery, deleteQuery, setQuery } =
  savedQueriesSlice.actions;
export default savedQueriesSlice.reducer;
