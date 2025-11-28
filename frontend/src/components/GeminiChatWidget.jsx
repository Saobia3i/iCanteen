// src/components/GeminiChatWidget.jsx
import React, { useState, useMemo, useEffect } from "react";
import api from "../lib/api"; 

export default function GeminiChatWidget() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [thread, setThread] = useState([
    { who: "ai", text: "Hi! I’m iCanteen Assistant. How can I help?" },
  ]);

  // detect staff vs customer by current pathname
  const scope = useMemo(() => {
    const p = window.location.pathname;
    return p.startsWith("/staff") ? "staff" : "customer";
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setThread((t) => [...t, { who: "you", text }]);
    setInput("");
    setBusy(true);
    try {
      // Gemini expects Google-style contents:
      const messages = [
        { role: "user", parts: [{ text: `Scope: ${scope}.` }] },
        { role: "user", parts: [{ text }] },
      ];
      const { data } = await api.post("/ai/chat", { messages });
      setThread((t) => [...t, { who: "ai", text: data?.reply || "(no reply)" }]);
    } catch (e) {
      setThread((t) => [
        ...t,
        { who: "ai", text: "(Error contacting AI. Please try again.)" },
      ]);
    } finally {
      setBusy(false);
    }
  };

  // submit on Enter
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[1000] rounded-full px-5 py-3
                   bg-amber-400 hover:bg-amber-500 text-white font-bold shadow-md transition"
      >
        {open ? "Close AI" : "Chat with AI"}
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-5 z-[1000] w-[92vw] max-w-md rounded-2xl shadow-xl
                     border border-amber-300/50 p-4 backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.85)", // translucent white
          }}
        >
          <div className="mb-2 text-sm text-black/70">
            {/* header */}
            <b>iCanteen Assistant</b> — Ask about menu, orders, or help.
          </div>

          {/* thread */}
          <div
            className="h-64 overflow-y-auto rounded-lg p-3 mb-3 border"
            style={{ background: "rgba(255,255,255,0.7)", borderColor: "rgba(245, 158, 11, 0.4)" }}
          >
            {thread.map((m, i) => (
              <div
                key={i}
                className={`mb-2 ${m.who === "you" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-xl leading-snug ${
                    m.who === "you"
                      ? "bg-amber-300 text-black"
                      : "bg-white text-black border border-amber-200"
                  }`}
                  style={{ maxWidth: "85%" }}
                >
                  <span className="block text-xs opacity-70 mb-0.5">
                    {m.who === "you" ? "You" : "AI"}
                  </span>
                  <span className="whitespace-pre-wrap">{m.text}</span>
                </div>
              </div>
            ))}
            {busy && (
              <div className="text-left">
                <div className="inline-block px-3 py-2 rounded-xl bg-white text-black border border-amber-200">
                  <span className="block text-xs opacity-70 mb-0.5">AI</span>
                  <span>…</span>
                </div>
              </div>
            )}
          </div>

          {/* composer */}
          <div className="flex gap-2">
            <textarea
              className="flex-1 rounded-lg px-3 py-2 border focus:outline-none focus:ring-2
                         focus:ring-amber-400"
              style={{
                background: "rgba(255,255,255,0.9)",
                color: "#000", // black text
                borderColor: "rgba(245, 158, 11, 0.5)",
              }}
              rows={2}
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              onClick={send}
              disabled={busy}
              className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-500
                         text-orrange font-semibold disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
