// src/pages/customer/Menu.jsx
import { useEffect, useState } from "react";
import { Drawer, Button, Badge, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import api from "../../lib/api";
import MenuItems from "./MenuItems";
import BackButton from "../../components/BackButton";

import burger from "../../assets/burger.jpg";
import fries from "../../assets/Fries.jpg";
import pizza from "../../assets/pizza.jpg";
import smoothie from "../../assets/smoothie.jpg";
import bg from "../../assets/bg.jpg";

// 👇 always-visible, hard-coded menu items
const STATIC_ITEMS = [
  {
    id: "static-burger",
    name: "Classic Burger",
    price: 180,
    image_key: "burger",
    image_url: burger,
  },
  {
    id: "static-fries",
    name: "Crispy Fries",
    price: 80,
    image_key: "fries",
    image_url: fries,
  },
  {
    id: "static-pizza",
    name: "Cheese Pizza Slice",
    price: 150,
    image_key: "pizza",
    image_url: pizza,
  },
  {
    id: "static-smoothie",
    name: "Fruit Smoothie",
    price: 120,
    image_key: "smoothie",
    image_url: smoothie,
  },
];

const fallbackImage = { burger, fries, pizza, smoothie };

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let live = true;

    api
      .get("/menu")
      .then((res) => {
        if (!live) return;
        const apiItems = Array.isArray(res.data) ? res.data : [];

        // STATIC_ITEMS + backend items = final list
        const merged = [
          ...STATIC_ITEMS,
          ...apiItems.map((m) => ({
            ...m,
            // ensure image_url filled (if backend sends only key)
            image_url: m.image_url || fallbackImage[m.image_key],
          })),
        ];

        setItems(merged);
      })
      .catch(() => {
        // backend fail করলে অন্তত static items দেখাবে
        setItems(STATIC_ITEMS);
        message.error("Failed to load menu, showing default items.");
      })
      .finally(() => setLoading(false));

    return () => {
      live = false;
    };
  }, []);

  const addToCart = (m) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.id === m.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      const img = m.image_url || fallbackImage[m.image_key] || burger;
      return [
        ...prev,
        {
          id: m.id,
          name: m.name,
          price: Number(m.price),
          qty: 1,
          img,
        },
      ];
    });
    message.success(`${m.name} added to cart`);
  };

  const updateQty = (id, d) =>
    setCart((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, qty: Math.max(1, r.qty + d) } : r
      )
    );

  const removeItem = (id) =>
    setCart((prev) => prev.filter((x) => x.id !== id));

  const total = cart.reduce((s, r) => s + r.price * r.qty, 0);

  const placeOrder = async () => {
    if (!cart.length) return;
    try {
      const payload = {
        items: cart.map((r) => ({ menu_item_id: r.id, qty: r.qty })),
      };
      const { data } = await api.post("/orders", payload);
      message.success(`Order placed! Total ৳${Number(data.total).toFixed(2)}`);
      setCart([]);
      setCartOpen(false);
    } catch (e) {
      const msg =
        e?.response?.data?.message || e?.message || "Order failed";
      message.error(msg);
    }
  };

  return (
    <div
      className="w-full"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="py-12 px-4 lg:px-20">
        <BackButton />
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#212121]">
            Menu Items
          </h2>

          <Badge count={cart.length} offset={[-2, 2]}>
            <Button
              type="primary"
              onClick={() => setCartOpen(true)}
              icon={<ShoppingCartOutlined />}
              style={{ backgroundColor: "#FFB347", border: "none" }}
            >
              Cart
            </Button>
          </Badge>
        </div>

        <MenuItems loading={loading} items={items} onAdd={addToCart} />
      </div>

      <Drawer
        title={`Your Cart (${cart.length})`}
        placement="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ padding: 16 }}>
          {!cart.length ? (
            <p>No items in cart.</p>
          ) : (
            <>
              {cart.map((row) => (
                <div key={row.id} className="flex items-center gap-3 mb-3">
                  <img
                    src={row.img}
                    alt={row.name}
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{row.name}</div>
                    <div className="text-sm text-[#737373]">
                      ৳ {row.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="small"
                      onClick={() => updateQty(row.id, -1)}
                    >
                      -
                    </Button>
                    <span>{row.qty}</span>
                    <Button
                      size="small"
                      onClick={() => updateQty(row.id, +1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    danger
                    size="small"
                    onClick={() => removeItem(row.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <hr />
              <div className="flex justify-between items-center mt-3">
                <div className="text-lg font-bold">Total</div>
                <div className="text-lg font-bold">
                  ৳ {total.toFixed(2)}
                </div>
              </div>
              <Button
                type="primary"
                style={{
                  marginTop: 12,
                  width: "100%",
                  backgroundColor: "#FFB347",
                  border: "none",
                }}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
}
