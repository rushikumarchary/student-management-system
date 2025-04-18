import React from 'react';
import { FaGraduationCap, FaBullseye, FaLightbulb, FaChalkboardTeacher, FaUsers, FaMedal } from 'react-icons/fa';
import { collegeInfo } from '../config/collegeInfo';
const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-primary-100">
            Building tomorrow's leaders through quality education and holistic development
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Our Overview</h2>
            <p className="text-secondary-600 mb-6">
              {collegeInfo.name} is a premier educational institution committed to providing high-quality education
              and fostering academic excellence. With state-of-the-art facilities and dedicated faculty,
              we create an environment that nurtures learning, innovation, and personal growth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="flex items-start">
                <FaUsers className="text-4xl text-primary-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">Expert Faculty</h3>
                  <p className="text-secondary-600">
                    Our experienced educators are committed to providing personalized attention and guidance.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FaChalkboardTeacher className="text-4xl text-primary-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">Modern Teaching</h3>
                  <p className="text-secondary-600">
                    We employ innovative teaching methodologies and modern educational technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <FaBullseye className="text-4xl text-primary-600 mr-4" />
                <h2 className="text-3xl font-bold text-primary-800">Our Vision</h2>
              </div>
              <p className="text-secondary-600 mb-6">
                To be a leading institution in educational excellence, fostering innovative thinking,
                and producing well-rounded individuals who contribute positively to society.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaLightbulb className="text-primary-600 mr-3 mt-1" />
                  <span className="text-secondary-600">Promoting innovation and creativity</span>
                </li>
                <li className="flex items-start">
                  <FaGraduationCap className="text-primary-600 mr-3 mt-1" />
                  <span className="text-secondary-600">Achieving academic excellence</span>
                </li>
                <li className="flex items-start">
                  <FaMedal className="text-primary-600 mr-3 mt-1" />
                  <span className="text-secondary-600">Building future leaders</span>
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <FaLightbulb className="text-4xl text-primary-600 mr-4" />
                <h2 className="text-3xl font-bold text-primary-800">Our Mission</h2>
              </div>
              <p className="text-secondary-600 mb-6">
                To provide quality education through innovative teaching methods, fostering critical thinking,
                and nurturing talent while maintaining high academic standards.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaLightbulb className="text-primary-600 mr-3 mt-1" />
                  <span className="text-secondary-600">Implementing innovative teaching methods</span>
                </li>
                <li className="flex items-start">
                  <FaUsers className="text-primary-600 mr-3 mt-1" />
                  <span className="text-secondary-600">Fostering inclusive learning environment</span>
                </li>
                <li className="flex items-start">
                  <FaChalkboardTeacher className="text-primary-600 mr-3 mt-1" />
                  <span className="text-secondary-600">Providing personalized attention</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-primary-200">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-primary-200">Expert Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-200">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 