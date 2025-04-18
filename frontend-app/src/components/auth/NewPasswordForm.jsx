import React, { useState } from 'react';
import { FaArrowLeft, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../config/firebase';

const countryCodes = [
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'IN' },
  { code: '+81', country: 'JP' },
  { code: '+86', country: 'CN' },
  // Add more country codes as needed
];

const NewPasswordForm = ({ onBack }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetMethod, setResetMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Get the action code from the URL
      const actionCode = new URLSearchParams(window.location.search).get('oobCode');
      
      if (!actionCode) {
        throw new Error('Invalid or expired password reset link');
      }

      // Confirm the password reset
      await confirmPasswordReset(auth, actionCode, password);
      setSuccess(true);
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your password has been reset successfully.</span>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      
      <h2 className="text-2xl font-bold text-primary-800 mb-6">
        Set New Password
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
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
            disabled={loading}
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
            disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>
        )}

        {/* Phone Number Input with Country Code */}
        {resetMethod === 'phone' && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <div className="flex space-x-2">
              {/* Country Code Selector */}
              <div className="relative w-32">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaGlobe />
                </span>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                  disabled={loading}
                >
                  {countryCodes.map(({ code, country }) => (
                    <option key={code} value={code}>
                      {code} {country}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  ▼
                </span>
              </div>
              
              {/* Phone Number Input */}
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/[^\d]/g, '');
                    setPhoneNumber(value);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your phone number"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your new password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Confirm your new password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-primary-600 font-medium py-2 px-4 rounded-md transition-colors duration-200"
            disabled={loading}
          >
            Back to Login
          </button>
          <button
            type="submit"
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !password || !confirmPassword}
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordForm; 