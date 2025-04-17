import React from 'react';
import { Link } from 'react-router-dom';
    import logo from '../../assets/logo.jpg';

const Footer = () => {
  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-primary-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Address Section */}
            <div className="col-span-1">
              <img 
                src={logo}
                alt="Logo" 
                className="h-16 w-auto mb-4"
              />
              <address className="not-italic text-sm text-primary-100">
                Room No.206, 2nd floor,<br />
                DSS Bhavan, Opp. Chacha<br />
                Nehru Park, Masab tank,<br />
                Hyderabad-500028
              </address>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-primary-100 hover:text-primary-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-primary-100 hover:text-primary-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/rti" className="text-sm text-primary-100 hover:text-primary-200">
                    RTI
                  </Link>
                </li>
                <li>
                  <Link to="/fms" className="text-sm text-primary-100 hover:text-primary-200">
                    FMS
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-primary-100 hover:text-primary-200">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Directories */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">DIRECTORIES</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/state-web-directory" className="text-sm text-primary-100 hover:text-primary-200">
                    State Web Directory
                  </Link>
                </li>
                <li>
                  <Link to="/district-web-directory" className="text-sm text-primary-100 hover:text-primary-200">
                    District Web Directory
                  </Link>
                </li>
                <li>
                  <Link to="/other-state-web-directory" className="text-sm text-primary-100 hover:text-primary-200">
                    Other State Web Directory
                  </Link>
                </li>
                <li>
                  <Link to="/important-links" className="text-sm text-primary-100 hover:text-primary-200">
                    Other Important Links
                  </Link>
                </li>
              </ul>
            </div>

            {/* Executives */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">EXECUTIVES</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/governor" className="text-sm text-primary-100 hover:text-primary-200">
                    Governor
                  </Link>
                </li>
                <li>
                  <Link to="/chief-minister" className="text-sm text-primary-100 hover:text-primary-200">
                    Chief Minister
                  </Link>
                </li>
                <li>
                  <Link to="/cabinet-ministers" className="text-sm text-primary-100 hover:text-primary-200">
                    Cabinet Ministers
                  </Link>
                </li>
                <li>
                  <Link to="/chief-secretary" className="text-sm text-primary-100 hover:text-primary-200">
                    Chief Secretary
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-primary-900 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-primary-100">
              Copyright 2025 © Bc Welfare. All Rights Reserved By EduSystem.
            </div>
            <div className="text-primary-100">
              Designed & Developed by <a href="https://www.itrosys.com/" target="_blank" rel="noopener noreferrer">iTroSys Technologies Pvt Ltd</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 