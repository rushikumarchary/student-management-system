import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../../config/firebase';

const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Initialize Google Auth Provider
      const provider = new GoogleAuthProvider();
      
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      
      // Get the ID token
      const idToken = await result.user.getIdToken();
      
      // Send the ID token to your backend
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        idToken: idToken
      });

      // Set the user info from the response
      setUser(response.data);
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Google Login</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>

      {user && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">User Information</h3>
          <div className="space-y-2">
            <p><span className="font-medium">UID:</span> {user.uid}</p>
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            {user.photoURL && (
              <div className="mt-3">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleLogin; 