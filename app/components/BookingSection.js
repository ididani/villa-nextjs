import { useState } from "react";

export default function BookingSection() {
 
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
    <section id="booking" className="p-8 md:p-16 w-full max-w-2xl text-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Your Stay</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-left">Full Name</label>
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
            <label className="block mb-1 font-medium text-left">Check-in</label>
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
  );
}
