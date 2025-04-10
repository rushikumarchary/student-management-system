// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Button,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

// Dummy data for statistics
const stats = {
  totalStudents: 150,
  totalFaculty: 25,
  totalCourses: 45,
  activeNotifications: 8,
};

const AdminDashboard = () => {
  const { user } = useAuth();
  // const [selectedTab, setSelectedTab] = useState('overview');

  const QuickActionCard = ({ title, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton sx={{ backgroundColor: `${color}20`, color: color, mr: 2 }}>
            {icon}
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Button variant="outlined" fullWidth>
          Manage
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome, {user?.sub || 'Admin'}!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Admin Dashboard
              </Typography>
              <Grid container spacing={3}>
                {/* Statistics Cards */}
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h6">{stats.totalStudents}</Typography>
                      <Typography color="textSecondary">Total Students</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <SchoolIcon sx={{ mr: 2, color: 'secondary.main' }} />
                    <Box>
                      <Typography variant="h6">{stats.totalFaculty}</Typography>
                      <Typography color="textSecondary">Total Faculty</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <AssessmentIcon sx={{ mr: 2, color: 'success.main' }} />
                    <Box>
                      <Typography variant="h6">{stats.totalCourses}</Typography>
                      <Typography color="textSecondary">Total Courses</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <NotificationsIcon sx={{ mr: 2, color: 'warning.main' }} />
                    <Box>
                      <Typography variant="h6">{stats.activeNotifications}</Typography>
                      <Typography color="textSecondary">Active Notifications</Typography>
                    </Box>
                  </Paper>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    Quick Actions
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <QuickActionCard
                    title="Manage Users"
                    icon={<PeopleIcon />}
                    color="#1976d2"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <QuickActionCard
                    title="Manage Courses"
                    icon={<SchoolIcon />}
                    color="#9c27b0"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <QuickActionCard
                    title="View Reports"
                    icon={<AssessmentIcon />}
                    color="#2e7d32"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <QuickActionCard
                    title="Notifications"
                    icon={<NotificationsIcon />}
                    color="#ed6c02"
                  />
                </Grid>
              </Grid>
            </Box>
          }
        />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard; 