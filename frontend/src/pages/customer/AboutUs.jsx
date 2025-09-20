import React from "react";
import logo from "../../assets/logo.png";
import bg from "../../assets/ibg.png";
import BackButton from "../../components/BackButton"; // ✅ ঠিক path দিন

export default function AboutUs() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 py-12"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Content box */}
      <div className="relative z-10 max-w-3xl bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center">
        {/* Back button */}
        <div className="absolute top-4 left-4">
          <BackButton label="← Back" />
        </div>

        {/* Logo */}
        <img src={logo} alt="iCanteen Logo" className="mx-auto w-24 mb-4" />

        <h1 className="text-4xl font-extrabold text-[#212121] mb-6">
          About <span className="text-yellow-500">iCanteen</span>
        </h1>

        <p className="text-gray-800 text-lg leading-relaxed">
          Welcome to <span className="font-bold text-yellow-600">iCanteen</span> — 
          your one-stop digital canteen solution. Our goal is to make ordering, 
          managing, and enjoying food <span className="font-semibold">simpler, 
          faster, and smarter</span> for both customers and staff.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          From crispy fries to cheesy pizzas 🍟🍕, we combine flavor with 
          technology. iCanteen is designed as a modern software project that 
          blends <span className="font-semibold">tech vibes</span> with 
          <span className="font-semibold"> food vibes</span>, bringing a smooth 
          digital experience for everyone.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Whether you’re a <span className="font-semibold">customer</span> placing 
          an order in seconds, or a <span className="font-semibold">staff 
          member</span> managing menus and deliveries, iCanteen is here to 
          <span className="font-semibold"> save time and reduce hassle</span>. 
          Built as part of a <span className="font-semibold">software development 
          course project</span>, it reflects modern web technologies, teamwork, 
          and real-world usability.
        </p>
      </div>
    </div>
  );
}
