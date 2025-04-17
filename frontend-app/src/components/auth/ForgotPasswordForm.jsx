import React from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const ForgotPasswordForm = ({ type, onSubmit, onBack }) => {
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [resetMethod, setResetMethod] = React.useState('email'); // 'email' or 'phone'

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      identifier: resetMethod === 'email' ? email : phoneNumber,
      type,
      resetMethod 
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">
        Forgot Password
        {type === 'student' ? ' - Student' : ' - Faculty'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Reset Method Selection */}
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setResetMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
              resetMethod === 'email'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-primary-600 hover:bg-gray-200'
            }`}
          >
            <FaEnvelope className="inline-block mr-2" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setResetMethod('phone')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
              resetMethod === 'phone'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-primary-600 hover:bg-gray-200'
            }`}
          >
            <FaPhone className="inline-block mr-2" />
            Phone
          </button>
        </div>

        {/* Email Input */}
        {resetMethod === 'email' && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
        )}

        {/* Phone Number Input */}
        {resetMethod === 'phone' && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaPhone />
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
        )}

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