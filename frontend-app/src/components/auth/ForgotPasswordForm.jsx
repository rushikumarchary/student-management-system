import React from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';

const ForgotPasswordForm = ({ type, onSubmit, onBack }) => {
  const [identifier, setIdentifier] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ identifier, type });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">
        Forgot Password
        {type === 'student' ? ' - Student' : ' - Faculty'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            {type === 'student' ? 'PRN Number' : 'Email'}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {type === 'student' ? <FaUser /> : <FaEnvelope />}
            </span>
            <input
              type={type === 'student' ? 'text' : 'email'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={
                type === 'student'
                  ? 'Enter your PRN number'
                  : 'Enter your email'
              }
              required
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-primary-600 font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Back to Login
          </button>
          <button
            type="submit"
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm; 