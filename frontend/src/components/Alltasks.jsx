import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './AllTasks.css'; // Import the CSS file

export default function Alltasks({ tasks = [] }) {
    const getStatusClass = (status) => {
        switch (status) {
            case 'In Progress':
                return 'status-in-progress';
            case 'Completed':
                return 'status-completed';
            case 'To Do':
                return 'status-to-do';
            case 'Pending':
                return 'status-pending';
            default:
                return 'status-inactive';
        }
    };
    return (
        <div className="container">
            <h1>All tasks</h1>
            {tasks.length > 0 ? (
                <div className="tasks-list">
                    {tasks.map((task) => (
                        <li key={task._id} className="tasks-item">
                            <Link to={`/tasks/${task.taskId}`} className="tasks-link">
                                <h2>{task.title}</h2>
                            </Link>
                            <p className="tasks-name">{task.taskId}</p>
                            <p className="tasks-description">{task.description}</p>
                            <p className="tasks-team-lead"><strong>Assigned To:</strong> {task.assignedTo}</p>
                            <p className={getStatusClass(task.status)}>{task.status}</p>
                            <p className="tasks-priority"><strong>Priority:</strong> {task.priority}</p>
                            <p className="tasks-deadline"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                        </li>
                    ))}
                </div>
            ) : (
                <p className="no-tasks">No tasks available.</p>
            )}
        </div>
    );
}

Alltasks.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            taskId: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            assignedTo: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            priority: PropTypes.string.isRequired,
            deadline: PropTypes.string.isRequired,
        })
    ).isRequired,
};