import './App.css';
import Header from './components/Header.jsx';
import Projects from './components/Projects';
import Tasks from './components/Tasks.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';
import TaskDetail from './components/TaskDetail.jsx';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Allprojects from './components/Allprojects.jsx';
import Alltasks from './components/AllTasks.jsx';


export default function App() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [showAllTasks, setShowAllTasks] = useState(false);

    // Fetching data from the API
    useEffect(() => {
        axios.get('https://c1q1h48z-8000.inc1.devtunnels.ms/api/projects')
            .then(response => {
                setProjects(response.data);
            }).catch(error => console.error('Error fetching projects:', error));

        axios.get('https://c1q1h48z-8000.inc1.devtunnels.ms/api/tasks')
            .then(response => {
                const tasksWithDefaults = response.data.map(task => ({
                    ...task,
                    status: task.status || 'Not Assigned'
                }));
                setTasks(tasksWithDefaults);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Add project to the database via API
    const addProject = (project) => {
        axios.post('https://c1q1h48z-8000.inc1.devtunnels.ms/api/projects/create', project)
            .then(response => setProjects([...projects, response.data]))
            .catch(error => console.error('Error adding project:', error));
    };

    // Update task via API
    const updateTask = (taskId, updatedTask) => {
        axios.put(`https://c1q1h48z-8000.inc1.devtunnels.ms/api/tasks/${taskId}/update`, updatedTask)
            .then(response => {
                setTasks(tasks.map(task => task.taskId === taskId ? response.data : task));
            })
            .catch(error => console.error('Error updating task:', error));
    };

    // Delete project via API
    const deleteProject = (projectId) => {
        axios.delete(`https://c1q1h48z-8000.inc1.devtunnels.ms/api/projects/${projectId}`)
            .then(() => {
                setProjects(projects.filter(project => project._id !== projectId));
            })
            .catch(error => console.error('Error deleting project:', error));
    };

    return (
        <Router>
            <Header />
            <div className="main-container">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Tasks
                                tasks={showAllTasks ? tasks : tasks.slice(0, 3)}
                                toggleShowAll={() => setShowAllTasks(!showAllTasks)}
                                showAll={showAllTasks}
                                updateTask={updateTask}
                            />
                            <Projects
                                projects={showAllProjects ? projects : projects.slice(0, 3)}
                                toggleShowAll={() => setShowAllProjects(!showAllProjects)}
                                showAll={showAllProjects}
                                addProject={addProject}
                                deleteProject={deleteProject}
                            />
                        </>
                    } />
                    <Route path="/projects/:projectCode" element={<ProjectDetail projects={projects} />} />
                    <Route path="/tasks/:taskId" element={<TaskDetail tasks={tasks} />} />
                    <Route path="/all-projects" element={<Allprojects projects={projects} />} />
                    <Route path="/all-tasks" element={<Alltasks tasks={tasks} />} />
                    <Route path="*" element={<h1>404 - Not Found</h1>} />
                </Routes>
            </div>
            <div className="navbar">
                <Link to="/"><i className="fas fa-home"></i></Link>
                <Link to="/all-tasks"><i className="fas fa-tasks"></i></Link>
                <Link to="/all-projects"><i className="fas fa-cube"></i></Link>
                <Link to="/"><i className="fas fa-comments"></i></Link>
            </div>
        </Router>
    );
}
