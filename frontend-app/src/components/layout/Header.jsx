import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaBell, FaFont, FaFacebookF, FaTwitter, FaYoutube, FaSignOutAlt } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';
import { collegeInfo } from '../../config/collegeInfo';
import constitution75 from '../../assets/constitution75.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const { currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
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

  // Profile dropdown component
  const ProfileDropdown = () => (
    <div className="relative group" ref={profileDropdownRef}>
      <button
        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        className="relative focus:outline-none"
      >
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-primary-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
            <CgProfile className="text-xl" />
          </div>
        )}
        {/* Hover tooltip - only show when dropdown is closed */}
        {!isProfileDropdownOpen && (
          <div className="absolute hidden group-hover:block -bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-xs py-1 px-2 rounded shadow-md whitespace-nowrap">
            {currentUser?.displayName || 'User'}
          </div>
        )}
      </button>

      {isProfileDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  <CgProfile className="text-2xl" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{currentUser?.displayName}</p>
                <p className="text-xs text-gray-500">{currentUser?.email}</p>
                <p className="text-xs text-gray-600 capitalize">{userRole || 'User'}</p>
              </div>
            </div>
          </div>
          <Link
            to={`/${userRole || 'user'}-dashboard`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );

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
                {currentUser ? (
                  <>
                    <button className="p-2 text-primary-200 hover:text-primary-100 relative">
                      <FaBell className="text-xl" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <ProfileDropdown />
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-sm bg-primary-200 text-primary-800 px-4 py-2 rounded-md hover:text-accent-400"
                  >
                    Login
                  </Link>
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
                  <h4 className="font-semibold text-primary-950">A Legacy of Education and Achievement</h4>
                </div>
              </Link>
            </div>

            <div className='hidden md:flex items-center'>
              <img src={constitution75} alt="Constitution 75" className="h-16 w-auto" />
            </div>

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