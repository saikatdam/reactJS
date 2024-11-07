// src/components/Dashboard.js
import React from 'react';
import DashboardChart from './DashboardChart';
import './dashboard.css';

const Dashboard = () => (
    <div className="dashboard">
        <div className="dashboard-cards">
            <div className="card" style={{ backgroundColor: '#5B8FF9' }}>
                <h3>26K</h3>
                <p>Users</p>
                <DashboardChart type="line" data={[5, 10, 7, 12]} color="#fff" />
            </div>
            <div className="card" style={{ backgroundColor: '#61DDAA' }}>
                <h3>$6,200</h3>
                <p>Income</p>
                <DashboardChart type="line" data={[3, 9, 8, 14]} color="#fff" />
            </div>
            <div className="card" style={{ backgroundColor: '#65789B' }}>
                <h3>2.49%</h3>
                <p>Conversion Rate</p>
                <DashboardChart type="line" data={[6, 5, 9, 10]} color="#fff" />
            </div>
            <div className="card" style={{ backgroundColor: '#F6BD16' }}>
                <h3>44K</h3>
                <p>Sessions</p>
                <DashboardChart type="line" data={[8, 7, 6, 9]} color="#fff" />
            </div>
        </div>
        <div className="large-chart">
            <h2>Traffic (January - June 2023)</h2>
            <DashboardChart type="line" />
        </div>
    </div>
);

export default Dashboard;
