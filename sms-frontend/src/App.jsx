import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider from './context/AuthContext';
import Login from './pages/auth/Login';
import OAuth2Redirect from './components/OAuth2Redirect';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import StudentDashboard from './pages/student/StudentDashboard';

// Import additional pages
import Profile from './pages/common/Profile';
import Courses from './pages/common/Courses';
import Grades from './pages/common/Grades';
import Schedule from './pages/common/Schedule';
import Notifications from './pages/common/Notifications';
import Settings from './pages/common/Settings';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Navigate to="/student" replace />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute role="ADMIN">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Faculty Routes */}
              <Route 
                path="/faculty/*" 
                element={
                  <ProtectedRoute role="FACULTY">
                    <FacultyDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Student Routes */}
              <Route 
                path="/student/*" 
                element={
                  <ProtectedRoute role="STUDENT">
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Common Routes - Accessible by all authenticated users */}
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/grades" element={<ProtectedRoute><Grades /></ProtectedRoute>} />
              <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer position="top-right" />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
