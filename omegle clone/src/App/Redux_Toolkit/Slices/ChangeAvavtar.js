import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const ChangeAvatar = createAsyncThunk(
  "avatar/changeavatar",
  async (avatar, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Unauthorized: No token provided");
      }

      

      const response = await axios.patch(
        "http://localhost:8080/api/v1/user/avatar",
        avatar,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            
          },
        }
      );
      console.log(response.data)
      return response.data;
    } 

    catch (error) {
      console.error("Error changing avatar:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to change avatar"
      );
    }
  }
);

const AvatarSlice = createSlice({
  name: "changeAvatar",
  initialState: {
    avatar: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ChangeAvatar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ChangeAvatar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.avatar = action.payload.avatar;
      })
      .addCase(ChangeAvatar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default AvatarSlice.reducer;
