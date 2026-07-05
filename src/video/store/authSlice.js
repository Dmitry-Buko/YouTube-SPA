import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: "",
  email: "",
  password: "",
  gender: "",
  age: "",
  error: "",
  loading: false,
  success: "",
};

export const newUserRegistration = createAsyncThunk(
  "auth/newUserRegistration",
  async (formData, { rejectWithValue }) => {
    const url = "https://todo-redev.onrender.com/api/auth/register";
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(url, formData, config);
      const token = response.data?.access_token;
      localStorage.setItem("token", token);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.errors?.[0]?.msg ||
          error?.response?.data?.message ||
          "Ошибка запроса /fetchUserData",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (_, thunkApi) => {
    const url = "https://todo-redev.onrender.com/api/auth/login";
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const { email, password } = thunkApi.getState().auth;
    const formData = { email, password };
    try {
      const response = await axios.post(url, formData, config);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.errors?.[0]?.msg ||
          error?.response?.data?.message ||
          "Ошибка запроса /fetchUserData",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetDataToZero: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //newUserRegistration
      .addCase(newUserRegistration.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(newUserRegistration.fulfilled, (state) => {
        state.loading = false;
        state.success = "Аккаунт создан. Заходим!";
      })
      .addCase(newUserRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = "";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.success = "Все гуда, залетаем!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { setFormData } = authSlice.actions;
export default authSlice.reducer;
