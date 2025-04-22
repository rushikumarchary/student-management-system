import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StudentManagement from '../components/admin/StudentManagement';
import FacultyManagement from '../components/admin/FacultyManagement';
import StudentVerification from '../components/admin/StudentVerification';

const AdminDashboard = () => {
  const { currentUser,  loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentManagement />;
      case 'faculty':
        return <FacultyManagement />;
      case 'verifications':
        return <StudentVerification />;
      default:
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {currentUser.displayName || 'Admin'}!</h2>
            <p className="text-gray-600 mb-6">
              Welcome to the admin dashboard. Here you can manage students, faculty, and verify student applications.
            </p>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-blue-800 text-lg mb-2">Student Management</h3>
                <p className="text-blue-600 mb-4">Manage student registrations, profiles, and academic records</p>
                <button 
                  onClick={() => setActiveTab('students')}
                  className="text-blue-700 hover:text-blue-900 font-medium"
                >
                  Manage Students →
                </button>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-purple-800 text-lg mb-2">Faculty Management</h3>
                <p className="text-purple-600 mb-4">Manage faculty members, departments, and assignments</p>
                <button 
                  onClick={() => setActiveTab('faculty')}
                  className="text-purple-700 hover:text-purple-900 font-medium"
                >
                  Manage Faculty →
                </button>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-yellow-800 text-lg mb-2">Student Verifications</h3>
                <p className="text-yellow-600 mb-4">Review and approve pending student applications</p>
                <button 
                  onClick={() => setActiveTab('verifications')}
                  className="text-yellow-700 hover:text-yellow-900 font-medium"
                >
                  View Verifications →
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Profile</button>
              <button className="text-gray-600 hover:text-gray-900">Settings</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-base ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`py-4 px-1 border-b-2 font-medium text-base ${
                activeTab === 'students'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('faculty')}
              className={`py-4 px-1 border-b-2 font-medium text-base ${
                activeTab === 'faculty'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Faculty
            </button>
            <button
              onClick={() => setActiveTab('verifications')}
              className={`py-4 px-1 border-b-2 font-medium text-base ${
                activeTab === 'verifications'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Verifications
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 sm:px-0">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 