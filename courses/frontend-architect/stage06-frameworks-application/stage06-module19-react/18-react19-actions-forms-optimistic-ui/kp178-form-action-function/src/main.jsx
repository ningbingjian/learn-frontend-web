import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [tasks, setTasks] = useState([]);

  async function addTask(formData) {
    const title = String(formData.get('title') ?? '').trim();
    if (!title) return;

    await delay(600);
    setTasks(currentTasks => [
      ...currentTasks,
      { id: Date.now(), title },
    ]);
  }

  return (
    <main>
      <h1>form action 函数</h1>
      <form action={addTask}>
        <label>
          新任务：
          <input name="title" placeholder="学习 React Actions" />
        </label>
        <button type="submit">添加任务</button>
      </form>

      <h2>任务列表</h2>
      {tasks.length === 0 ? (
        <p>暂无任务</p>
      ) : (
        <ul>
          {tasks.map(task => <li key={task.id}>{task.title}</li>)}
        </ul>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
