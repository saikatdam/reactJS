import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const VideoListPage = () => {
  const [videos, setVideos] = useState([]); // Store videos in state
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/list", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setVideos(response.data); // Set video data (with populated course details)
        setLoading(false); // Set loading to false once videos are fetched
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleGoBack = () => {
    navigate("/admin"); // Navigate back to the admin page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-blue-500 py-10 transition-all duration-300 ease-in-out">
      {/* <Header /> */}
      <div className="container mx-auto text-center text-white">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-100 animate__animated animate__fadeIn">
          Video List
        </h1>

        <div className="mb-4 text-right">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Back to Admin Page
          </button>
        </div>

        {loading ? (
          <p className="text-gray-300 animate__animated animate__fadeIn">Loading videos...</p>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <div
                key={video.videoId}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 relative animate__animated animate__fadeIn animate__delay-300ms"
                style={{ animationDelay: `${index * 100}ms` }} // Staggered animation delay
              >
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full">
                  Video ID: {video.videoId}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">{video.course.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{new Date(video.createdAt).toLocaleString()}</p>
                <p className="text-gray-600 text-sm mt-2 mb-4">{video.course.description}</p>

                <div className="mt-4">
                  <video controls className="w-full rounded-lg mt-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                    <source src={video.videoUrl} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 animate__animated animate__fadeIn">No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default VideoListPage;
