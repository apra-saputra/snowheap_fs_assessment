import React from "react";
import { Navbar } from "../navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

// interface MainLayoutProps extends LayoutProps {}

const MainLayout: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      <header className="fixed w-full z-50 top-0 left-0">
        <Navbar />
      </header>
      <main className="pt-[5.5rem] mb-4 w-full">
        <Outlet />
      </main>
      <footer
        className="cursor-default w-full shadow bg-secondary border-gray-200"
        id="footer"
      >
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
