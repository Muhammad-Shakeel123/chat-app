import React from "react";

const HeroSection = () => {
  return (
    <>
    
    <section className="bg-black text-white py-20 text-center px-4">
    <div className="bg-gray-500 h-[1px] w-[70vw] mx-auto relative top-[-5rem]"></div>
      <div className="max-w-3xl mx-auto">
        <button className="bg-purple-500 hover:bg-purple-600 text-sm text-white font-medium py-1.5 px-4 rounded-full mb-4 transition">
          Reach people like you
        </button>

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Anonymous Chat, Meet new people
        </h1>

        <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-poppins">
          Find strangers worldwide, the new modern Omegle and OmeTV alternative.
          Connect with real people, enjoy ad free text and video chats, and
          build genuine friendships.
        </p>
      </div>
    </section>
    
    </>
  );
};

export default HeroSection;
