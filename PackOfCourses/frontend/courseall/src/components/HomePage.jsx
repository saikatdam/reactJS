import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header"; // Assume you have a separate Header component

const HomePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // Store courses in state
  const [loading, setLoading] = useState(true); // Loading state
  const [isAdmin, setIsAdmin] = useState(false); // Admin check
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  useEffect(() => {

    // Fetch courses from the server
    axios
      .get("http://localhost:5000/api/courses") // Ensure your backend is running at this endpoint
      .then((response) => {
        setCourses(response.data); // Set courses data in state
        setLoading(false); // Set loading to false once courses are fetched
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false); // Stop loading even if there's an error
      });

    // Fetch user role from the server
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/user-role", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setIsAdmin(response.data.role === "admin"); // Check if the role is admin
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
  }, []);

  const handleBuyNow = (courseId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If user is not authenticated, redirect to login
      navigate("/login");
    } else {
      // If user is authenticated, redirect to payment page
      navigate(`/payment/${courseId}`);
    }
  };

  const handleAdmin = () => {
    navigate("/admin"); // Navigate to the admin page
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % courses.length); // Cycle to the next slide
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length); // Cycle to the previous slide
  };

  return (
    <>
      <div className="bg-gradient-to-r from-green-600 to-blue-500 py-10">
        {/* <Header /> */}

        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-extrabold mb-8">Our Courses</h1>

          {/* Admin Button */}
          {isAdmin && (
            <div className="text-right mb-4">
              <button
                onClick={handleAdmin}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Admin Dashboard
              </button>
            </div>
          )}

          {/* Slider Section */}
          {courses.length > 0 && (
            <div className="relative mb-8 max-w-4xl mx-auto">
              <img
                src={courses[currentSlide].image}
                alt={courses[currentSlide].title}
                className="w-full h-64 object-cover rounded-lg shadow-lg mx-auto"
              />
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75"
              >
                &lt;
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75"
              >
                &gt;
              </button>
            </div>
          )}

          {/* Display Loading or Courses */}
          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p>No courses available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 flex flex-col h-full"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                  <p className="text-gray-700 mb-4 flex-grow">{course.description}</p>
                  <div className="flex justify-between mt-auto">
                    <button
                      onClick={() => handleBuyNow(course._id)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Buy Now
                    </button>
                    <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
