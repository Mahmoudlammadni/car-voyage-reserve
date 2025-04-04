
import React from "react";
import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold flex items-center">
              <Car className="mr-2 h-6 w-6 text-skyblue" />
              <span className="text-white">Luxe<span className="text-skyblue">Drive</span></span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Premium car rental service offering a fleet of luxury vehicles for an unforgettable driving experience.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-skyblue">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-skyblue">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-skyblue">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-skyblue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-300 hover:text-skyblue transition-colors">
                  Cars
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-skyblue transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-skyblue transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Car Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cars?category=SUV" className="text-gray-300 hover:text-skyblue transition-colors">
                  SUV
                </Link>
              </li>
              <li>
                <Link to="/cars?category=Sedan" className="text-gray-300 hover:text-skyblue transition-colors">
                  Sedan
                </Link>
              </li>
              <li>
                <Link to="/cars?category=Sports" className="text-gray-300 hover:text-skyblue transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/cars?category=Electric" className="text-gray-300 hover:text-skyblue transition-colors">
                  Electric
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">1234 Luxury Lane</p>
              <p className="mb-2">Beverly Hills, CA 90210</p>
              <p className="mb-2">+1 (800) 123-4567</p>
              <p className="mb-2">contact@luxedrive.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} LuxeDrive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
