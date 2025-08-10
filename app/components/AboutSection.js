import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = [
    { src: "/room2.jpg", title: "Photo 1" },
    { src: "/room12.jpg", title: "Photo 2" },
    { src: "/room3.jpg", title: "Photo 3" },
    { src: "/room8.jpg", title: "Photo 5" },
    { src: "/bath2.jpg", title: "Photo 6" },
    { src: "/bath4.jpg", title: "Photo 7" },
    { src: "/key.jpg", title: "Photo 8" },
    { src: "/sink1.jpg", title: "Photo 9" },
    { src: "/sunset.jpg", title: "Photo 10" },
    { src: "/room11.jpg", title: "Photo 11" },
    { src: "/bath1.jpg", title: "Photo 12" },
    { src: "/room9.jpg", title: "Photo 14" },
  ];

  return (
    <main>
      {/* About Section */}
      <section
        id="about"
        className="px-6 py-12 sm:px-10 md:px-16 max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
         About Us
        </h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
          Tucked between Saranda and Ksamil, our villa is your peaceful summer
          escape. With stunning sunsets, quiet surroundings, and beaches just
          minutes away, it’s the perfect place to unwind.
        </p>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          All rooms include <strong>air conditioning</strong>,{" "}
          <strong>private bathrooms</strong>,{" "}
          <strong>balconies or outdoor seating</strong>,{" "}
          <strong>free Wi-Fi</strong>, <strong>free parking</strong>, and{" "}
          <strong>self check-in</strong>. You&apos;ll also find shared chill zones
          with comfy spots to relax. Laundry&apos;s available for a small fee.
        </p>
      </section>

      {/* Masonry Gallery Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative w-full overflow-hidden rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{
                height: i % 5 === 0 ? 300 : i % 3 === 0 ? 220 : 150, // random-like heights
              }}
              onClick={() => {
                setPhotoIndex(i);
                setIsGalleryOpen(true);
              }}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={i < 4}
              />
            </div>
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
    </main>
  );
}
