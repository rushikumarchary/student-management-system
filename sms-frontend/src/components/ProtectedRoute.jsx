import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // User's role not authorized, redirect to their appropriate dashboard
    switch (user?.role) {
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      case 'FACULTY':
        return <Navigate to="/faculty" replace />;
      case 'STUDENT':
        return <Navigate to="/student" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // Authorized, render component
  return children;
};

export default ProtectedRoute; 