import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {LoginUser} from '../App/Redux_Toolkit/Slices/LoginSlice.js' // Import Redux action
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.Login); // Get login state

  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both fields!");
      return;
    }
const result = await dispatch(LoginUser({ username: email, password }));
    // Dispatch login action
    

    if (result.payload?.data?.accessToken) {
      
      navigate("/")

       // Redirect user after login
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black mt-[-30px]">
      <div className="bg-gray-950 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6 font-oswald">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm font-opensans">Username or Email</label>
            <input
              type="text"
              placeholder="Enter your username or email"
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white text-sm font-opensans">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="font-nunito w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-300"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
