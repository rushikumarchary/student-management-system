import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';

const ForgotPasswordForm = ({ type, onBack }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  const [resetMethod, setResetMethod] = useState('email'); // 'email' or 'phone'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Common country codes
  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+81', country: 'Japan' },
    { code: '+86', country: 'China' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+61', country: 'Australia' },
    { code: '+971', country: 'UAE' },
    { code: '+65', country: 'Singapore' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (resetMethod === 'email') {
        await sendPasswordResetEmail(auth, email);
        setSuccess('Password reset email sent! Please check your inbox.');
      } else {
        // Note: Phone authentication requires additional setup in Firebase
        // This is a placeholder for phone authentication
        setError('Phone authentication is not implemented yet.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">
        Forgot Password
        {type === 'student' ? ' - Student' : ' - Faculty'}
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
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
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm; 