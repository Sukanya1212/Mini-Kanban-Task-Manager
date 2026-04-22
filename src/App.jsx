import React from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <div className="kanban-container">
      <header className="header">
        <h1>Task Master</h1>
        <p>A simple, elegant way to get things done.</p>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;
