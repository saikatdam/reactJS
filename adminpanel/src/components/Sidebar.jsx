// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDroplet, faFont, faTableColumns, faBell, faCalendar, faChartBar, faMap, faWrench, faCube, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen, onClose }) => (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
            <h2>CoreUI</h2>
            <span className="pro-badge">PRO</span>
            <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <nav className="sidebar-nav">
            <ul>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faDashboard} />
                    <span>Dashboard</span>
                </li>

                <li className="sidebar-heading">THEME</li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faDroplet} />
                    <span>Colors</span>
                </li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faFont} />
                    <span>Typography</span>
                </li>

                <li className="sidebar-heading">COMPONENTS</li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faTableColumns} />
                    <span>Base</span>
                </li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faWrench} />
                    <span>Buttons</span>
                </li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faFileAlt} />
                    <span>Forms</span>
                </li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faCube} />
                    <span>Icons</span>
                </li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faBell} />
                    <span>Notifications</span>
                </li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faCube} />
                    <span>Widgets</span>
                    <span className="new-badge">NEW</span>
                </li>

                <li className="sidebar-heading">PLUGINS</li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>Calendar</span>
                    <span className="pro-badge">PRO</span>
                </li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faChartBar} />
                    <span>Charts</span>
                    <span className="pro-badge">PRO</span>
                </li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faTableColumns} />
                    <span>DataTables</span>
                    <span className="pro-badge">PRO</span>
                </li>
                <li className="sidebar-item">
                    <FontAwesomeIcon icon={faMap} />
                    <span>Google Maps</span>
                    <span className="pro-badge">PRO</span>
                </li>
            </ul>
        </nav>
    </aside>
);

export default Sidebar;
