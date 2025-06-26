import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken"); 

      if (!token) {
        return rejectWithValue("Unauthorized: No token found");
      }

       

      const response = await axios.get(
        "http://localhost:8080/api/v1/user/current-user", 
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );
      
       // Extract user data from the response
      
      return response.data; // Return success response from backend
    } catch (error) {
      // Log error message
      return rejectWithValue(error.response?.data || "Failed to fetch current user");
    }
  }
);

// Create the slice
const getCurrentUserSlice = createSlice({
  name: "user",
  initialState: {
    user: null, 
    status: "idle", 
    error: null, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.user = payload;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to fetch current user";
      });
  }
});

export default getCurrentUserSlice.reducer;
