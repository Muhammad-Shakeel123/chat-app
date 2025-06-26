import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Async thunk to update the account
export const updateAccount = createAsyncThunk(
  "account/updateAccount",
  async (accountData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken"); // Get authentication token from cookies

      if (!token) {
        return rejectWithValue("Unauthorized: No token found");
      }

      const response = await axios.patch(
        "http://localhost:8080/api/v1/user/update-account",
        accountData,
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Include token in request headers
            "Content-Type": "application/json",
          }
        }
      );
      return response.data; // Return success response from backend
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update account");
    }
  }
);

// Create the slice
const updateAccountSlice = createSlice({
  name: "account",
  initialState: {
    account: null, // Stores the updated account data
    status: "idle", // Tracks the update status (idle, loading, success, failed)
    error: null, // Stores error messages
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.account = payload;
        state.error = null;
      })
      .addCase(updateAccount.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to update account";
      });
  }
});

export default updateAccountSlice.reducer;
