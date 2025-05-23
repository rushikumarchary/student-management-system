import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/auth/LoginForm';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import { FaGraduationCap } from 'react-icons/fa';

const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const navigate = useNavigate();
  const { login, loginWithGoogle, currentUser, userRole, isVerified } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      if (!isVerified) {
        setShowVerificationMessage(true);
        navigate('/');
      } else if (userRole === 'student') {
        navigate('/student-dashboard');
      } else if (userRole === 'faculty') {
        navigate('/faculty-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [currentUser, userRole, isVerified, navigate]);

  const handleLogin = async (credentials) => {
    try {
      setError('');
      setLoading(true);
      await login(credentials.email, credentials.password);
      if (!isVerified) {
        setShowVerificationMessage(true);
        navigate('/');
      } else if (userRole === 'student') {
        navigate('/student-dashboard');
      } else if (userRole === 'faculty') {
        navigate('/faculty-dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError('Failed to sign in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      
      // Define a callback function to handle navigation after successful authentication
      const handleGoogleAuthSuccess = () => {
        // Determine where to navigate based on verification status
        if (!isVerified) {
          setShowVerificationMessage(true);
          navigate('/');
        } else if (userRole === 'student') {
          navigate('/student-dashboard');
        } else if (userRole === 'faculty') {
          navigate('/faculty-dashboard');
        } else {
          navigate('/');
        }
      };
      
      // Pass the callback to loginWithGoogle
      await loginWithGoogle(handleGoogleAuthSuccess);
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to sign in with Google: ' + error.message);
      setLoading(false);
    }
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setError('');
  };

  if (showForgotPassword) {
    return <ForgotPasswordForm onBack={handleBackToLogin} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <FaGraduationCap className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {showVerificationMessage && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">
              Please wait for administrator verification. You will be notified once your account is verified.
            </span>
          </div>
        )}
        
        {/* Login Form */}
        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={handleShowForgotPassword}
        />
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          {/* Google Sign In Button */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 