// src/pages/customer/CustomerHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import dash from "../../assets/dash.jpg";
import bg from "../../assets/bg.jpg";
import burger from "../../assets/burger.jpg";
import drink1 from "../../assets/drink1.jpg";
import pizza from "../../assets/pizza.jpg";
import smoothie from "../../assets/smoothie.jpg";
import aboutUs from "../../assets/about us.jpg";

const CustomerHome = () => {
  const navigate = useNavigate();

  const preview = [
    { img: burger, title: "Burger", desc: "Juicy and cheesy." },
    { img: drink1, title: "Cold Drinks", desc: "Cool Drink!." },
    { img: pizza, title: "Pizza", desc: "Hot and cheesy slices." },
    { img: smoothie, title: "Smoothie", desc: "Fresh fruit blends." },
  ];

  return (
    <div
      className="font-inter w-full"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="h-20" />

      <section className="w-full text-center py-12 space-y-6 px-4 lg:px-20">
        <img src={dash} alt="Hero" className="mx-auto rounded-2xl shadow-md w-full lg:w-auto" />
        <h1 className="text-3xl lg:text-5xl font-extrabold text-[#212121] leading-snug">
          Fresh, Fast & Flavorful Snacks <br className="hidden sm:block" /> Delivered Right To You
        </h1>
        <p className="text-[14px] lg:text-[16px] text-[#494949] leading-relaxed mx-auto max-w-full lg:max-w-3xl">
          At <span className="font-bold">iCanteen</span>, we bring you the perfect blend of crispy,
          cheesy, and mouth-watering bites made fresh and delivered hot to your door.
        </p>
        <button
          className="btn bg-[#FFB347] rounded-full font-bold text-lg"
          onClick={() => navigate("/menu")}
        >
          Explore Menu
        </button>
      </section>

      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 px-4 lg:px-20 justify-items-center">
        {preview.map((item) => (
          <div
            key={item.title}
            className="card bg-base-100 shadow-md rounded-2xl overflow-hidden w-full lg:w-auto cursor-pointer"
            onClick={() => navigate("/menu")}
          >
            <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h2 className="font-bold text-xl">{item.title}</h2>
              <p className="text-[#737373] text-sm mt-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="w-full bg-slate-100 py-12 lg:py-24 px-4 lg:px-20 flex justify-center">
        <div className="flex flex-col lg:flex-row justify-center gap-12 items-center w-full max-w-full">
          <div className="space-y-8 lg:space-y-12 w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#212121]">
              We cook with passion, <br /> serve with love
            </h2>
            <p className="text-[#494949] text-[14px] lg:text-[16px] leading-relaxed">
              At <span className="font-bold">iCanteen</span>, every dish tells a story, blending
              fresh ingredients, bold flavors, and a touch of homestyle comfort.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <img src={aboutUs} alt="About Us" className="rounded-2xl shadow-md w-full lg:w-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerHome;
