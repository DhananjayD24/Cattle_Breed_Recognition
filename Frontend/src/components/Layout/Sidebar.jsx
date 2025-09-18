import React from 'react';
import { Home, Upload, BarChart3, X } from 'lucide-react';

const Sidebar = ({ isOpen, setSidebarOpen, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'upload', name: 'Upload Image', icon: Upload },
    { id: 'stats', name: 'Statistics', icon: BarChart3 },
  ];

  const handleItemClick = (itemId) => {
    setCurrentPage(itemId);
    setSidebarOpen(false); // Close sidebar after click
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-70 z-45"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu items */}
        <nav className="mt-16 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
