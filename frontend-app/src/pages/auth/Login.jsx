import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/auth/LoginForm';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const Login = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordType, setForgotPasswordType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, loginWithGoogle, currentUser, userRole } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      if (userRole === 'student') {
        navigate('/student-dashboard');
      } else if (userRole === 'faculty') {
        navigate('/faculty-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [currentUser, userRole, navigate]);

  const handleStudentLogin = async (credentials) => {
    try {
      setError('');
      setLoading(true);
      await login(credentials.email, credentials.password);
      navigate('/student-dashboard'); // Redirect to student dashboard
    } catch (error) {
      setError('Failed to sign in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacultyLogin = async (credentials) => {
    try {
      setError('');
      setLoading(true);
      await login(credentials.email, credentials.password);
      navigate('/faculty-dashboard'); // Redirect to faculty dashboard
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
        // Determine where to navigate based on user role
        if (userRole === 'student') {
          navigate('/student-dashboard');
        } else if (userRole === 'faculty') {
          navigate('/faculty-dashboard');
        } else {
          navigate('/dashboard');
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

  const handleForgotPassword = async (data) => {
    // Implement forgot password logic here
    console.log('Forgot Password:', data);
  };

  const handleShowForgotPassword = (type) => {
    setForgotPasswordType(type);
    setShowForgotPassword(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {!showForgotPassword ? (
        <>
          {/* Login Tabs */}
          <div className="flex">
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'student'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-primary-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('student')}
            >
              <FaUserGraduate className="inline-block mr-2" />
              Student Login
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'faculty'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-primary-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('faculty')}
            >
              <FaChalkboardTeacher className="inline-block mr-2" />
              Faculty Login
            </button>
          </div>

          {/* Login Forms */}
          <div className="p-8">
            {activeTab === 'student' ? (
              <LoginForm
                onSubmit={handleStudentLogin}
                onForgotPassword={() => handleShowForgotPassword('student')}
                userType="student"
              />
            ) : (
              <LoginForm
                onSubmit={handleFacultyLogin}
                onForgotPassword={() => handleShowForgotPassword('faculty')}
                userType="faculty"
              />
            )}
            
            {/* Google Sign In Button */}
            <div className="mt-4">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                {loading ? 'Signing in...' : 'Sign in with Google'}
              </button>
            </div>
          </div>
        </>
      ) : (
        <ForgotPasswordForm
          onSubmit={handleForgotPassword}
          onBack={() => setShowForgotPassword(false)}
          userType={forgotPasswordType}
        />
      )}
      
      
    </div>
  );
};

export default Login; 