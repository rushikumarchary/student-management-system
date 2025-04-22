import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import keycloakService from '../../services/keycloakService';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        const error_description = urlParams.get('error_description');

        if (error || error_description) {
          console.error('Auth error:', error, error_description);
          setError(error_description || error || 'Authentication failed');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (!code) {
          console.error('No auth code found in URL');
          setError('No authentication code received');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Exchange code for token
        await keycloakService.handleAuthCallback(code);

        // Redirect based on user role
        if (userRole === 'Student') {
          navigate('/student-dashboard');
        } else if (userRole === 'Faculty') {
          navigate('/faculty-dashboard');
        } else if (userRole === 'Admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setError('Failed to complete authentication. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [navigate, userRole]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div className="text-red-600 mb-4">{error}</div>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Completing sign in...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback; 