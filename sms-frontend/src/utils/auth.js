import { toast } from 'react-toastify';

// Get token from localStorage
export const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  return token;
};

// Get user role from token
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch (error) {
    console.error('Error extracting role from token:', error);
    return null;
  }
};

// Check if user has admin or manager role
export const hasManagementAccess = () => {
  const userRole = getUserRole();
  if (!userRole) return false;
  return userRole === 'ADMIN' || userRole === 'MANAGER';
};

// Check if user has required role
export const hasRequiredRole = (requiredRoles) => {
  const userRole = getUserRole();
  if (!userRole) return false;
  
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(userRole);
  }
  
  return userRole === requiredRoles;
};

// Get auth header with token
export const getAuthHeader = () => {
  const token = getToken();
  if (!token) {
    toast.error('You are not logged in. Please login to continue.');
    window.location.href = '/signIn';
    throw new Error('No auth token found');
  }

  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

// Get token expiration time
export const getTokenExpirationTime = () => {
  const token = getToken();
  if (!token) return 0;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    const timeRemaining = payload.exp - currentTime;
    return Math.max(0, timeRemaining / 3600);
  } catch (error) {
    console.error('Error getting token expiration time:', error);
    return 0;
  }
};

// Check if token needs renewal
export const shouldRenewToken = () => {
  const hoursRemaining = getTokenExpirationTime();
  return hoursRemaining < 1;
};

// Get user name from token
export const getUserName = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch (error) {
    console.error('Error extracting name from token:', error);
    return null;
  }
};

// Get user email from token
export const getUserEmail = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || null;
  } catch (error) {
    console.error('Error extracting email from token:', error);
    return null;
  }
};

// Get user ID from token
export const getUserId = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    return null;
  }
};

// Handle API errors
export const handleApiError = (error, navigate) => {
  console.log('API Error:', error);
  console.log('Response status:', error.response?.status);
  console.log('Current user role:', getUserRole());

  if (error.response?.status === 403) {
    if (!isAuthenticated()) {
      toast.error('Your session has expired. Please login again.');
      navigate('/signIn');
    } else if (!hasManagementAccess()) {
      toast.error('You do not have permission to access this feature. Only Admins and Managers are allowed.');
      navigate('/');
    } else {
      toast.error(error.response?.data || 'You do not have permission to perform this action.');
    }
  } else {
    toast.error(error.response?.data || 'An error occurred');
  }
};