import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// Navigation Component
const Navigation = () => (
  <nav className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Starterhomes.ai</Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-200">Home</Link>
        <Link to="/buy" className="hover:text-blue-200">Buy</Link>
        <Link to="/sell" className="hover:text-blue-200">Sell</Link>
        <Link to="/about" className="hover:text-blue-200">About</Link>
        <Link to="/contact" className="hover:text-blue-200">Contact</Link>
      </div>
    </div>
  </nav>
);

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;