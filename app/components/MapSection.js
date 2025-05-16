export default function MapSection() {
  return (
    <section id="map" className="w-full p-8 md:p-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Find Us
      </h2>
      <div className="w-full h-80 md:h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3063.651939570334!2d20.017412078760845!3d39.83721935663721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b14ffafac5431%3A0xd6d55e7e08a21910!2sSarand%C3%AB%2C%20Albania!5e0!3m2!1sen!2s!4v1747405804550!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <a
        href="https://wa.me/+355692091321"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-green-600"
      >
        Chat with us on WhatsApp
      </a>
    </section>
  );
}
