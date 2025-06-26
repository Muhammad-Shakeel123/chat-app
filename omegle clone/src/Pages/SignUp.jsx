import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../App/Redux_Toolkit/Slices/Authslice';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("country", country);
    formData.append("fullName", fullName);
    formData.append("avatar", avatar);

    dispatch(registerUser(formData));
  };

  return (
    <div className="flex items-center justify-center h-fit bg-black">
      <div className="bg-gray-950 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6 font-roboto">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="username" className="text-gray-400 text-sm font-poppins">Username *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-400 text-sm font-poppins">Email *</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-400 text-sm font-poppins">Password *</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="country" className="text-gray-400 text-sm font-poppins">Country *</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              id="country"
              name="country"
              placeholder="Enter your country"
              required
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="text-gray-400 text-sm font-poppins">Full Name *</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="avatar" className="text-gray-400 text-sm font-poppins">Profile Picture *</label>
            <input
              onChange={(e) => setAvatar(e.target.files[0])}
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              required
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </form>
        

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;