import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        {/* Contact Information */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-2xl font-semibold mb-2">Villa Didani</h3>
          <p className="text-sm">Where every sunrise is a show.</p>
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
        <p>© 2025 Villa Didani. All rights reserved.</p>
      </div>
    </footer>
  );
}
