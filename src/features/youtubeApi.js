import axios from "axios";

const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});

youtubeApi.interceptors.request.use((config) => {
  return config;
});

export default youtubeApi;
