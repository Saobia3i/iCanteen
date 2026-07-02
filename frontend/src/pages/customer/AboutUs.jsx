import React from "react";
import logo from "../../assets/logo.png";
import bg from "../../assets/ibg.png";

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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 max-w-3xl bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center">
        <img src={logo} alt="iCanteen Logo" className="mx-auto w-24 mb-4" />

        <h1 className="text-4xl font-extrabold text-[#212121] mb-6">
          About <span className="text-yellow-500">iCanteen</span>
        </h1>

        <p className="text-gray-800 text-lg leading-relaxed">
          Welcome to <span className="font-bold text-yellow-600">iCanteen</span>, your one-stop
          digital canteen solution. Our goal is to make ordering, managing, and enjoying food
          simpler, faster, and smarter for both customers and staff.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          From crispy fries to cheesy pizzas, we combine flavor with technology. iCanteen is
          designed as a modern software project that blends tech vibes with food vibes, bringing a
          smooth digital experience for everyone.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Whether you are a customer placing an order in seconds, or a staff member managing menus
          and deliveries, iCanteen is here to save time and reduce hassle.
        </p>
      </div>
    </div>
  );
}
