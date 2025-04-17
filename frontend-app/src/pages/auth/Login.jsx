import React, { useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import StudentLoginForm from '../../components/auth/StudentLoginForm';
import FacultyLoginForm from '../../components/auth/FacultyLoginForm';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const Login = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordType, setForgotPasswordType] = useState('');

  const handleStudentLogin = (credentials) => {
    // Add student login logic here
    console.log('Student Login:', credentials);
  };

  const handleFacultyLogin = (credentials) => {
    // Add faculty login logic here
    console.log('Faculty Login:', credentials);
  };

  const handleForgotPassword = (data) => {
    // Add forgot password logic here
    console.log('Forgot Password:', data);
  };

  const handleShowForgotPassword = (type) => {
    setForgotPasswordType(type);
    setShowForgotPassword(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
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
              <StudentLoginForm
                onSubmit={handleStudentLogin}
                onForgotPassword={() => handleShowForgotPassword('student')}
              />
            ) : (
              <FacultyLoginForm
                onSubmit={handleFacultyLogin}
                onForgotPassword={() => handleShowForgotPassword('faculty')}
              />
            )}
          </div>
        </>
      ) : (
        <ForgotPasswordForm
          type={forgotPasswordType}
          onSubmit={handleForgotPassword}
          onBack={() => setShowForgotPassword(false)}
        />
      )}
    </div>
  );
};

export default Login; 