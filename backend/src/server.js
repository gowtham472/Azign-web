const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
const MONGO_URI = 'mongodb+srv://gowtham9112006:gowthamsai123@data.pxwjj.mongodb.net/projectManagementDB?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message));

// Define Project Schema
const projectSchema = new mongoose.Schema({
    projectCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    teamLead: { type: String, required: true },
    members: [{ type: String }],
    comments: [{
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }]
});

// Define Task Schema
const taskSchema = new mongoose.Schema({
    projectId: { type: String, required: true },
    taskId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    status: { type: String, required: true },
    assignedTo: { type: String, required: true },
    priority: { type: String, required: true },
    assignedBy: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    comments: [{
        commentId: { type: String },
        author: { type: String },
        text: { type: String },
        timestamp: { type: Date, default: Date.now }
    }]
});

// Define Message Schema
const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sender: { type: String, required: true },  // Can be 'user' or 'bot'
    timestamp: { type: Date, default: Date.now }
});

// Define Models
const Project = mongoose.model('Projects', projectSchema);
const Task = mongoose.model('Tasks', taskSchema);
const Message = mongoose.model('Messages', messageSchema);

// API Routes

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Get a single project by projectCode
app.get('/api/projects/:projectCode', async (req, res) => {
    try {
        const project = await Project.findOne({ projectCode: req.params.projectCode });
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching project details' });
    }
});

// Create a new project
app.post('/api/projects/create', async (req, res) => {
    try {
        const { projectCode, name, description, teamLead, members } = req.body;

        if (!projectCode || !name || !description || !teamLead) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProject = new Project({ projectCode, name, description, teamLead, members });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: 'Error creating project', details: err.message });
    }
});

// Update a project by projectCode
app.put('/api/projects/:projectCode/update', async (req, res) => {
    try {
        const { name, description, teamLead, members } = req.body;

        if (!name && !description && !teamLead && !members) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const updatedProject = await Project.findOneAndUpdate(
            { projectCode: req.params.projectCode },
            { $set: { name, description, teamLead, members } },
            { new: true }
        );

        if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ error: 'Error updating project', details: err.message });
    }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Get a single task by taskId
app.get('/api/tasks/:taskId', async (req, res) => {
    try {
        const task = await Task.findOne({ taskId: req.params.taskId });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching task details' });
    }
});

// Create a new task
app.post('/api/tasks/create', async (req, res) => {
    try {
        const { projectId, taskId, title, status, assignedTo, priority, assignedBy, description, deadline } = req.body;

        if (!projectId || !taskId || !title || !status || !assignedTo || !priority || !assignedBy || !description || !deadline) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newTask = new Task({ projectId, taskId, title, status, assignedTo, priority, assignedBy, description, deadline });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: 'Error creating task', details: err.message });
    }
});

// Update a task by taskId
app.put('/api/tasks/:taskId/update', async (req, res) => {
    try {
        const { title, status, assignedTo, priority, assignedBy, description, deadline } = req.body;

        if (!title && !status && !assignedTo && !priority && !assignedBy && !description && !deadline) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { taskId: req.params.taskId },
            { $set: { title, status, assignedTo, priority, assignedBy, description, deadline } },
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: 'Error updating task', details: err.message });
    }
});

// Add a comment to a project
app.post('/api/projects/:projectCode/comments', async (req, res) => {
    try {
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).json({ error: 'Comment is required' });
        }

        const project = await Project.findOne({ projectCode: req.params.projectCode });
        if (!project) return res.status(404).json({ error: 'Project not found' });

        project.comments.push({ comment, date: Date.now() });
        await project.save();

        res.json(project);
    } catch (err) {
        res.status(400).json({ error: 'Error adding comment to project', details: err.message });
    }
});

// Add a comment to a task
app.post('/api/tasks/:taskId/comments', async (req, res) => {
    try {
        const { commentId, author, text } = req.body;

        if (!commentId || !author || !text) {
            return res.status(400).json({ error: 'Comment ID, author, and text are required' });
        }

        const task = await Task.findOne({ taskId: req.params.taskId });
        if (!task) return res.status(404).json({ error: 'Task not found' });

        task.comments.push({ commentId, author, text, timestamp: Date.now() });
        await task.save();

        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Error adding comment to task', details: err.message });
    }
});

// Get all messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });  // Sorting messages by timestamp
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Post a new message
app.post('/api/messages', async (req, res) => {
    try {
        const { text, sender } = req.body;

        if (!text || !sender) {
            return res.status(400).json({ error: 'Text and sender are required' });
        }

        const newMessage = new Message({ text, sender });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ error: 'Error sending message', details: err.message });
    }
});


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});