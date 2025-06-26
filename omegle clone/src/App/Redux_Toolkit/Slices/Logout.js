import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Async thunk to handle logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken"); // Get authentication token from cookies

      if (!token) {
        return rejectWithValue("Unauthorized: No token found");
      }

      const response = await axios.post(
        "http://localhost:8080/api/v1/user/logout",
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Include token in request headers
          }
        }
      );

      // Clear the token from cookies after successful logout
      Cookies.remove("authToken");

      // Use the navigate function passed as an argument
      navigate("/login");

      return response.data; // Return success response from backend
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to logout");
    }
  }
);

// Create the slice
const logoutSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle", // Tracks the logout status (idle, loading, success, failed)
    error: null, // Stores error messages
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to logout";
      });
  }
});

export default logoutSlice.reducer;