export default function MapSection() {
  const lat = 39.8360625;
  const lon = 20.0195625;
  const zoom = 15;
 const src = `https://www.openstreetmap.org/export/embed.html?bbox=${
    lon - 0.01
  }%2C${lat - 0.01}%2C${lon + 0.01}%2C${
    lat + 0.05
  }&layer=mapnik&marker=${lat}%2C${lon}`;
  return (
    <section id="location" className="w-full px-6 py-16 md:px-16 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Find Us
      </h2>
      <div className="relative w-full h-80 md:h-[500px] rounded-2xl shadow-lg overflow-hidden">
        <iframe
          title="Map"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
        />
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow">
          <h3 className="font-semibold">The Didani Villa</h3>
          <p className="text-sm text-gray-600">Sarande, Albania</p>
        </div>
      </div>
      <a
        href="https://wa.me/+355685526714"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-25 right-6 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-green-600 flex items-center justify-center"
      >
        {/* Icon only visible on mobile & tablet */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          className="w-6 h-6 block lg:hidden"
          aria-hidden="true"
          viewBox="0 0 640 640"
        >
          <path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" />
        </svg>

        {/* Text only visible on large screens and above */}
        <span className="hidden lg:block font-semibold">
          Chat with us on WhatsApp
        </span>
      </a>
    </section>
  );
}
