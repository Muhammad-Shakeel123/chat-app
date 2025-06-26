import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from '../App/Redux_Toolkit/Slices/Logout';
import { useNavigate } from "react-router-dom";

function Dropdown() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleLogout = () => {
        
        dispatch(logoutUser({ navigate }));

        // navigate('/login');
      };
    const user = useSelector((state) => state.Current_User.user);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center gap-2 px-1  rounded-full bg-blue-500 text-white text-lg font-semibold hover:bg-blue-600 transition"
      >
        <div className=" cursor-pointer flex items-center gap-3 px-1 py-1 rounded-lg  transition-colors">
    <img 
      src={user?.data?.avatar} 
      alt="avatar" 
      className="h-10 w-10 rounded-full border-2 border-gray-400"
    />
    <p className="text-white font-medium">{user?.data?.username}</p>
  </div>
        {isOpen ? <HiChevronUp className="text-xl" /> : <HiChevronDown className="text-xl" />}
      </button>

      {isOpen && (
        <ul className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-40 bg-white text-black rounded-md shadow-lg z-50 py-2 text-center">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
          </div>
          <li>
            <Link
              to="/updateaccount"
              className="block px-4 py-2 hover:bg-blue-500 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Update Account
            </Link>
          </li>
          <li>
            <Link
              to="/updatepassword"
              className="block px-4 py-2 hover:bg-blue-500 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Update Password
            </Link>
          </li>
          <li>
            <Link
              to="/as-in"
              className="block px-4 py-2 hover:bg-blue-500 hover:text-white transition"
              onClick={handleLogout}
              
            >
              Logout
            </Link>
          </li>
         
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
