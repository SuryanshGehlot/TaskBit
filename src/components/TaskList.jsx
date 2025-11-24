import React from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

export default function TaskList({
  tasks,
  allTasks,
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  reorderTasks
}) {
  const handleAdd = () => {
    const title = prompt('Enter task name:');
    if (title) addTask(title);
  };

  // Drag-and-drop implementation
  const onDragStart = (evt, idx) => {
    evt.dataTransfer.setData('draggedIdx', idx);
  };

  const onDragOver = (evt) => evt.preventDefault();

  const onDrop = (evt, dropIdx) => {
    const draggedIdx = parseInt(evt.dataTransfer.getData('draggedIdx'));
    const reordered = [...allTasks];
    const [dragged] = reordered.splice(draggedIdx, 1);
    reordered.splice(dropIdx, 0, dragged);
    reorderTasks(reordered);
  };

  return (
    <div className="task-list">
      <button className="add-btn" onClick={handleAdd}>+ Add Task</button>
      {tasks.length === 0 && <div className="empty">No tasks yet.</div>}
      {tasks.map((task, idx) => (
        <div
          key={task.id}
          draggable
          onDragStart={evt => onDragStart(evt, allTasks.indexOf(task))}
          onDragOver={onDragOver}
          onDrop={evt => onDrop(evt, allTasks.indexOf(task))}
        >
          <TaskItem
            task={task}
            idx={allTasks.indexOf(task)}
            taskCount={allTasks.length}
            allTasks={allTasks}
            setTasks={setTasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            reorderTasks={reorderTasks}
          />
        </div>
      ))}
    </div>
  );
}
