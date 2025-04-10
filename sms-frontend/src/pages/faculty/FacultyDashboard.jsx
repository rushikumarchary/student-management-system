import DashboardLayout from '../../components/layout/DashboardLayout';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

// Mock data - In a real app, this would come from an API
const facultyData = {
  name: "Dr. Sarah Wilson",
  department: "Computer Science",
  courses: [
    {
      id: "CS101",
      name: "Introduction to Programming",
      students: 45,
      schedule: "Mon, Wed 10:00 AM - 11:30 AM",
      room: "Room 301",
      status: "In Progress",
      attendance: 85,
      assignments: [
        { id: 1, title: "Basic Programming Concepts", dueDate: "2024-03-20", submissions: 35 },
        { id: 2, title: "Arrays and Functions", dueDate: "2024-03-25", submissions: 0 }
      ]
    },
    {
      id: "CS102",
      name: "Data Structures",
      students: 40,
      schedule: "Tue, Thu 2:00 PM - 3:30 PM",
      room: "Room 302",
      status: "In Progress",
      attendance: 88,
      assignments: [
        { id: 1, title: "Linked Lists Implementation", dueDate: "2024-03-22", submissions: 28 },
        { id: 2, title: "Stack and Queue", dueDate: "2024-03-28", submissions: 0 }
      ]
    }
  ],
  upcomingEvents: [
    {
      id: 1,
      title: "CS101 Midterm Exam",
      date: "2024-03-15",
      time: "10:00 AM - 12:00 PM",
      type: "exam"
    },
    {
      id: 2,
      title: "Department Meeting",
      date: "2024-03-18",
      time: "2:00 PM - 3:00 PM",
      type: "meeting"
    }
  ],
  notifications: [
    {
      id: 1,
      title: "New Assignment Submission",
      message: "John Doe submitted 'Basic Programming Concepts'",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "Attendance Alert",
      message: "Low attendance in CS101 class",
      time: "1 day ago",
      read: true
    }
  ]
};

const FacultyDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.sub || 'Faculty'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Faculty Dashboard
        </Typography>
        
        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Department
                </Typography>
                <Typography variant="h6">
                  {facultyData.department}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Students
                </Typography>
                <Typography variant="h6">
                  {facultyData.courses.reduce((acc, course) => acc + course.students, 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Courses
                </Typography>
                <Typography variant="h6">
                  {facultyData.courses.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Pending Assignments
                </Typography>
                <Typography variant="h6">
                  {facultyData.courses.reduce((acc, course) => 
                    acc + course.assignments.filter(a => a.submissions === 0).length, 0
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Current Courses */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Current Courses
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell>Students</TableCell>
                      <TableCell>Schedule</TableCell>
                      <TableCell>Attendance</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {facultyData.courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.students}</TableCell>
                        <TableCell>{course.schedule}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: '100%' }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={course.attendance} 
                                color={course.attendance > 80 ? "success" : "warning"}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {course.attendance}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={course.status} 
                            color="primary" 
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Upcoming Events */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List>
                {facultyData.upcomingEvents.map((event, index) => (
                  <div key={event.id}>
                    <ListItem>
                      <ListItemIcon>
                        {event.type === 'exam' ? <AssessmentIcon /> : <EventIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={event.title}
                        secondary={`${event.date} | ${event.time}`}
                      />
                    </ListItem>
                    {index < facultyData.upcomingEvents.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Assignments */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Assignments
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell>Assignment</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Submissions</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {facultyData.courses.map((course) =>
                      course.assignments.map((assignment) => (
                        <TableRow key={`${course.id}-${assignment.id}`}>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{assignment.title}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>{assignment.submissions}/{course.students}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outlined" 
                              size="small"
                              disabled={assignment.submissions === 0}
                            >
                              Grade
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Notifications */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Notifications
              </Typography>
              <List>
                {facultyData.notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <ListItem>
                      <ListItemIcon>
                        <NotificationsIcon color={notification.read ? "action" : "primary"} />
                      </ListItemIcon>
                      <ListItemText
                        primary={notification.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {notification.message}
                            </Typography>
                            <Typography component="span" variant="caption" display="block">
                              {notification.time}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < facultyData.notifications.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default FacultyDashboard; 