import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../video/store/searchSlice";
import savedQueriesSlice from "../video/store/savedQueriesSlice";
import authSlice from "../video/store/authSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
    savedQueries: savedQueriesSlice,
  },
});
