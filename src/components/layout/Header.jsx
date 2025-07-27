import React from "react";
import { Plane } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-normal text-gray-900">
              Google <span className="text-blue-600">Flights</span>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4"
            >
              Flights
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-4">
              Hotels
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 pb-4">
              Things to do
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
