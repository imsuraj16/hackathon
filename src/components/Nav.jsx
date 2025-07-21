import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About Us' }
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkClasses = ({ isActive }) =>
    `text-gray-700 font-medium transition-colors duration-300 relative group ${
      isActive ? 'text-orange-600' : 'hover:text-orange-600'
    }`;

  return (
    <nav className='w-full flex items-center justify-between px-6 md:px-[3rem] py-[1.5rem] bg-[#BDB2A7] backdrop-blur-sm sticky top-0 z-50'>
      {/* Logo */}
      <div className='flex items-center'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
          Sleepy Owl
          <span className='text-orange-500 text-4xl leading-none'>•</span>
        </h1>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center space-x-8'>
        {navLinks.map(({ path, label }, index) => (
          <React.Fragment key={path}>
            <NavLink to={path} className={linkClasses}>
              {label}
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300'></span>
            </NavLink>
            {index !== navLinks.length - 1 && <span className='text-gray-400'>/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className='md:hidden'>
        <button
          onClick={toggleMenu}
          className='text-gray-700 hover:text-orange-600 transition-colors duration-300 p-2'
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 w-full bg-amber-50/95 backdrop-blur-sm border-b border-amber-200/50 md:hidden'>
          <div className='flex flex-col space-y-4 px-6 py-4'>
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className='text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300 py-2 border-b border-amber-200/30'
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
