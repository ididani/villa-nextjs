import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function RoomsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    {
      id: 1,
      name: "Double Room",
      images: [
        "../room2.jpg",
        "../room7.jpg",
        "../balcony.jpg",
        "../bath1.jpg",
      ],
      description:
        "Designed for couples or solo travelers, our Double Rooms offer a peaceful retreat with sea views and a private balcony with outdoor seating. Each room features a king-sized bed, 43-inch 4K TV, air conditioning, minibar with mini fridge, and a private bathroom for your comfort.",
      price: "Rates vary by season",
      amenities: [
        "King-sized bed",
        "Private bathroom",
        "Balcony with sea view & seating",
        "Air conditioning",
        "Mini fridge & minibar",
        "43'' 4K TV",
        "Wi-Fi",
      ],
    },
    {
      id: 2,
      name: "Triple Room",
      images: ["../room12.jpg", "../room4.jpg", "../bath5.jpg", "../sink1.jpg"],
      description:
        "Ideal for small groups or families, our Triple Rooms combine comfort and style. They feature a king-sized bed and a twin bed with garden views and access. Enjoy modern conveniences including a 43-inch 4K TV, air conditioning, minibar with mini fridge, and a wet bar with sink and counter space. Each room has its own private bathroom.",
      price: "Rates vary by season",
      amenities: [
        "King-sized bed + Twin bed",
        "Private bathroom",
        "Air conditioning",
        "Mini fridge & minibar",
        "Wet bar (sink & counter space)",
        "43'' 4K TV",
        "Wi-Fi",
      ],
    },
    {
      id: 3,
      name: "Double/Twin Room",
      images: [
        "../room3.jpg",
        "../room1.jpg",
        "../balcony.jpg",
        "../bath1.jpg",
      ],
      description:
        "Perfect for friends or couples, this flexible room can be arranged with one king-sized bed or two twin beds. Enjoy sea views from your private balcony, relax with a 43-inch 4K TV, and stay cool with air conditioning. Includes a minibar with mini fridge and a private bathroom.",
      price: "Rates vary by season",
      amenities: [
        "King-sized bed or 2 Twin beds",
        "Private bathroom",
        "Balcony with sea view & seating",
        "Air conditioning",
        "Mini fridge & minibar",
        "43'' 4K TV",
        "Wi-Fi",
      ],
    },
    {
      id: 4,
      name: "One-Bedroom Apartment",
      images: [
        "../room8.jpg",
        "../room5.jpg",
        "../room9.jpg",
        "../bath3.jpg",
      ],
      description:
        "A cozy option for 3–4 guests, this one-bedroom apartment offers a separate living room with sofa bed, dining area, and a small kitchen with cooking essentials, sink, and fridge. Step out onto your private balcony to enjoy sea views, or unwind indoors with a 43-inch 4K TV and air conditioning. Includes a private bathroom.",
      price: "Rates vary by season",
      amenities: [
        "One bedroom + Living room with sofa bed",
        "Small kitchen (sink, cooking area, fridge)",
        "Dining area",
        "Private bathroom",
        "Balcony with sea view & seating",
        "43'' 4K TV",
        "Air conditioning",
        "Wi-Fi",
      ],
    },
    {
      id: 5,
      name: "Deluxe Family Suite",
      images: [],
      description:
        "Perfect for large families or groups, this spacious 130m² suite accommodates up to 8 guests. It includes 3 king-sized beds, 2 twin beds, a sofa bed, and two private bathrooms. Enjoy a large living room with a 55-inch TV, a fully equipped kitchen, dining area, and multiple balconies with sea views and seating. Designed for comfort, style, and complete privacy.",
      price: "Rates vary by season",
      amenities: [
        "3 King-sized beds + 2 Twin beds + Sofa bed",
        "2 Private bathrooms",
        "Large living room (55'' TV)",
        "Fully equipped kitchen",
        "Dining area",
        "Balcony with sea view & seating",
        "Air conditioning",
        "Wi-Fi",
        "130m² total space",
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
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <section id="rooms" className="w-full bg-gray-100 py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 tracking-wide text-gray-900">
        Our Rooms
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:px-20 px-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transform transition duration-300 hover:-translate-y-1"
            onClick={() => openModal(room)}
          >
            {room.images.length > 0 ? (
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                Photos Coming Soon
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 text-center font-manrope">
                {room.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {isOpen && selectedRoom && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white w-full h-full md:h-auto md:rounded-2xl max-w-6xl overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Layout */}
            <div className="md:hidden flex-1 overflow-y-auto">
              {/* Sticky Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
              >
                ✕
              </button>

              {/* Image Carousel */}
              {selectedRoom.images.length > 0 ? (
                <Swiper spaceBetween={0} slidesPerView={1}>
                  {selectedRoom.images.map((src, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={src}
                        alt={`${selectedRoom.name} ${index + 1}`}
                        className="w-full h-[60vh] object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-[60vh] bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  Photos Coming Soon
                </div>
              )}

              {/* Room Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">{selectedRoom.name}</h3>
                <p className="text-gray-700 mb-4">{selectedRoom.description}</p>
                <p className="text-md font-semibold text-red-600 mb-6">
                  {selectedRoom.price}
                </p>

                <h4 className="font-semibold mb-3">Amenities:</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  {selectedRoom.amenities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop Layout (unchanged) */}
            <div className="hidden md:grid md:w-2/3 grid-cols-2 gap-4 p-6 max-h-[90vh] overflow-y-auto">
              {selectedRoom.images.length > 0 ? (
                selectedRoom.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`${selectedRoom.name} ${index + 1}`}
                    className="w-full rounded-lg object-cover aspect-[4/3] shadow-md"
                    loading="lazy"
                  />
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center bg-gray-100 text-gray-500 h-64 rounded-lg text-lg font-medium">
                  Photos Coming Soon
                </div>
              )}
            </div>

            <div className="hidden md:flex md:w-1/3 p-8 flex-col overflow-y-auto max-h-[90vh] border-l border-gray-200">
              <h3 className="text-3xl font-bold mb-4">{selectedRoom.name}</h3>
              <p className="text-gray-700 mb-4">{selectedRoom.description}</p>
              <p className="text-md font-semibold mb-6 text-red-600">
                {selectedRoom.price}
              </p>
              <h4 className="font-semibold text-gray-800 mb-3">Amenities:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                {selectedRoom.amenities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <button
                onClick={closeModal}
                className="mt-auto self-center bg-black text-white rounded-full px-8 py-3 hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
