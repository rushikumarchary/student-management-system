import React, { useState } from 'react';
import { FaArrowLeft, FaKey, FaEnvelope } from 'react-icons/fa';

const OTPVerificationForm = ({ onVerify, onBack, email }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real implementation, you would verify the OTP here
      // For now, we'll just pass the OTP to the parent component
      onVerify(otp);
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

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
        Verify OTP
      </h2>
      
      {email && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg relative mb-4 flex items-center">
          <FaEnvelope className="mr-2" />
          <span>OTP has been sent to <strong>{email}</strong></span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">
            Enter OTP
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaKey />
            </span>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter the OTP sent to your email"
              required
              disabled={loading}
            />
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !otp}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerificationForm; 