import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Async thunk to fetch all active users
export const getAllActiveUsers = createAsyncThunk(
  "users/getAllActiveUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken"); 

      if (!token) {
        return rejectWithValue("Unauthorized: No token found");
      }

      console.log("Fetching all active users"); 

      const response = await axios.get(
        "http://localhost:8080/api/v1/user/active-users", 
        {
          headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
          }
        }
      );
      console.log("All active users fetched successfully"); 
      console.log(response.data)
      return response.data;
       
    } catch (error) {
      console.log("Failed to fetch all active users", error); 
      return rejectWithValue(error.response?.data || "Failed to fetch all active users");
    }
  }
);

// Create the slice
const allActiveUsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [], 
    status: "idle",
    error: null, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllActiveUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllActiveUsers.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.users = payload;
        state.error = null;
      })
      .addCase(getAllActiveUsers.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to fetch all active users";
      });
  }
});

export default allActiveUsersSlice.reducer;
