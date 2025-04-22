import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Alumni from "./pages/Alumni";
import Faculty from "./pages/Faculty";
import Events from "./pages/Events";
import Results from "./pages/Results";
import UnderDevelopment from "./components/common/UnderDevelopment";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import  StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AuthCallback from './components/auth/AuthCallback';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: '#ff4b4b',
              },
            },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/events" element={<Events />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/faculty" element={<Faculty />} />

            {/* Protected Student Routes */}
            <Route path="/academics" element={<Academics />} />
            <Route
              path="/results"
              element={
                <ProtectedRoute requiredRole="Student">
                  <Results />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute requiredRole="Student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Faculty Routes */}

            <Route
              path="/faculty-dashboard"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />
            {/* Admin Dashboard */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Auth Callback */}
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Catch all route */}
            <Route path="*" element={<UnderDevelopment />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
