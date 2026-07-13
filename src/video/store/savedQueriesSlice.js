import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserEmail,
  loadSavedQueries,
  saveSavedQueries,
} from "../../features/units/localStorage";

const initialState = {
  queries: [],
  loading: false,
  error: null,
};

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
      const { id, ...newData } = action.payload;
      const index = state.queries.findIndex((q) => q.id === id);
      if (index !== -1 && id) {
        state.queries[index] = {
          ...state.queries[index],
          ...newData,
        };
        saveSavedQueries(email, state.queries);
      }
    },
    deleteQuery: (state, action) => {
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
