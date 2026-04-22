import React from 'react';

const TaskCard = ({ task, onMove, onDelete }) => {
    const isDone = task.status === 'done';

    return (
        <div className={`task-card \${task.status}`}>
            <h3 className="task-title">{task.title}</h3>

            <div className="task-actions">
                <button
                    className="btn-icon btn-delete"
                    onClick={() => onDelete(task.id)}
                    title="Delete task"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </button>

                <div className="actions-group">
                    {!isDone ? (
                        <button
                            className="btn-move"
                            onClick={() => onMove(task.id, 'done')}
                        >
                            Move to Done
                        </button>
                    ) : (
                        <button
                            className="btn-move undo"
                            onClick={() => onMove(task.id, 'todo')}
                        >
                            Undo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
