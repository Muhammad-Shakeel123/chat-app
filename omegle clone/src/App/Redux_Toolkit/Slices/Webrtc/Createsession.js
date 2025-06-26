import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create the WebRTC room session
export const createsession = createAsyncThunk(
  "CreateSession/createsession",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/webrtc/create-room",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Session created:", response.data); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create session");
    }
  }
);

// Slice
const createSessionSlice = createSlice({
  name: "CreateSession",
  initialState: {
    session: null,    // Stores the session data
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createsession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createsession.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.session = payload;
      })
      .addCase(createsession.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default createSessionSlice.reducer;
