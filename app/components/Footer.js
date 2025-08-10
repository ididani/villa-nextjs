import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
  <footer className="w-full bg-black text-white py-6">
  <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
    
    {/* Contact Information - first */}
    <div className="text-center md:text-left mb-6 md:mb-0 order-1">
      <h3 className="text-2xl font-semibold mb-2">The Didani Villa</h3>
      <p className="text-sm">Where every sunset is a show.</p>
    </div>

    {/* Copyright - second */}
    <div className="text-center mt-6 text-sm order-last md:order-2 md:mt-0">
      <p>© 2025 The Didani Villa. All rights reserved.</p>
    </div>

    {/* Social Media Links - last */}
    <div className="flex flex-col justify-center md:justify-end mb-6 md:mb-0 order-3">
      <p className="mt-4 text-sm">
        <span className="font-semibold">Email:</span>{" "}
        <a
          href="mailto:thedidanivilla@gmail.com"
          className="text-blue-400 hover:text-blue-500"
        >
          thedidanivilla@gmail.com
        </a>
      </p>
      <p className="mt-2 text-sm">
        <span className="font-semibold">Phone:</span> +355 68 552 6714
      </p>
    </div>
    
  </div>
</footer>

  );
}
