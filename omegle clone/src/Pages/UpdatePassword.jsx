import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../App/Redux_Toolkit/Slices/UpdatePassword.js';

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword })); // Dispatch API call
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Update Password</h2>

        {/* ✅ onSubmit should be on the <form> tag, not the button */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="oldPassword" className="block text-gray-400 text-sm font-medium">Old Password *</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter your old password"
              required
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-gray-400 text-sm font-medium">New Password *</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
              name="newPassword"
              placeholder="Enter your new password"
              required
              className="w-full p-3 mt-1 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ✅ The button should not have onSubmit. It should have type="submit" */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-300"
          >
            {/* {passwordUpdateStatus === 'loading' ? "Updating..." : "Update Password"} */}
            Update
          </button>
        </form>

        {/* {passwordUpdateStatus === 'failed' && <p className="text-center mt-4 text-red-600">Error: {passwordUpdateError}</p>}
        {passwordUpdateStatus === 'success' && <p className="text-center mt-4 text-green-600">Password updated successfully!</p>} */}
      </div>
    </div>
  );
}

export default UpdatePassword;

