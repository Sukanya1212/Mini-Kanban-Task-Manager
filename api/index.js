import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, title: 'Assignment', status: 'todo' },
    { id: 2, title: 'Build a Kanban Board', status: 'todo' },
];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = {
        id: Date.now(),
        title,
        status: 'todo',
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const { status } = req.body;
    const taskId = parseInt(req.params.id, 10);

    if (status !== 'todo' && status !== 'done') {
        return res.status(400).json({ error: 'Invalid status' });
    }

    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex].status = status;
    res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter((t) => t.id !== taskId);
    res.status(204).end();
});

// Important: Vercel serverless function export
export default app;

import http from 'http';

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`); // Replaced to use template correctly
    });
    server.on('error', (e) => console.error('Server error:', e));
}
