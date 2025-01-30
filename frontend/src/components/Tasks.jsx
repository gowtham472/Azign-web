export default function Tasks({ tasks }) {
    return (
        <div className="container">
            <h1>Your Tasks</h1>
            <div>
                {tasks.slice(0, 3).map((task, index) => (
                    <li key={index}>
                        <h2>{task.name}</h2>
                        <p className={task.status === 'Active' ? 'status-active' : 'status-inactive'}>{task.status}</p>
                        <p className="deadline">DL: {task.deadline}</p>
                    </li>
                ))}
            </div>
            <button className="view-all-btn">View all →</button>
        </div>
    )
}