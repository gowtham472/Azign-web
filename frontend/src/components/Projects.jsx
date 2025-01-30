export default function Projects({ projects }) {
    return (
        <div className="container">
            <h1>Your Projects</h1>
            <div>
                {projects.slice(0, 3).map((project, index) => (
                    <li key={index}>
                        <h2>{project.name}</h2>
                        <p className={project.status === 'Active' ? 'status-active' : 'status-inactive'}>{project.status}</p>
                    </li>
                ))}
            </div>
            <button className="view-all-btn">View all →</button>
        </div>
    )
}