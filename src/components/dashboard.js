import React, { useState, useContext  } from 'react';
import './dashboard.css';
import { FaHome, FaRobot, FaUsers, FaLightbulb, FaHeartbeat, FaSmile, FaEnvelope, FaGraduationCap, FaSignOutAlt } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [quote, setQuote] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const dataDataStructures = {
        labels: ['T1 Sem 1', 'T2 Sem 1', 'T3 Sem 1', 
                 'T1 Sem 2', 'T2 Sem 2', 'T3 Sem 2', 
                 'T1 Sem 3', 'T2 Sem 3', 'T3 Sem 3'],
        datasets: [
            {
                label: 'Data Structures',
                data: [20, 8, 7, 7, 6, 5, 5, 4, 3],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const dataWebDevelopment = {
        labels: ['T1 Sem 1', 'T2 Sem 1', 'T3 Sem 1', 
                 'T1 Sem 2', 'T2 Sem 2', 'T3 Sem 2', 
                 'T1 Sem 3', 'T2 Sem 3', 'T3 Sem 3'],
        datasets: [
            {
                label: 'Web Development',
                data: [9, 8, 7, 7, 6, 5, 5, 4, 3],
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const dataMathematics = {
        labels: ['T1 Sem 1', 'T2 Sem 1', 'T3 Sem 1', 
                 'T1 Sem 2', 'T2 Sem 2', 'T3 Sem 2', 
                 'T1 Sem 3', 'T2 Sem 3', 'T3 Sem 3'],
        datasets: [
            {
                label: 'Mathematics',
                data: [9, 8, 7, 7, 6, 5, 5, 4, 2],
                borderColor: 'rgba(255, 159, 64, 1)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const totalMarksDataStructures = dataDataStructures.datasets[0].data.reduce((a, b) => a + b, 0);
    const totalMarksWebDevelopment = dataWebDevelopment.datasets[0].data.reduce((a, b) => a + b, 0);
    const totalMarksMathematics = dataMathematics.datasets[0].data.reduce((a, b) => a + b, 0);

    const grandTotal = totalMarksDataStructures + totalMarksWebDevelopment + totalMarksMathematics;
    const percentage = ((grandTotal / 360) * 100).toFixed(2);

    let dropoutChance;
    if (percentage <= 25) {
        dropoutChance = 95;
    } else if (percentage > 25 && percentage <= 40) {
        dropoutChance = 65;
    } else if (percentage > 40 && percentage <= 70) {
        dropoutChance = 30;
    } else {
        dropoutChance = 5;
    }

    const pieChartData = {
        labels: ['Chance of Dropping Out', 'Remaining'],
        datasets: [
            {
                data: [dropoutChance, 100 - dropoutChance],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieChartOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const dataValue = pieChartData.datasets[0].data[tooltipItem.dataIndex];
                        const total = pieChartData.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = ((dataValue / total) * 100).toFixed(2);
                        return `${pieChartData.labels[tooltipItem.dataIndex]}: ${percentage}%`;
                    }
                }
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${percentage}%`;
                },
                color: '#000',
            },
        },
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                stepSize: 5,
                max: 25,
                ticks: {
                    callback: function(value) {
                        return value;
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const handleCheckboxChange = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };
    const handleLogout = async () => {
        try {
          await signOut(auth);
          setShowProfile(false);
          navigate('/');
        } catch (error) {
          console.error('Error logging out:', error);
        }
    };

    return (
        <div className='dashside'>
            <div className="sidebar1">
                <div className="sidebarpadding1">
                    <h2><div className="sidelogo1"></div></h2>
                    <ul className="sidebar-list">
                        <li className="sidebar-item"><a href="/dashboard" className="sidebar-link" data-tooltip="Dashboard"><FaHome className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/chat" className="sidebar-link" data-tooltip="Chat"><FaRobot className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/community" className="sidebar-link" data-tooltip="Community"><FaUsers className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/motivation" className="sidebar-link" data-tooltip="Motivation"><FaLightbulb className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/therapy" className="sidebar-link" data-tooltip="Therapy"><FaHeartbeat className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/moodtracker" className="sidebar-link" data-tooltip="Mood Tracker"><FaSmile className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/contact" className="sidebar-link" data-tooltip="Contact"><FaEnvelope className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/scholarship" className="sidebar-link" data-tooltip="Scholarship"><FaGraduationCap className="icon1" /></a></li>
                        <li className="sidebar-item"><a href="/logout" className="sidebar-link" data-tooltip="Logout"><FaSignOutAlt className="icon1" /></a></li>
                    </ul>
                </div>
            </div>
            <div className='dashmain'>
            <h2 className='head1'>Dashboard</h2>
                <div className='dashheader'>
                    <div className='mainhead'>
                    <h1>Welcome back dear Warrior!</h1>
                    <div className='head3'>“Success is not final; failure is not fatal: It is the courage to continue that counts.” —Winston Churchill</div>
                    </div>
                    <div className='cardmain'>
                        <div>
                            <h3>Overall Percentage: {percentage}%</h3>
                            <Pie data={pieChartData} options={pieChartOptions} />
                        </div>
                    </div>
                </div>
                <div className='dashcards'>
                    <div className='card3' style={{ height: '250px', width: '350px' }}>
                        <Line data={dataDataStructures} options={options} />
                    </div>
                    <div className='card3' style={{ height: '250px', width: '350px' }}>
                        <Line data={dataWebDevelopment} options={options} />
                    </div>
                    <div className='card3' style={{ height: '250px', width: '350px' }}>
                        <Line data={dataMathematics} options={options} />
                    </div>
                    <div className='card4' style={{ height: '250px', width: '250px' }}>
                        <h3>Tasks for the day</h3>
                        <input 
                            type="text" 
                            value={newTodo}
                            onChange={handleInputChange}
                            placeholder="Enter new task"
                            className="todo-input"
                        />
                        <button onClick={addTodo} className="addbutton1">Add</button>
                        <ul className="todo-list">
                            {todos.map((todo, index) => (
                                <li key={index} className="todo-item">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
