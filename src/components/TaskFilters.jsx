import React from 'react';
import '../styles/TaskFilters.css';

export default function TaskFilters({ filter, setFilter, counts }) {
  return (
    <div className="task-filters">
      <button
        className={filter === 'All' ? 'active' : ''}
        onClick={() => setFilter('All')}
      >
        All ({counts.all})
      </button>
      <button
        className={filter === 'Active' ? 'active' : ''}
        onClick={() => setFilter('Active')}
      >
        Active ({counts.active})
      </button>
      <button
        className={filter === 'Completed' ? 'active' : ''}
        onClick={() => setFilter('Completed')}
      >
        Completed ({counts.completed})
      </button>
    </div>
  );
}
