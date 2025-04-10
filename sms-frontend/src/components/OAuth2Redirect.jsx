import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { CircularProgress, Box, Typography } from '@mui/material';

const OAuth2Redirect = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleOAuth2Redirect = async () => {
      // Get parameters from URL
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
        // const email = params.get('email');
        // const name = params.get('name');

      if (token) {
        try {
          // Decode the token to get user information
          const decodedToken = jwtDecode(token);
          console.log('Decoded OAuth2 token:', decodedToken);
          
          // Store the token and update auth context
          login(token);
          
          // Set authorization header for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Navigate based on role from decoded token
          const userRole = decodedToken.role;
          console.log('User role from OAuth2:', userRole);
          
          // Use timeout to ensure state is updated before navigation
          setTimeout(() => {
            switch (userRole) {
              case 'ADMIN':
                navigate('/admin');
                break;
              case 'STUDENT':
                navigate('/student');
                break;
              case 'FACULTY':
                navigate('/faculty');
                break;
              default:
                navigate('/login');
            }
          }, 100);
        } catch (error) {
          console.error('Error processing OAuth2 redirect:', error);
          navigate('/login');
        }
      } else {
        // If no token, redirect to login page
        navigate('/login');
      }
    };

    handleOAuth2Redirect();
  }, [navigate, login]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        gap: 2
      }}
    >
      <CircularProgress />
      <Typography variant="body1">Processing login...</Typography>
    </Box>
  );
};

export default OAuth2Redirect; 