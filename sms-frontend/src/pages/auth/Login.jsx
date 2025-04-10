import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8080/auth/signIn', formData);

      if (response.status === 200) {
        const token = response.data;
        
        // Decode the token to get user information
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        
        // Store the token and update auth context
        login(token);
        
        // Set authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Navigate based on role from decoded token
        const userRole = decodedToken.role;
        console.log('User role:', userRole);
        
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
            navigate('/');
        }
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  const handleRoleChange = (event, newValue) => {
    setRole(newValue);
    setFormData({
      username: '',
      password: ''
    });
    setError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fff',
        overflow: 'hidden'
      }}
    >
      <Container 
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
          m: 0,
          p: 0
        }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            maxWidth: '400px',
            width: '100%',
            p: 4, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 'none'
          }}
        >
          <Typography 
            component="h1" 
            variant="h5" 
            align="center" 
            gutterBottom
            sx={{ 
              fontSize: '1.5rem',
              fontWeight: 500,
              mb: 3
            }}
          >
            Student Management System
          </Typography>
          
          <Tabs
            value={role}
            onChange={handleRoleChange}
            centered
            sx={{
              mb: 3,
              width: '100%',
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
              },
              '& .MuiTab-root': {
                textTransform: 'uppercase',
                fontSize: '0.875rem',
                '&.Mui-selected': {
                  color: '#1976d2',
                }
              }
            }}
          >
            <Tab label="Student" value="student" />
            <Tab label="Faculty" value="faculty" />
            <Tab label="Admin" value="admin" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate
            sx={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                textTransform: 'uppercase',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                }
              }}
            >
              Sign In
            </Button>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              my: 2,
              '&::before, &::after': {
                content: '""',
                flex: 1,
                borderBottom: '1px solid #e0e0e0'
              }
            }}>
              <Typography variant="body2" sx={{ mx: 2, color: '#666' }}>
                OR
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                mb: 1,
                textTransform: 'none',
                color: '#666',
                borderColor: '#e0e0e0',
                '&:hover': {
                  borderColor: '#1976d2',
                  backgroundColor: 'transparent'
                }
              }}
            >
              Sign in with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHubIcon />}
              onClick={handleGithubLogin}
              sx={{
                textTransform: 'none',
                color: '#666',
                borderColor: '#e0e0e0',
                '&:hover': {
                  borderColor: '#1976d2',
                  backgroundColor: 'transparent'
                }
              }}
            >
              Sign in with GitHub
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 