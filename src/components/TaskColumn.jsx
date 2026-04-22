import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, status, onMoveTask, onDeleteTask }) => {
    return (
        <div className="column">
            <div className="column-header">
                <h2 className="column-title">
                    {title}
                    <span className="badge">{tasks.length}</span>
                </h2>
            </div>

            <div className="task-list">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onMove={onMoveTask}
                            onDelete={onDeleteTask}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No tasks here yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskColumn;
