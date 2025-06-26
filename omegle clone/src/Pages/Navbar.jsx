import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiVideoCamera } from "react-icons/hi";
import { logoutUser } from '../App/Redux_Toolkit/Slices/Logout';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../Components/Dropdown';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Current_User.user);

  const navRef = useRef();

  useEffect(() => {
    const nav = navRef.current;

    gsap.to(nav, {
      backgroundColor: '#1f2937', // Tailwind's bg-gray-800
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top+=10',
        toggleActions: 'play reverse play reverse',
        scrub: true,
      },
    });
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser({ navigate }));
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-black text-white flex justify-between items-center h-16 px-8 font-poppins transition-colors duration-300"
    >
      <div>
        <NavLink to="/" className="text-4xl">
          <HiVideoCamera />
        </NavLink>
      </div>

      <ul className="gap-8 hidden md:flex">
        {[
          { to: '/', label: 'Home' },
          { to: '/blogs', label: 'Blogs' },
          { to: '/about', label: 'About' },
        ].map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `relative inline-block px-2 py-1 
                before:content-[''] before:absolute before:left-2 before:bottom-0 
                before:w-[75%] before:h-[2px] before:bg-blue-400 
                before:scale-x-0 hover:before:scale-x-100 
                before:origin-left before:transition-transform before:duration-300
                ${isActive ? 'before:scale-x-100' : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Optional User Avatar & Logout */}
      {/* 
      <div className="flex items-center gap-3">
        {user ? (
          <span className="text-white font-quicksand">
            Hello <span className="text-purple-400 font-semibold">{user.data.username}</span>
          </span>
        ) : null}
        <button onClick={handleLogout} className="text-yellow-500 text-xl ml-4">
          Logout
        </button>
      </div>
      */}

      {/* Dropdown */}
      <div className="group relative focus:outline-none" tabIndex="0">
        <Dropdown />
      </div>
    </nav>
  );
}

export default Navbar;
