import React, { useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import OTPVerificationForm from './OTPVerificationForm';
import NewPasswordForm from './NewPasswordForm';

const countryCodes = [
  { code: '+1', country: 'USA/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  // Add more country codes as needed
];

const ForgotPasswordForm = ({ onBack }) => {
  const { resetPassword } = useAuth();
  const [resetMethod, setResetMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (resetMethod === 'email') {
        await resetPassword(email);
        setMessage('Password reset instructions have been sent to your email.');
      } else {
        await resetPassword(phoneNumber);
        setMessage('Password reset instructions have been sent to your phone.');
      }
      setShowOTPForm(true);
    } catch (err) {
      setError(`Failed to reset password: ${err.message || 'Please try again.'}`);
    }
    setLoading(false);
  };

  const handleOTPVerification = async (code) => {
    try {
      // In a real implementation, you would verify the OTP here
      // For now, we'll just simulate the verification
      console.log('Verifying OTP:', code);
      setShowOTPForm(false);
      setShowNewPasswordForm(true);
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.message || 'Failed to verify OTP. Please try again.');
    }
  };

  const handleBack = () => {
    if (showNewPasswordForm) {
      setShowNewPasswordForm(false);
      setShowOTPForm(true);
    } else if (showOTPForm) {
      setShowOTPForm(false);
    } else {
      onBack();
    }
  };

  if (showNewPasswordForm) {
    return <NewPasswordForm onBack={handleBack} email={email} />;
  }

  if (showOTPForm) {
    return <OTPVerificationForm onVerify={handleOTPVerification} onBack={handleBack} email={email} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Select a method to reset your password
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reset Method Selection */}
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              onClick={() => {
                setResetMethod('email');
                setError('');
              }}
              className={`flex-1 py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                resetMethod === 'email'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaEnvelope className="text-lg" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setResetMethod('phone');
                setError('');
              }}
              className={`flex-1 py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                resetMethod === 'phone'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaPhone className="text-lg" />
              <span>Phone</span>
            </button>
          </div>

          {resetMethod === 'email' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex space-x-2">
                <div className="relative w-32">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaGlobe />
                  </span>
                  <select
                    value={countryCode}
                    onChange={(e) => {
                      setCountryCode(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
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
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 