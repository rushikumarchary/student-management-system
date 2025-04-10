import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from "./AuthContextDefinition";
import { jwtDecode } from 'jwt-decode';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateAndSetToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !validateAndSetToken(token)) {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [validateAndSetToken]);

  const login = useCallback((token) => {
    if (validateAndSetToken(token)) {
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('userLoggedIn'));
    }
  }, [validateAndSetToken]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 