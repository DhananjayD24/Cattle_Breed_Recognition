import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 fixed w-full z-50 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Always visible Hamburger button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 z-50"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Site title */}
        <h1 className="text-xl font-bold text-gray-900">Cattle Breed Classifier</h1>
      </div>

      <div className="hidden md:block text-sm text-gray-600">
        AI-Powered Breed Detection
      </div>
    </nav>
  );
};

export default Navbar;
