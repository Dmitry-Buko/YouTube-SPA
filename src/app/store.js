import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../video/store/searchSlice";
// import videosSlice from "../video/store/videosSlice";
import authSlice from "../video/store/authSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
    // videos: videosSlice,
  },
});
