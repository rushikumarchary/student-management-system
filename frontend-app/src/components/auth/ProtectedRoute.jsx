import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import keycloakService from '../../services/keycloakService';

/**
 * ProtectedRoute component for role-based access control
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if authorized
 * @param {string} [props.requiredRole] - The role required to access this route (optional)
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { setAuthState } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await keycloakService.isAuthenticated();
        
        if (!isAuthenticated) {
          setIsChecking(false);
          return;
        }

        const userInfo = keycloakService.getUserInfo();
        const roles = keycloakService.getRoles();
        
        // Set the primary role (first role in the array)
        const userRole = roles.length > 0 ? roles[0] : null;
        
        setAuthState({
          isAuthenticated: true,
          currentUser: userInfo,
          roles,
          userRole,
          isLoading: false,
          error: null
        });

        // Check if the user has the required role
        if (requiredRole) {
          // Check if any of the user's roles match the required role (case insensitive)
          const hasRequiredRole = roles.some(role => 
            role.toLowerCase() === requiredRole.toLowerCase()
          );
          setIsAllowed(hasRequiredRole);
        } else {
          setIsAllowed(true);
        }
        
        setIsChecking(false);
      } catch (error) {
        console.error('[Protected Route] Auth check failed:', error);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [setAuthState, requiredRole]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    if (!keycloakService.isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute; 