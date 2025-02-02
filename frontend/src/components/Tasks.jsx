import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default function Tasks({ tasks = [], toggleShowAll, showAll }) {
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
            <h1>Your Tasks</h1>
            {tasks.length > 0 ? (
                <div>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <Link to={`/tasks/${task.taskId}`}>
                                <h2>{task.taskId}</h2>
                            </Link>
                            <p className={getStatusClass(task.status)}>
                                {task.status}
                            </p>
                            <p className="deadline"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                        </li>
                    ))}
                </div>
            ) : (
                <p>No tasks available.</p>
            )}
            <button className="view-all-btn" onClick={toggleShowAll}>
                {showAll ? "Show Less ←" : "View all →"}
            </button>
        </div>
    );
}

Tasks.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
    })),
    toggleShowAll: PropTypes.func.isRequired,
    showAll: PropTypes.bool.isRequired,
};