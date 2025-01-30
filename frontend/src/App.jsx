import './App.css';
import Header from './components/Header.jsx';
import Projects from './components/Projects';
import Tasks from './components/Tasks.jsx';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const allProjects = [
    { name: 'Project 01H1', status: 'Active' },
    { name: 'Project 01S3', status: 'Inactive' },
    { name: 'Project 02H1', status: 'Active' },
    { name: 'Project 02S3', status: 'Inactive' },
    { name: 'Project 03H1', status: 'Active' },
    { name: 'Project 03S3', status: 'Inactive' },
];

const allTasks = [
    { name: 'PCD01H1-TC01', status: 'Active', deadline: '2023-12-01' },
    { name: 'PCD01S3-TC04', status: 'Inactive', deadline: '2023-12-15' },
    { name: 'PCD02H1-TC02', status: 'Active', deadline: '2023-12-30' },
    { name: 'PCD02S3-TC05', status: 'Inactive', deadline: '2023-12-10' },
    { name: 'PCD03H1-TC03', status: 'Active', deadline: '2023-12-20' },
    { name: 'PCD03S3-TC06', status: 'Inactive', deadline: '2023-12-25' },
    { name: 'PCD04H1-TC04', status: 'Active', deadline: '2023-12-05' },
    { name: 'PCD04S3-TC07', status: 'Inactive', deadline: '2023-12-10' },
    { name: 'PCD05H1-TC05', status: 'Active', deadline: '2023-12-15' },
    { name: 'PCD05S3-TC08', status: 'Inactive', deadline: '2023-12-20' },
    { name: 'PCD06H1-TC06', status: 'Active', deadline: '2023-12-25' },
    { name: 'PCD06S3-TC09', status: 'Inactive', deadline: '2023-12-30' },
    { name: 'PCD07H1-TC07', status: 'Active', deadline: '2023-12-05' },
    { name: 'PCD07S3-TC10', status: 'Inactive', deadline: '2023-12-10' },
    { name: 'PCD08H1-TC08', status: 'Active', deadline: '2023-12-15' },
    { name: 'PCD08S3-TC11', status: 'Inactive', deadline: '2023-12-20' },
    { name: 'PCD09H1-TC09', status: 'Active', deadline: '2023-12-25' },
    { name: 'PCD09S3-TC12', status: 'Inactive', deadline: '2023-12-30' },
];

export default function App() {
    const [showAll, setShowAll] = useState(false);

    return (
        <Router>
            <Header />
            <div className="main-container">
                <Projects projects={showAll ? allProjects : allProjects.slice(0, 3)} />
                <Tasks tasks={showAll ? allTasks : allTasks.slice(0, 3)} />
            </div>

            {/* Bottom Navigation */}
            <div className="navbar">
                <i className="fas fa-home"></i>
                <i className="fas fa-tasks"></i>
                <i className="fas fa-comments"></i>
                <i className="fas fa-cube"></i>
            </div>
        </Router>
    );
}
