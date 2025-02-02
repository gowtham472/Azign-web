import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default function Projects({ projects = [], toggleShowAll, showAll }) {
    if (!Array.isArray(projects)) {
        console.error("Expected projects to be an array, but got:", projects);
    }
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
            case 'Active':
                return 'status-active';
            case 'Inactive':
                return 'status-inactive';
            default:
                return 'status-inactive';
        }
    };
    
    Projects.propTypes = {
        projects: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            projectCode: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            teamLead: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        })),
        toggleShowAll: PropTypes.func.isRequired,
        showAll: PropTypes.bool.isRequired,
    };

    return (
        <div className="container">
            <h1>Your Projects</h1>
            {projects.length > 0 ? (
                <div>
                    {projects.map((project) => (
                        <li key={project._id}>
                            <Link to={`/projects/${project.projectCode}`}>
                                <h2>{project.name}</h2>
                            </Link>
                            <p>{project.teamLead}</p>
                            <p className={getStatusClass(project.status)}>{project.status}</p>
                        </li>
                    ))}
                </div>
            ) : (
                <p>No projects available.</p>
            )}
            <button className="view-all-btn" onClick={toggleShowAll}>
                {showAll ? "Show Less ←" : "View all →"}
            </button>
        </div>
    );
}