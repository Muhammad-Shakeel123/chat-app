import React, { useEffect, useRef } from "react";
import HeroSection from "../Sections/HeroSection";
import HomeSection from "../Sections/HomeSection";
import { motion } from "framer-motion";
import { MdVideoCall } from "react-icons/md";
import { Link } from "react-router-dom";
import img from "../assets/7.avif";
import img2 from "../assets/8.avif";
import img3 from "../assets/9.avif";
import Cookies from "js-cookie";
import gsap from "gsap";

function Home() {
  const headingRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      window.location.href = "/login";
    }

    // GSAP heading animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power3.out" }
    );

    gsap.to(headingRef.current, {
      backgroundPosition: "200% 0%",
      duration: 3,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <>
      <div className="min-h-screen mt-16 md:mt-12 bg-black flex items-center justify-center px-6">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10 relative">
          {/* Text Section */}
          <div className="md:w-1/2 text-white space-y-6 text-center md:text-left">
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-[length:200%_200%]"
            >
              Talk to strangers! Make Friends
            </h1>
            <p className="text-lg font-poppins text-gray-300">
              Experience a random chat alternative to find friends, connect with
              people, and chat with strangers from all over the world.
            </p>

            <div className="flex justify-center md:justify-start">
              <Link
                to="/startcall"
                className="flex items-center gap-2 bg-white text-black text-lg px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                <MdVideoCall className="text-2xl" />
                <span>Video Chat</span>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 relative w-full flex justify-center">
            <motion.img
              src={img}
              alt="Main Illustration"
              className="w-full max-w-md mx-auto rounded-lg z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />

            {/* Floating Small Images - only on medium screens and above */}
            <motion.img
              src={img2}
              alt="Floating 1"
              className="hidden md:block w-24 md:w-32 h-auto rounded-md absolute bottom-40 left-0 z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            />
            <motion.img
              src={img3}
              alt="Floating 2"
              className="hidden md:block w-24 md:w-32 h-auto rounded-md absolute bottom-20 right-0 z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
            />
          </div>
        </div>
      </div>
      <HeroSection />
      <HomeSection />
    </>
  );
}

export default Home;
