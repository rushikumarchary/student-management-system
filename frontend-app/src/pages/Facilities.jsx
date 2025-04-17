import React from 'react';
import { FaBook, FaFlask, FaLaptop, FaFutbol, FaBed, FaBus, FaUtensils, FaFirstAid } from 'react-icons/fa';

const Facilities = () => {
  const facilities = [
    {
      icon: FaBook,
      title: "Library",
      description: "Well-stocked library with digital resources and study areas",
      features: [
        "Extensive collection of books",
        "Digital library access",
        "Quiet study zones",
        "Research journals"
      ]
    },
    {
      icon: FaFlask,
      title: "Laboratories",
      description: "Modern labs for practical learning and research",
      features: [
        "Physics lab",
        "Chemistry lab",
        "Biology lab",
        "Computer lab"
      ]
    },
    {
      icon: FaLaptop,
      title: "Computer Center",
      description: "State-of-the-art computer facilities with internet access",
      features: [
        "High-speed internet",
        "Latest hardware",
        "Technical support",
        "Printing facilities"
      ]
    },
    {
      icon: FaFutbol,
      title: "Sports Facilities",
      description: "Comprehensive sports infrastructure for physical activities",
      features: [
        "Indoor sports complex",
        "Outdoor playground",
        "Gymnasium",
        "Sports equipment"
      ]
    },
    {
      icon: FaBed,
      title: "Hostel",
      description: "Comfortable accommodation for residential students",
      features: [
        "Separate boys & girls hostels",
        "24/7 security",
        "Common rooms",
        "Laundry service"
      ]
    },
    {
      icon: FaBus,
      title: "Transportation",
      description: "Safe and convenient transport facilities",
      features: [
        "School buses",
        "Trained drivers",
        "GPS tracking",
        "Multiple routes"
      ]
    },
    {
      icon: FaUtensils,
      title: "Cafeteria",
      description: "Hygienic and nutritious food services",
      features: [
        "Balanced meals",
        "Clean kitchen",
        "Dining area",
        "Special diet options"
      ]
    },
    {
      icon: FaFirstAid,
      title: "Medical Facility",
      description: "On-campus medical care and emergency services",
      features: [
        "First aid center",
        "Qualified nurse",
        "Regular health checkups",
        "Emergency response"
      ]
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Facilities</h1>
          <p className="text-xl text-primary-100">
            Modern infrastructure and amenities for holistic development
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <facility.icon className="text-2xl text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-800">{facility.title}</h3>
                  </div>
                  <p className="text-secondary-600 mb-4">{facility.description}</p>
                  <ul className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-secondary-600">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Our Campus</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Experience our world-class facilities firsthand. Schedule a campus tour today
            and see how we provide the best environment for learning and growth.
          </p>
          <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200">
            Schedule a Tour
          </button>
        </div>
      </section>
    </div>
  );
};

export default Facilities; 