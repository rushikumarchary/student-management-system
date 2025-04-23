import React, { useState } from 'react';
import { FaUserPlus, FaFileAlt, FaClipboardList, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const Admissions = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    branch: '',
    course: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/admissions/student/register', formData);
      console.log('Registration successful:', response.data);
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        dob: '',
        branch: '',
        course: ''
      });
      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
    }
  };

  const admissionSteps = [
    {
      icon: FaFileAlt,
      title: "Submit Application",
      description: "Fill out the online application form with all required information"
    },
    {
      icon: FaClipboardList,
      title: "Document Verification",
      description: "Submit required documents for verification"
    },
    {
      icon: FaCalendarAlt,
      title: "Entrance Test",
      description: "Appear for the entrance examination"
    },
    {
      icon: FaCheckCircle,
      title: "Final Selection",
      description: "Merit-based selection and admission confirmation"
    }
  ];

  const requirements = [
    "Completed application form",
    "Academic transcripts",
    "Transfer certificate",
    "Character certificate",
    "Passport size photographs",
    "Valid ID proof",
    "Residence proof"
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
          <p className="text-xl text-primary-100">
            Join our institution for quality education and bright future
          </p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">Admission Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-3xl text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2">{step.title}</h3>
                <p className="text-secondary-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Fees */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <FaClipboardList className="text-4xl text-primary-600 mr-4" />
                <h2 className="text-2xl font-bold text-primary-800">Requirements</h2>
              </div>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-primary-600 mr-3 mt-1" />
                    <span className="text-secondary-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fee Structure */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <FaMoneyBillWave className="text-4xl text-primary-600 mr-4" />
                <h2 className="text-2xl font-bold text-primary-800">Fee Structure</h2>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-primary-700 mb-2">Application Fee</h3>
                  <p className="text-secondary-600">₹500</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-primary-700 mb-2">Tuition Fee (per semester)</h3>
                  <p className="text-secondary-600">₹25,000</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-primary-700 mb-2">Hostel Fee (per year)</h3>
                  <p className="text-secondary-600">₹50,000</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-700 mb-2">Other Charges</h3>
                  <p className="text-secondary-600">₹10,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">Application Form</h2>
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-md p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-primary-800 font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-primary-800 font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-primary-800 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div>
                <label className="block text-primary-800 font-medium mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div>
                <label className="block text-primary-800 font-medium mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-primary-800 font-medium mb-2">Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select a course</option>
                  <option value="BE">BE</option>
                  <option value="BTech">BTech</option>
                  <option value="ME">ME</option>
                  <option value="MTech">MTech</option>
                </select>
              </div>
              <div>
                <label className="block text-primary-800 font-medium mb-2">Branch</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select a branch</option>
                  <option value="IT">IT</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions; 