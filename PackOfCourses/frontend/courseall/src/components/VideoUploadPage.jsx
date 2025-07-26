import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoUploadPage = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/admin/video/upload',
        { courseId, videoUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert('Video uploaded successfully');
        navigate('/admin'); // Redirect back to Admin Page after upload
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-center mb-6">Upload Video</h1>

      <form onSubmit={handleSubmit} className="w-1/2 bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="courseId" className="block text-gray-700 font-medium">
            Course ID
          </label>
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="videoUrl" className="block text-gray-700 font-medium">
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUploadPage;
