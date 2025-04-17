import { useState } from "react";
import AlumniForm from "../components/alumni/AlumniForm";
import { FaUserGraduate} from 'react-icons/fa';

const Alumni = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sample alumni data
  const alumniList = [
    {
      id: 1,
      name: "Sai Prasad",
      batch: "2020-2021",
      designation: "Software Engineer",
      company: "Tech Corp",
      
    },
    {
      id: 2,
      name: "Tushar Pandao",
      batch: "2019-2020",
      designation: "Data Scientist",
      company: "Data Analytics Inc",
      
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