import axios from "axios";

const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY
  },
});

youtubeApi.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token')
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default youtubeApi