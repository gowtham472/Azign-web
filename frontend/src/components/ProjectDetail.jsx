import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProjectDetail({ projects }) {
    const { projectCode } = useParams();
    const project = projects.find(p => p.projectCode === projectCode);

    if (!project) return <div>Project not found!</div>;

    return (
        <div className="container">
            <h2>{project.name}</h2>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Lead:</strong> {project.teamLead}</p>
            <p><strong>Members:</strong> {project.members.join(', ')}</p>
            <h3>Comments</h3>
            <div>
                {project.comments.map((comment) => (
                    <li key={comment._id}>
                        <p>{comment.comment}</p>
                        <p><small>{new Date(comment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></p>
                    </li>
                ))}
            </div>
        </div>
    );
}
ProjectDetail.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        projectCode: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        teamLead: PropTypes.string.isRequired,
        members: PropTypes.arrayOf(PropTypes.string).isRequired,
        comments: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            comment: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
        })).isRequired
    })).isRequired
};

export default ProjectDetail;
