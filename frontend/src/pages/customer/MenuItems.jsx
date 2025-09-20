// src/pages/customer/MenuItems.jsx
import React from "react";
import { Button } from "antd";

import burger from "../../assets/burger.jpg";
import fries from "../../assets/Fries.jpg";
import pizza from "../../assets/pizza.jpg";
import smoothie from "../../assets/smoothie.jpg";

const fallbackImage = { burger, fries, pizza, smoothie };

export default function MenuItems({ loading, items, onAdd }) {
  if (loading) return <p>Loading...</p>;

  if (!items || items.length === 0) {
    return <p style={{ padding: 8 }}>No menu items available.</p>;
  }

  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
      {items.map((m) => {
        const img = m.image_url || fallbackImage[m.image_key] || burger;

        return (
          <div key={m.id} className="card bg-base-100 shadow-md rounded-2xl overflow-hidden w-full lg:w-auto">
            <img src={img} alt={m.name} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h2 className="font-bold text-xl">{m.name}</h2>
              <p className="text-[#737373] text-sm mt-2">{m.description}</p>
              <p className="text-[#212121] font-semibold mt-2">৳ {Number(m.price).toFixed(2)}</p>

              <Button
                onClick={() => onAdd?.(m)}
                style={{ marginTop: 12, backgroundColor: "#FFB347", border: "none" }}
                type="primary"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
