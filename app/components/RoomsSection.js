import { useState } from "react";

export default function RoomsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

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
  return (
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
  );
}
