import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const { currentUser, userRole, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentUser || userRole !== 'Faculty') {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Faculty Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Profile</button>
              <button className="text-gray-600 hover:text-gray-900">Settings</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Faculty Dashboard Content */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {currentUser.displayName || 'Professor'}!</h2>
            
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-blue-800 text-lg mb-2">My Classes</h3>
                <p className="text-blue-600 mb-4">View and manage your assigned classes</p>
                <button className="text-blue-700 hover:text-blue-900 font-medium">
                  Manage Classes →
                </button>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-green-800 text-lg mb-2">Assignments</h3>
                <p className="text-green-600 mb-4">Create and grade student assignments</p>
                <button className="text-green-700 hover:text-green-900 font-medium">
                  View Assignments →
                </button>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-yellow-800 text-lg mb-2">Students</h3>
                <p className="text-yellow-600 mb-4">View and manage your students</p>
                <button className="text-yellow-700 hover:text-yellow-900 font-medium">
                  View Students →
                </button>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-purple-800 text-lg mb-2">Schedule</h3>
                <p className="text-purple-600 mb-4">View and manage your teaching schedule</p>
                <button className="text-purple-700 hover:text-purple-900 font-medium">
                  View Schedule →
                </button>
              </div>
              
              <div className="bg-pink-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-pink-800 text-lg mb-2">Resources</h3>
                <p className="text-pink-600 mb-4">Upload and manage teaching materials</p>
                <button className="text-pink-700 hover:text-pink-900 font-medium">
                  Manage Resources →
                </button>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-indigo-800 text-lg mb-2">Profile</h3>
                <p className="text-indigo-600 mb-4">Update your faculty profile and settings</p>
                <button className="text-indigo-700 hover:text-indigo-900 font-medium">
                  Edit Profile →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard; 