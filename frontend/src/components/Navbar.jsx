import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-gray-800 hover:text-blue-500 transition-colors duration-300">
            GovPortal
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              to="/query"
              className="text-gray-800 text-lg px-4 py-2 rounded-lg hover:bg-gray-200 hover:scale-105 transform transition-transform duration-300"
            >
              Submit Query
            </Link>
            <Link
              to="/public"
              className="text-gray-800 text-lg px-4 py-2 rounded-lg hover:bg-gray-200 hover:scale-105 transform transition-transform duration-300"
            >
              Public Queries
            </Link>
            <Link
              to="/policy"
              className="text-gray-800 text-lg px-4 py-2 rounded-lg hover:bg-gray-200 hover:scale-105 transform transition-transform duration-300"
            >
              Policies
            </Link>
            <Link
              to="/budget"
              className="text-gray-800 text-lg px-4 py-2 rounded-lg hover:bg-gray-200 hover:scale-105 transform transition-transform duration-300"
            >
              Budget
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
