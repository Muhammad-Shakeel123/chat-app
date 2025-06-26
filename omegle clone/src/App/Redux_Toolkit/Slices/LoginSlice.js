import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


 const LoginUser = createAsyncThunk("login/loginUser", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            
            
        );

        const token = response.data?.data?.accessToken; 
        
        const user = response.data?.data?.user;
        const userid = response.data?.data?._id;
        
        // clgog(userid);
        if (token) {
            Cookies.set("authToken", token, { expires: 7 }); 
        }

        return { user, token }; // Send user data and token to Redux store
    } catch (error) {
        console.log(error.response?.data);
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

// Slice for login
const loginSlice = createSlice({
    name: "login",
    initialState: {
        user: null,
        token: null,
        status: "idle",
        error: null
    },
    reducers: {
        logout: (state) => {
            Cookies.remove("authToken");
            state.user = null;
            state.token = null;
            state.status = "idle";
            state.error = null;
        },
        setUserFromToken: (state, action) => {
            state.token = action.payload;
            // Optionally, you can set user details if you have a way to decode the token
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(LoginUser.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.user = payload.user;
                state.token = payload.token;
                state.error = null;
            })
    .addCase(LoginUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Something went wrong";
    });
    }
});

export const { logout, setUserFromToken } = loginSlice.actions;
export default loginSlice.reducer;
export { LoginUser };