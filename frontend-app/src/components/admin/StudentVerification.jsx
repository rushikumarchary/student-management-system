import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const StudentVerification = () => {
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnverifiedStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/admin/unverified-users/student');
        const students = response.data.map(student => ({
          id: student.id,
          name: `${student.firstName} ${student.lastName}`,
          email: student.email,
          mobile: student.mobile,
          dob: student.dob,
          status: 'pending',
          remarks: ''
        }));
        setPendingVerifications(students);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch unverified students');
        setLoading(false);
        console.error('Error fetching unverified students:', err);
      }
    };

    fetchUnverifiedStudents();
  }, []);

  const handleVerification = async (studentId, action, remarks = '') => {
    try {
      if (action === 'approved') {
        // Make API call to verify and create student
        const response = await axios.post(`http://localhost:8081/admin/verify-and-create/${studentId}`);
        
        if (response.status === 200) {
          // Remove the verified student from the list
          setPendingVerifications(prev => 
            prev.filter(student => student.id !== studentId)
          );
          toast.success('Student verified successfully!');
          return;
        }
      }
      
      // For rejections or if approval failed
      setPendingVerifications(prev => 
        prev.map(student => 
          student.id === studentId 
            ? { ...student, status: action, remarks } 
            : student
        )
      );
      toast.success(`Student ${action} successfully!`);
    } catch (err) {
      console.error('Error updating verification status:', err);
      toast.error(`Failed to ${action} student: ${err.response?.data?.message || err.message}`);
    }
  };

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [remarks, setRemarks] = useState('');

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Verification</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {pendingVerifications.filter(s => s.status === 'pending').length} Pending Verifications
          </span>
        </div>
      </div>

      {/* Verification List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingVerifications.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.mobile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.dob}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${student.status === 'approved' ? 'bg-green-100 text-green-800' :
                      student.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}
                  >
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {student.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Review
                      </button>
                    </div>
                  )}
                  {student.status !== 'pending' && (
                    <span className="text-gray-500">
                      {student.remarks || 'No remarks'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">Review Application</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Student Name</p>
                <p className="mt-1">{selectedStudent.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="mt-1">{selectedStudent.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Mobile</p>
                <p className="mt-1">{selectedStudent.mobile}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Date of Birth</p>
                <p className="mt-1">{selectedStudent.dob}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Add your remarks here..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  setRemarks('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleVerification(selectedStudent.id, 'rejected', remarks);
                  setSelectedStudent(null);
                  setRemarks('');
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  handleVerification(selectedStudent.id, 'approved', remarks);
                  setSelectedStudent(null);
                  setRemarks('');
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentVerification; 