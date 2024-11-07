// src/components/Header.js
import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faTasks, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onToggleSidebar }) => (
    <header className="header">
        <button className="menu-btn" onClick={onToggleSidebar}>☰</button>
        
        <h1>Dashboard</h1>
        
        <div className="header-icons">
            <div className="header-icon">
                <FontAwesomeIcon icon={faBell} />
                <span className="badge">5</span>
            </div>
            <div className="header-icon">
                <FontAwesomeIcon icon={faEnvelope} />
                <span className="badge">7</span>
            </div>
            <div className="header-icon">
                <FontAwesomeIcon icon={faTasks} />
                <span className="badge">7</span>
            </div>
            <div className="header-profile">
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </div>
        </div>
    </header>
);

export default Header;
