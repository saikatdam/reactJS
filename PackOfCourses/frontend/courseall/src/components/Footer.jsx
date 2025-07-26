import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* About Us Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">About Us</h2>
          <p className="text-gray-400">
            SD Tuition is committed to providing top-notch online courses to help you excel in your career. Learn from industry experts and unlock new opportunities!
          </p>
          <img
            src="https://static.vecteezy.com/system/resources/previews/041/041/408/non_2x/tuition-logo-icon-brand-identity-sign-symbol-template-vector.jpg"
            alt="Logo"
            className="mt-4 w-16 h-16"
          />
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-yellow-400 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-yellow-400 transition duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-yellow-400 transition duration-300"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-yellow-400 transition duration-300"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <p className="text-gray-400 mb-4">
            Stay connected with us on social media for updates and new courses.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-white transition duration-300"
            >
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-white transition duration-300"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-pink-500 hover:text-white transition duration-300"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 hover:text-white transition duration-300"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-400">
            <i className="fas fa-map-marker-alt mr-2"></i> Kolkata, India
          </p>
          <p className="text-gray-400">
            <i className="fas fa-envelope mr-2"></i>{" "}
            <a
              href="mailto:info@sdtuition.com"
              className="hover:text-yellow-400 transition duration-300"
            >
              info@sdtuition.com
            </a>
          </p>
          <p className="text-gray-400">
            <i className="fas fa-phone-alt mr-2"></i>{" "}
            <a
              href="tel:+91000000080"
              className="hover:text-yellow-400 transition duration-300"
            >
              +910000000080
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SD Tuition. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
