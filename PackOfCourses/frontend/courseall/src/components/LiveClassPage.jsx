import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LiveClassPage = () => {
  const { courseId } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const videoRef = useRef(null); // Reference to the video element for displaying the live stream
  const mediaRecorderRef = useRef(null); // Reference to MediaRecorder instance
  const recordedChunksRef = useRef([]); // Reference to store recorded video chunks

  // Get the video stream from the webcam
  const startWebcamStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
      alert('Could not access webcam.');
    }
  };

  // Start recording video
  const handleStartRecording = async () => {
    setIsRecording(true);

    const stream = await startWebcamStream();
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      recordedChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const videoURL = URL.createObjectURL(blob);
      setVideoFile(blob);
      setVideoUrl(videoURL);
      recordedChunksRef.current = []; // Reset the recorded chunks
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
  };

  // Stop recording and show the recorded video
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Handle video upload
  const handleUploadVideo = async () => {
    if (!videoFile) {
      alert('No video to upload');
      return;
    }

    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('videoUrl', videoFile, 'recorded-video.webm');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error uploading video:', error.response ? error.response.data : error.message);
    }
  };

  // Download the recorded video
  const handleDownloadVideo = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'recorded-video.webm';
      a.click();
    } else {
      alert('No video to download');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-blue-500 py-10">
      <div className="container mx-auto text-center text-white">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-100">Live Class for Course ID: {courseId}</h1>

        <div className="video-container">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Start Live Class</h2>

            {/* Video Screen to display the webcam */}
            <div className="video-screen" style={{ height: '500px', backgroundColor: '#000', marginBottom: '20px' }}>
              <video
                ref={videoRef}
                autoPlay
                muted
                style={{ width: '100%', height: '100%' }}
              ></video>
            </div>

            <div className="flex justify-center mb-4">
              <button
                onClick={handleStartRecording}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2"
                disabled={isRecording}
              >
                Start Recording
              </button>
              <button
                onClick={handleStopRecording}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={!isRecording}
              >
                Stop Recording
              </button>
            </div>

            {/* Display recorded video */}
            {videoUrl && (
              <div className="flex flex-col justify-center mb-4">
                <video controls src={videoUrl} className="max-w-full rounded-lg mb-4" />
                <button
                  onClick={handleDownloadVideo}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Download Video
                </button>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleUploadVideo}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Upload Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClassPage;
