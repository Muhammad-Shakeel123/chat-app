import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createsession } from "../App/Redux_Toolkit/Slices/Webrtc/Createsession";
import { Link } from "react-router-dom";

const StartCall = () => {
  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.Current_User.user?.data?._id);
  console.log(currentUserId)
  const { session, loading, error } = useSelector((state) => state.CreateSession);

  

  const handleStartCall = () => {
    if (currentUserId) {
      dispatch(createsession({ userId: currentUserId }));
    } else {
      alert("No user data available. Please log in first.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Start Call</h2>

        {loading && <p className="text-blue-500">Creating session...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {session ? (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mt-4">
            <p className="font-medium">Session ID:</p>
            <p className="text-lg font-bold">{session.data._id}</p>
          </div>
        ) : (
          <button
            onClick={handleStartCall}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
          >
            Start Call
          </button>
          
        )}
        <li><Link to="/videocall">video call</Link></li>
      </div>
    </div>
  );
};

export default StartCall;
