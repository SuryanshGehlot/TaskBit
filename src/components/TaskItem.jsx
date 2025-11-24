import React, { useState, useEffect, useRef } from 'react';
import '../styles/TaskItem.css';

export default function TaskItem({ task, idx, taskCount, allTasks, setTasks, updateTask, deleteTask, reorderTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef(null);

  // Focus input when edit mode starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Function to move tasks up or down
  const move = dir => {
    const newOrder = [...allTasks];
    const newIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= taskCount) return;
    [newOrder[idx], newOrder[newIdx]] = [newOrder[newIdx], newOrder[idx]];
    reorderTasks(newOrder);
  };

  // Save the edited title
  const saveEdit = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle === '') {
      // Prevent empty title, revert for user
      setEditTitle(task.title);
    } else if (trimmedTitle !== task.title) {
      updateTask(task.id, { title: trimmedTitle });
    }
    setIsEditing(false);
  };

  // Cancel editing and revert title
  const cancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div className={`task-item${task.completed ? ' completed' : ''}`}>
      <span
        className="checkbox"
        onClick={() => updateTask(task.id, { completed: !task.completed })}
        title={task.completed ? 'Mark as active' : 'Mark as completed'}
      >
        {task.completed ? '✔' : ''}
      </span>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') saveEdit();
            else if (e.key === 'Escape') cancelEdit();
          }}
          onBlur={saveEdit}
          className="edit-input"
          aria-label="Edit task title"
        />
      ) : (
        <span
          className="title"
          onDoubleClick={() => setIsEditing(true)}
          title="Double-click to edit task title"
        >
          {task.title}
        </span>
      )}

      <button
        className="up-btn"
        onClick={() => move('up')}
        disabled={idx === 0}
        aria-label="Move task up"
      >
        ↑
      </button>

      <button
        className="down-btn"
        onClick={() => move('down')}
        disabled={idx === taskCount - 1}
        aria-label="Move task down"
      >
        ↓
      </button>

      {!isEditing && (
        <button
          className="edit-btn"
          onClick={() => setIsEditing(true)}
          aria-label="Edit task title"
        >
          Edit
        </button>
      )}

      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  );
}
