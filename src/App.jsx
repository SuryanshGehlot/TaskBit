import React, { useState } from 'react';
import './styles/App.css';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem';
import TaskFilters from './components/TaskFilters';


function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const addTask = (title) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        completed: false,
      }
    ]);
  };

  const updateTask = (id, values) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...values } : t));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const reorderTasks = (newOrder) => setTasks(newOrder);

  const filtered = tasks.filter(
    t => filter === 'All'
      ? true
      : filter === 'Active'
        ? !t.completed
        : t.completed
  );

  return (
    <div className="app-wrapper">
      <h1>TaskBit</h1>
      <TaskFilters filter={filter} setFilter={setFilter} counts={{
        all: tasks.length,
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
      }}/>
      <TaskList
        tasks={filtered}
        allTasks={tasks}
        setTasks={setTasks}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        reorderTasks={reorderTasks}
      />
    </div>
  );
}
export default App;
