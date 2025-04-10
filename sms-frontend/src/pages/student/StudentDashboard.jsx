import DashboardLayout from '../../components/layout/DashboardLayout';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from '@mui/material';
import {
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Payment as PaymentIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

// Mock data - In a real app, this would come from an API
const studentData = {
  name: "John Doe",
  studentId: "STU2024001",
  email: "john.doe@student.edu",
  password: "Student@123", // In a real app, this would be hashed and stored securely
  course: "Bachelor of Computer Science",
  semester: "3rd",
  enrollmentDate: "2024-01-15",
  fees: {
    total: 50000,
    paid: 30000,
    pending: 20000,
    nextDue: "2024-04-15"
  },
  courses: [
    {
      id: "CS101",
      name: "Introduction to Programming",
      instructor: "Dr. Sarah Wilson",
      schedule: "Mon, Wed 10:00 AM - 11:30 AM",
      room: "Room 301",
      status: "In Progress"
    },
    {
      id: "CS102",
      name: "Data Structures",
      instructor: "Prof. Michael Brown",
      schedule: "Tue, Thu 2:00 PM - 3:30 PM",
      room: "Room 302",
      status: "In Progress"
    },
    {
      id: "MATH101",
      name: "Calculus I",
      instructor: "Dr. Emily Davis",
      schedule: "Mon, Wed 2:00 PM - 3:30 PM",
      room: "Room 401",
      status: "In Progress"
    }
  ],
  upcomingExams: [
    {
      subject: "Introduction to Programming",
      date: "2024-03-15",
      time: "10:00 AM - 12:00 PM",
      room: "Exam Hall A"
    },
    {
      subject: "Data Structures",
      date: "2024-03-20",
      time: "2:00 PM - 4:00 PM",
      room: "Exam Hall B"
    }
  ],
  attendance: {
    overall: 85,
    courses: [
      { name: "Introduction to Programming", percentage: 90 },
      { name: "Data Structures", percentage: 85 },
      { name: "Calculus I", percentage: 80 }
    ]
  }
};

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.sub || 'Student'}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Student Dashboard
        </Typography>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Student ID
              </Typography>
              <Typography variant="h6">
                {studentData.studentId}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Course
              </Typography>
              <Typography variant="h6">
                {studentData.course}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Semester
              </Typography>
              <Typography variant="h6">
                {studentData.semester}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Overall Attendance
              </Typography>
              <Typography variant="h6">
                {studentData.attendance.overall}%
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Courses */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Courses
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentData.courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.schedule}</TableCell>
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

          {/* Upcoming Exams */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Exams
            </Typography>
            <List>
              {studentData.upcomingExams.map((exam, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={exam.subject}
                      secondary={`${exam.date} | ${exam.time} | ${exam.room}`}
                    />
                  </ListItem>
                  {index < studentData.upcomingExams.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Paper>

          {/* Fees Information */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Fees Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Total Fees"
                  secondary={`$${studentData.fees.total}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Paid Amount"
                  secondary={`$${studentData.fees.paid}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Pending Amount"
                  secondary={`$${studentData.fees.pending}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Next Payment Due"
                  secondary={studentData.fees.nextDue}
                />
              </ListItem>
            </List>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
            >
              Make Payment
            </Button>
          </Paper>

          {/* Attendance Details */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Attendance Details
            </Typography>
            <List>
              {studentData.attendance.courses.map((course, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={course.name}
                      secondary={`${course.percentage}% attendance`}
                    />
                  </ListItem>
                  {index < studentData.attendance.courses.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Paper>
        </div>
      </Box>
    </DashboardLayout>
  );
};

export default StudentDashboard; 