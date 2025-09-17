import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children, currentPage, setCurrentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main content + footer container */}
      <div
        className="flex-1 flex flex-col justify-center items-center pt-16"
        style={{
          marginLeft: sidebarOpen ? "16rem" : "0",
          minHeight: "calc(100vh - 4rem)", // full height minus navbar
        }}
      >
        {/* Centered content */}
        <div className="flex flex-col justify-center items-center w-auto max-w-[900px] p-6 flex-1">
          {children}
        </div>

        {/* Footer always at bottom */}
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
