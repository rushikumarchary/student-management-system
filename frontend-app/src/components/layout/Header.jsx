import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser, FaBell, FaFont, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';
import { collegeInfo } from '../../config/collegeInfo';
import constitution75 from '../../assets/constitution75.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const options = { 
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      setCurrentDate(date.toLocaleDateString('en-US', options));
    };
    
    updateDate();
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/academics', label: 'Academics' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/facilities', label: 'Facilities' },
    { path: '/alumni', label: 'Alumni' },
    { path: '/faculty', label: 'Faculty' },
    { path: '/events', label: 'Events' },
    
    { path: '/contact', label: 'Contact Us' }
  ];

  return (
    <header>
      {/* Accessibility Bar */}
      <div className="bg-primary-900 text-white py-1.5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-primary-100">
              {currentDate}
            </div>
            <div className="flex items-center space-x-2">
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-700 hover:bg-primary-600 text-white font-medium">
                A+
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-700 hover:bg-primary-600 text-white font-medium">
                A
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-700 hover:bg-primary-600 text-white font-medium">
                A-
              </button>
              <div className="w-px h-5 bg-primary-700 mx-2"></div>
              <a href={collegeInfo.socialMedia.facebook} className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-700 hover:bg-[#3b5998] text-white transition-colors">
                <FaFacebookF className="text-sm" />
              </a>
              <a href={collegeInfo.socialMedia.twitter} className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-700 hover:bg-[#1DA1F2] text-white transition-colors">
                <FaTwitter className="text-sm" />
              </a>
              <a href={collegeInfo.socialMedia.instagram} className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-700 hover:bg-[#FF0000] text-white transition-colors">
                <FaYoutube className="text-sm" />
              </a>
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <span className="text-sm text-primary-200">
                      Welcome, {user?.name}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="text-sm hover:text-primary-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="text-sm bg-primary-200 text-primary-800 px-4 py-2 rounded-md hover:text-accent-400"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={logo}
                  alt="Logo" 
                  className="h-16 w-auto mr-4"
                />
                <div>
                  <h1 className="text-3xl font-bold text-primary-950">{collegeInfo.name}</h1>
                  <h4 className=" font-semibold text-primary-950">A Legacy of Education and Achievement</h4>
                </div>
              </Link>
            </div>

            <div className='hidden md:flex items-center'>
              <img src={constitution75} alt="Constitution 75" className="h-16 w-auto" />
            </div>

            {/* Search Bar
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500 hover:text-primary-600">
                  <FaSearch />
                </button>
              </div>
            </div> */}

            {/* User Actions */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-4">
                <button className="p-2 text-primary-950 hover:text-primary-600">
                  <FaBell className="text-xl" />
                </button>
                <button className="p-2 text-primary-950 hover:text-primary-600">
                  <FaUser className="text-xl" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-secondary-600 hover:text-primary-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4`}>
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      block py-2 font-medium relative group
                      ${isActive ? 'text-primary-600' : 'text-primary-800 hover:text-primary-600'}
                    `}
                  >
                    {({ isActive }) => (
                      <span className="font-bold relative">
                        {item.label}
                        <span className={`
                          absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300
                          ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                        `}></span>
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 