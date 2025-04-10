import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // Redirect to appropriate dashboard based on user role
    switch (userRole) {
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      case 'FACULTY':
        return <Navigate to="/faculty" replace />;
      case 'STUDENT':
        return <Navigate to="/student" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 