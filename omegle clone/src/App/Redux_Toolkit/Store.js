import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slices/Authslice'; // Example slice
import LoginSlice from './Slices/LoginSlice'; // Example slice
import UpdatePassword from "./Slices/UpdatePassword";
import AvatarSlice from './Slices/ChangeAvavtar'
import Getcurrentuser from './Slices/GetCurrentuser.js'
import getAllActiveUsers from "./Slices/AllActiveusers.js";
// import  createsession  from "./Slices/Webrtc/Createsession.js";
import updateAccount  from "./Slices/UpdateAccount.js";
import ChangeAvavter from './Slices/ChangeAvavtar.js'
import LogoutSlice from './Slices/Logout.js'
import currentUserReducer from "./Slices/Webrtc/Createsession.js";



export const Store = configureStore({
  reducer: {
    Auth: authReducer,
    Login:LoginSlice,
    Password:UpdatePassword,
    Avavtar:AvatarSlice,
    Current_User:Getcurrentuser,
    allusers:getAllActiveUsers,
    // newsession:createsession,
    Update_Account:updateAccount,
    Change_Avavtat:ChangeAvavter,
    Logout:LogoutSlice,
    CreateSession: currentUserReducer,

  },
});

export default Store;
