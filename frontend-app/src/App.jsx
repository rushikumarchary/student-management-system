import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';

// Create a separate component for routes that need auth context
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Student Routes */}
        <Route
          path="/academics"
          element={
            <ProtectedRoute requiredRole="student">
              <Academics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute requiredRole="student">
              <Results />
            </ProtectedRoute>
          }
        />

        {/* Protected Faculty Routes */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute requiredRole="faculty">
              <Faculty />
            </ProtectedRoute>
          }
        />

        <Route path="/admissions" element={<Admissions />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/events" element={<Events />} />

        {/* Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Faculty Dashboard */}
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute requiredRole="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Generic Dashboard (for Google login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for pages under development or not found */}
        <Route path="*" element={<UnderDevelopment />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
