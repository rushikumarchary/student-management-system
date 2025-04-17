import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'student' or 'faculty'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setUserType(currentUser.type); // Assuming user object has a type field
    }
    setLoading(false);
  }, []);

  const clearError = () => setError(null);

  const login = async (credentials, type) => {
    setIsAuthenticating(true);
    setError(null);

    try {
      let response;
      if (type === 'student') {
        response = await authService.studentLogin(credentials.email, credentials.password);
      } else {
        response = await authService.facultyLogin(credentials.email, credentials.password);
      }
      
      setUser(response.user);
      setUserType(type);
      return response;
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during login';
      setError(errorMessage);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      setUserType(null);
      setError(null);
    } catch (error) {
      setError('Error during logout',error);
    }
  };

  const forgotPassword = async (type, identifier) => {
    setIsAuthenticating(true);
    setError(null);

    try {
      const response = await authService.forgotPassword(type, identifier);
      return response;
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during password reset';
      setError(errorMessage);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const value = {
    user,
    userType,
    loading,
    error,
    isAuthenticating,
    login,
    logout,
    forgotPassword,
    clearError,
    isAuthenticated: !!user,
    isStudent: userType === 'student',
    isFaculty: userType === 'faculty'
  };

  // Only render children when initial loading is complete
  if (loading) {
    return null; // Or return a loading spinner component
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 