import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-dimension-gray shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <h1 className="text-4xl logo-text group-hover:scale-105 transition-transform duration-300">
              Rick and Morty Explorer
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-portal-green to-portal-blue rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <button 
                className="relative px-6 py-2 bg-dimension-gray rounded-lg leading-none flex items-center font-medium"
                onClick={() => navigate('/')}
              >
                <span className="text-portal-blue group-hover:text-portal-green transition duration-200">Characters</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 