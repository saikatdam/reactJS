import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PaymentPage from './components/PaymentPage';
import AdminPage from './components/AdminPage';
import LiveClassPage from './components/LiveClassPage';
import VideoListPage from './components/VideoListPage';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
 
  return (
    <Router>
      <Header/>
      <Routes>
        
        <Route path="/"  element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment/:courseId" element={<PaymentPage />}  />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/liveclass/:courseId" element={<LiveClassPage />} />
        <Route path="/admin/video-list" element={<VideoListPage />} />
        
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
