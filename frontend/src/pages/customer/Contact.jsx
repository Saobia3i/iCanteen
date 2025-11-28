// src/pages/customer/Contact.jsx
import React, { useState } from "react";

import api from "../../lib/api";
import { message } from "antd";
import BackButton from "../../components/BackButton"
export default function Contact() {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/contact", form);
      message.success("Thanks! Your message has been sent.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("CONTACT_ERR", err?.response?.data || err);
      message.error(err?.response?.data?.message || "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    
    <div
      className="min-h-[100vh] w-full relative"
      
     style={{
    backgroundImage: "url('https://ik.imagekit.io/ekb0d0it0/assets/ibg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  }}

      
    >
      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <BackButton />
      </div>


      {/* DARK OVERLAY to dim the background image */}
      <div className="absolute inset-0 bg-black/45" />
          
      {/* content */}
      <div className="relative z-10 w-full px-4 lg:px-10 py-10 flex flex-col items-center">
        {/* Contact panel with frosted background */}
        <div className="w-full max-w-3xl rounded-2xl shadow-xl border border-white/30
                        bg-white/75 backdrop-blur-md p-6 lg:p-8">
          <h1 className="text-3xl font-extrabold text-[#111] mb-2">Contact Us</h1>
          <p className="text-[#222] mb-6">
            Have a question or feedback? Send us a message — we’d love to hear from you.
          </p>

          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#111] mb-1">Your Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-black/15 px-3 py-2
                             bg-white text-[#111] placeholder-slate-500 caret-amber-500
                             focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="e.g. Alex Johnson"
                /> 
              </div>
              <div>
                <label className="block text-sm text-[#111] mb-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full rounded-lg border border-black/15 px-3 py-2
                             bg-white text-[#111] placeholder-slate-500 caret-amber-500
                             focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#111] mb-1">Subject (optional)</label>
              <input
                name="subject"
                value={form.subject}
                onChange={onChange}
                className="w-full rounded-lg border border-black/15 px-3 py-2
                           bg-white text-[#111] placeholder-slate-500 caret-amber-500
                           focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="What’s this about?"
              />
            </div>

            <div>
              <label className="block text-sm text-[#111] mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                required
                rows={5}
                className="w-full rounded-lg border border-black/15 px-3 py-2
                           bg-white text-[#111] placeholder-slate-500 caret-amber-500
                           focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Write your message here…"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn w-full sm:w-auto bg-[#FFB347] border-none rounded-full font-bold px-6 py-2
                         hover:brightness-95 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="h-10" />

        {/* Google Form block also on frosted white */}
        <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-white/30
                        bg-white/80 backdrop-blur-md p-4">
          <h2 className="text-2xl font-extrabold text-[#111] mb-3 text-center">
            Customer Feedback
          </h2>
          <div className="relative pb-[130%] sm:pb-[100%] lg:pb-[75%] h-0 overflow-hidden rounded-xl">
            <iframe
              title="iCanteen Customer Feedback"
              src="https://docs.google.com/forms/d/e/1FAIpQLSesArGGA0xY1agS1wl5guTZB6aou1a3myMH70j4KxTGyvk7cA/viewform?embedded=true"
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
