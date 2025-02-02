import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './AllProjects.css'; // Import the CSS file

export default function AllProjects({ projects = [] }) {
    return (
        <div className="container">
            <h1>All Projects</h1>
            {projects.length > 0 ? (
                <div className="projects-list">
                    {projects.map((project) => (
                        <li key={project._id} className="project-item">
                            <Link to={`/projects/${project.projectCode}`} className="project-link">
                                <h2>{project.projectCode}</h2>
                            </Link>
                            <p className="project-name">{project.name}</p>
                            <p className="project-description">{project.description}</p>
                            <p className="project-team-lead"><strong>Team Lead:</strong> {project.teamLead}</p>
                            <p className="project-members">
                                <strong>Members:</strong> {project.members ? project.members.map((member) => member).join(', ') : "None"}
                            </p>
                        </li>
                    ))}
                </div>
            ) : (
                <p className="no-projects">No projects available.</p>
            )}
        </div>
    );
}

AllProjects.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            projectCode: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            teamLead: PropTypes.string.isRequired,
        })
    ).isRequired,
};
