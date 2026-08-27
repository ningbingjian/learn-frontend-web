import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

let nextId = 3;

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: '理解不可变数组', done: true },
    { id: 2, title: '练习 map', done: false }
  ]);

  function addTask() {
    const newTask = {
      id: nextId,
      title: `任务 ${nextId}`,
      done: false
    };

    nextId += 1;
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function removeTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <main>
      <h1>数组 State 更新</h1>
      <button onClick={addTask}>添加任务</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.done ? '✅' : '⬜'} {task.title}</span>{' '}
            <button onClick={() => toggleTask(task.id)}>切换</button>{' '}
            <button onClick={() => removeTask(task.id)}>删除</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
