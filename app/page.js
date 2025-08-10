import Home from "./Home";

export const metadata = {
  title: "The Didani Villa |  Coastal Retreat in Saranda, Albania",
  description:
    "Discover The Didani Villa, your coastal escape nestled in a peaceful hill between Saranda and Ksamil. Enjoy sea views, proximity to some of Albania's best beaches, and a tranquil vibe perfect for relaxing getaways.",
  keywords: [
    "Didani Villa",
    "Luxury villa Albania",
    "Albanian vacation rental",
    "Sea view rooms",
    "Family suites",
    "Holiday booking",
  ].join(", "),
  authors: [{ name: "Ilirjana Didani", url: "https://duadev.al" }],
  creator: "Ilirjana Didani",
  publisher: "DuaDev",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: "The Didani Villa | Coastal Retreat in Saranda, Albania",
    description:
      "Escape to The Didani Villa, your dream getaway featuring sea views, elegant rooms, and top-notch amenities. Book your stay now!",
    url: "https://thedidanivilla.al",
    siteName: "The Didani Villa",
    images: [
      {
        url: "/images/room12.jpg",
        width: 1200,
        height: 630,
        alt: "The Didani Villa Sea View Rooms",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function Page() {
  return <Home />;
}
