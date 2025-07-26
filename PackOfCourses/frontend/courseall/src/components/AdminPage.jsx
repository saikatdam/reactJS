import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const AdminPage = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/courses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPurchasedCourses(response.data);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      }
    };

    fetchPurchasedCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/admin/liveclass/${courseId}`); // Navigate to live class page with courseId
  };

  const handleVideoList = () => {
    navigate('/admin/video-list'); // Navigate to video list page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-blue-500 py-10">
      {/* <Header /> */}
      <div className="container mx-auto text-center text-white">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-100">Admin Page</h1>

        <div className="mb-4 text-right">
          <button
            onClick={handleVideoList}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Video List
          </button>
        </div>

        {purchasedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {purchasedCourses.map((course) => (
              <div
                key={course.courseId}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleCourseClick(course.courseId)} // Navigate to live class on click
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.courseTitle}</h2>
                <p className="text-gray-600 text-sm">{course.courseDescription}</p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Purchased By:</p>
                  <p className="text-blue-600">{course.userId}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Purchase Date:</p>
                  <p className="text-gray-500">{new Date(course.purchaseDate).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No purchased courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
