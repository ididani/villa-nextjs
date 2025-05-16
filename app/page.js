"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { loadStripe } from "@stripe/stripe-js";
import "./globals.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const images = [
    { src: "../room-placeholder.jpg", title: "Photo 1" },
    { src: "../room-placeholder.jpg", title: "Photo 2" },
    { src: "../room-placeholder.jpg", title: "Photo 3" },
    { src: "../room-placeholder.jpg", title: "Photo 4" },
    { src: "../room-placeholder.jpg", title: "Photo 5" },
    { src: "../room-placeholder.jpg", title: "Photo 6" },
    { src: "../room-placeholder.jpg", title: "Photo 7" },
    { src: "../room-placeholder.jpg", title: "Photo 8" },
    // ...add up to 15 image URLs here
  ];

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const rooms = [
    {
      id: 1,
      name: "Couple Room",
      images: [
        "../room-placeholder.jpg", // Large image
        "../room-placeholder.jpg", // Smaller image
        "../room-placeholder.jpg", // Landscape image
      ],
      description:
        "Just need a clean, comfy spot to crash after a beach day? Our Cozy Rooms are simple but solid — perfect if you’re not planning to spend much time indoors.",
      price: "Starting from 40€ per night",
      amenities: [
        "King-sized bed",
        "Private bathroom",
        "Shared balcony",
        "Air Conditioning",
        "Mini fridge",
        "Crib (On request)",
      ],
    },
    {
      id: 2,
      name: "Family Room",
      images: [
        "../room-placeholder.jpg", // Large image
        "../room-placeholder.jpg", // Smaller image
        "../room-placeholder.jpg", // Landscape image
      ],
      description:
        "Ideal for a small family, the Family Room comes with one bedroom and one private bathroom. Small and cozy, it has everything you need for a quick getaway.",
      price: "Starting from 50€ per night",
      amenities: [
        "King-sized bed + Twin bed",
        "Private bathroom",
        "Shared balcony",
        "Air Conditioning",
        "Mini fridge",
        "Crib (On request)",
      ],
    },
    {
      id: 3,
      name: "Mini Apartment",
      images: [
        "../room-placeholder.jpg", // Large image
        "../room-placeholder.jpg", // Smaller image
        "../room-placeholder.jpg", // Landscape image
      ],
      description:
        "Our Mini Apartments come with a living room and a kitchen, so you can cook, hang out, and feel more at home. Great for couples, small groups, or anyone staying more than a night or two.",
      price: "Starting from 80€ per night",
      amenities: [
        "Bedroom + Living Room",
        "Kitchen with all the basics",
        "Wi-Fi",
        "Private Bathroom",
        "Air Conditioning",
        "Big fridge",
        "Crib (On request)",
      ],
    },
  ];

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRoom(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const [formData, setFormData] = useState({
    room: "",
    email: "",
    name: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedRoom = roomOptions.find((r) => r.value === formData.room);
    if (!selectedRoom) {
      alert("Please select a valid room");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: selectedRoom.label,
          price: selectedRoom.price,
          email: formData.email,
        }),
      });

      const data = await res.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const roomOptions = [
    { value: "room1", label: "Couple Room" },
    { value: "room2", label: "Family Room" },
    { value: "room3", label: "Mini Apartment" },
  ];
  const basePrices = {
    room1: 40, // Couple Room
    room2: 50, // Family Room
    room3: 80, // Mini Apartment
  };

  const seasonalMultipliers = {
    low: 0.8,
    regular: 1,
    high: 1.3,
  };

  const getSeason = (date) => {
    const month = new Date(date).getMonth() + 1;
    if (month >= 6 && month <= 8) return "high";
    if ([4, 5, 9].includes(month)) return "regular";
    return "low";
  };

  function calculatePrice(room, checkIn, checkOut) {
    if (!room || !checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    if (diffTime <= 0) return 0; // invalid date range

    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // Calculate price day by day (in case season changes within stay)
    let totalPrice = 0;
    for (let i = 0; i < diffDays; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(currentDate.getDate() + i);
      const season = getSeason(currentDate);
      totalPrice += basePrices[room] * seasonalMultipliers[season];
    }

    return totalPrice.toFixed(2);
  }

  const price = calculatePrice(
    formData.room,
    formData.checkIn,
    formData.checkOut
  );

  return (
    <main className="pt-16 flex flex-col items-center">
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex flex-col justify-center items-center bg-cover bg-center text-center px-4"
        style={{ backgroundImage: "url('../main-img.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Text content */}
        <div className="relative z-10">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
            Welcome to Villa Didani
          </h1>
          <p className="text-white text-lg md:text-2xl mt-4">
            Where hidden coastlines and chill mornings meet
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="p-8 md:p-16 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
        <p className="text-gray-600 text-base md:text-md leading-relaxed">
          Chill out in our little corner between Saranda and Ksamil — it’s
          peaceful, lowkey, and just minutes from some of the best beaches
          around. Whether you’re here to tan, explore, or totally unplug, we’ve
          got a stay that fits your vibe.
        </p>
        <p className="text-gray-600 text-base md:text-md leading-relaxed">
          Every room comes with <strong>free Wi-Fi</strong>,{" "}
          <strong>air conditioning</strong>, a <strong>private bathroom</strong>
          , a <strong>balcony or outdoor space</strong>,{" "}
          <strong>free parking</strong>, <strong>laundry</strong> for a small
          fee, and <strong>self check-in</strong> — so you’re fully set whether
          you’re here for a weekend or a whole week. There is also shared
          outdoor hangout areas with a <strong>BBQ grill</strong> and some chill
          seating.{" "}
        </p>
      </section>

      {/* Gallery Section */}
      <section className="max-w-8xl mx-auto p-4">
        <div className="gallery-grid flex flex-wrap gap-4 justify-center">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.title}
              onClick={() => {
                setPhotoIndex(i);
                setIsGalleryOpen(true);
              }}
              style={{
                cursor: "pointer",
                width: i % 3 === 0 ? "300px" : "150px", // just an example of varying sizes
                margin: "5px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>

        <Lightbox
          open={isGalleryOpen}
          close={() => setIsGalleryOpen(false)}
          slides={images}
          index={photoIndex}
          onIndexChange={setPhotoIndex}
        />
      </section>

      {/*Rooms Section*/}
      <section id="gallery" className="p-8 md:p-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Our Rooms
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="cursor-pointer"
              onClick={() => openModal(room)}
            >
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <h3 className="text-center mt-4 text-lg font-semibold">
                {room.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Modal Popup */}
        {isOpen && selectedRoom && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleOverlayClick} // Close modal when clicking outside
          >
            <div
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full flex shadow-lg"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              {/* Image Gallery on the Left */}
              <div className="w-2/3 p-4 flex flex-col">
                <div className="flex flex-col h-full">
                  <div className="flex-1 mb-4">
                    {/* Big image on top left */}
                    <img
                      src={selectedRoom.images[0]}
                      alt={`${selectedRoom.name} Main`}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="flex gap-4">
                    {/* Two smaller images stacked on the right */}
                    <div className="w-1/2">
                      <img
                        src={selectedRoom.images[1]}
                        alt={`${selectedRoom.name} Extra 1`}
                        className="w-full h-32 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="w-1/2">
                      <img
                        src={selectedRoom.images[2]}
                        alt={`${selectedRoom.name} Extra 2`}
                        className="w-full h-32 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Info on the Right */}
              <div className="w-1/3 p-6 overflow-y-auto max-h-[90vh]">
                <h3 className="text-2xl font-semibold">{selectedRoom.name}</h3>
                <p className="text-gray-600 mt-4">{selectedRoom.description}</p>
                <div className="mt-6">
                  <p className="price-tag">{selectedRoom.price}</p>
                  <p className="mt-2">
                    <span className="font-semibold">Amenities:</span>
                    <ul className="list-disc pl-6 mt-2">
                      {selectedRoom.amenities.map((amenity, index) => (
                        <li key={index} className="text-sm">
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Map Section */}
      <section id="map" className="w-full p-8 md:p-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Find Us
        </h2>
        <div className="w-full h-80 md:h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d765.5069008919999!2d20.001127075623877!3d39.87361959363318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b14fc1dde0009%3A0xefc5bb4cdc9c42f!2sMobileri%20Miri!5e0!3m2!1sen!2s!4v1745837193785!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <a
          href="https://wa.me/YOURNUMBER"
          target="_blank"
          className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-green-600"
        >
          Chat with us on WhatsApp
        </a>
      </section>

      {/* Booking Section */}
      <section
        id="booking"
        className="p-8 md:p-16 w-full max-w-2xl text-center"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Book Your Stay</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-left">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-left">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-left">
              Number of Guests
            </label>
            <input
              type="number"
              name="guests"
              required
              min={1}
              max={5}
              value={formData.guests}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-left">
              Choose Room
            </label>
            <select
              name="room"
              required
              value={formData.room}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            >
              <option value="">Select a room</option>
              {roomOptions.map((room) => (
                <option key={room.value} value={room.value}>
                  {room.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-left">
                Check-in
              </label>
              <input
                type="date"
                name="checkIn"
                required
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-left">
                Check-out
              </label>
              <input
                type="date"
                name="checkOut"
                required
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
          </div>

          {price > 0 && (
            <p className="text-lg font-bold">Total price: €{price}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white font-semibold rounded-md ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Processing..." : "Book Now"}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
          {/* Contact Information */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-2">Villa Didani</h3>
            <p className="text-sm">Where every sunrise is a show.</p>
            <p className="mt-4 text-sm">
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:info@sarandavillas.com"
                className="text-blue-400 hover:text-blue-500"
              >
                info@sarandavillas.com
              </a>
            </p>
            <p className="mt-2 text-sm">
              <span className="font-semibold">Phone:</span> +355 69 123 4567
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center md:justify-end gap-6 mb-6 md:mb-0">
            <a
              href="https://www.instagram.com/sarandavillas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-gray-400 transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} /> {/* Instagram Icon */}
            </a>
            <a
              href="https://www.facebook.com/sarandavillas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-gray-400 transition-colors"
            >
              <FontAwesomeIcon icon={faFacebookSquare} /> {/* Facebook Icon */}
            </a>
            <a
              href="https://twitter.com/sarandavillas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-white hover:text-gray-400 transition-colors"
            >
              <FontAwesomeIcon icon={faTwitter} /> {/* Twitter Icon */}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-sm">
          <p>© 2025 Villa Didani. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
