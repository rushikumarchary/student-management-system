import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on user role
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'faculty':
          navigate('/faculty');
          break;
        case 'student':
          navigate('/student');
          break;
        default:
          navigate('/login');
      }
    }
  }, [user, navigate]);

  return (
    <DashboardLayout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading your dashboard...
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard; 