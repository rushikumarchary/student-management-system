import React from 'react';
import { FaGraduationCap, FaBook, FaChalkboardTeacher, FaUserGraduate, FaCalendarAlt, FaClock } from 'react-icons/fa';

const Academics = () => {
  const courses = [
    {
      title: "Science Stream",
      description: "Comprehensive science education with focus on Physics, Chemistry, and Biology",
      icon: FaGraduationCap,
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics"]
    },
    {
      title: "Commerce Stream",
      description: "Business-focused education with emphasis on Economics and Accounting",
      icon: FaBook,
      subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"]
    },
    {
      title: "Arts Stream",
      description: "Liberal arts education covering Literature, History, and Social Sciences",
      icon: FaChalkboardTeacher,
      subjects: ["History", "Political Science", "Sociology", "Literature"]
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academics</h1>
          <p className="text-xl text-primary-100">
            Discover our comprehensive academic programs and courses
          </p>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">Our Academic Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <course.icon className="text-4xl text-primary-600 mr-4" />
                  <h3 className="text-xl font-semibold text-primary-800">{course.title}</h3>
                </div>
                <p className="text-secondary-600 mb-4">{course.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-primary-700">Key Subjects:</h4>
                  <ul className="list-disc list-inside text-secondary-600">
                    {course.subjects.map((subject, idx) => (
                      <li key={idx}>{subject}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">Academic Calendar</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-primary-600 mr-2" />
                  <h3 className="text-lg font-semibold text-primary-800">Academic Year 2024-25</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-primary-700 mb-2">First Semester</h4>
                    <ul className="space-y-2 text-secondary-600">
                      <li className="flex items-center">
                        <FaClock className="mr-2" />
                        Classes Begin: July 1, 2024
                      </li>
                      <li className="flex items-center">
                        <FaClock className="mr-2" />
                        Mid-term Exams: September 15-30, 2024
                      </li>
                      <li className="flex items-center">
                        <FaClock className="mr-2" />
                        Final Exams: December 1-15, 2024
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-700 mb-2">Second Semester</h4>
                    <ul className="space-y-2 text-secondary-600">
                      <li className="flex items-center">
                        <FaClock className="mr-2" />
                        Classes Begin: January 2, 2025
                      </li>
                      <li className="flex items-center">
                        <FaClock className="mr-2" />
                        Mid-term Exams: March 15-30, 2025
                      </li>
                      <li className="flex items-center">
                        <FaClock className="mr-2" />
                        Final Exams: May 1-15, 2025
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">Our Faculty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-6 shadow-md text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUserGraduate className="text-4xl text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2">Department {item}</h3>
                <p className="text-secondary-600 mb-4">
                  Our experienced faculty members are experts in their fields with years of teaching and research experience.
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View Faculty Members →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics; 