// Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const [activePage, setActivePage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pages = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "services", name: "Services" },
    { id: "contact", name: "Contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-lg p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://placehold.co/40x40"
              alt="Company logo"
              className="mr-2"
            />
            <span className="text-xl font-bold text-gray-800">QuickLink</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {pages.map((page) => (
              <Link
                key={page.id}
                to={`/${page.id}`}
                className={`text-lg font-semibold ${
                  activePage === page.id ? "text-pink-600" : "text-gray-800"
                } hover:text-pink-600 transition-colors duration-300`}
                onClick={() => setActivePage(page.id)}
              >
                {page.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden p-2" onClick={toggleMobileMenu}>
            <img
              src="https://placehold.co/24x24"
              alt={`${isMobileMenuOpen ? "Close" : "Open"} mobile menu`}
            />
          </button>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-md z-50">
              <ul className="flex flex-col">
                {pages.map((page) => (
                  <li key={page.id}>
                    <Link
                      to={`/${page.id}`}
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                        activePage === page.id ? "font-semibold" : ""
                      }`}
                      onClick={() => {
                        setActivePage(page.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        {activePage === "home" && (
          <div className="text-center py-20">
            <h1 className="text-5xl font-extrabold text-white mb-4">
              Welcome to QuickLink
            </h1>
            <p className="text-2xl text-white mb-8">
              Create short, memorable URLs in seconds
            </p>
            <Link
              to="/services"
              className="bg-yellow-500 text-black px-8 py-3 rounded-full text-xl font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        )}

        {/* Other content sections... */}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-8 text-center mt-auto">
        <p className="text-lg">Contact us at info@yourplatform.com</p>
        <p className="mt-4 text-md">
          Follow us on{" "}
          <a href="#" className="hover:text-yellow-300">
            Facebook
          </a>
          ,{" "}
          <a href="#" className="hover:text-yellow-300">
            Twitter
          </a>
          ,{" "}
          <a href="#" className="hover:text-yellow-300">
            LinkedIn
          </a>
        </p>
        <p className="mt-4 text-md">
          <Link to="/privacy-policy" className="hover:text-yellow-300">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/terms-of-service" className="hover:text-yellow-300">
            Terms of Service
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;
