// src/components/DashboardChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DashboardChart = ({ data = [20, 45, 28, 80, 99, 43], color = '#42a5f5' }) => {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
           {
            label:'Traffic',
            data:data,
            borderColor:color,
            backgroundColor:color,
            tension:0.8,
            fill:false
           }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div style={{ height: '100px', width: '100%' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default DashboardChart;
