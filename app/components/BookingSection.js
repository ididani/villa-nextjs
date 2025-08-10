"use client";

import { useState, useEffect } from "react";

const rooms = [
  { id: "double", name: "Double Room", maxGuests: 2 },
  { id: "double-twin", name: "Double/Twin Room", maxGuests: 2 },
  { id: "suite", name: "Deluxe Family Suite", maxGuests: 8 },
  { id: "triple", name: "Triple Room", maxGuests: 3 },
  { id: "one-bedroom-apartment", name: "One-bedroom Apartment", maxGuests: 4 },
];

export default function BookingSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    room: "",
    guests: 1,
    checkIn: "",
    checkOut: "",
    requests: "",
  });

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Today in YYYY-MM-DD for min date on inputs
  const todayISO = new Date().toISOString().split("T")[0];

  // Min checkout = checkIn + 1 day
  const getMinCheckout = () => {
    if (!form.checkIn) return todayISO;
    const checkInDate = new Date(form.checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return checkInDate.toISOString().split("T")[0];
  };

  // Clamp guests to max of selected room when room changes
  useEffect(() => {
    if (form.room) {
      const roomMax = rooms.find((r) => r.id === form.room)?.maxGuests || 6;
      if (form.guests > roomMax) {
        setForm((prev) => ({ ...prev, guests: roomMax }));
      }
    }
  }, [form.room]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "guests") {
      let num = Number(value);
      if (num < 1) num = 1;
      const maxGuests = form.room
        ? rooms.find((r) => r.id === form.room)?.maxGuests
        : 6;
      if (num > maxGuests) num = maxGuests;
      setForm((prev) => ({ ...prev, guests: num }));
      return;
    }

    if (name === "checkIn") {
      setForm((prev) => ({
        ...prev,
        checkIn: value,
        checkOut:
          prev.checkOut && new Date(prev.checkOut) <= new Date(value)
            ? ""
            : prev.checkOut,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Basic required fields check
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.room ||
      !form.checkIn ||
      !form.checkOut
    ) {
      setMessage("Fill out all required fields, please.");
      return;
    }

    // Simple email regex
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    // Basic phone validation
    if (!/^\+?[\d\s-]{6,}$/.test(form.phone)) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    const now = new Date(todayISO);
    const checkInDate = new Date(form.checkIn);
    const checkOutDate = new Date(form.checkOut);

    if (checkInDate < now) {
      setMessage("Check-in date can't be in the past.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setMessage("Check-out must be after check-in.");
      return;
    }

    const selectedRoom = rooms.find((r) => r.id === form.room);
    if (form.guests > selectedRoom.maxGuests) {
      setMessage(
        `Max guests for ${selectedRoom.name}: ${selectedRoom.maxGuests}`
      );
      return;
    }

    // Prepare FormData for Formspree
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      const response = await fetch("https://formspree.io/f/xpwlkqro", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        setMessage("Request sent! We'll contact you soon.");
      } else {
        setMessage("Failed to send request. Please try again.");
      }
    } catch {
      setMessage("Oops! Something went wrong. Try again.");
    }
  };

  return (
    <section
      id="booking"
      className="bg-gray-100 text-black px-6 py-16 md:py-20 w-full"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 tracking-wide font-menrope">
          Book Your Stay
        </h2>
        <p className="text-center text-gray-600 mb-10 font-menrope">
          Fill out the form below and we’ll get back to you with availability
          and rates.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 md:p-10 space-y-6 text-base leading-relaxed font-menrope"
          noValidate
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Full Name *
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                disabled={submitted}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={submitted}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Phone Number *
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              disabled={submitted}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Room *
            </label>
            <select
              name="room"
              value={form.room}
              onChange={handleChange}
              required
              disabled={submitted}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="">Select Room Type</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} (max {r.maxGuests})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Number of Guests *
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max={
                form.room ? rooms.find((r) => r.id === form.room)?.maxGuests : 6
              }
              value={form.guests}
              onChange={handleChange}
              required
              disabled={submitted}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Check-in Date *
              </label>
              <input
                id="checkIn"
                name="checkIn"
                type="date"
                min={todayISO}
                value={form.checkIn}
                onChange={handleChange}
                required
                disabled={submitted}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Check-out Date *
              </label>
              <input
                id="checkOut"
                name="checkOut"
                type="date"
                min={getMinCheckout()}
                value={form.checkOut}
                onChange={handleChange}
                required
                disabled={submitted || !form.checkIn}
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Special Requests
            </label>
            <textarea
              name="requests"
              value={form.requests}
              onChange={handleChange}
              rows="3"
              disabled={submitted}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          {message && (
            <p
              className={`text-center font-medium ${
                submitted ? "text-green-600" : "text-red-500"
              }`}
              role="alert"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={submitted}
            className="w-full bg-black text-white cursor-pointer font-semibold py-3 px-6 rounded-md hover:bg-neutral-800 transition disabled:opacity-60"
          >
            {submitted ? "Request Sent" : "Send Booking Request"}
          </button>
        </form>
      </div>
    </section>
  );
}
