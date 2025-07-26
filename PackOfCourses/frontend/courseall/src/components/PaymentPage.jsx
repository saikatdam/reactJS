import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentPage = () => {
  
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [courseDetails, setCourseDetails] = useState(null);
  const [timer, setTimer] = useState(120); // Timer starts at 2 minutes
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  // Fetch course details and QR code URL
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    axios
      .get(`http://localhost:5000/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in Authorization header
        },
      })
      .then((response) => {
        setQrCodeUrl(response.data.qrCodeUrl);
        setCourseDetails(response.data.courseDetails); // Assuming response contains courseDetails
      })
      .catch((error) => {
        console.error('Error fetching course:', error); // Handle errors
      });

    // Timer logic
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      } else {
        setIsTimerActive(false);
        handleSubmit(); // Automatically submit when timer expires
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup
  }, [courseId, timer]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If the user is not authenticated, redirect to the login page
      navigate('/login');
      return;
    }
  
    try {
      // Decode the token to get user information (userId)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token
      const userId = decodedToken.id;
      console.log(userId) // Assuming userId is stored in the token
  
      // Ensure that you pass course title, description, and other relevant details to the backend
      const response = await axios.post(
        'http://localhost:5000/api/admin/payment-done',
        {
          courseId,
          userId,
          courseTitle: courseDetails.title,  // Add course title
          courseDescription: courseDetails.description, // Add course description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // After successfully storing the course in admincourse
        setIsPaymentSuccessful(true); // Show success message
        navigate('/'); // Redirect to admin dashboard or wherever you want
      }
    } catch (error) {
      console.error('Error storing paid course:', error);
      alert('Error processing payment. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Payment for Course</h2>

        {/* Display Course Info */}
        {courseDetails && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800">{courseDetails.title}</h3>
            <p className="text-gray-600 mt-2">{courseDetails.description}</p>
            <p className="text-lg font-bold text-blue-600 mt-2">Price: ${courseDetails.price}</p>
          </div>
        )}

        {/* Display QR Code */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6 flex justify-center">
          {qrCodeUrl && (
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 object-cover rounded-xl shadow-lg" />
          )}
        </div>

        {/* Timer */}
        <div className="mb-6 text-lg font-semibold text-center">
          Time Remaining: <span className="text-red-500 font-bold">{timer}s</span>
        </div>

        {/* Submit Payment Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            disabled={!isTimerActive}
          >
            Submit Payment
          </button>
        </div>

        {/* Timer Expired Message */}
        {!isTimerActive && (
          <p className="text-red-500 text-center mt-4">Time expired. Please try again.</p>
        )}

        {/* Payment Success Message */}
        {isPaymentSuccessful && (
          <p className="text-green-500 text-center mt-4">Payment Successful. Course added to admin section!</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
