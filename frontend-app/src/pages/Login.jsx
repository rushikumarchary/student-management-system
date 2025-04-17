import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

const Login = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordType, setForgotPasswordType] = useState('');

  // Form states
  const [studentPRN, setStudentPRN] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleStudentLogin = (e) => {
    e.preventDefault();
    // Add student login logic here
    console.log('Student Login:', { studentPRN, studentPassword });
  };

  const handleFacultyLogin = (e) => {
    e.preventDefault();
    // Add faculty login logic here
    console.log('Faculty Login:', { facultyEmail, facultyPassword });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Add forgot password logic here
    console.log('Forgot Password:', { type: forgotPasswordType, email: forgotPasswordEmail });
  };

  const handleShowForgotPassword = (type) => {
    setForgotPasswordType(type);
    setShowForgotPassword(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
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
                  // Student Login Form
                  <form onSubmit={handleStudentLogin} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">PRN Number</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          value={studentPRN}
                          onChange={(e) => setStudentPRN(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your PRN number"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          value={studentPassword}
                          onChange={(e) => setStudentPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => handleShowForgotPassword('student')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                      Login as Student
                    </button>
                  </form>
                ) : (
                  // Faculty Login Form
                  <form onSubmit={handleFacultyLogin} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          value={facultyEmail}
                          onChange={(e) => setFacultyEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          value={facultyPassword}
                          onChange={(e) => setFacultyPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => handleShowForgotPassword('faculty')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                    >
                      Login as Faculty
                    </button>
                  </form>
                )}
              </div>
            </>
          ) : (
            // Forgot Password Form
            <div className="p-8">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">
                Forgot Password
                {forgotPasswordType === 'student' ? ' - Student' : ' - Faculty'}
              </h2>
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {forgotPasswordType === 'student' ? 'PRN Number' : 'Email'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {forgotPasswordType === 'student' ? <FaUser /> : <FaEnvelope />}
                    </span>
                    <input
                      type={forgotPasswordType === 'student' ? 'text' : 'email'}
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder={
                        forgotPasswordType === 'student'
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
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordEmail('');
                    }}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 