import React, { useState, useEffect } from 'react';
import TaskColumn from './TaskColumn';
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from '../services/api';

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await fetchTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            setError('Failed to load tasks. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            const newTask = await createTask(newTaskTitle.trim());
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
        } catch (err) {
            setError('Failed to add task.');
        }
    };

    const handleMoveTask = async (id, status) => {
        // Optimistic update
        const previousTasks = [...tasks];
        setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));

        try {
            await updateTaskStatus(id, status);
        } catch (err) {
            // Revert on error
            setTasks(previousTasks);
            setError('Failed to update task status.');
        }
    };

    const handleDeleteTask = async (id) => {
        const previousTasks = [...tasks];
        setTasks(tasks.filter(t => t.id !== id));

        try {
            await deleteTask(id);
        } catch (err) {
            setTasks(previousTasks);
            setError('Failed to delete task.');
        }
    };

    if (loading) return <div className="loading">Loading tasks...</div>;

    const todoTasks = tasks.filter(t => t.status === 'todo');
    const doneTasks = tasks.filter(t => t.status === 'done');

    return (
        <div>
            <form className="add-task-form" onSubmit={handleAddTask}>
                <input
                    type="text"
                    className="add-task-input"
                    placeholder="What needs to be done?"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button type="submit" className="add-task-btn">Add Task</button>
            </form>

            {error && <div className="error">{error}</div>}

            <div className="board">
                <TaskColumn
                    title="To Do"
                    status="todo"
                    tasks={todoTasks}
                    onMoveTask={handleMoveTask}
                    onDeleteTask={handleDeleteTask}
                />
                <TaskColumn
                    title="Done"
                    status="done"
                    tasks={doneTasks}
                    onMoveTask={handleMoveTask}
                    onDeleteTask={handleDeleteTask}
                />
            </div>
        </div>
    );
};

export default KanbanBoard;
