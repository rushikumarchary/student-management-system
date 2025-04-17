import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { collegeInfo } from '../config/collegeInfo';

const Contact = () => {
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      content: collegeInfo.contact.address
    },
    {
      icon: FaPhone,
      title: "Phone",
      content: collegeInfo.contact.phone
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: collegeInfo.contact.email
    },
    {
      icon: FaClock,
      title: "Working Hours",
      content: "Monday - Saturday: 9:00 AM - 5:00 PM"
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, link: collegeInfo.socialMedia.facebook, label: "Facebook" },
    { icon: FaTwitter, link: collegeInfo.socialMedia.twitter, label: "Twitter" },
    { icon: FaInstagram, link: collegeInfo.socialMedia.instagram, label: "Instagram" },
    { icon: FaLinkedin, link: collegeInfo.socialMedia.linkedin, label: "LinkedIn" }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-primary-100">
            Get in touch with us for any queries or information
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary-800 mb-2">{info.title}</h3>
                <p className="text-secondary-600">{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-primary-800 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-primary-800 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-primary-800 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Message Subject"
                  />
                </div>
                <div>
                  <label className="block text-primary-800 font-medium mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="6"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Our Location</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={collegeInfo.contact.mapUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary-800 mb-8">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="text-2xl text-primary-600" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 