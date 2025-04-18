import React, { useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
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
  const [resetMethod, setResetMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [oobCode, setOobCode] = useState('');
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (resetMethod === 'email') {
        // Configure actionCodeSettings for password reset
        const actionCodeSettings = {
          url: window.location.origin + '/login', // URL to redirect to after email is opened
          handleCodeInApp: true
        };

        // Send password reset email
        await sendPasswordResetEmail(auth, email, actionCodeSettings);
        console.log('Password reset email sent successfully to:', email);
        setSuccess(true);
        setShowOTPForm(true);
      } else {
        // Phone number reset logic
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        console.log('Sending OTP to:', fullPhoneNumber);
        
        // Here you would integrate with your SMS service provider
        // For demonstration, we'll just show success
        setSuccess(true);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email address. Please check your email or create a new account.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection and try again.');
          break;
        case 'auth/missing-android-pkg-name':
        case 'auth/missing-ios-bundle-id':
        case 'auth/missing-continue-uri':
          setError('Configuration error. Please contact support.');
          break;
        default:
          if (error.message) {
            setError(error.message);
          } else {
            setError('Failed to send reset instructions. Please try again.');
          }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = (code) => {
    // In a real implementation, you would verify the OTP here
    // For now, we'll just proceed to the new password form
    setShowOTPForm(false);
    setShowNewPasswordForm(true);
    setOobCode(code);
  };

  const handleBack = () => {
    if (showNewPasswordForm) {
      setShowNewPasswordForm(false);
      setShowOTPForm(true);
    } else if (showOTPForm) {
      setShowOTPForm(false);
      setSuccess(false);
    } else {
      onBack();
    }
  };

  if (showNewPasswordForm) {
    return <NewPasswordForm oobCode={oobCode} onBack={handleBack} />;
  }

  if (showOTPForm) {
    return <OTPVerificationForm onVerify={handleOTPVerification} onBack={handleBack} />;
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

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">
              {resetMethod === 'email'
                ? `Password reset link has been sent to ${email}. Please check your email inbox and spam folder.`
                : `OTP has been sent to ${countryCode}${phoneNumber}.`}
            </span>
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
                setSuccess(false);
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
                setSuccess(false);
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
                    setSuccess(false);
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
                      setSuccess(false);
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
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setPhoneNumber(value);
                      setError('');
                      setSuccess(false);
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
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || (!email && !phoneNumber)}
          >
            {loading ? 'Sending...' : 'Send Reset OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 