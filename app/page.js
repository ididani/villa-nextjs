"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    {
      id: 1,
      name: "Seaview Suite",
      images: [
        "../room-placeholder.jpg", // Large image
        "../room-placeholder.jpg", // Smaller image
        "../room-placeholder.jpg", // Landscape image
      ],
      description:
        "Our Seaview Suite offers an incredible panoramic view of the Adriatic Sea. Enjoy the luxury of space with a king-size bed, a private balcony, and modern amenities.",
      price: "200€/night",
      amenities: [
        "King-size bed",
        "Private Balcony",
        "Sea View",
        "Wi-Fi",
        "Air Conditioning",
      ],
    },
    {
      id: 2,
      name: "Garden Room",
      images: [
        "../room-placeholder.jpg", // Large image
        "../room-placeholder.jpg", // Smaller image
        "../room-placeholder.jpg", // Landscape image
      ],
      description:
        "The Garden Room is perfect for those looking for a peaceful and nature-filled stay. Relax in our cozy room surrounded by beautiful gardens.",
      price: "120€/night",
      amenities: [
        "Double Bed",
        "Garden View",
        "Wi-Fi",
        "Air Conditioning",
        "Mini Fridge",
      ],
    },
    {
      id: 3,
      name: "Family Apartment",
      images: [
        "../room-placeholder.jpg", // Large image
        "../room-placeholder.jpg", // Smaller image
        "../room-placeholder.jpg", // Landscape image
      ],
      description:
        "Ideal for families, the Family Apartment comes with two bedrooms, a fully equipped kitchen, and a spacious living room. Perfect for a relaxing family vacation.",
      price: "250€/night",
      amenities: ["Two Bedrooms", "Living Room", "Kitchen", "Wi-Fi", "Balcony"],
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

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section
        className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-center text-center px-4"
        style={{ backgroundImage: "url('../main-img.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text content */}
        <div className="relative z-10">
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
            Welcome to Saranda Villas 🌊
          </h1>
          <p className="text-white text-lg md:text-2xl mt-4">
            Experience luxury by the sea
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="p-8 md:p-16 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Nestled in beautiful Saranda, our villas offer comfort, stunning
          views, and easy access to the beach. Perfect for families, couples,
          and friends seeking a memorable escape.
        </p>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="p-8 md:p-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Our Rooms
        </h2>

        {/* Gallery */}
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
                  <p className="font-semibold">Price: {selectedRoom.price}</p>
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
      </section>

      {/* Booking Section */}
      <section
        id="booking"
        className="p-8 md:p-16 w-full max-w-2xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Book Your Stay</h2>
        <p className="text-gray-600 text-base md:text-lg mb-8">
          Fill out the form and we will get back to you shortly!
        </p>

        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Room Type Selection */}
          <select
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Room Type</option>
            <option value="seaview">Seaview Suite</option>
            <option value="garden">Garden Room</option>
            <option value="family">Family Apartment</option>
          </select>

          {/* Arrival and Departure Date */}
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="date"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              required
            />
            <input
              type="date"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              required
            />
          </div>

          {/* Pickup Request */}
          <div className="flex items-center gap-4">
            <input type="checkbox" id="pickup" className="h-5 w-5" />
            <label htmlFor="pickup" className="text-gray-600">
              I need a pickup from the bus station
            </label>
          </div>

          {/* Car Availability */}
          <div className="flex items-center gap-4">
            <input type="checkbox" id="car" className="h-5 w-5" />
            <label htmlFor="car" className="text-gray-600">
              I will have a car during my stay
            </label>
          </div>

          {/* Additional Message */}
          <textarea
            placeholder="Additional Details (optional)"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Send Booking Request
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
          {/* Contact Information */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-2">Saranda Villas</h3>
            <p className="text-sm">Experience luxury by the sea</p>
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
          <p>© 2025 Saranda Villas. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
