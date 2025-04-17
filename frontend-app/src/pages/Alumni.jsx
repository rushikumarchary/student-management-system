import React, { useState } from 'react';
import { FaUserGraduate, FaEnvelope, FaPhone, FaBriefcase, FaTimes } from 'react-icons/fa';

const AlumniForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    currentDesignation: '',
    email: '',
    institution: '',
    yearOfPassing: {
      month: 'April',
      year: '2025'
    },
    message: ''
  });

  const institutions = [
    "Select Institution",
    "Institution 1",
    "Institution 2",
    "Institution 3",
    // Add more institutions as needed
  ];

  const months = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March"
  ];

  const years = Array.from({ length: 10 }, (_, i) => (2025 - i).toString());

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'passingMonth' || name === 'passingYear') {
      setFormData(prev => ({
        ...prev,
        yearOfPassing: {
          ...prev.yearOfPassing,
          [name === 'passingMonth' ? 'month' : 'year']: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-2xl" />
        </button>
        
        <h2 className="text-2xl font-bold text-primary-800 mb-6">Alumni Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Mobile Number Field */}
            <div>
              <label className="block text-gray-700 mb-2">
                Mobile No <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Enter Mobile No"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Current Designation Field */}
            <div>
              <label className="block text-gray-700 mb-2">
                Current Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="currentDesignation"
                value={formData.currentDesignation}
                onChange={handleChange}
                placeholder="Enter Designation"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Institution Details Field */}
            <div>
              <label className="block text-gray-700 mb-2">
                Institution Details <span className="text-red-500">*</span>
              </label>
              <select
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                {institutions.map((inst, index) => (
                  <option key={index} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>

            {/* Year of Passing Field */}
            <div>
              <label className="block text-gray-700 mb-2">
                Year of passing <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="passingMonth"
                  value={formData.yearOfPassing.month}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="passingYear"
                  value={formData.yearOfPassing.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-700 mb-2">
              Do you have any message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Alumni = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sample alumni data
  const alumniList = [
    {
      id: 1,
      name: "John Doe",
      batch: "2020-2021",
      designation: "Software Engineer",
      company: "Tech Corp",
      email: "john@example.com",
      phone: "+91 98765 43210"
    },
    {
      id: 2,
      name: "Jane Smith",
      batch: "2019-2020",
      designation: "Data Scientist",
      company: "Data Analytics Inc",
      email: "jane@example.com",
      phone: "+91 98765 43211"
    },
    // Add more alumni data as needed
  ];

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-800">Our Alumni</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-300"
        >
          Register as Alumni
        </button>
      </div>

      {/* Alumni List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumniList.map((alumni) => (
          <div
            key={alumni.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <FaUserGraduate className="text-2xl text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary-800 mb-2">{alumni.name}</h3>
                <p className="text-secondary-600 mb-1">{alumni.designation}</p>
                <p className="text-secondary-600 mb-3">{alumni.company}</p>
                <p className="text-sm text-secondary-500 mb-1">Batch: {alumni.batch}</p>
                <div className="flex items-center text-sm text-secondary-500 mb-1">
                  <FaEnvelope className="mr-2" />
                  <a href={`mailto:${alumni.email}`} className="hover:text-primary-600">
                    {alumni.email}
                  </a>
                </div>
                <div className="flex items-center text-sm text-secondary-500">
                  <FaPhone className="mr-2" />
                  <a href={`tel:${alumni.phone}`} className="hover:text-primary-600">
                    {alumni.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alumni Registration Modal */}
      <AlumniForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Alumni; 