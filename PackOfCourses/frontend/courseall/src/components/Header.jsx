import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-r from-indigo-800 via-purple-600 to-indigo-800 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center text-white px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/041/041/408/non_2x/tuition-logo-icon-brand-identity-sign-symbol-template-vector.jpg"
            alt="Logo"
            className="w-14 h-14 mr-3 rounded-full border-2 border-white"
          />
          <h1 className="text-3xl font-bold tracking-wide hover:scale-105 transition-transform duration-300">
            SD Tuition
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-8 text-lg font-medium mr-28">
          <a
            href="/"
            className="hover:text-yellow-300 hover:underline underline-offset-4 transition duration-300"
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-yellow-300 hover:underline underline-offset-4 transition duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-yellow-300 hover:underline underline-offset-4 transition duration-300"
          >
            Contact
          </a>
        </nav>

        {/* Call to Action */}
        <div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-yellow-400 text-indigo-900 font-semibold rounded-lg hover:bg-yellow-500 shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
