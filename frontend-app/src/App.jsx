import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Alumni from "./pages/Alumni";
import Institutions from "./pages/Institutions";
import Faculty from "./pages/Faculty";
import Events from "./pages/Events";
import Results from "./pages/Results";
import UnderDevelopment from "./components/common/UnderDevelopment";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/events" element={<Events />} />
            <Route path="/results" element={<Results />} />
            {/* Catch-all route for pages under development or not found */}
            <Route path="*" element={<UnderDevelopment />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
