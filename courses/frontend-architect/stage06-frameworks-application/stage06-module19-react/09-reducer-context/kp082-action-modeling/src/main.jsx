import { StrictMode, useReducer, useState } from 'react';
import { createRoot } from 'react-dom/client';

let nextId = 3;

const initialTasks = [
  { id: 1, text: 'Learn dispatch', done: true },
  { id: 2, text: 'Model actions', done: false },
];

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'task_added':
      return [...tasks, { id: action.id, text: action.text, done: false }];
    case 'task_toggled':
      return tasks.map(task =>
        task.id === action.id ? { ...task, done: !task.done } : task,
      );
    case 'task_removed':
      return tasks.filter(task => task.id !== action.id);
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [draft, setDraft] = useState('');

  function handleAddTask() {
    const text = draft.trim();
    if (!text) return;

    dispatch({ type: 'task_added', id: nextId++, text });
    setDraft('');
  }

  return (
    <main>
      <h1>Action 建模</h1>
      <input value={draft} onChange={event => setDraft(event.target.value)} />{' '}
      <button onClick={handleAddTask}>添加</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch({ type: 'task_toggled', id: task.id })}
              />
              {task.text}
            </label>{' '}
            <button onClick={() => dispatch({ type: 'task_removed', id: task.id })}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskApp />
  </StrictMode>,
);
