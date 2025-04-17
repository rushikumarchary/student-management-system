import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const StudentLoginForm = ({ onSubmit, onForgotPassword }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaEnvelope />
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaLock />
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      <div className="text-right">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Forgot Password?
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
      >
        Login as Student
      </button>
    </form>
  );
};

export default StudentLoginForm; 