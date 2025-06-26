import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// ✅ Async thunk to handle password update
export const updatePassword = createAsyncThunk(
    "updatePassword",
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
             

            if (!token) {
                return rejectWithValue("Unauthorized: No token found");
            }

            console.log("Hitting the update password API"); // Debugging log

            const response = await axios.post(
              `http://localhost:8080/api/v1/user/change-password`, // ✅ Use environment variable for flexibility
              { oldPassword, newPassword },
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Send token for authentication
                  'Content-Type': 'application/json',
                },
              },
            );

             // Debugging log
            return response.data; // ✅ Ensure this returns correct data structure
        } catch (error) {
            
            // ✅ Fixed double semicolon
            return rejectWithValue(alert("any error") || "Failed to update password");
        }
    }
);

// ✅ Create the slice
const UpdatePasswordSlice = createSlice({
    name: "updatePassword",
    initialState: {
        passwordUpdateStatus: "idle", // Tracks update status
        passwordUpdateError: null, // Stores error messages
    },
    extraReducers: (builder) => {
        builder
            .addCase(updatePassword.pending, (state) => {
                state.passwordUpdateStatus = "loading";
                state.passwordUpdateError = null;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.passwordUpdateStatus = "success";
                state.passwordUpdateError = null;
            })
            .addCase(updatePassword.rejected, (state, { payload }) => {
                state.passwordUpdateStatus = "failed";
                state.passwordUpdateError = payload || "Password update failed";
            });
    }
});

export default UpdatePasswordSlice.reducer;
