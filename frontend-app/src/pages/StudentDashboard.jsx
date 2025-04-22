import React from "react";

import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                Student Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-600">
                Welcome, {currentUser?.name || "Student"}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Student Dashboard Content */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Welcome, {currentUser?.name || "Student"}!
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-blue-50 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-blue-800">My Courses</h3>
                <p className="text-sm text-blue-600">
                  View your enrolled courses
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-green-800">Assignments</h3>
                <p className="text-sm text-green-600">
                  Check your pending assignments
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-yellow-800">Grades</h3>
                <p className="text-sm text-yellow-600">
                  View your academic performance
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-purple-800">Schedule</h3>
                <p className="text-sm text-purple-600">
                  View your class schedule
                </p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-pink-800">Resources</h3>
                <p className="text-sm text-pink-600">Access study materials</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-indigo-800">Profile</h3>
                <p className="text-sm text-indigo-600">
                  Manage your student profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
