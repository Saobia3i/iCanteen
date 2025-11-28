// src/pages/customer/CustomerHome.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import { Drawer, Button, Menu } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  AppstoreOutlined,
  StarOutlined,
  InfoCircleOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";

// NOTE: Navbar/Footer globally App.jsx e ache — page er vitore rakhle double hoy.

// Assets
import dash from "../../assets/dash.jpg";
import bg from "../../assets/bg.jpg";
import burger from "../../assets/burger.jpg";
import drink1 from "../../assets/drink1.jpg";
import pizza from "../../assets/pizza.jpg";
import smoothie from "../../assets/smoothie.jpg";
import aboutUs from "../../assets/about us.jpg";

const CustomerHome = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  // replace your onMenuClick with this:
  const onMenuClick = (e) => {
      if (e.key === "home") navigate("/customer");
      if (e.key === "menu-items") navigate("/menu");
      if (e.key === "profile") navigate("/customer/profile");
      if (e.key === "contact") navigate("/contact");
      if (e.key === "about-us") navigate("/about-us");
      setVisible(false);
    };


  // Grid data (preview)
  const preview = [
    { img: burger,  title: "Burger",   desc: "Juicy and cheesy." },
    { img: drink1,   title: "Cold Drinks",    desc: "Cool Drink!." },
    { img: pizza,   title: "Pizza",    desc: "Hot and cheesy slices." },
    { img: smoothie,title: "Smoothie", desc: "Fresh fruit blends." },
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
      {/* Sidebar toggle button */}
      <Button
        type="primary"
        onClick={showDrawer}
        style={{
          position: "fixed",
          top: "80px",
          left: "20px",
          zIndex: 1000,
          backgroundColor: "#FFB347",
          border: "none",
        }}
        icon={<MenuOutlined />}
      >
        {/* “Menu” নামটা আর থাকছে না */}
        Open
      </Button>

      {/* Sidebar Drawer */}
      <Drawer
        title="iCanteen"
        placement="left"
        onClose={onClose}
        open={visible}
        styles={{ body: { padding: 0 } }}  // bodyStyle deprecated fix
      >
        <Menu
          mode="inline"
          style={{ borderRight: 0 }}
          onClick={onMenuClick}
          items={[
            { label: "Profile",    key: "profile",     icon: <UserOutlined /> },
            { label: "Home",       key: "home",        icon: <HomeOutlined /> },
            // আগের “Menu” এর বদলে “Menu Items”
            { label: "Menu Items", key: "menu-items",  icon: <AppstoreOutlined /> },
            { label: "Specials",   key: "specials",    icon: <StarOutlined /> },
            { label: "About Us",   key: "about-us",       icon: <InfoCircleOutlined /> },
            { label: "Contact",    key: "contact",     icon: <MailOutlined /> },
          ]}
        />
      </Drawer>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="w-full text-center py-12 space-y-6 px-4 lg:px-20">
        <img src={dash} alt="Hero" className="mx-auto rounded-2xl shadow-md w-full lg:w-auto" />
        <h1 className="text-3xl lg:text-5xl font-extrabold text-[#212121] leading-snug">
          Fresh, Fast & Flavorful Snacks <br className="hidden sm:block" /> Delivered Right To You 🍕🍔🍟
        </h1>
        <p className="text-[14px] lg:text-[16px] text-[#494949] leading-relaxed mx-auto max-w-full lg:max-w-3xl">
          At <span className="font-bold">iCanteen</span>, we bring you the perfect blend of crispy, cheesy, and mouth-watering bites — <br className="hidden sm:block" />
          made fresh and delivered hot to your door.
        </p>
        <button
          className="btn bg-[#FFB347] rounded-full font-bold text-lg"
          onClick={() => navigate("/menu")} // <-- go to Menu Items page
        >
          Explore Menu
        </button>
      </section>

      {/* Menu Section (static preview cards; now clickable -> /menu) */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 px-4 lg:px-20 justify-items-center">
        {preview.map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md rounded-2xl overflow-hidden w-full lg:w-auto cursor-pointer"
            onClick={() => navigate("/menu")} // <-- card click -> Menu Items page
          >
            <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h2 className="font-bold text-xl">{item.title}</h2>
              <p className="text-[#737373] text-sm mt-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* About Us Section */}
      <section className="w-full bg-slate-100 py-12 lg:py-24 px-4 lg:px-20 flex justify-center">
        <div className="flex flex-col lg:flex-row justify-center gap-12 items-center w-full max-w-full">
          <div className="space-y-8 lg:space-y-12 w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#212121]">
              We cook with passion, <br /> serve with love
            </h2>
            <p className="text-[#494949] text-[14px] lg:text-[16px] leading-relaxed">
              At <span className="font-bold">iCanteen</span>, every dish tells a story — blending fresh ingredients, bold flavors, and a touch of homestyle comfort to bring you food that warms the soul.
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
