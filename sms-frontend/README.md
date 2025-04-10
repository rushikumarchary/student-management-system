# Student Management System

A modern, role-based Student Management System built with React.js and Material-UI.

## Features

- Role-based access control (Admin, Faculty, Student)
- Modern and responsive UI using Material-UI
- Protected routes and authentication
- Dashboard views for different user roles
- Course management
- Grade tracking
- Attendance monitoring
- Assignment management
- Real-time notifications

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   └── layout/
│       └── DashboardLayout.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── admin/
│   │   └── AdminDashboard.jsx
│   ├── faculty/
│   │   └── FacultyDashboard.jsx
│   ├── student/
│   │   └── StudentDashboard.jsx
│   ├── auth/
│   │   └── Login.jsx
│   └── dashboard/
│       └── Dashboard.jsx
├── App.jsx
└── main.jsx
```

## Dummy Login Credentials

For testing purposes, use the following credentials:

- Admin:
  - Email: admin@example.com
  - Password: password123

- Faculty:
  - Email: faculty@example.com
  - Password: password123

- Student:
  - Email: student@example.com
  - Password: password123

## Technologies Used

- React.js
- Vite
- Material-UI
- React Router
- Context API
- Tailwind CSS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
