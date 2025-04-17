import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaUserGraduate, FaBook, FaCalendarAlt, FaNewspaper, FaEnvelope, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const partnerLogos = [
  {
    id: 1,
    name: "Aadhar",
    imageUrl: "https://uidai.gov.in/images/langPage/Page-1.svg",
    link: "https://uidai.gov.in/",
    alt: "Aadhar"
  },
  {
    id: 2,
    name: "Maharashtra Tourism",
    imageUrl: "/images/partners/maharashtra-tourism.svg",
    link: "https://mtdc.co/en/",
    alt: "Maharashtra Tourism"
  },
  {
    id: 3,
    name: "DigiLocker",
    imageUrl: "/images/partners/digilocker.png",
    link: "https://digilocker.gov.in/",
    alt: "DigiLocker"
  },
  {
    id: 4,
    name: "Education Gov",
    imageUrl: "/images/partners/education-gov.png",
    link: "https://www.education.gov.in/",
    alt: "Commissioner and Director of School Education"
  },
  {
    id: 5,
    name: "India Gov",
    imageUrl: "/images/partners/india-gov-site.png",
    link: "https://www.india.gov.in/",
    alt: "India.gov.in"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);

  const slides = [
    {
      image: "/slide1.jpg",
      title: "Welcome to Education Management System",
      description: "Empowering students with quality education"
    },
    {
      image: "/slide2.jpg",
      title: "Excellence in Education",
      description: "Building future leaders"
    },
    {
      image: "/slide3.jpg",
      title: "Modern Learning Environment",
      description: "State-of-the-art facilities"
    }
  ];

  const testimonials = [
    {
      text: "The education and support I received here has been exceptional. The faculty is outstanding.",
      name: "Priya S.",
      role: "Student"
    },
    {
      text: "This institution has provided my child with excellent opportunities for growth.",
      name: "Rajesh K.",
      role: "Parent"
    },
    {
      text: "The facilities and teaching methods are world-class.",
      name: "Anita M.",
      role: "Alumni"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Slider Section */}
      <section className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-900/60">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl md:text-2xl">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <FaChevronLeft className="text-primary-600 text-xl" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <FaChevronRight className="text-primary-600 text-xl" />
        </button>
      </section>

      {/* Quick Access Icons */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/institutions" className="flex flex-col items-center p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              <FaGraduationCap className="text-5xl text-primary-600 mb-4" />
              <span className="text-primary-800 font-medium text-center">Institutions</span>
            </Link>
            <Link to="/faculty" className="flex flex-col items-center p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              <FaUserGraduate className="text-5xl text-primary-600 mb-4" />
              <span className="text-primary-800 font-medium text-center">Faculty</span>
            </Link>
            <Link to="/events" className="flex flex-col items-center p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              <FaCalendarAlt className="text-5xl text-primary-600 mb-4" />
              <span className="text-primary-800 font-medium text-center">Events</span>
            </Link>
            <Link to="/results" className="flex flex-col items-center p-6 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
              <FaBook className="text-5xl text-primary-600 mb-4" />
              <span className="text-primary-800 font-medium text-center">Results</span>
            </Link>
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* News Section */}
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6 flex items-center">
                <FaNewspaper className="mr-2" />
                Latest News
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center text-sm text-secondary-500 mb-1">
                        <FaCalendarAlt className="mr-2" />
                        March {item}, 2024
                      </div>
                      <h3 className="font-medium text-primary-800 hover:text-primary-600">
                        <a href="#">Important Announcement {item}</a>
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Events Section */}
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Upcoming Events
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center text-sm text-secondary-500 mb-1">
                        <FaCalendarAlt className="mr-2" />
                        March {item + 10}, 2024
                      </div>
                      <h3 className="font-medium text-primary-800 hover:text-primary-600">
                        <a href="#">Upcoming Event {item}</a>
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-primary-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
          <div className="max-w-3xl mx-auto relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${
                  currentTestimonial === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="text-center">
                  <FaQuoteLeft className="text-4xl text-accent-400 mx-auto mb-6" />
                  <p className="text-xl mb-6">{testimonial.text}</p>
                  <div className="font-medium">
                    <p className="text-accent-400">{testimonial.name}</p>
                    <p className="text-primary-200">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentTestimonial === index ? 'bg-accent-400' : 'bg-primary-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 mb-12 text-center">Our Partners</h2>
          <div className="relative max-w-5xl mx-auto">
            {/* Previous Button */}
            <button 
              onClick={() => {
                setCurrentPartnerIndex((prev) => {
                  const newIndex = prev - 1;
                  return newIndex < 0 ? partnerLogos.length - 1 : newIndex;
                });
              }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
            >
              <FaChevronLeft className="text-primary-600 text-xl" />
            </button>

            {/* Partners Container with Overflow Control */}
            <div className="overflow-hidden mx-16">
              <div 
                className="flex items-center gap-12 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentPartnerIndex * 336}px)` }}  // 336px = width(288px) + gap(48px)
              >
                {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                  <a 
                    key={`${partner.id}-${index}`}
                    href={partner.link}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-shrink-0 p-6 bg-white rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-[rgba(17,_17,_26,_0.1)_0px_8px_24px,_rgba(17,_17,_26,_0.1)_0px_16px_56px] transition-all duration-300 w-72 flex items-center justify-center group"
                  >
                    <img 
                      src={partner.imageUrl}
                      alt={partner.alt}
                      className="h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button 
              onClick={() => {
                setCurrentPartnerIndex((prev) => {
                  const newIndex = prev + 1;
                  return newIndex >= partnerLogos.length ? 0 : newIndex;
                });
              }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-3 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
            >
              <FaChevronRight className="text-primary-600 text-xl" />
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 2)); }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Home; 