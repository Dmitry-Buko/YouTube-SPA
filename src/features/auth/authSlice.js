import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCurrentUserEmail } from "../units/localStorage";

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
  async (formData, thunkAPI) => {
    const url = "https://todo-redev.onrender.com/api/auth/register";
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: thunkAPI.signal,
    };
    
    try {
      const response = await axios.post(url, formData, config);
      const token = response.data?.access_token;
      localStorage.setItem("token", token);
      setCurrentUserEmail(formData.email);
      return response.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.error("Запрос отменен auth/newUserRegistration");
        return thunkAPI.rejectWithValue("Запрос отменен"); 
      }
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors?.[0]?.msg ||
          error?.response?.data?.message ||
          "Ошибка запроса /fetchUserData",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (_, thunkAPI) => {
    const url = "https://todo-redev.onrender.com/api/auth/login";
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: thunkAPI.signal,
    };

    const { email, password } = thunkAPI.getState().auth;
    const formData = { email, password };

    try {
      const response = await axios.post(url, formData, config);
      const token = response.data?.access_token;
      localStorage.setItem("token", token);
      setCurrentUserEmail(email);
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.error("Запрос отменен auth/loginUser");
        return thunkAPI.rejectWithValue("Запрос отменен"); 
      }
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors?.[0]?.msg ||
          error?.response?.data?.message ||
          "Ошибка запроса auth/loginUser",
      );
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return;
});

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
        state.success = "Входим в приложение!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData, resetDataToZero } = authSlice.actions;
export default authSlice.reducer;
