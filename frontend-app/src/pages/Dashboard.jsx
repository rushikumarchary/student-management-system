import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser, logout, userRole, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                {userRole === 'student' ? 'Student Dashboard' : 
                 userRole === 'faculty' ? 'Faculty Dashboard' : 
                 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Dashboard Content */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {currentUser.displayName || 'User'}!</h2>
            <p className="text-gray-600">
              You are logged in as a {userRole || 'user'}. This is your personalized dashboard.
            </p>
            
            {/* Add more dashboard content here based on user role */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Example dashboard cards */}
              <div className="bg-blue-50 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-blue-800">Profile</h3>
                <p className="text-sm text-blue-600">Manage your profile information</p>
              </div>
              
              {userRole === 'student' && (
                <div className="bg-green-50 p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-green-800">Courses</h3>
                  <p className="text-sm text-green-600">View your enrolled courses</p>
                </div>
              )}
              
              {userRole === 'faculty' && (
                <div className="bg-purple-50 p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-purple-800">Classes</h3>
                  <p className="text-sm text-purple-600">Manage your classes</p>
                </div>
              )}
              
              <div className="bg-yellow-50 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-yellow-800">Settings</h3>
                <p className="text-sm text-yellow-600">Configure your preferences</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 