import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout.jsx'; // Ensure Layout component is imported
import Login from './Pages/Login.jsx'; // Ensure Login component is imported
import SignUp from "./Pages/SignUp.jsx"; // Ensure SignUp component is imported
 // Ensure UpdatePassword component is imported
// import Navbar from './Components/Navbar'; // Ensure Navbar component is imported
import { useEffect } from 'react';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { setUserFromToken } from './App/Redux_Toolkit/Slices/LoginSlice';
import { getCurrentUser } from './App/Redux_Toolkit/Slices/GetCurrentuser.js';
// import { getAllActiveUsers } from './App/Redux_Toolkit/Slices/AllActiveusers.js';


function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => !!state.Login.token);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      dispatch(setUserFromToken(token));
      dispatch(getCurrentUser());
      getCurrentUser();
      
    }
  });

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
        {/* <Route path="/update-password" element={isAuthenticated ? <UpdatePassword /> : <Navigate to='/login' />} /> */}
        <Route 
          path='/*' element={isAuthenticated ? <Layout /> : <Navigate to='/login' />}
        />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;