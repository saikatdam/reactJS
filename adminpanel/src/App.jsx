// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app" >
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <div className="main-content">
                <Header onToggleSidebar={toggleSidebar} />
                <Dashboard />
            </div>
        </div>
    );
}

export default App;
