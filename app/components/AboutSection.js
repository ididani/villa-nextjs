import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

export default function AboutSection() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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

  return (
    <main>
      {/* About Section */}
      <section
        id="about"
        className="p-8 md:p-16 max-w-4xl mx-auto text-center flex flex-col items-center"
      >
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
    </main>
  );
}
