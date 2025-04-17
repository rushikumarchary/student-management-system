import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaHome } from 'react-icons/fa';

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center">
          <FaTools className="h-24 w-24 text-primary-600 animate-pulse" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Page Under Development</h2>
          <p className="mt-2 text-sm text-gray-600">
            We're working hard to bring you this feature. Please check back later.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaHome className="h-5 w-5 text-primary-300 group-hover:text-primary-200" />
            </span>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment; 