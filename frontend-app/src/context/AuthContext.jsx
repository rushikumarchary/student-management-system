import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authCallback, setAuthCallback] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  // Function to normalize role
  const normalizeRole = (role) => {
    if (!role) return null;
    return role.toLowerCase();
  };

  // Function to authenticate with backend
  const authenticateWithBackend = async (user) => {
    try {
      // Get the ID token
      const idToken = await user.getIdToken();
      console.log("idToken found", idToken);
      
      // Send token to backend using Axios
      const response = await axios.post('http://localhost:8080/api/auth/login', 
        { idToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log("response", response);
      
      // Even if we get a 200 status, ensure we have some data
      if (!response.data || Object.keys(response.data).length === 0) {
        // If no data, at least store the Firebase user info
        const userInfo = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        setUserInfo(userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      } else {
        // Store the response data and normalize the role
        const userData = response.data;
        const normalizedRole = normalizeRole(userData.role);
        userData.role = normalizedRole; // Update the role in userData
        setUserInfo(userData);
        setUserRole(normalizedRole); // Set the normalized role
        localStorage.setItem('userInfo', JSON.stringify(userData));
        localStorage.setItem('userRole', normalizedRole);
      }
      
      return response.data;
    } catch (error) {
      console.error('Backend authentication error:', error);
      // Store basic Firebase user info even if backend fails
      const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      setUserInfo(userInfo);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
      // Set normalized role from stored user info
      if (parsedUserInfo.role) {
        const normalizedRole = normalizeRole(parsedUserInfo.role);
        setUserRole(normalizedRole);
      }
    }
  }, []);

  // Determine user role based on email domain or custom claims
  const determineUserRole = async (user) => {
    if (!user) return null;
    
    try {
      // Get the ID token result which includes custom claims
      const idTokenResult = await user.getIdTokenResult();
      
      // Check for custom claims first (set by your backend)
      if (idTokenResult.claims.role) {
        const role = idTokenResult.claims.role;
        // Store role in localStorage
        localStorage.setItem('userRole', role);
        return role;
      }
      
      // Fallback to email domain check
      if (user.email.endsWith('@faculty.edu')) {
        localStorage.setItem('userRole', 'faculty');
        return 'faculty';
      }
      if (user.email.endsWith('@student.edu')) {
        localStorage.setItem('userRole', 'student');
        return 'student';
      }
      
      return null;
    } catch (error) {
      console.error('Error determining user role:', error);
      return null;
    }
  };

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserRole(null);
    setUserInfo(null);
    // Clear localStorage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userRole');
    return signOut(auth);
  }

  async function loginWithGoogle(callback) {
    try {
      // Store the callback to be executed after successful authentication
      if (callback) {
        setAuthCallback(() => callback);
      }
      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Authenticate with backend
      await authenticateWithBackend(result.user);
      
      // Execute the callback if it exists
      if (authCallback) {
        authCallback(result.user);
        setAuthCallback(null); // Clear the callback after execution
      }
      
      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message);
      throw error;
    }
  }

  // Set up session persistence
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .catch(error => {
        console.error("Error setting persistence:", error);
      });
  }, []);

  // Set up auth state listener and token refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser(user);
          
          // Try to get stored role first
          const storedRole = localStorage.getItem('userRole');
          if (storedRole) {
            setUserRole(storedRole);
          } else {
            // Determine and set role if not in storage
            const role = await determineUserRole(user);
            setUserRole(role);
          }
          
          // Try to get stored user info first
          const storedUserInfo = localStorage.getItem('userInfo');
          if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
          } else {
            // Authenticate with backend if no stored info
            await authenticateWithBackend(user);
          }
          
          // Set up token refresh interval
          const refreshToken = setInterval(async () => {
            try {
              await user.getIdToken(true);
            } catch (error) {
              console.error("Error refreshing token:", error);
            }
          }, 10 * 60 * 1000); // Refresh every 10 minutes
          
          // Clean up interval on unmount or user change
          return () => clearInterval(refreshToken);
        } else {
          setCurrentUser(null);
          setUserRole(null);
          setUserInfo(null);
          // Clear localStorage
          localStorage.removeItem('userInfo');
          localStorage.removeItem('userRole');
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    userInfo,
    error,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle,
    isAuthenticated: !!currentUser,
    isStudent: userRole === 'student',
    isFaculty: userRole === 'faculty'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 