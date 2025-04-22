import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import keycloakService, { directLogin, initKeycloak } from '../services/keycloakService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    currentUser: null,
    roles: [],
    userRole: null,
    isLoading: true, // Start with loading true
    error: null
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize Keycloak and check authentication
        const isAuthenticated = await initKeycloak();
        
        if (isAuthenticated) {
          // Get user info from localStorage
          const userStateStr = localStorage.getItem('userState');
          if (userStateStr) {
            const userState = JSON.parse(userStateStr);
            // Get allowed roles from environment variable
            const allowedRoles = import.meta.env.VITE_APP_ROLES.split(',').map(role => role.trim());
            
            // Filter roles to only include allowed roles
            const roles = (userState.userInfo?.roles || [])
              .filter(role => allowedRoles.includes(role));
            
            // Get the primary role (first role from filtered list)
            const userRole = roles.length > 0 ? roles[0] : null;

            setAuthState({
              isAuthenticated: true,
              currentUser: {
                ...userState.userInfo,
                roles: roles // Override the roles with filtered roles
              },
              roles: roles,
              userRole: userRole,
              isLoading: false,
              error: null
            });

            // Only redirect if on login page
            if (window.location.pathname === '/login' && userRole) {
              switch(userRole.toLowerCase()) {
                case 'student':
                  navigate('/student-dashboard', { replace: true });
                  break;
                case 'faculty':
                  navigate('/faculty-dashboard', { replace: true });
                  break;
                case 'admin':
                  navigate('/admin-dashboard', { replace: true });
                  break;
                default:
                  navigate('/', { replace: true });
              }
            }
          }
        } else {
          // Just update state for not authenticated, don't redirect
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
            isAuthenticated: false,
            currentUser: null,
            roles: [],
            userRole: null
          }));
        }
      } catch (error) {
        console.error('[AUTH] Initialization error:', error);
        // Just update error state, don't redirect
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: error,
          isAuthenticated: false,
          currentUser: null,
          roles: [],
          userRole: null
        }));
      }
    };

    initializeAuth();

    // Listen for auth state changes from Keycloak
    const handleAuthChange = () => {
      const userStateStr = localStorage.getItem('userState');
      if (userStateStr) {
        const userState = JSON.parse(userStateStr);
        // Get allowed roles from environment variable
        const allowedRoles = import.meta.env.VITE_APP_ROLES.split(',').map(role => role.trim());
        
        // Filter roles to only include allowed roles
        const roles = (userState.userInfo?.roles || [])
          .filter(role => allowedRoles.includes(role));
        
        // Get the primary role (first role from filtered list)
        const userRole = roles.length > 0 ? roles[0] : null;

        setAuthState({
          isAuthenticated: true,
          currentUser: {
            ...userState.userInfo,
            roles: roles // Override the roles with filtered roles
          },
          roles: roles,
          userRole: userRole,
          isLoading: false,
          error: null
        });

        // Only redirect if on login page
        if (window.location.pathname === '/login' && userRole) {
          switch(userRole.toLowerCase()) {
            case 'student':
              navigate('/student-dashboard', { replace: true });
              break;
            case 'faculty':
              navigate('/faculty-dashboard', { replace: true });
              break;
            case 'admin':
              navigate('/admin-dashboard', { replace: true });
              break;
            default:
              navigate('/', { replace: true });
          }
        }
      } else {
        // Just update state, don't redirect
        setAuthState({
          isAuthenticated: false,
          currentUser: null,
          roles: [],
          userRole: null,
          isLoading: false,
          error: null
        });
      }
    };

    window.addEventListener('authStateChanged', handleAuthChange);
    return () => window.removeEventListener('authStateChanged', handleAuthChange);
  }, [navigate]);

  const login = async (username, password) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const success = await directLogin(username, password);
      
      if (success) {
        const userStateStr = localStorage.getItem('userState');
        if (userStateStr) {
          const userState = JSON.parse(userStateStr);
          // Get allowed roles from environment variable
          const allowedRoles = import.meta.env.VITE_APP_ROLES.split(',').map(role => role.trim());
          
          // Filter roles to only include allowed roles
          const roles = (userState.userInfo?.roles || [])
            .filter(role => allowedRoles.includes(role));
          
          // Get the primary role (first role from filtered list)
          const userRole = roles.length > 0 ? roles[0] : null;

          setAuthState({
            isAuthenticated: true,
            currentUser: {
              ...userState.userInfo,
              roles: roles // Override the roles with filtered roles
            },
            roles: roles,
            userRole: userRole,
            isLoading: false,
            error: null
          });

          console.log('[AUTH] Login successful', { roles, userRole });

          // Redirect based on role
          if (userRole) {
            switch(userRole.toLowerCase()) {
              case 'student':
                navigate('/student-dashboard', { replace: true });
                break;
              case 'faculty':
                navigate('/faculty-dashboard', { replace: true });
                break;
              case 'admin':
                navigate('/admin-dashboard', { replace: true });
                break;
              default:
                navigate('/', { replace: true });
            }
          } else {
            navigate('/', { replace: true });
          }
        }
      }
      return success;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error,
        isLoading: false
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('[AUTH] Starting logout process');
      // First update local state
      setAuthState({
        isAuthenticated: false,
        currentUser: null,
        roles: [],
        userRole: null,
        isLoading: false,
        error: null
      });

      // Then try to logout from Keycloak
      await keycloakService.logout();
    } catch (error) {
      console.error('[AUTH] Logout error:', error);
      // Even if Keycloak logout fails, ensure we clear local state
      setAuthState({
        isAuthenticated: false,
        currentUser: null,
        roles: [],
        userRole: null,
        isLoading: false,
        error: error
      });
      // Force redirect to login page
      window.location.href = '/login';
    }
  };

  const resetPassword = async (email) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Call Keycloak's executeActionsEmail API to send password reset email
      const response = await fetch(`${keycloakService.getKeycloakInstance().authServerUrl}/realms/${keycloakService.getKeycloakInstance().realm}/users/execute-actions-email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keycloakService.getKeycloakInstance().token}`
        },
        body: JSON.stringify({
          email: email,
          actions: ['UPDATE_PASSWORD']
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send password reset email');
      }

      setAuthState(prev => ({ ...prev, isLoading: false }));
      return true;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error,
        isLoading: false
      }));
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Ensure Keycloak is initialized
      if (!keycloakService.instance) {
        await keycloakService.initKeycloak();
      }

      // Use Keycloak's default login method
      await keycloakService.instance.login({
        idpHint: 'google'
      });
      
    } catch (error) {
      console.error('[AUTH] Google login error:', error);
      setAuthState(prev => ({
        ...prev,
        error: 'Failed to initialize Google login. Please try again later.',
        isLoading: false
      }));
      throw error;
    }
  };

  // Loading state
  if (authState.isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      setAuthState,
      login,
      logout,
      resetPassword,
      loginWithGoogle
    }}>
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