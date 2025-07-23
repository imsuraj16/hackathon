import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About Us' },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const linkClasses = ({ isActive }) =>
    `text-gray-700 font-medium transition-colors duration-300 relative group ${
      isActive ? 'text-orange-600' : 'hover:text-orange-600'
    }`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar on scroll down
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 10);

      // Track scroll position
      setLastScrollY(currentScrollY);

      // Change background based on top
      setAtTop(currentScrollY < 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full flex items-center justify-between px-6 md:px-[3rem] py-[1.2rem] sticky top-0 z-50 transition-all duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } ${
        atTop
          ? 'bg-[#BDB2A7]' // Solid at top
          : 'bg-[#BDB2A7]/30 backdrop-blur-md' // Transparent + blur when scrolling
      }`}
    >
      {/* Logo */}
      <div className='flex items-center'>
        <img
          src="//sleepyowl.co/cdn/shop/files/logo_107a2c0c-7f30-46ef-b852-05b27807f310_110x.png?v=1629351406"
          alt="Sleepy Owl"
          className="h-10"
        />
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center space-x-8'>
        {navLinks.map(({ path, label }, index) => (
          <React.Fragment key={path}>
            <NavLink to={path} className={linkClasses}>
              {label}
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300'></span>
            </NavLink>
            {index !== navLinks.length - 1 && (
              <span className='text-gray-400'>/</span>
            )}
          </React.Fragment>
        ))}

        <NavLink
          to='/login'
          className='ml-6 px-4 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition duration-300'
        >
          Login
        </NavLink>
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

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 w-full bg-amber-50/90 backdrop-blur-md border-b border-amber-200/50 md:hidden'>
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

            <NavLink
              to='/login'
              onClick={() => setIsMenuOpen(false)}
              className='mt-2 text-white bg-orange-600 text-center rounded-full py-2 font-semibold hover:bg-orange-700 transition-colors duration-300'
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;